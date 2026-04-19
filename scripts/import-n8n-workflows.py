#!/usr/bin/env python3
"""
Import n8n workflow JSON files into the running n8n instance.

Uses `docker exec` with the n8n CLI since the n8n REST API requires
an API key that must be created through the UI first.

Usage:
    python3 scripts/import-n8n-workflows.py
    python3 scripts/import-n8n-workflows.py --dry-run
"""

import json
import os
import subprocess
import sys
import uuid

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
PROJECTS_DIR = os.path.join(PROJECT_ROOT, "projects")

N8N_CONTAINER = "openclaw-n8n"
N8N_IMPORT_PATH = "/home/node/imports"  # temp dir inside the container


def find_workflow_files() -> list[str]:
    """Find all JSON files in projects/ that look like n8n workflows."""
    workflows = []
    if not os.path.isdir(PROJECTS_DIR):
        print(f"✗ Projects directory not found: {PROJECTS_DIR}")
        return workflows

    for fname in sorted(os.listdir(PROJECTS_DIR)):
        if not fname.endswith(".json"):
            continue
        fpath = os.path.join(PROJECTS_DIR, fname)
        try:
            with open(fpath) as f:
                data = json.load(f)
            # n8n workflows have "nodes" and typically "name"
            if isinstance(data, dict) and "nodes" in data and "name" in data:
                workflows.append(fpath)
        except (json.JSONDecodeError, KeyError):
            continue
    return workflows


def container_running() -> bool:
    """Check if the n8n container is running."""
    try:
        result = subprocess.run(
            ["docker", "inspect", "-f", "{{.State.Running}}", N8N_CONTAINER],
            capture_output=True, text=True, timeout=10,
        )
        return result.stdout.strip() == "true"
    except Exception:
        return False


def list_existing_workflows() -> list[dict]:
    """Get existing workflows via n8n CLI export."""
    try:
        result = subprocess.run(
            ["docker", "exec", N8N_CONTAINER, "n8n", "export:workflow", "--all"],
            capture_output=True, text=True, timeout=30,
        )
        if result.returncode == 0 and result.stdout.strip():
            return json.loads(result.stdout)
    except Exception:
        pass
    return []


def ensure_workflow_id(filepath: str) -> str:
    """Ensure workflow JSON has an 'id' field; write a patched copy and return its path."""
    with open(filepath) as f:
        data = json.load(f)

    if "id" not in data or not data["id"]:
        data["id"] = uuid.uuid4().hex[:16]
    # Ensure each node has an id too
    for node in data.get("nodes", []):
        if "id" not in node or not node["id"]:
            node["id"] = str(uuid.uuid4())

    patched = filepath + ".patched"
    with open(patched, "w") as f:
        json.dump(data, f, indent=2)
    return patched


def import_workflow(filepath: str) -> tuple[bool, str]:
    """Import a single workflow JSON into n8n via docker exec."""
    # Patch the workflow to ensure it has required IDs
    patched = ensure_workflow_id(filepath)
    filename = os.path.basename(patched)

    # Copy file into the container
    cp_result = subprocess.run(
        ["docker", "cp", patched, f"{N8N_CONTAINER}:{N8N_IMPORT_PATH}/{filename}"],
        capture_output=True, text=True, timeout=15,
    )
    if cp_result.returncode != 0:
        # Ensure the directory exists and retry
        subprocess.run(
            ["docker", "exec", N8N_CONTAINER, "mkdir", "-p", N8N_IMPORT_PATH],
            capture_output=True, text=True, timeout=10,
        )
        cp_result = subprocess.run(
            ["docker", "cp", filepath, f"{N8N_CONTAINER}:{N8N_IMPORT_PATH}/{filename}"],
            capture_output=True, text=True, timeout=15,
        )
        if cp_result.returncode != 0:
            return False, f"docker cp failed: {cp_result.stderr.strip()}"

    # Import using n8n CLI
    import_result = subprocess.run(
        [
            "docker", "exec", N8N_CONTAINER,
            "n8n", "import:workflow",
            "--input", f"{N8N_IMPORT_PATH}/{filename}",
        ],
        capture_output=True, text=True, timeout=30,
    )

    # Clean up
    subprocess.run(
        ["docker", "exec", N8N_CONTAINER, "rm", "-f", f"{N8N_IMPORT_PATH}/{filename}"],
        capture_output=True, text=True, timeout=10,
    )
    if os.path.exists(patched):
        os.remove(patched)

    if import_result.returncode == 0:
        return True, import_result.stdout.strip() or "imported"
    # Combine stdout + stderr for diagnostics
    msg = (import_result.stderr or import_result.stdout or "unknown error").strip()
    return False, msg


def main():
    dry_run = "--dry-run" in sys.argv

    print("═══ OPENCLAW n8n Workflow Importer ═══\n")

    # Check container
    if not container_running():
        print(f"✗ Container '{N8N_CONTAINER}' is not running.")
        print("  Start it with: docker compose up -d n8n")
        sys.exit(1)
    print(f"✓ Container '{N8N_CONTAINER}' is running\n")

    # Find workflow files
    workflows = find_workflow_files()
    if not workflows:
        print("✗ No n8n workflow JSON files found in projects/")
        sys.exit(1)

    print(f"Found {len(workflows)} workflow file(s):")
    for wf in workflows:
        with open(wf) as f:
            data = json.load(f)
        name = data.get("name", "Unnamed")
        nodes = len(data.get("nodes", []))
        active = data.get("active", False)
        print(f"  • {os.path.basename(wf)}")
        print(f"    Name: {name}  |  Nodes: {nodes}  |  Active: {active}")

    # Check existing workflows
    print("\nExisting workflows in n8n:")
    existing = list_existing_workflows()
    existing_names = set()
    if existing:
        for ew in existing:
            ename = ew.get("name", "?")
            existing_names.add(ename)
            print(f"  • {ename} (id: {ew.get('id', '?')}, active: {ew.get('active', '?')})")
    else:
        print("  (none or unable to list)")

    if dry_run:
        print("\n[DRY RUN] Would import the above workflows. Run without --dry-run to proceed.")
        return

    # Import each workflow
    print("\nImporting workflows...")
    results = {"success": 0, "failed": 0, "skipped": 0}

    for wf in workflows:
        with open(wf) as f:
            data = json.load(f)
        name = data.get("name", os.path.basename(wf))
        fname = os.path.basename(wf)

        if name in existing_names:
            print(f"  ⟳ '{name}' — re-importing (will update existing)")

        ok, msg = import_workflow(wf)
        if ok:
            print(f"  ✓ '{name}' — {msg}")
            results["success"] += 1
        else:
            print(f"  ✗ '{name}' — {msg}")
            results["failed"] += 1

    # Summary
    print(f"\n═══ Results ═══")
    print(f"  Imported: {results['success']}")
    print(f"  Failed:   {results['failed']}")

    # Verify
    print("\nPost-import workflow list:")
    after = list_existing_workflows()
    for ew in after:
        print(f"  • {ew.get('name', '?')} (active: {ew.get('active', '?')})")

    print(f"\n  n8n UI: http://localhost:5678")


if __name__ == "__main__":
    main()
