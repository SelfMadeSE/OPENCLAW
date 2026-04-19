#!/usr/bin/env python3
"""
OPENCLAW Message Bus — Inter-Agent Communication

Simple JSON-based message queue for agent-to-agent communication.
Agents can send messages, fetch their inbox, and acknowledge completion.

Usage:
    # Send a message
    python bus.py send --from orchestrator --to outreach \
        --task "Draft Fiverr gig for web design" --priority high

    # Fetch messages for an agent
    python bus.py fetch --agent outreach

    # Acknowledge a message
    python bus.py ack --id <message-id>

    # List all pending messages
    python bus.py list

    # Broadcast to all agents
    python bus.py broadcast --from orchestrator \
        --task "System health check" --priority normal

Programmatic:
    from bus import MessageBus
    bus = MessageBus()
    bus.send_message("orchestrator", "outreach", "Draft proposal", priority="high")
    messages = bus.fetch_messages("outreach")
    bus.acknowledge_message(msg_id)
"""

import os
import sys
import json
import uuid
import fcntl
import tempfile
import argparse
from pathlib import Path
from datetime import datetime, timezone, timedelta
from typing import Optional

BASE_DIR = Path(__file__).resolve().parent.parent.parent
BUS_DIR = Path(__file__).resolve().parent
QUEUE_FILE = BUS_DIR / "queue.json"
ARCHIVE_FILE = BUS_DIR / "archive.json"
LOGS_DIR = BASE_DIR / "logs"

AGENTS = ["orchestrator", "coder", "marketer", "creative", "outreach", "media"]

MAX_MESSAGES_PER_HOUR = 20
COOLDOWN_SECONDS = 30
DUPLICATE_WINDOW_MINUTES = 5
MAX_ESCALATION_DEPTH = 3


class FileLock:
    """fcntl-based file lock for atomic read-modify-write operations."""
    def __init__(self, path):
        self.path = str(path) + '.lock'
        self.fd = None

    def __enter__(self):
        self.fd = open(self.path, 'w')
        fcntl.flock(self.fd, fcntl.LOCK_EX)
        return self

    def __exit__(self, *args):
        fcntl.flock(self.fd, fcntl.LOCK_UN)
        self.fd.close()


def _atomic_write(path, data):
    """Write JSON data atomically via temp file + os.replace."""
    tmp_fd, tmp_path = tempfile.mkstemp(dir=str(path.parent), suffix='.tmp')
    try:
        with os.fdopen(tmp_fd, 'w') as f:
            json.dump(data, f, indent=2, default=str)
        os.replace(tmp_path, str(path))
    except:
        os.unlink(tmp_path)
        raise


class MessageBus:
    def __init__(self):
        self._rate_limits: dict = {}
        self._ensure_files()

    def _ensure_files(self):
        for f in [QUEUE_FILE, ARCHIVE_FILE]:
            if not f.exists():
                _atomic_write(f, [])

    def _load_queue(self) -> list:
        return json.loads(QUEUE_FILE.read_text())

    def _save_queue(self, queue: list):
        _atomic_write(QUEUE_FILE, queue)

    def _load_archive(self) -> list:
        return json.loads(ARCHIVE_FILE.read_text())

    def _save_archive(self, archive: list):
        _atomic_write(ARCHIVE_FILE, archive)

    def _validate_agent(self, agent: str, role: str):
        """Validate that an agent is in the AGENTS whitelist."""
        if agent not in AGENTS:
            raise ValueError(f"Invalid {role}: '{agent}' is not a registered agent. Valid agents: {AGENTS}")

    def _check_rate_limit(self, sender: str, receiver: str):
        """Enforce per-agent rate limits and sender→receiver cooldown."""
        now = datetime.now(timezone.utc)

        if sender not in self._rate_limits:
            self._rate_limits[sender] = {
                "count": 0,
                "window_start": now,
                "last_sent": {}
            }

        rl = self._rate_limits[sender]

        # Reset hourly window if expired
        if (now - rl["window_start"]) >= timedelta(hours=1):
            rl["count"] = 0
            rl["window_start"] = now

        # Check hourly cap
        if rl["count"] >= MAX_MESSAGES_PER_HOUR:
            raise ValueError(
                f"Rate limit exceeded: '{sender}' has sent {MAX_MESSAGES_PER_HOUR} messages this hour. "
                f"Window resets at {(rl['window_start'] + timedelta(hours=1)).isoformat()}"
            )

        # Check sender→receiver cooldown
        if receiver in rl["last_sent"]:
            elapsed = (now - rl["last_sent"][receiver]).total_seconds()
            if elapsed < COOLDOWN_SECONDS:
                raise ValueError(
                    f"Cooldown active: '{sender}'→'{receiver}' must wait {COOLDOWN_SECONDS - elapsed:.0f}s "
                    f"before sending again"
                )

        # Update tracking
        rl["count"] += 1
        rl["last_sent"][receiver] = now

    def _check_duplicate(self, sender: str, receiver: str, task: str, queue: list):
        """Reject duplicate messages (same sender, receiver, task) within 5 minutes."""
        now = datetime.now(timezone.utc)
        cutoff = now - timedelta(minutes=DUPLICATE_WINDOW_MINUTES)
        for msg in queue:
            if (msg["sender"] == sender and msg["receiver"] == receiver
                    and msg["task"] == task):
                created = datetime.fromisoformat(msg["created_at"])
                if created > cutoff:
                    self._log_event("duplicate_rejected", {
                        "sender": sender, "receiver": receiver, "task": task,
                        "original_id": msg["id"]
                    })
                    raise ValueError(
                        f"Duplicate message rejected: identical message [{msg['id']}] "
                        f"from '{sender}'→'{receiver}' was sent within the last {DUPLICATE_WINDOW_MINUTES} minutes"
                    )

    def send_message(
        self,
        sender: str,
        receiver: str,
        task: str,
        priority: str = "normal",
        context: Optional[dict] = None,
        reply_to: Optional[str] = None,
        escalation_depth: int = 0
    ) -> dict:
        """Send a message from one agent to another."""
        # Agent whitelist validation
        self._validate_agent(sender, "sender")
        self._validate_agent(receiver, "receiver")

        # Rate limit check
        self._check_rate_limit(sender, receiver)

        msg = {
            "id": uuid.uuid4().hex[:12],
            "sender": sender,
            "receiver": receiver,
            "task": task,
            "priority": priority,  # low, normal, high, critical
            "context": context or {},
            "reply_to": reply_to,
            "escalation_depth": escalation_depth,
            "status": "pending",
            "created_at": datetime.now(timezone.utc).isoformat(),
            "acknowledged_at": None,
            "result": None
        }

        with FileLock(QUEUE_FILE):
            queue = self._load_queue()
            # Duplicate detection
            self._check_duplicate(sender, receiver, task, queue)
            queue.append(msg)
            self._save_queue(queue)

        self._log("message_sent", msg)
        return msg

    def broadcast(self, sender: str, task: str, priority: str = "normal",
                  context: Optional[dict] = None, exclude: Optional[list] = None):
        """Send a message to all agents except sender and excluded."""
        self._validate_agent(sender, "sender")
        exclude = exclude or []
        messages = []
        for agent in AGENTS:
            if agent != sender and agent not in exclude:
                msg = self.send_message(sender, agent, task, priority, context)
                messages.append(msg)
        return messages

    def fetch_messages(self, agent: str, status: str = "pending") -> list:
        """Fetch all messages for a specific agent."""
        with FileLock(QUEUE_FILE):
            queue = self._load_queue()
        return [m for m in queue if m["receiver"] == agent and m["status"] == status]

    def fetch_all_pending(self) -> list:
        """Fetch all pending messages across all agents."""
        with FileLock(QUEUE_FILE):
            queue = self._load_queue()
        return [m for m in queue if m["status"] == "pending"]

    def acknowledge_message(self, msg_id: str, result: Optional[str] = None) -> bool:
        """Mark a message as acknowledged/completed."""
        with FileLock(QUEUE_FILE):
            queue = self._load_queue()
            for msg in queue:
                if msg["id"] == msg_id:
                    msg["status"] = "acknowledged"
                    msg["acknowledged_at"] = datetime.now(timezone.utc).isoformat()
                    msg["result"] = result
                    self._save_queue(queue)
                    self._log("message_acknowledged", msg)
                    return True
        return False

    def fail_message(self, msg_id: str, error: str) -> bool:
        """Mark a message as failed."""
        with FileLock(QUEUE_FILE):
            queue = self._load_queue()
            for msg in queue:
                if msg["id"] == msg_id:
                    msg["status"] = "failed"
                    msg["acknowledged_at"] = datetime.now(timezone.utc).isoformat()
                    msg["result"] = f"FAILED: {error}"
                    self._save_queue(queue)
                    self._log("message_failed", msg)
                    return True
        return False

    def escalate_message(self, msg_id: str, reason: str) -> Optional[dict]:
        """Escalate a message with depth limit to prevent infinite loops."""
        with FileLock(QUEUE_FILE):
            queue = self._load_queue()
            for msg in queue:
                if msg["id"] == msg_id:
                    current_depth = msg.get("escalation_depth", 0)

                    # Check escalation depth limit
                    if current_depth >= MAX_ESCALATION_DEPTH:
                        msg["status"] = "failed_max_escalation"
                        msg["result"] = (
                            f"ESCALATION BLOCKED: depth {current_depth} >= max {MAX_ESCALATION_DEPTH}. "
                            f"Reason: {reason}"
                        )
                        self._save_queue(queue)
                        self._log("escalation_blocked", msg)
                        return None

                    msg["status"] = "escalated"
                    msg["result"] = f"ESCALATED: {reason}"
                    self._save_queue(queue)

                    # Create escalation message with incremented depth
                    esc = self.send_message(
                        sender=msg["receiver"],
                        receiver="orchestrator",
                        task=f"ESCALATION from {msg['receiver']}: {reason}\nOriginal task: {msg['task']}",
                        priority="high",
                        context={"original_message": msg_id, "escalation_reason": reason},
                        escalation_depth=current_depth + 1
                    )
                    self._log("message_escalated", msg)
                    return esc
        return None

    def archive_completed(self) -> int:
        """Move completed/failed messages to archive."""
        with FileLock(QUEUE_FILE):
            with FileLock(ARCHIVE_FILE):
                queue = self._load_queue()
                archive = self._load_archive()
                active = []
                archived = 0
                for msg in queue:
                    if msg["status"] in ("acknowledged", "failed", "escalated", "failed_max_escalation"):
                        archive.append(msg)
                        archived += 1
                    else:
                        active.append(msg)
                self._save_queue(active)
                self._save_archive(archive)
        return archived

    def stats(self) -> dict:
        """Get message bus statistics."""
        with FileLock(QUEUE_FILE):
            queue = self._load_queue()
        with FileLock(ARCHIVE_FILE):
            archive = self._load_archive()
        by_status = {}
        for msg in queue:
            by_status[msg["status"]] = by_status.get(msg["status"], 0) + 1
        by_agent = {}
        for msg in queue:
            if msg["status"] == "pending":
                by_agent[msg["receiver"]] = by_agent.get(msg["receiver"], 0) + 1
        return {
            "total_in_queue": len(queue),
            "total_archived": len(archive),
            "by_status": by_status,
            "pending_by_agent": by_agent
        }

    def _log(self, event_type: str, msg: dict):
        log_file = LOGS_DIR / "message-bus.jsonl"
        log_file.parent.mkdir(parents=True, exist_ok=True)
        entry = {
            "ts": datetime.now(timezone.utc).isoformat(),
            "event": event_type,
            "msg_id": msg["id"],
            "sender": msg["sender"],
            "receiver": msg["receiver"],
            "priority": msg.get("priority", "unknown")
        }
        with open(log_file, "a") as f:
            f.write(json.dumps(entry) + "\n")

    def _log_event(self, event_type: str, data: dict):
        """Log a non-message event (e.g. duplicate rejection)."""
        log_file = LOGS_DIR / "message-bus.jsonl"
        log_file.parent.mkdir(parents=True, exist_ok=True)
        entry = {
            "ts": datetime.now(timezone.utc).isoformat(),
            "event": event_type,
            **data
        }
        with open(log_file, "a") as f:
            f.write(json.dumps(entry) + "\n")


def main():
    parser = argparse.ArgumentParser(description="OPENCLAW Message Bus")
    sub = parser.add_subparsers(dest="command")

    # send
    s = sub.add_parser("send", help="Send a message")
    s.add_argument("--from", dest="sender", required=True)
    s.add_argument("--to", dest="receiver", required=True)
    s.add_argument("--task", required=True)
    s.add_argument("--priority", default="normal", choices=["low", "normal", "high", "critical"])
    s.add_argument("--reply-to", default=None)

    # broadcast
    b = sub.add_parser("broadcast", help="Broadcast to all agents")
    b.add_argument("--from", dest="sender", required=True)
    b.add_argument("--task", required=True)
    b.add_argument("--priority", default="normal")

    # fetch
    f = sub.add_parser("fetch", help="Fetch messages for agent")
    f.add_argument("--agent", required=True)
    f.add_argument("--status", default="pending")

    # ack
    a = sub.add_parser("ack", help="Acknowledge message")
    a.add_argument("--id", required=True)
    a.add_argument("--result", default=None)

    # fail
    fl = sub.add_parser("fail", help="Mark message as failed")
    fl.add_argument("--id", required=True)
    fl.add_argument("--error", required=True)

    # escalate
    e = sub.add_parser("escalate", help="Escalate a message")
    e.add_argument("--id", required=True)
    e.add_argument("--reason", required=True)

    # list
    sub.add_parser("list", help="List all pending messages")

    # stats
    sub.add_parser("stats", help="Message bus statistics")

    # archive
    sub.add_parser("archive", help="Archive completed messages")

    args = parser.parse_args()
    bus = MessageBus()

    if args.command == "send":
        msg = bus.send_message(args.sender, args.receiver, args.task, args.priority, reply_to=args.reply_to)
        print(f"📨 Sent [{msg['id']}] {args.sender} → {args.receiver}: {args.task}")

    elif args.command == "broadcast":
        msgs = bus.broadcast(args.sender, args.task, args.priority)
        print(f"📡 Broadcast from {args.sender} to {len(msgs)} agents")

    elif args.command == "fetch":
        msgs = bus.fetch_messages(args.agent, args.status)
        if not msgs:
            print(f"📭 No {args.status} messages for {args.agent}")
        else:
            for m in msgs:
                icon = {"low": "⚪", "normal": "🔵", "high": "🟡", "critical": "🔴"}.get(m["priority"], "⚪")
                print(f"  {icon} [{m['id']}] from {m['sender']}: {m['task']}")

    elif args.command == "ack":
        if bus.acknowledge_message(args.id, args.result):
            print(f"✅ Acknowledged: {args.id}")
        else:
            print(f"❌ Message not found: {args.id}")

    elif args.command == "fail":
        if bus.fail_message(args.id, args.error):
            print(f"❌ Failed: {args.id}")
        else:
            print(f"❌ Message not found: {args.id}")

    elif args.command == "escalate":
        esc = bus.escalate_message(args.id, args.reason)
        if esc:
            print(f"⚠️  Escalated → orchestrator [{esc['id']}]")
        else:
            print(f"❌ Message not found: {args.id}")

    elif args.command == "list":
        msgs = bus.fetch_all_pending()
        if not msgs:
            print("📭 No pending messages")
        else:
            print(f"📬 {len(msgs)} pending messages:")
            for m in msgs:
                icon = {"low": "⚪", "normal": "🔵", "high": "🟡", "critical": "🔴"}.get(m["priority"], "⚪")
                print(f"  {icon} [{m['id']}] {m['sender']} → {m['receiver']}: {m['task']}")

    elif args.command == "stats":
        s = bus.stats()
        print(f"📊 Queue: {s['total_in_queue']} | Archive: {s['total_archived']}")
        if s["by_status"]:
            print(f"   Status: {json.dumps(s['by_status'])}")
        if s["pending_by_agent"]:
            print(f"   Pending: {json.dumps(s['pending_by_agent'])}")

    elif args.command == "archive":
        n = bus.archive_completed()
        print(f"🗂️  Archived {n} messages")

    else:
        parser.print_help()


if __name__ == "__main__":
    main()
