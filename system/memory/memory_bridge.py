#!/usr/bin/env python3
"""
OPENCLAW Memory Bridge — Unified Memory System

Memory types:
    short-term  — Current task context, cleared after task completion
    long-term   — Lessons learned, decisions, patterns (persisted in Qdrant)
    shared      — Global knowledge accessible by all agents (Apple Notes, docs)

Agents MUST:
    - Read memory before starting tasks
    - Write memory after completing tasks

Usage:
    python memory_bridge.py write --agent coder --type long-term \
        --content "n8n Code nodes need NODE_FUNCTION_ALLOW_BUILTIN for fs access"

    python memory_bridge.py read --agent coder --type long-term --query "n8n"

    python memory_bridge.py write --type shared \
        --content "Client prefers minimalist design with dark themes"

    python memory_bridge.py read --type shared --query "client preferences"

    python memory_bridge.py status
"""

import os
import sys
import json
import uuid
import argparse
import urllib.request
from pathlib import Path
from datetime import datetime, timezone

BASE_DIR = Path(__file__).resolve().parent.parent.parent
MEMORY_DIR = BASE_DIR / "memory"
LOGS_DIR = BASE_DIR / "logs"

QDRANT_URL = os.environ.get("QDRANT_URL", "http://localhost:6333")
LM_STUDIO_URL = os.environ.get("LM_STUDIO_URL", "http://localhost:1234/v1")
LM_STUDIO_KEY = os.environ.get("OPENAI_API_KEY", os.environ.get("LM_STUDIO_API_KEY", ""))
EMBEDDING_MODEL = "text-embedding-nomic-embed-text-v1.5"

MEMORY_TYPES = {
    "short-term": {
        "description": "Current task context, auto-cleared after task",
        "storage": "filesystem",
        "ttl_hours": 24
    },
    "long-term": {
        "description": "Lessons, decisions, patterns — persisted in Qdrant",
        "storage": "qdrant",
        "collection": "openclaw_memory_longterm"
    },
    "shared": {
        "description": "Global knowledge — accessible by all agents",
        "storage": "qdrant",
        "collection": "shared"
    }
}


class MemoryBridge:
    def __init__(self):
        MEMORY_DIR.mkdir(parents=True, exist_ok=True)
        (MEMORY_DIR / "per-agent").mkdir(exist_ok=True)
        (MEMORY_DIR / "shared").mkdir(exist_ok=True)
        (MEMORY_DIR / "short-term").mkdir(exist_ok=True)

    def write(self, content: str, memory_type: str = "long-term",
              agent: str = None, tags: list = None, meta: dict = None) -> dict:
        """Write a memory entry."""
        entry = {
            "id": uuid.uuid4().hex[:12],
            "content": content,
            "type": memory_type,
            "agent": agent or "system",
            "tags": tags or [],
            "meta": meta or {},
            "created_at": datetime.now(timezone.utc).isoformat()
        }

        config = MEMORY_TYPES[memory_type]

        if config["storage"] == "filesystem":
            return self._write_filesystem(entry, memory_type, agent)
        elif config["storage"] == "qdrant":
            try:
                return self._write_qdrant(entry, config["collection"])
            except Exception as e:
                entry["_qdrant_error"] = str(e)
                return self._write_filesystem(entry, memory_type, agent)

    def read(self, query: str, memory_type: str = "long-term",
             agent: str = None, limit: int = 5) -> list:
        """Read/search memory entries."""
        config = MEMORY_TYPES[memory_type]

        if config["storage"] == "filesystem":
            return self._read_filesystem(query, memory_type, agent, limit)
        elif config["storage"] == "qdrant":
            try:
                return self._read_qdrant(query, config["collection"], agent, limit)
            except Exception:
                return self._read_filesystem(query, memory_type, agent, limit)

    def pre_task(self, agent: str, task_description: str) -> list:
        """Read relevant memories before starting a task."""
        memories = []
        memories.extend(self.read(task_description, "long-term", agent, 3))
        memories.extend(self.read(task_description, "shared", limit=3))
        memories.extend(self.read(task_description, "short-term", agent, 3))

        self._log("memory_pre_task", {
            "agent": agent,
            "task": task_description[:100],
            "memories_found": len(memories)
        })
        return memories

    def post_task(self, agent: str, task_description: str,
                  outcome: str, lessons: list = None):
        """Write memories after completing a task."""
        self.write(
            f"Task: {task_description}\nOutcome: {outcome}",
            "short-term", agent, tags=["task_outcome"]
        )

        if lessons:
            for lesson in lessons:
                self.write(lesson, "long-term", agent, tags=["lesson"])

        self._log("memory_post_task", {
            "agent": agent,
            "task": task_description[:100],
            "lessons_count": len(lessons or [])
        })

    def cleanup_expired(self):
        """Remove short-term memories past their TTL."""
        now = datetime.now(timezone.utc)
        cleaned = 0
        st_dir = MEMORY_DIR / "short-term"
        if st_dir.exists():
            for f in st_dir.glob("*.json"):
                try:
                    data = json.loads(f.read_text())
                    created = datetime.fromisoformat(data.get("created_at", ""))
                    if (now - created).total_seconds() > MEMORY_TYPES["short-term"]["ttl_hours"] * 3600:
                        f.unlink()
                        cleaned += 1
                except (json.JSONDecodeError, ValueError):
                    continue
        return cleaned

    def status(self) -> dict:
        """Get memory system status."""
        result = {"filesystem": {}, "qdrant": {}}

        for mem_type in MEMORY_TYPES:
            if MEMORY_TYPES[mem_type]["storage"] == "filesystem":
                dir_path = MEMORY_DIR / "short-term"
                files = list(dir_path.glob("*.json")) if dir_path.exists() else []
                result["filesystem"][mem_type] = len(files)

        per_agent = MEMORY_DIR / "per-agent"
        if per_agent.exists():
            for agent_dir in per_agent.iterdir():
                if agent_dir.is_dir():
                    files = list(agent_dir.glob("*.json"))
                    result["filesystem"][f"per-agent/{agent_dir.name}"] = len(files)

        try:
            resp = urllib.request.urlopen(f"{QDRANT_URL}/collections", timeout=5)
            data = json.loads(resp.read())
            for col in data.get("result", {}).get("collections", []):
                name = col["name"]
                try:
                    col_resp = urllib.request.urlopen(
                        f"{QDRANT_URL}/collections/{name}", timeout=5)
                    col_data = json.loads(col_resp.read())
                    points = col_data.get("result", {}).get("points_count", 0)
                    result["qdrant"][name] = points
                except Exception:
                    result["qdrant"][name] = "error"
        except Exception as e:
            result["qdrant"]["_error"] = str(e)

        return result

    def _write_filesystem(self, entry: dict, memory_type: str, agent: str) -> dict:
        if memory_type == "short-term":
            dir_path = MEMORY_DIR / "short-term"
        elif agent:
            dir_path = MEMORY_DIR / "per-agent" / agent
        else:
            dir_path = MEMORY_DIR / "shared"

        dir_path.mkdir(parents=True, exist_ok=True)
        filepath = dir_path / f"{entry['id']}.json"
        filepath.write_text(json.dumps(entry, indent=2))
        entry["stored_at"] = str(filepath)
        entry["storage"] = "filesystem"
        return entry

    def _read_filesystem(self, query: str, memory_type: str,
                         agent: str, limit: int) -> list:
        if memory_type == "short-term":
            dir_path = MEMORY_DIR / "short-term"
        elif agent:
            dir_path = MEMORY_DIR / "per-agent" / agent
        else:
            dir_path = MEMORY_DIR / "shared"

        if not dir_path.exists():
            return []

        results = []
        query_lower = query.lower()
        for filepath in sorted(dir_path.glob("*.json"), reverse=True):
            try:
                entry = json.loads(filepath.read_text())
                if query_lower in entry.get("content", "").lower():
                    results.append(entry)
                    if len(results) >= limit:
                        break
            except Exception:
                continue
        return results

    def _get_embedding(self, text: str) -> list:
        payload = json.dumps({
            "model": EMBEDDING_MODEL,
            "input": text[:2000]
        }).encode()
        headers = {"Content-Type": "application/json"}
        if LM_STUDIO_KEY:
            headers["Authorization"] = f"Bearer {LM_STUDIO_KEY}"
        req = urllib.request.Request(
            f"{LM_STUDIO_URL}/embeddings",
            data=payload,
            headers=headers,
        )
        resp = urllib.request.urlopen(req, timeout=30)
        data = json.loads(resp.read())
        return data["data"][0]["embedding"]

    def _ensure_collection(self, collection: str):
        try:
            urllib.request.urlopen(f"{QDRANT_URL}/collections/{collection}", timeout=5)
        except Exception:
            payload = json.dumps({
                "vectors": {"size": 768, "distance": "Cosine"}
            }).encode()
            req = urllib.request.Request(
                f"{QDRANT_URL}/collections/{collection}",
                data=payload,
                headers={"Content-Type": "application/json"},
                method="PUT"
            )
            urllib.request.urlopen(req, timeout=10)

    def _write_qdrant(self, entry: dict, collection: str) -> dict:
        self._ensure_collection(collection)
        vector = self._get_embedding(entry["content"])

        point_id = uuid.uuid4().hex
        payload = json.dumps({
            "points": [{
                "id": point_id,
                "vector": vector,
                "payload": {
                    "content": entry["content"],
                    "agent": entry["agent"],
                    "type": entry["type"],
                    "tags": entry["tags"],
                    "created_at": entry["created_at"],
                    "meta": entry["meta"]
                }
            }]
        }).encode()

        req = urllib.request.Request(
            f"{QDRANT_URL}/collections/{collection}/points",
            data=payload,
            headers={"Content-Type": "application/json"},
            method="PUT"
        )
        urllib.request.urlopen(req, timeout=30)

        entry["stored_at"] = f"qdrant:{collection}/{point_id}"
        entry["storage"] = "qdrant"
        return entry

    def _read_qdrant(self, query: str, collection: str,
                     agent: str, limit: int) -> list:
        vector = self._get_embedding(query)

        search_body = {
            "vector": vector,
            "limit": limit,
            "with_payload": True
        }
        if agent:
            search_body["filter"] = {
                "must": [{"key": "agent", "match": {"value": agent}}]
            }

        payload = json.dumps(search_body).encode()
        req = urllib.request.Request(
            f"{QDRANT_URL}/collections/{collection}/points/search",
            data=payload,
            headers={"Content-Type": "application/json"}
        )
        resp = urllib.request.urlopen(req, timeout=30)
        data = json.loads(resp.read())

        results = []
        for hit in data.get("result", []):
            entry = hit.get("payload", {})
            entry["score"] = hit.get("score", 0)
            results.append(entry)
        return results

    def _log(self, event: str, meta: dict):
        log_file = LOGS_DIR / "memory-bridge.jsonl"
        log_file.parent.mkdir(parents=True, exist_ok=True)
        entry = {
            "ts": datetime.now(timezone.utc).isoformat(),
            "event": event,
            **meta
        }
        with open(log_file, "a") as f:
            f.write(json.dumps(entry) + "\n")


def main():
    parser = argparse.ArgumentParser(description="OPENCLAW Memory Bridge")
    sub = parser.add_subparsers(dest="command")

    w = sub.add_parser("write", help="Write memory")
    w.add_argument("--content", required=True)
    w.add_argument("--type", default="long-term", choices=list(MEMORY_TYPES.keys()))
    w.add_argument("--agent", default=None)
    w.add_argument("--tags", nargs="*", default=[])

    r = sub.add_parser("read", help="Read/search memory")
    r.add_argument("--query", required=True)
    r.add_argument("--type", default="long-term", choices=list(MEMORY_TYPES.keys()))
    r.add_argument("--agent", default=None)
    r.add_argument("--limit", type=int, default=5)

    sub.add_parser("status", help="Memory system status")

    args = parser.parse_args()
    bridge = MemoryBridge()

    if args.command == "write":
        entry = bridge.write(args.content, args.type, args.agent, args.tags)
        print(f"🧠 Written [{entry['id']}] to {entry.get('storage', 'unknown')}")
        print(f"   Type: {args.type} | Agent: {args.agent or 'system'}")

    elif args.command == "read":
        results = bridge.read(args.query, args.type, args.agent, args.limit)
        if not results:
            print(f"📭 No memories found for: {args.query}")
        else:
            print(f"🧠 Found {len(results)} memories:")
            for r in results:
                score = f" (score: {r.get('score', 'N/A'):.3f})" if "score" in r else ""
                content_preview = r.get("content", "")[:100]
                print(f"  • {content_preview}{score}")

    elif args.command == "status":
        status = bridge.status()
        print("🧠 OPENCLAW Memory Status\n")
        print("Filesystem:")
        for k, v in status["filesystem"].items():
            print(f"  {k}: {v} entries")
        print("\nQdrant:")
        for k, v in status["qdrant"].items():
            print(f"  {k}: {v} points")

    else:
        parser.print_help()


if __name__ == "__main__":
    main()
