"""Memory Bridge routes."""

import asyncio
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from api.server import verify_token, log_api
from memory_bridge import MemoryBridge

router = APIRouter(dependencies=[Depends(verify_token)])
_memory = MemoryBridge()


# --- Models ---

class MemoryWrite(BaseModel):
    content: str
    memory_type: str = "long-term"
    agent: Optional[str] = None
    tags: Optional[list[str]] = None
    meta: Optional[dict] = None

class PreTask(BaseModel):
    agent: str
    task_description: str

class PostTask(BaseModel):
    agent: str
    task: str
    result: str
    lessons: Optional[list[str]] = None


# --- Endpoints ---

@router.post("/write")
async def write_memory(body: MemoryWrite):
    try:
        entry = await asyncio.to_thread(
            _memory.write, body.content, body.memory_type, body.agent, body.tags, body.meta,
        )
        log_api("memory_write", {"id": entry.get("id"), "type": body.memory_type})
        return entry
    except KeyError as e:
        raise HTTPException(status_code=422, detail=f"Invalid memory_type: {e}")
    except Exception as e:
        log_api("memory_write_error", {"error": str(e)})
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/read")
async def read_memory(
    query: str,
    memory_type: str = "long-term",
    agent: Optional[str] = None,
    limit: int = 5,
):
    try:
        results = await asyncio.to_thread(_memory.read, query, memory_type, agent, limit)
        return {"query": query, "count": len(results), "results": results}
    except KeyError as e:
        raise HTTPException(status_code=422, detail=f"Invalid memory_type: {e}")
    except Exception as e:
        log_api("memory_read_error", {"error": str(e)})
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/pre-task")
async def pre_task(body: PreTask):
    try:
        memories = await asyncio.to_thread(_memory.pre_task, body.agent, body.task_description)
        return {"agent": body.agent, "count": len(memories), "memories": memories}
    except Exception as e:
        log_api("memory_pre_task_error", {"error": str(e)})
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/post-task")
async def post_task(body: PostTask):
    try:
        await asyncio.to_thread(
            _memory.post_task, body.agent, body.task, body.result, body.lessons,
        )
        log_api("memory_post_task", {"agent": body.agent, "task": body.task[:80]})
        return {"stored": True, "agent": body.agent}
    except Exception as e:
        log_api("memory_post_task_error", {"error": str(e)})
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/status")
async def memory_status():
    try:
        return await asyncio.to_thread(_memory.status)
    except Exception as e:
        log_api("memory_status_error", {"error": str(e)})
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/cleanup")
async def cleanup():
    try:
        cleaned = await asyncio.to_thread(_memory.cleanup_expired)
        log_api("memory_cleanup", {"cleaned": cleaned})
        return {"cleaned": cleaned}
    except Exception as e:
        log_api("memory_cleanup_error", {"error": str(e)})
        raise HTTPException(status_code=500, detail=str(e))
