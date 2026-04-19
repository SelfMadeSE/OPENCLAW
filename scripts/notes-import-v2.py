#!/usr/bin/env python3
import subprocess, json, urllib.request, hashlib

QDRANT_URL = "http://localhost:6333"
COLLECTION = "shared"
import os
LM_API_KEY = os.environ.get("LM_STUDIO_API_KEY", os.environ.get("OPENAI_API_KEY", ""))
EMBED_MODEL = "text-embedding-nomic-embed-text-v1.5"
MAX_NOTES = 200
BATCH = 10

print("Fetching note titles...")
script = f'''tell application "Notes"
    set out to ""
    set total to count of notes
    set maxN to {MAX_NOTES}
    if total < maxN then set maxN to total
    repeat with i from 1 to maxN
        set out to out & (name of item i of notes) & "|||"
    end repeat
    return out
end tell'''
r = subprocess.run(['osascript', '-e', script], capture_output=True, text=True, timeout=120)
titles = [t.strip() for t in r.stdout.split('|||') if t.strip()]
print(f"Got {len(titles)} titles")

def embed_texts(texts):
    data = json.dumps({"model": EMBED_MODEL, "input": texts}).encode()
    req = urllib.request.Request("http://localhost:1234/v1/embeddings", data=data,
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {LM_API_KEY}"})
    with urllib.request.urlopen(req, timeout=60) as res:
        return [e["embedding"] for e in json.loads(res.read())["data"]]

def upsert(points):
    data = json.dumps({"points": points}).encode()
    req = urllib.request.Request(f"{QDRANT_URL}/collections/{COLLECTION}/points", data=data,
        headers={"Content-Type": "application/json"}, method="PUT")
    with urllib.request.urlopen(req, timeout=30) as res:
        return json.loads(res.read())

imported = 0
for start in range(0, len(titles), BATCH):
    end_idx = min(start + BATCH, len(titles))
    batch_titles = titles[start:end_idx]
    body_script = f'''tell application "Notes"
    set out to ""
    repeat with i from {start+1} to {end_idx}
        set b to plaintext of item i of notes
        if length of b > 1200 then set b to text 1 thru 1200 of b
        set out to out & b & "|||"
    end repeat
    return out
end tell'''
    br = subprocess.run(['osascript', '-e', body_script], capture_output=True, text=True, timeout=60)
    bodies = [b.strip() for b in br.stdout.split('|||')]
    while len(bodies) < len(batch_titles):
        bodies.append("")
    texts = [f"{t}: {b}"[:1000] for t, b in zip(batch_titles, bodies)]
    try:
        embeddings = embed_texts(texts)
        points = []
        for i, (title, body, emb) in enumerate(zip(batch_titles, bodies, embeddings)):
            pid = int(hashlib.md5(f"{start+i}:{title}".encode()).hexdigest()[:8], 16)
            points.append({"id": pid, "vector": emb,
                "payload": {"title": title, "body": body[:400], "source": "apple_notes", "index": start+i}})
        upsert(points)
        imported += len(points)
        print(f"  {imported}/{len(titles)} stored")
    except Exception as e:
        print(f"  Error at {start}: {e}")

print(f"\nDone! {imported} Apple Notes → Qdrant '{COLLECTION}'")
