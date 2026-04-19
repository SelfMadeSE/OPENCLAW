"""Task Contract routes."""

import asyncio
from pathlib import Path
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from api.server import verify_token, log_api
from task_contract import TaskContract, validate_artifact

router = APIRouter(dependencies=[Depends(verify_token)])

# Active task contracts kept in memory (task_id → TaskContract)
_active_tasks: dict[str, TaskContract] = {}

BASE = Path(__file__).resolve().parent.parent.parent
WORKSPACES = BASE / "workspaces"


# --- Models ---

class StartTask(BaseModel):
    agent: str
    mission: str
    task_name: str

class WriteArtifact(BaseModel):
    task_id: str
    filename: str
    content: str
    binary: bool = False

class ValidateArtifact(BaseModel):
    path: str


# --- Endpoints ---

@router.post("/start")
async def start_task(body: StartTask):
    try:
        tc = TaskContract(body.agent, body.mission, body.task_name)
        tc.__enter__()
        _active_tasks[tc.task_id] = tc
        log_api("task_start", {"task_id": tc.task_id, "agent": body.agent, "mission": body.mission})
        return {
            "task_id": tc.task_id,
            "artifact_dir": str(tc.artifact_dir),
            "status": tc.status,
        }
    except Exception as e:
        log_api("task_start_error", {"error": str(e)})
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/write")
async def write_artifact(body: WriteArtifact):
    tc = _active_tasks.get(body.task_id)
    if tc is None:
        raise HTTPException(status_code=404, detail=f"No active task: {body.task_id}")
    try:
        path = await asyncio.to_thread(tc.write, body.filename, body.content, body.binary)
        log_api("task_write", {"task_id": body.task_id, "filename": body.filename})
        return {"written": True, "path": path, "task_id": body.task_id}
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except Exception as e:
        log_api("task_write_error", {"error": str(e)})
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/complete/{task_id}")
async def complete_task(task_id: str):
    tc = _active_tasks.get(task_id)
    if tc is None:
        raise HTTPException(status_code=404, detail=f"No active task: {task_id}")
    try:
        tc.__exit__(None, None, None)
        summary = tc.summary()
        del _active_tasks[task_id]
        log_api("task_complete", {"task_id": task_id, "artifacts": summary["artifact_count"]})
        return summary
    except Exception as e:
        # Task stays active on validation failure so artifacts can be added
        log_api("task_complete_error", {"task_id": task_id, "error": str(e)})
        raise HTTPException(status_code=422, detail=str(e))


@router.post("/validate")
async def validate(body: ValidateArtifact):
    try:
        result = await asyncio.to_thread(validate_artifact, body.path)
        return result
    except Exception as e:
        log_api("task_validate_error", {"error": str(e)})
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/artifacts/{mission}")
async def list_artifacts(mission: str):
    """List all artifact directories for a given mission across all agents."""
    results = []
    if not WORKSPACES.exists():
        return {"mission": mission, "artifacts": results}
    for agent_dir in sorted(WORKSPACES.iterdir()):
        mission_dir = agent_dir / "artifacts" / mission
        if mission_dir.exists() and mission_dir.is_dir():
            for task_dir in sorted(mission_dir.iterdir()):
                if task_dir.is_dir():
                    files = [
                        {"name": f.name, "size": f.stat().st_size}
                        for f in task_dir.rglob("*") if f.is_file()
                    ]
                    results.append({
                        "agent": agent_dir.name,
                        "task_dir": str(task_dir),
                        "files": files,
                    })
    return {"mission": mission, "artifacts": results}
