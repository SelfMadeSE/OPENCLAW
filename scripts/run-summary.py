#!/usr/bin/env python3
"""OPENCLAW Run Summary Generator

Generates a concise machine-readable summary of a run/session.
Reads from event logs and memory to produce per-run artifacts.

Usage:
  python3 scripts/run-summary.py generate --run-id <id> [--agent <agent>]
  python3 scripts/run-summary.py list
"""
import argparse, json, os, sys
from datetime import datetime, timezone
from pathlib import Path

LOGS_DIR = Path(__file__).resolve().parent.parent / "logs"
ARTIFACTS_DIR = Path(__file__).resolve().parent.parent / "artifacts" / "runs"
SHARED_LOG = LOGS_DIR / "events.jsonl"

def generate_summary(run_id: str = None, agent: str = None):
    """Generate a summary from recent events."""
    ARTIFACTS_DIR.mkdir(parents=True, exist_ok=True)
    
    target = LOGS_DIR / f"agent-{agent}.jsonl" if agent else SHARED_LOG
    if not target.exists():
        print(f"No events found in {target}")
        return
    
    events = []
    with open(target) as f:
        for line in f:
            try:
                e = json.loads(line)
                if run_id and e.get("run_id") != run_id:
                    continue
                events.append(e)
            except:
                pass
    
    if not events:
        print("No matching events found.")
        return
    
    # Build summary
    rid = run_id or datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S")
    summary = {
        "run_id": rid,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "agent": agent or "all",
        "event_count": len(events),
        "time_range": {
            "first": events[0].get("ts"),
            "last": events[-1].get("ts")
        },
        "risk_summary": {},
        "type_summary": {},
        "events": events[-20:]  # last 20 events
    }
    
    for e in events:
        r = e.get("risk", "unknown")
        t = e.get("type", "unknown")
        summary["risk_summary"][r] = summary["risk_summary"].get(r, 0) + 1
        summary["type_summary"][t] = summary["type_summary"].get(t, 0) + 1
    
    # Write artifact
    outfile = ARTIFACTS_DIR / f"summary-{rid}.json"
    with open(outfile, "w") as f:
        json.dump(summary, f, indent=2)
    
    print(f"Summary written: {outfile}")
    print(f"  Events: {len(events)}")
    print(f"  Risk: {json.dumps(summary['risk_summary'])}")
    print(f"  Types: {json.dumps(summary['type_summary'])}")

def list_summaries():
    if not ARTIFACTS_DIR.exists():
        print("No summaries yet.")
        return
    
    files = sorted(ARTIFACTS_DIR.glob("summary-*.json"))
    if not files:
        print("No summaries yet.")
        return
    
    for f in files:
        try:
            d = json.loads(f.read_text())
            print(f'{f.name}: {d["event_count"]} events, agent={d["agent"]}, risk={json.dumps(d["risk_summary"])}')
        except:
            print(f'{f.name}: (parse error)')

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Run Summary Generator")
    sub = parser.add_subparsers(dest="command")
    
    gen = sub.add_parser("generate", help="Generate run summary")
    gen.add_argument("--run-id", default=None)
    gen.add_argument("--agent", default=None)
    
    sub.add_parser("list", help="List existing summaries")
    
    args = parser.parse_args()
    if args.command == "generate":
        generate_summary(args.run_id, args.agent)
    elif args.command == "list":
        list_summaries()
    else:
        parser.print_help()
