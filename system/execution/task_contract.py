#!/usr/bin/env python3
"""
OPENCLAW Task Completion Contract

Every task in the system MUST:
1. Produce output (file, data, or structured result)
2. Save to disk at a known path
3. Return the artifact path
4. Pass validation (exists, non-empty)

Usage:
    from task_contract import TaskContract

    with TaskContract("marketing", "mission-001", "fiverr-gig-draft") as task:
        task.write("gig.md", gig_content)
        task.write("images/cover.png", image_bytes, binary=True)
        # auto-validates on exit
"""

import os
import sys
import json
import time
import uuid
from pathlib import Path
from datetime import datetime, timezone

BASE_DIR = Path(__file__).resolve().parent.parent.parent
WORKSPACES = BASE_DIR / "workspaces"
ARTIFACTS = BASE_DIR / "artifacts"
LOGS = BASE_DIR / "logs"


class ArtifactValidationError(Exception):
    pass


class TaskContract:
    def __init__(self, agent: str, mission_id: str, task_name: str):
        self.agent = agent
        self.mission_id = mission_id
        self.task_name = task_name
        self.task_id = f"{task_name}-{uuid.uuid4().hex[:8]}"
        self.started_at = datetime.now(timezone.utc)
        self.artifacts: list[dict] = []
        self.status = "pending"

        # Create artifact directory
        self.artifact_dir = WORKSPACES / agent / "artifacts" / mission_id / self.task_id
        self.artifact_dir.mkdir(parents=True, exist_ok=True)

    def __enter__(self):
        self.status = "running"
        self._log_event("task_started", {"task": self.task_name})
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type:
            self.status = "failed"
            self._log_event("task_failed", {"error": str(exc_val)})
            return False

        try:
            self.validate()
            self.status = "complete"
            self._log_event("task_complete", {
                "artifacts": len(self.artifacts),
                "paths": [a["path"] for a in self.artifacts]
            })
        except ArtifactValidationError as e:
            self.status = "validation_failed"
            self._log_event("validation_failed", {"error": str(e)})
            raise
        return False

    def write(self, filename: str, content, binary: bool = False):
        """Write an artifact file. Returns the absolute path."""
        # Sanitize filename to prevent path traversal
        clean_name = filename.replace('\\', '/').lstrip('/')
        if '..' in clean_name.split('/'):
            raise ValueError(f"Path traversal detected in filename: {filename}")

        filepath = self.artifact_dir / clean_name
        resolved = filepath.resolve()
        if not str(resolved).startswith(str(self.artifact_dir.resolve())):
            raise ValueError(f"Path traversal detected: {resolved} is outside {self.artifact_dir}")

        filepath.parent.mkdir(parents=True, exist_ok=True)

        mode = "wb" if binary else "w"
        encoding = None if binary else "utf-8"
        with open(filepath, mode, encoding=encoding) as f:
            f.write(content)

        artifact = {
            "path": str(filepath),
            "filename": filename,
            "size": filepath.stat().st_size,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        self.artifacts.append(artifact)
        return str(filepath)

    def validate(self):
        """Validate all artifacts exist and are non-empty."""
        if not self.artifacts:
            raise ArtifactValidationError(
                f"Task '{self.task_name}' produced NO artifacts. "
                "Every task must produce at least one output file."
            )

        for artifact in self.artifacts:
            path = Path(artifact["path"])
            if not path.exists():
                raise ArtifactValidationError(
                    f"Artifact missing: {path}"
                )
            if path.stat().st_size == 0:
                raise ArtifactValidationError(
                    f"Artifact empty (0 bytes): {path}"
                )

        return True

    def summary(self) -> dict:
        return {
            "task_id": self.task_id,
            "agent": self.agent,
            "mission_id": self.mission_id,
            "task_name": self.task_name,
            "status": self.status,
            "started_at": self.started_at.isoformat(),
            "artifact_count": len(self.artifacts),
            "artifacts": self.artifacts
        }

    def _log_event(self, event_type: str, meta: dict):
        log_file = LOGS / "task-contracts.jsonl"
        log_file.parent.mkdir(parents=True, exist_ok=True)
        entry = {
            "ts": datetime.now(timezone.utc).isoformat(),
            "agent": self.agent,
            "task_id": self.task_id,
            "mission_id": self.mission_id,
            "event": event_type,
            "meta": meta
        }
        with open(log_file, "a") as f:
            f.write(json.dumps(entry) + "\n")


def validate_artifact(path: str) -> dict:
    """Standalone artifact validator. Returns validation result."""
    p = Path(path)
    result = {
        "path": str(p),
        "exists": p.exists(),
        "size": 0,
        "valid": False,
        "checked_at": datetime.now(timezone.utc).isoformat()
    }
    if p.exists():
        result["size"] = p.stat().st_size
        result["valid"] = p.stat().st_size > 0

    # Log validation
    log_file = LOGS / "artifact-validations.jsonl"
    log_file.parent.mkdir(parents=True, exist_ok=True)
    with open(log_file, "a") as f:
        f.write(json.dumps(result) + "\n")

    return result


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage:")
        print("  task_contract.py validate <path>  — Validate an artifact")
        print("  task_contract.py demo             — Run demo task")
        sys.exit(1)

    cmd = sys.argv[1]
    if cmd == "validate":
        result = validate_artifact(sys.argv[2])
        icon = "✅" if result["valid"] else "❌"
        print(f"{icon} {result['path']} — {result['size']} bytes")
    elif cmd == "demo":
        with TaskContract("orchestrator", "demo-001", "test-artifact") as task:
            task.write("hello.txt", "OPENCLAW system validation artifact\n")
            task.write("meta.json", json.dumps({"system": "openclaw", "status": "alive"}))
        print(f"✅ Demo complete: {json.dumps(task.summary(), indent=2)}")
