#!/usr/bin/env python3
"""
OPENCLAW Revenue Attempts Log

Track all revenue-generating activities: attempts, success rates, conversion.

Usage:
    python revenue_tracker.py log --type fiverr_gig --agent outreach \
        --details "Web design gig posted" --status attempted
    python revenue_tracker.py log --type cold_email --agent outreach \
        --details "Sent to Denver restaurant" --status sent
    python revenue_tracker.py update --id <entry-id> --status converted --revenue 500
    python revenue_tracker.py report
    python revenue_tracker.py report --days 7
"""

import os
import sys
import json
import uuid
import fcntl
import logging
import tempfile
import argparse
from pathlib import Path
from datetime import datetime, timezone, timedelta

logger = logging.getLogger(__name__)

BASE_DIR = Path(__file__).resolve().parent.parent
REVENUE_DIR = BASE_DIR / "revenue"
TRACKER_FILE = REVENUE_DIR / "attempts.json"
LOGS_DIR = BASE_DIR / "logs"

REVENUE_TYPES = [
    "fiverr_gig", "upwork_bid", "cold_email", "cold_dm",
    "beat_sale", "web_client", "3d_project", "branding_project",
    "referral", "inbound_lead", "social_media", "other"
]

STATUSES = [
    "attempted", "sent", "viewed", "responded",
    "negotiating", "converted", "lost", "abandoned"
]


def _atomic_write_json(path, data):
    """Write JSON data atomically via temp file + os.replace."""
    tmp_fd, tmp_path = tempfile.mkstemp(dir=str(Path(path).parent), suffix='.tmp')
    try:
        with os.fdopen(tmp_fd, 'w') as f:
            json.dump(data, f, indent=2, default=str)
        os.replace(tmp_path, str(path))
    except:
        if os.path.exists(tmp_path):
            os.unlink(tmp_path)
        raise


def _file_lock(path):
    """fcntl-based file lock for atomic read-modify-write operations."""
    import contextlib

    @contextlib.contextmanager
    def _lock():
        lock_path = str(path) + ".lock"
        fd = open(lock_path, 'w')
        try:
            fcntl.flock(fd, fcntl.LOCK_EX)
            yield
        finally:
            fcntl.flock(fd, fcntl.LOCK_UN)
            fd.close()
    return _lock()


class RevenueTracker:
    def __init__(self):
        REVENUE_DIR.mkdir(parents=True, exist_ok=True)
        if not TRACKER_FILE.exists():
            TRACKER_FILE.write_text("[]")

    def _load(self) -> list:
        return json.loads(TRACKER_FILE.read_text())

    def _save(self, data: list):
        _atomic_write_json(TRACKER_FILE, data)

    def log_attempt(self, rev_type: str, agent: str, details: str,
                    status: str = "attempted", revenue: float = 0,
                    meta: dict = None) -> dict:
        entry = {
            "id": uuid.uuid4().hex[:12],
            "type": rev_type,
            "agent": agent,
            "details": details,
            "status": status,
            "revenue": round(revenue, 2),
            "meta": meta or {},
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat(),
            "history": [{"status": status, "ts": datetime.now(timezone.utc).isoformat()}]
        }

        with _file_lock(TRACKER_FILE):
            data = self._load()
            data.append(entry)
            self._save(data)
        self._log_event("revenue_attempt", entry)
        return entry

    def update_status(self, entry_id: str, status: str,
                      revenue: float = None, note: str = "") -> bool:
        if status not in STATUSES:
            logger.warning("Invalid status %r, must be one of %s", status, STATUSES)
            return False
        with _file_lock(TRACKER_FILE):
            data = self._load()
            for entry in data:
                if entry["id"] == entry_id:
                    entry["status"] = status
                    entry["updated_at"] = datetime.now(timezone.utc).isoformat()
                    if revenue is not None:
                        entry["revenue"] = round(revenue, 2)
                    entry["history"].append({
                        "status": status,
                        "ts": datetime.now(timezone.utc).isoformat(),
                        "note": note
                    })
                    self._save(data)
                    self._log_event("revenue_update", entry)
                    return True
        return False

    def report(self, days: int = 30) -> dict:
        data = self._load()
        cutoff = (datetime.now(timezone.utc) - timedelta(days=days)).isoformat()
        recent = [e for e in data if e["created_at"] >= cutoff]

        by_type = {}
        by_status = {}
        total_revenue = 0
        for e in recent:
            by_type[e["type"]] = by_type.get(e["type"], 0) + 1
            by_status[e["status"]] = by_status.get(e["status"], 0) + 1
            total_revenue += e.get("revenue", 0)

        total_revenue = round(total_revenue, 2)
        converted = len([e for e in recent if e["status"] == "converted"])
        total = len(recent)
        conversion_rate = round(converted / total * 100, 1) if total > 0 else 0.0

        return {
            "period_days": days,
            "total_attempts": total,
            "converted": converted,
            "conversion_rate": f"{conversion_rate:.1f}%",
            "total_revenue": total_revenue,
            "by_type": by_type,
            "by_status": by_status
        }

    def list_active(self) -> list:
        data = self._load()
        active_statuses = {"attempted", "sent", "viewed", "responded", "negotiating"}
        return [e for e in data if e["status"] in active_statuses]

    def _log_event(self, event: str, entry: dict):
        log_file = LOGS_DIR / "revenue.jsonl"
        log_file.parent.mkdir(parents=True, exist_ok=True)
        log_entry = {
            "ts": datetime.now(timezone.utc).isoformat(),
            "event": event,
            "id": entry["id"],
            "type": entry["type"],
            "status": entry["status"],
            "revenue": entry.get("revenue", 0)
        }
        with open(log_file, "a") as f:
            f.write(json.dumps(log_entry) + "\n")


def main():
    parser = argparse.ArgumentParser(description="OPENCLAW Revenue Tracker")
    sub = parser.add_subparsers(dest="command")

    l = sub.add_parser("log", help="Log a revenue attempt")
    l.add_argument("--type", required=True, choices=REVENUE_TYPES)
    l.add_argument("--agent", required=True)
    l.add_argument("--details", required=True)
    l.add_argument("--status", default="attempted", choices=STATUSES)
    l.add_argument("--revenue", type=float, default=0)

    u = sub.add_parser("update", help="Update attempt status")
    u.add_argument("--id", required=True)
    u.add_argument("--status", required=True, choices=STATUSES)
    u.add_argument("--revenue", type=float)
    u.add_argument("--note", default="")

    r = sub.add_parser("report", help="Revenue report")
    r.add_argument("--days", type=int, default=30)

    sub.add_parser("active", help="List active attempts")

    args = parser.parse_args()
    tracker = RevenueTracker()

    if args.command == "log":
        entry = tracker.log_attempt(args.type, args.agent, args.details, args.status, args.revenue)
        print(f"💰 Logged [{entry['id']}] {args.type}: {args.details[:60]}")

    elif args.command == "update":
        if tracker.update_status(args.id, args.status, args.revenue, args.note):
            rev_str = f" (${args.revenue})" if args.revenue else ""
            print(f"📈 Updated {args.id} → {args.status}{rev_str}")
        else:
            print(f"❌ Not found: {args.id}")

    elif args.command == "report":
        report = tracker.report(args.days)
        print(f"\n💰 OPENCLAW Revenue Report ({report['period_days']} days)\n")
        print(f"  Total attempts: {report['total_attempts']}")
        print(f"  Converted:      {report['converted']}")
        print(f"  Conversion:     {report['conversion_rate']}")
        print(f"  Revenue:        ${report['total_revenue']:.2f}")
        if report["by_type"]:
            print(f"\n  By type: {json.dumps(report['by_type'], indent=4)}")
        if report["by_status"]:
            print(f"\n  By status: {json.dumps(report['by_status'], indent=4)}")

    elif args.command == "active":
        active = tracker.list_active()
        if not active:
            print("📭 No active revenue attempts")
        else:
            print(f"📊 {len(active)} active attempts:")
            for e in active:
                print(f"  [{e['id']}] {e['type']}: {e['details'][:50]} → {e['status']}")

    else:
        parser.print_help()


if __name__ == "__main__":
    main()
