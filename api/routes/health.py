"""Health & Mission routes."""

import asyncio
import uuid
from datetime import datetime, timezone
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from api.server import verify_token, log_api

router = APIRouter()

# In-memory mission tracking
_missions: dict[str, dict] = {}


class MissionStart(BaseModel):
    name: str
    description: str = ""
    agents: Optional[list[str]] = None


@router.get("/health", dependencies=[Depends(verify_token)])
async def health_check():
    """Full system health check."""
    try:
        from bus import MessageBus
        from approval import ApprovalSystem
        from memory_bridge import MemoryBridge

        results = {}

        # Message Bus
        try:
            bus = MessageBus()
            s = await asyncio.to_thread(bus.stats)
            results["message_bus"] = {"healthy": True, "queue": s["total_in_queue"], "archived": s["total_archived"]}
        except Exception as e:
            results["message_bus"] = {"healthy": False, "error": str(e)}

        # Approval
        try:
            approval = ApprovalSystem()
            pending = await asyncio.to_thread(approval.list_pending)
            results["approval"] = {"healthy": True, "pending": len(pending)}
        except Exception as e:
            results["approval"] = {"healthy": False, "error": str(e)}

        # Memory
        try:
            memory = MemoryBridge()
            mem_status = await asyncio.to_thread(memory.status)
            fs_total = sum(v for v in mem_status["filesystem"].values() if isinstance(v, int))
            results["memory"] = {"healthy": True, "filesystem_entries": fs_total}
        except Exception as e:
            results["memory"] = {"healthy": False, "error": str(e)}

        all_healthy = all(r.get("healthy", False) for r in results.values())
        return {
            "system": "OPENCLAW",
            "status": "operational" if all_healthy else "degraded",
            "checks": results,
        }
    except Exception as e:
        log_api("health_error", {"error": str(e)})
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/health/quick", dependencies=[Depends(verify_token)])
async def quick_health():
    return {"status": "ok", "system": "OPENCLAW", "version": "0.3.0"}


@router.post("/mission/run", dependencies=[Depends(verify_token)])
async def start_mission(body: MissionStart):
    """Start a named mission (runs system validation)."""
    try:
        import sys
        from pathlib import Path

        mission_id = f"mission-{uuid.uuid4().hex[:8]}"
        _missions[mission_id] = {
            "id": mission_id,
            "name": body.name,
            "description": body.description,
            "agents": body.agents or [],
            "status": "running",
            "started_at": datetime.now(timezone.utc).isoformat(),
            "completed_at": None,
            "results": None,
        }
        log_api("mission_start", {"mission_id": mission_id, "name": body.name})

        # Run validation in background thread
        from system.orchestrator import run_validation
        try:
            results = await asyncio.to_thread(run_validation)
            _missions[mission_id]["status"] = "complete"
            _missions[mission_id]["results"] = {k: str(v) for k, v in results.items()}
        except Exception as e:
            _missions[mission_id]["status"] = "failed"
            _missions[mission_id]["results"] = {"error": str(e)}

        _missions[mission_id]["completed_at"] = datetime.now(timezone.utc).isoformat()
        return _missions[mission_id]
    except Exception as e:
        log_api("mission_start_error", {"error": str(e)})
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/mission/status/{mission_id}", dependencies=[Depends(verify_token)])
async def mission_status(mission_id: str):
    mission = _missions.get(mission_id)
    if mission is None:
        raise HTTPException(status_code=404, detail=f"Mission not found: {mission_id}")
    return mission
