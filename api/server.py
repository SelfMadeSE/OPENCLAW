"""OPENCLAW API Server — The Bridge between agents and system layer."""

import os
import sys
import json
import asyncio
from pathlib import Path
from datetime import datetime, timezone

from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware

BASE = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE))
sys.path.insert(0, str(BASE / "system" / "message_bus"))
sys.path.insert(0, str(BASE / "system" / "execution"))
sys.path.insert(0, str(BASE / "system" / "approval"))
sys.path.insert(0, str(BASE / "system" / "memory"))
sys.path.insert(0, str(BASE / "revenue"))

LOGS_DIR = BASE / "logs"
LOGS_DIR.mkdir(parents=True, exist_ok=True)
API_LOG = LOGS_DIR / "api.jsonl"

app = FastAPI(
    title="OPENCLAW API",
    version="0.3.0",
    description="Bridge between Open WebUI agents and OPENCLAW system layer",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

API_TOKEN = os.environ.get("OPENCLAW_API_TOKEN", "openclaw-local-dev")


def log_api(event: str, detail: dict | None = None):
    entry = {
        "ts": datetime.now(timezone.utc).isoformat(),
        "event": event,
        **(detail or {}),
    }
    try:
        with open(API_LOG, "a") as f:
            f.write(json.dumps(entry, default=str) + "\n")
    except Exception:
        pass


async def verify_token(authorization: str = Header(None)):
    if authorization and authorization.replace("Bearer ", "") == API_TOKEN:
        return True
    if not authorization and API_TOKEN == "openclaw-local-dev":
        return True
    raise HTTPException(status_code=401, detail="Invalid token")


from api.routes import bus, approval, memory, task, revenue, health  # noqa: E402

app.include_router(bus.router, prefix="/bus", tags=["Message Bus"])
app.include_router(approval.router, prefix="/approval", tags=["Approval"])
app.include_router(memory.router, prefix="/memory", tags=["Memory"])
app.include_router(task.router, prefix="/task", tags=["Task Contract"])
app.include_router(revenue.router, prefix="/revenue", tags=["Revenue"])
app.include_router(health.router, tags=["Health"])


@app.get("/")
async def root():
    return {"system": "OPENCLAW", "version": "0.3.0", "status": "operational"}
