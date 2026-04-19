#!/usr/bin/env python3
"""
Install OPENCLAW tools into Open WebUI.

Reads credentials from .env, authenticates with Open WebUI,
creates/updates the tool, and lists available agents.

Usage:
    python3 scripts/install-tools.py
"""

import json
import os
import sys
import urllib.request

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
ENV_PATH = os.path.join(PROJECT_ROOT, ".env")
TOOLS_DIR = os.path.join(PROJECT_ROOT, "tools")

WEBUI_URL = os.environ.get("WEBUI_URL", "http://localhost:3000")

TOOL_FILES = [
    {
        "id": "openclaw_tools",
        "name": "OPENCLAW System Tools",
        "file": "openclaw_tools.py",
        "description": "Message bus, memory, approval, tasks, and revenue tools for OPENCLAW agents.",
    },
]

# Agent model IDs (workspace models that have info attached)
AGENT_MODEL_IDS = [
    "openclaw-orchestrator",
    "openclaw-coder",
    "openclaw-marketer",
    "openclaw-outreach",
    "openclaw-creative",
    "openclaw-media",
]


def load_env(path: str) -> dict:
    """Parse a .env file into a dict."""
    env = {}
    if not os.path.exists(path):
        return env
    with open(path) as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, _, val = line.partition("=")
            env[key.strip()] = val.strip().strip('"').strip("'")
    return env


def api(method: str, path: str, token: str = None, data: dict = None):
    """Make a request to Open WebUI API."""
    url = f"{WEBUI_URL}{path}"
    body = json.dumps(data).encode() if data else None
    req = urllib.request.Request(url, data=body, method=method)
    req.add_header("Content-Type", "application/json")
    if token:
        req.add_header("Authorization", f"Bearer {token}")
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        body_text = e.read().decode() if e.fp else ""
        print(f"  HTTP {e.code}: {body_text[:300]}")
        return None
    except Exception as e:
        print(f"  Error: {e}")
        return None


def authenticate(email: str, password: str) -> str | None:
    """Sign in to Open WebUI and return JWT token."""
    print(f"Authenticating as {email}...")
    resp = api("POST", "/api/v1/auths/signin", data={"email": email, "password": password})
    if resp and "token" in resp:
        print(f"  ✓ Authenticated as {resp.get('name', email)} (role: {resp.get('role', '?')})")
        return resp["token"]
    print("  ✗ Authentication failed")
    return None


def list_existing_tools(token: str) -> list:
    """Get IDs of all existing tools."""
    resp = api("GET", "/api/v1/tools/", token)
    if isinstance(resp, list):
        return [t.get("id") for t in resp]
    return []


def delete_tool(token: str, tool_id: str) -> bool:
    """Delete a tool by ID."""
    resp = api("DELETE", f"/api/v1/tools/id/{tool_id}/delete", token)
    return resp is not None


def create_tool(token: str, tool_id: str, name: str, content: str, description: str) -> bool:
    """Create a tool in Open WebUI."""
    resp = api("POST", "/api/v1/tools/create", token, data={
        "id": tool_id,
        "name": name,
        "content": content,
        "meta": {"description": description},
    })
    if resp and resp.get("id"):
        return True
    return False


def list_agents(token: str):
    """List available models/agents."""
    resp = api("GET", "/api/v1/models", token)
    if not resp:
        # Fall back to /api/models
        url = f"{WEBUI_URL}/api/models"
        req = urllib.request.Request(url)
        req.add_header("Authorization", f"Bearer {token}")
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                resp = json.loads(r.read().decode())
        except Exception:
            return []

    data = resp.get("data", resp) if isinstance(resp, dict) else resp
    if not isinstance(data, list):
        return []
    return [m for m in data if "openclaw" in m.get("id", "").lower()]


def main():
    env = load_env(ENV_PATH)
    email = env.get("WEBUI_ADMIN_EMAIL", "admin@local")
    password = env.get("WEBUI_ADMIN_PASSWORD", "")
    if not password:
        print("✗ WEBUI_ADMIN_PASSWORD not found in .env")
        sys.exit(1)

    token = authenticate(email, password)
    if not token:
        sys.exit(1)

    # --- Install tools ---
    existing = list_existing_tools(token)
    print(f"\nExisting tools: {existing or '(none)'}")

    for tool_def in TOOL_FILES:
        tool_id = tool_def["id"]
        tool_path = os.path.join(TOOLS_DIR, tool_def["file"])

        if not os.path.exists(tool_path):
            print(f"  ✗ Tool file not found: {tool_path}")
            continue

        with open(tool_path) as f:
            content = f.read()

        # Delete existing tool first (update = delete + create)
        if tool_id in existing:
            print(f"  Replacing existing tool '{tool_id}'...")
            delete_tool(token, tool_id)

        print(f"  Creating tool '{tool_id}' from {tool_def['file']}...")
        ok = create_tool(token, tool_id, tool_def["name"], content, tool_def["description"])
        if ok:
            print(f"  ✓ Tool '{tool_id}' installed")
        else:
            print(f"  ✗ Failed to install tool '{tool_id}'")

    # --- List agents ---
    print("\nOPENCLAW agents found:")
    agents = list_agents(token)
    for a in agents:
        aid = a.get("id", "?")
        name = a.get("name", aid)
        has_info = bool(a.get("info"))
        print(f"  {aid:30s}  {name:30s}  {'(workspace)' if has_info else '(external)'}")

    # --- Note about tool assignment ---
    print(f"""
╔══════════════════════════════════════════════════════════════════╗
║  Tools are now installed and globally available.                ║
║                                                                ║
║  To assign tools to specific agents:                           ║
║  1. Open {WEBUI_URL} in your browser                ║
║  2. Go to Workspace → Models                                   ║
║  3. Edit each agent → scroll to 'Tools' section                ║
║  4. Enable 'OPENCLAW System Tools'                             ║
║                                                                ║
║  Or enable per-chat via the tool picker (wrench icon).         ║
╚══════════════════════════════════════════════════════════════════╝
""")


if __name__ == "__main__":
    main()
