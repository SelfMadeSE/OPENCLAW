"""Approval System routes."""

import asyncio
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from api.server import verify_token, log_api
from approval import ApprovalSystem, TIERS, ACTION_TIERS

router = APIRouter(dependencies=[Depends(verify_token)])
_approval = ApprovalSystem()


# --- Models ---

class ApprovalRequest(BaseModel):
    agent: str
    action: str
    tier: Optional[str] = None
    details: str = ""
    context: Optional[dict] = None

class ApproveAction(BaseModel):
    approver: str
    reason: str = ""

class DenyAction(BaseModel):
    approver: str
    reason: str


# --- Endpoints ---

@router.post("/request")
async def request_approval(body: ApprovalRequest):
    try:
        req = await asyncio.to_thread(
            _approval.request_approval,
            body.agent, body.action, body.tier, body.details,
        )
        log_api("approval_request", {"req_id": req["id"], "agent": body.agent, "action": body.action})
        return req
    except Exception as e:
        log_api("approval_request_error", {"error": str(e)})
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/check/{request_id}")
async def check_status(request_id: str):
    try:
        req = await asyncio.to_thread(_approval.check, request_id)
        if req is None:
            raise HTTPException(status_code=404, detail=f"Request not found: {request_id}")
        return req
    except HTTPException:
        raise
    except Exception as e:
        log_api("approval_check_error", {"error": str(e)})
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/approve/{request_id}")
async def approve(request_id: str, body: ApproveAction):
    try:
        ok = await asyncio.to_thread(_approval.approve, request_id, body.approver, body.reason)
        if not ok:
            raise HTTPException(status_code=404, detail=f"Request not found: {request_id}")
        log_api("approval_approve", {"req_id": request_id, "by": body.approver})
        return {"approved": True, "request_id": request_id}
    except HTTPException:
        raise
    except Exception as e:
        log_api("approval_approve_error", {"error": str(e)})
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/deny/{request_id}")
async def deny(request_id: str, body: DenyAction):
    try:
        ok = await asyncio.to_thread(_approval.deny, request_id, body.approver, body.reason)
        if not ok:
            raise HTTPException(status_code=404, detail=f"Request not found: {request_id}")
        log_api("approval_deny", {"req_id": request_id, "by": body.approver})
        return {"denied": True, "request_id": request_id}
    except HTTPException:
        raise
    except Exception as e:
        log_api("approval_deny_error", {"error": str(e)})
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/pending")
async def list_pending():
    try:
        pending = await asyncio.to_thread(_approval.list_pending)
        return {"count": len(pending), "requests": pending}
    except Exception as e:
        log_api("approval_pending_error", {"error": str(e)})
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/policy")
async def get_policy():
    return {
        "tiers": TIERS,
        "action_tiers": ACTION_TIERS,
        "escalation_order": ["attempt", "collaborate", "escalate", "human"],
    }


@router.get("/can-proceed/{agent}/{action}")
async def can_proceed(agent: str, action: str):
    try:
        result = await asyncio.to_thread(_approval.can_proceed, agent, action)
        return result
    except Exception as e:
        log_api("approval_can_proceed_error", {"error": str(e)})
        raise HTTPException(status_code=500, detail=str(e))
