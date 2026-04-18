#!/usr/bin/env python3
"""OPENCLAW Event Logger

Appends structured JSONL events to per-agent and shared log files.
Used by hooks, scripts, and agents to record actions with traceability.

Usage:
  python3 scripts/event-logger.py log --agent orchestrator --type task_start --detail "Starting beat promotion flow"
  python3 scripts/event-logger.py log --agent auditor --type review --detail "Approved outreach draft" --risk green
  python3 scripts/event-logger.py tail [--agent orchestrator] [--lines 20]
  python3 scripts/event-logger.py stats [--agent orchestrator]
"""
import argparse, json, os, time, sys
from datetime import datetime, timezone
from pathlib import Path

LOGS_DIR = Path(__file__).resolve().parent.parent / "logs"
SHARED_LOG = LOGS_DIR / "events.jsonl"

def agent_log(agent_id: str) -> Path:
    return LOGS_DIR / f"agent-{agent_id}.jsonl"

def log_event(agent: str, event_type: str, detail: str, risk: str = "green",
              run_id: str = None, meta: dict = None):
    LOGS_DIR.mkdir(parents=True, exist_ok=True)
    entry = {
        "ts": datetime.now(timezone.utc).isoformat(),
        "agent": agent,
        "type": event_type,
        "detail": detail,
        "risk": risk,
        "run_id": run_id,
        "meta": meta or {}
    }
    line = json.dumps(entry, separators=(",", ":")) + "\n"
    
    # Write to shared log
    with open(SHARED_LOG, "a") as f:
        f.write(line)
    
    # Write to per-agent log
    with open(agent_log(agent), "a") as f:
        f.write(line)
    
    print(f"Logged: [{risk.upper()}] {agent}/{event_type}: {detail[:80]}")

def tail_log(agent: str = None, lines: int = 20):
    target = agent_log(agent) if agent else SHARED_LOG
    if not target.exists():
        print(f"No log file: {target}")
        return
    
    with open(target) as f:
        all_lines = f.readlines()
    
    for line in all_lines[-lines:]:
        try:
            e = json.loads(line)
            risk_icon = {"green": "🟢", "yellow": "🟡", "orange": "🟠", "red": "🔴"}.get(e.get("risk", ""), "⚪")
            print(f'{e["ts"][:19]} {risk_icon} [{e["agent"]}] {e["type"]}: {e["detail"][:100]}')
        except:
            print(line.rstrip())

def stats(agent: str = None):
    target = agent_log(agent) if agent else SHARED_LOG
    if not target.exists():
        print(f"No log file: {target}")
        return
    
    counts = {}
    risk_counts = {}
    with open(target) as f:
        for line in f:
            try:
                e = json.loads(line)
                t = e.get("type", "unknown")
                r = e.get("risk", "unknown")
                counts[t] = counts.get(t, 0) + 1
                risk_counts[r] = risk_counts.get(r, 0) + 1
            except:
                pass
    
    total = sum(counts.values())
    print(f"Total events: {total}")
    print(f"\nBy type:")
    for t, c in sorted(counts.items(), key=lambda x: -x[1]):
        print(f"  {t}: {c}")
    print(f"\nBy risk:")
    for r, c in sorted(risk_counts.items()):
        icon = {"green": "🟢", "yellow": "🟡", "orange": "🟠", "red": "🔴"}.get(r, "⚪")
        print(f"  {icon} {r}: {c}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="OPENCLAW Event Logger")
    sub = parser.add_subparsers(dest="command")
    
    log_p = sub.add_parser("log", help="Log an event")
    log_p.add_argument("--agent", required=True)
    log_p.add_argument("--type", required=True, dest="event_type")
    log_p.add_argument("--detail", required=True)
    log_p.add_argument("--risk", default="green", choices=["green", "yellow", "orange", "red"])
    log_p.add_argument("--run-id", default=None)
    log_p.add_argument("--meta", default=None, help="JSON metadata")
    
    tail_p = sub.add_parser("tail", help="Tail event log")
    tail_p.add_argument("--agent", default=None)
    tail_p.add_argument("--lines", type=int, default=20)
    
    stats_p = sub.add_parser("stats", help="Show event statistics")
    stats_p.add_argument("--agent", default=None)
    
    args = parser.parse_args()
    
    if args.command == "log":
        meta = json.loads(args.meta) if args.meta else None
        log_event(args.agent, args.event_type, args.detail, args.risk, args.run_id, meta)
    elif args.command == "tail":
        tail_log(args.agent, args.lines)
    elif args.command == "stats":
        stats(args.agent)
    else:
        parser.print_help()
