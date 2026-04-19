"""Revenue Tracker routes."""

import asyncio
import json
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from api.server import verify_token, log_api
from revenue_tracker import RevenueTracker

router = APIRouter(dependencies=[Depends(verify_token)])
_tracker = RevenueTracker()


# --- Models ---

class LogAttempt(BaseModel):
    type: str
    agent: str
    details: str
    status: str = "attempted"
    revenue: float = 0
    meta: Optional[dict] = None

class UpdateStatus(BaseModel):
    status: str
    revenue: Optional[float] = None
    note: str = ""


# --- Endpoints ---

@router.post("/log")
async def log_attempt(body: LogAttempt):
    try:
        entry = await asyncio.to_thread(
            _tracker.log_attempt,
            body.type, body.agent, body.details, body.status, body.revenue, body.meta,
        )
        log_api("revenue_log", {"id": entry["id"], "type": body.type})
        return entry
    except Exception as e:
        log_api("revenue_log_error", {"error": str(e)})
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/update/{attempt_id}")
async def update_status(attempt_id: str, body: UpdateStatus):
    try:
        ok = await asyncio.to_thread(
            _tracker.update_status, attempt_id, body.status, body.revenue, body.note,
        )
        if not ok:
            raise HTTPException(status_code=404, detail=f"Attempt not found: {attempt_id}")
        log_api("revenue_update", {"id": attempt_id, "status": body.status})
        return {"updated": True, "attempt_id": attempt_id}
    except HTTPException:
        raise
    except Exception as e:
        log_api("revenue_update_error", {"error": str(e)})
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/report")
async def report(days: int = 30):
    try:
        return await asyncio.to_thread(_tracker.report, days)
    except Exception as e:
        log_api("revenue_report_error", {"error": str(e)})
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/attempts")
async def get_attempts(
    type: Optional[str] = None,
    status: Optional[str] = None,
    agent: Optional[str] = None,
):
    """List revenue attempts with optional filters."""
    try:
        data = await asyncio.to_thread(_tracker._load)
        if type:
            data = [e for e in data if e.get("type") == type]
        if status:
            data = [e for e in data if e.get("status") == status]
        if agent:
            data = [e for e in data if e.get("agent") == agent]
        return {"count": len(data), "attempts": data}
    except Exception as e:
        log_api("revenue_attempts_error", {"error": str(e)})
        raise HTTPException(status_code=500, detail=str(e))
