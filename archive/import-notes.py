#!/usr/bin/env python3
"""
Import Apple Notes into Qdrant vector database
Run: python3 ~/Desktop/OPENCLAW/scripts/import-notes.py
"""
import subprocess
import json
import sys
import os
import urllib.request
import urllib.error
import hashlib
from datetime import datetime

QDRANT_URL = "http://localhost:6333"
COLLECTION = "shared"
LM_STUDIO_URL = "http://localhost:1234"
LM_API_KEY = os.environ.get("LM_STUDIO_API_KEY", os.environ.get("OPENAI_API_KEY", ""))
EMBED_MODEL = "text-embedding-nomic-embed-text-v1.5"

def get_apple_notes():
    script = '''
    tell application "Notes"
        set output to {}
        repeat with aNote in notes
            set noteRecord to {title:(name of aNote), body:(body of aNote)}
            set end of output to noteRecord
        end repeat
        set jsonList to "["
        repeat with i from 1 to count of output
            set r to item i of output
            set safeTitle to do shell script "echo " & quoted form of (title of r) & " | python3 -c \\"import sys,json; print(json.dumps(sys.stdin.read().strip()))\\""
            set safeBody to do shell script "echo " & quoted form of (body of r) & " | python3 -c \\"import sys,json; print(json.dumps(sys.stdin.read().strip()))\\""
            set jsonList to jsonList & "{\\"title\\":" & safeTitle & ",\\"body\\":" & safeBody & "}"
            if i < count of output then set jsonList to jsonList & ","
        end repeat
        set jsonList to jsonList & "]"
        return jsonList
    end tell
    '''
    result = subprocess.run(['osascript', '-e', script], capture_output=True, text=True, timeout=30)
    if result.returncode != 0:
        print(f"AppleScript error: {result.stderr}")
        return []
    try:
        return json.loads(result.stdout.strip())
    except json.JSONDecodeError:
        # Fallback: simple text parsing
        return []

def embed_text(text):
    payload = json.dumps({
        "model": EMBED_MODEL,
        "input": text[:2000]  # Truncate for safety
    }).encode()
    req = urllib.request.Request(
        f"{LM_STUDIO_URL}/v1/embeddings",
        data=payload,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {LM_API_KEY}"
        }
    )
    with urllib.request.urlopen(req, timeout=30) as r:
        data = json.loads(r.read())
        return data['data'][0]['embedding']

def upsert_to_qdrant(point_id, vector, payload):
    data = json.dumps({
        "points": [{"id": point_id, "vector": vector, "payload": payload}]
    }).encode()
    req = urllib.request.Request(
        f"{QDRANT_URL}/collections/{COLLECTION}/points",
        data=data,
        headers={"Content-Type": "application/json"},
        method="PUT"
    )
    with urllib.request.urlopen(req, timeout=10) as r:
        return json.loads(r.read())

def main():
    print("📝 Reading Apple Notes...")
    notes = get_apple_notes()
    if not notes:
        print("No notes found or Apple Notes access denied.")
        print("Tip: Grant Terminal full disk access in System Preferences > Privacy")
        return

    print(f"Found {len(notes)} notes")
    success = 0
    for i, note in enumerate(notes):
        title = note.get('title', f'Note {i}')
        body = note.get('body', '')
        if not body.strip():
            continue
        text = f"# {title}\n\n{body}"
        try:
            print(f"  Embedding: {title[:50]}...", end='', flush=True)
            vector = embed_text(text)
            point_id = int(hashlib.md5(title.encode()).hexdigest()[:8], 16)
            upsert_to_qdrant(point_id, vector, {
                "title": title,
                "body": body[:500],
                "source": "apple_notes",
                "imported_at": datetime.now().isoformat()
            })
            print(" ✅")
            success += 1
        except Exception as e:
            print(f" ❌ {e}")

    print(f"\n✅ Imported {success}/{len(notes)} notes into Qdrant '{COLLECTION}' collection")
    print(f"Access at: {QDRANT_URL}/dashboard#/collections/{COLLECTION}")

if __name__ == "__main__":
    main()
