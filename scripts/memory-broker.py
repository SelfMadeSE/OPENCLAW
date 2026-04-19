#!/usr/bin/env python3
"""
OPENCLAW Memory Broker — writes structured records to openclaw_core Qdrant collection.

Usage:
    # Write a memory record
    python3 memory-broker.py write --kind note --scope shared --agent orchestrator \
        --text "Important fact to remember" --meta '{"source": "manual"}'

    # Search memories
    python3 memory-broker.py search --query "What do I know about SPECTOR?" --limit 5

    # Search with filters
    python3 memory-broker.py search --query "project details" --kind note --agent engineering

    # Migrate Apple Notes from 'shared' collection to openclaw_core
    python3 memory-broker.py migrate-notes
"""

import argparse
import hashlib
import json
import time
import urllib.request
import os
import sys

QDRANT_URL = "http://localhost:6333"
COLLECTION = "openclaw_core"
LM_STUDIO_URL = "http://localhost:1234/v1"
LM_STUDIO_KEY = os.environ.get("LM_STUDIO_API_KEY", "")
EMBED_MODEL = "text-embedding-nomic-embed-text-v1.5"

VALID_KINDS = ["note", "decision", "event", "reputation", "artifact", "apple_note", "dream"]
VALID_SCOPES = ["shared", "agent", "project", "session"]


def get_embedding(text: str) -> list:
    body = json.dumps({"input": text, "model": EMBED_MODEL}).encode()
    req = urllib.request.Request(
        f"{LM_STUDIO_URL}/embeddings",
        data=body,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {LM_STUDIO_KEY}"
        }
    )
    resp = json.loads(urllib.request.urlopen(req).read())
    return resp["data"][0]["embedding"]


def make_id(text: str, kind: str, agent: str = "") -> int:
    h = hashlib.md5(f"{kind}:{agent}:{text[:200]}".encode()).hexdigest()
    return int(h[:15], 16)


def write_record(kind, scope, agent_id, text, project_id=None, session_id=None, meta=None):
    if kind not in VALID_KINDS:
        print(f"Invalid kind: {kind}. Valid: {VALID_KINDS}")
        sys.exit(1)
    if scope not in VALID_SCOPES:
        print(f"Invalid scope: {scope}. Valid: {VALID_SCOPES}")
        sys.exit(1)

    embedding = get_embedding(text)
    point_id = make_id(text, kind, agent_id)

    payload = {
        "kind": kind,
        "scope": scope,
        "agent_id": agent_id or "system",
        "text": text,
        "created_at": int(time.time()),
    }
    if project_id:
        payload["project_id"] = project_id
    if session_id:
        payload["session_id"] = session_id
    if meta:
        payload["meta"] = meta if isinstance(meta, dict) else json.loads(meta)

    body = json.dumps({
        "points": [{
            "id": point_id,
            "vector": embedding,
            "payload": payload
        }]
    }).encode()

    req = urllib.request.Request(
        f"{QDRANT_URL}/collections/{COLLECTION}/points",
        data=body,
        headers={"Content-Type": "application/json"},
        method="PUT"
    )
    resp = json.loads(urllib.request.urlopen(req).read())
    print(f"Written: id={point_id}, kind={kind}, scope={scope}, agent={agent_id}")
    return resp


def search_records(query, limit=5, kind=None, agent_id=None, scope=None):
    embedding = get_embedding(query)
    
    filters = []
    if kind:
        filters.append({"key": "kind", "match": {"value": kind}})
    if agent_id:
        filters.append({"key": "agent_id", "match": {"value": agent_id}})
    if scope:
        filters.append({"key": "scope", "match": {"value": scope}})

    body = {
        "vector": embedding,
        "limit": limit,
        "with_payload": True,
        "with_vector": False
    }
    if filters:
        body["filter"] = {"must": filters}

    req = urllib.request.Request(
        f"{QDRANT_URL}/collections/{COLLECTION}/points/search",
        data=json.dumps(body).encode(),
        headers={"Content-Type": "application/json"},
        method="POST"
    )
    resp = json.loads(urllib.request.urlopen(req).read())
    results = resp.get("result", [])
    
    for r in results:
        p = r.get("payload", {})
        print(f"  [{p.get('kind','?')}] score={r.get('score',0):.3f} agent={p.get('agent_id','?')}")
        print(f"    {p.get('text','')[:120]}")
        print()
    
    return results


def migrate_notes():
    """Migrate Apple Notes from 'shared' collection to openclaw_core with proper schema."""
    # Scroll through all points in shared
    offset = None
    migrated = 0
    
    while True:
        body = {"limit": 50, "with_payload": True, "with_vector": True}
        if offset is not None:
            body["offset"] = offset
        
        req = urllib.request.Request(
            f"{QDRANT_URL}/collections/shared/points/scroll",
            data=json.dumps(body).encode(),
            headers={"Content-Type": "application/json"},
            method="POST"
        )
        resp = json.loads(urllib.request.urlopen(req).read())
        result = resp.get("result", {})
        points = result.get("points", [])
        next_offset = result.get("next_page_offset")
        
        if not points:
            break
        
        # Transform and upsert to openclaw_core
        new_points = []
        for p in points:
            old_payload = p.get("payload", {})
            new_payload = {
                "kind": "apple_note",
                "scope": "shared",
                "agent_id": "system",
                "text": old_payload.get("body", old_payload.get("title", "")),
                "title": old_payload.get("title", ""),
                "created_at": int(time.time()),
                "meta": {
                    "source": "apple_notes",
                    "original_index": old_payload.get("index"),
                    "migrated_from": "shared"
                }
            }
            new_points.append({
                "id": p["id"],
                "vector": p["vector"],
                "payload": new_payload
            })
        
        # Upsert batch
        upsert_body = json.dumps({"points": new_points}).encode()
        req = urllib.request.Request(
            f"{QDRANT_URL}/collections/{COLLECTION}/points",
            data=upsert_body,
            headers={"Content-Type": "application/json"},
            method="PUT"
        )
        urllib.request.urlopen(req)
        migrated += len(new_points)
        print(f"Migrated {migrated} notes...")
        
        if next_offset is None:
            break
        offset = next_offset
    
    print(f"\nTotal migrated: {migrated} Apple Notes → openclaw_core")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="OPENCLAW Memory Broker")
    sub = parser.add_subparsers(dest="command")
    
    # write command
    w = sub.add_parser("write", help="Write a memory record")
    w.add_argument("--kind", required=True, choices=VALID_KINDS)
    w.add_argument("--scope", required=True, choices=VALID_SCOPES)
    w.add_argument("--agent", default="system")
    w.add_argument("--text", required=True)
    w.add_argument("--project", default=None)
    w.add_argument("--session", default=None)
    w.add_argument("--meta", default=None)
    
    # search command
    s = sub.add_parser("search", help="Search memories")
    s.add_argument("--query", required=True)
    s.add_argument("--limit", type=int, default=5)
    s.add_argument("--kind", default=None)
    s.add_argument("--agent", default=None)
    s.add_argument("--scope", default=None)
    
    # migrate command
    sub.add_parser("migrate-notes", help="Migrate Apple Notes from shared → openclaw_core")
    
    args = parser.parse_args()
    
    if args.command == "write":
        write_record(args.kind, args.scope, args.agent, args.text, args.project, args.session, args.meta)
    elif args.command == "search":
        search_records(args.query, args.limit, args.kind, args.agent, args.scope)
    elif args.command == "migrate-notes":
        migrate_notes()
    else:
        parser.print_help()
