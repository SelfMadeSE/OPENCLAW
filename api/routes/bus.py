"""Message Bus routes."""

import asyncio
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from api.server import verify_token, log_api
from bus import MessageBus

router = APIRouter(dependencies=[Depends(verify_token)])
_bus = MessageBus()


# --- Models ---

class SendMessage(BaseModel):
    sender: str
    receiver: str
    task: str
    priority: str = "normal"
    context: Optional[dict] = None
    reply_to: Optional[str] = None

class BroadcastMessage(BaseModel):
    sender: str
    task: str
    priority: str = "normal"
    context: Optional[dict] = None
    exclude: Optional[list[str]] = None

class AckMessage(BaseModel):
    result: Optional[str] = None

class FailMessage(BaseModel):
    error: str

class EscalateMessage(BaseModel):
    reason: str


# --- Endpoints ---

@router.post("/send")
async def send_message(body: SendMessage):
    try:
        msg = await asyncio.to_thread(
            _bus.send_message,
            body.sender, body.receiver, body.task,
            body.priority, body.context, body.reply_to,
        )
        log_api("bus_send", {"msg_id": msg["id"], "sender": body.sender, "receiver": body.receiver})
        return msg
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except Exception as e:
        log_api("bus_send_error", {"error": str(e)})
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/fetch/{agent}")
async def fetch_messages(agent: str, status: str = "pending"):
    try:
        msgs = await asyncio.to_thread(_bus.fetch_messages, agent, status)
        return {"agent": agent, "status": status, "count": len(msgs), "messages": msgs}
    except Exception as e:
        log_api("bus_fetch_error", {"error": str(e)})
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/ack/{message_id}")
async def ack_message(message_id: str, body: AckMessage):
    try:
        ok = await asyncio.to_thread(_bus.acknowledge_message, message_id, body.result)
        if not ok:
            raise HTTPException(status_code=404, detail=f"Message not found: {message_id}")
        log_api("bus_ack", {"msg_id": message_id})
        return {"acknowledged": True, "message_id": message_id}
    except HTTPException:
        raise
    except Exception as e:
        log_api("bus_ack_error", {"error": str(e)})
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/fail/{message_id}")
async def fail_message(message_id: str, body: FailMessage):
    try:
        ok = await asyncio.to_thread(_bus.fail_message, message_id, body.error)
        if not ok:
            raise HTTPException(status_code=404, detail=f"Message not found: {message_id}")
        log_api("bus_fail", {"msg_id": message_id})
        return {"failed": True, "message_id": message_id}
    except HTTPException:
        raise
    except Exception as e:
        log_api("bus_fail_error", {"error": str(e)})
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/escalate/{message_id}")
async def escalate_message(message_id: str, body: EscalateMessage):
    try:
        esc = await asyncio.to_thread(_bus.escalate_message, message_id, body.reason)
        if esc is None:
            raise HTTPException(
                status_code=422,
                detail=f"Escalation failed for {message_id} (not found or max depth reached)",
            )
        log_api("bus_escalate", {"msg_id": message_id})
        return esc
    except HTTPException:
        raise
    except Exception as e:
        log_api("bus_escalate_error", {"error": str(e)})
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/broadcast")
async def broadcast(body: BroadcastMessage):
    try:
        msgs = await asyncio.to_thread(
            _bus.broadcast, body.sender, body.task, body.priority, body.context, body.exclude,
        )
        log_api("bus_broadcast", {"sender": body.sender, "count": len(msgs)})
        return {"broadcast": True, "count": len(msgs), "messages": msgs}
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except Exception as e:
        log_api("bus_broadcast_error", {"error": str(e)})
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/stats")
async def stats():
    try:
        return await asyncio.to_thread(_bus.stats)
    except Exception as e:
        log_api("bus_stats_error", {"error": str(e)})
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/archive")
async def archive():
    try:
        count = await asyncio.to_thread(_bus.archive_completed)
        log_api("bus_archive", {"archived": count})
        return {"archived": count}
    except Exception as e:
        log_api("bus_archive_error", {"error": str(e)})
        raise HTTPException(status_code=500, detail=str(e))
