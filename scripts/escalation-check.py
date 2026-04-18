#!/usr/bin/env python3
"""OPENCLAW Red-Priority Escalation Checker

Scans recent memory events for red-priority escalations
that require human approval.

Usage:
  python3 scripts/escalation-check.py          # check for pending escalations
  python3 scripts/escalation-check.py --approve <point_id>  # approve an escalation
"""
import sys, json, requests, argparse

QDRANT = "http://localhost:6333"
COLLECTION = "openclaw_core"

def check_escalations():
    """Find all unresolved red-priority events."""
    r = requests.post(f"{QDRANT}/collections/{COLLECTION}/points/scroll", json={
        "filter": {
            "must": [
                {"key": "kind", "match": {"value": "event"}},
                {"key": "meta.priority", "match": {"value": "red"}}
            ]
        },
        "limit": 50,
        "with_payload": True,
        "with_vector": False
    })
    points = r.json().get("result", {}).get("points", [])
    pending = [p for p in points 
              if not p["payload"].get("meta", {}).get("resolved")
              and not p["payload"].get("meta.resolved")]
    
    if not pending:
        print("✅ No pending red-priority escalations.")
        return
    
    print(f"🔴 {len(pending)} PENDING RED-PRIORITY ESCALATION(S):\n")
    for p in pending:
        pay = p["payload"]
        meta = pay.get("meta", {})
        print(f"  ID: {p['id']}")
        print(f"  Agent: {pay.get('agent_id', 'unknown')}")
        print(f"  Text: {pay.get('text', 'N/A')[:200]}")
        print(f"  Created: {meta.get('created_at', 'unknown')}")
        print(f"  Action: {meta.get('action', 'unknown')}")
        print()

def approve_escalation(point_id):
    """Mark an escalation as resolved/approved."""
    r = requests.post(f"{QDRANT}/collections/{COLLECTION}/points/payload", json={
        "payload": {"meta.resolved": True, "meta.resolution": "approved_by_human"},
        "points": [int(point_id)]
    })
    if r.status_code == 200:
        print(f"✅ Escalation {point_id} approved.")
    else:
        print(f"❌ Failed: {r.text}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Red-priority escalation checker")
    parser.add_argument("--approve", type=str, help="Approve escalation by point ID")
    args = parser.parse_args()
    
    if args.approve:
        approve_escalation(args.approve)
    else:
        check_escalations()
