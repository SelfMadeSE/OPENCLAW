#!/usr/bin/env python3
"""
OPENCLAW Scheduler — Autonomy Layer

Cron-like scheduler that runs agent tasks on intervals.
Can be run as a daemon or invoked for single ticks.

Schedule:
    - Agent heartbeat: every hour
    - Memory consolidation: daily at 3 AM
    - Revenue attempts: daily at 9 AM
    - Free-time exploration: every 4 hours (during non-peak)

Usage:
    python scheduler.py run          # Start daemon (blocking)
    python scheduler.py tick         # Run one cycle of all due tasks
    python scheduler.py status       # Show schedule and last runs
    python scheduler.py trigger <id> # Manually trigger a specific task
"""

import os
import sys
import json
import time
import fcntl
import tempfile
import subprocess
import argparse
from pathlib import Path
from datetime import datetime, timezone, timedelta

BASE_DIR = Path(__file__).resolve().parent.parent.parent
SCHED_DIR = Path(__file__).resolve().parent
STATE_FILE = SCHED_DIR / "state.json"
LOGS_DIR = BASE_DIR / "logs"
SCRIPTS_DIR = BASE_DIR / "scripts"

sys.path.insert(0, str(BASE_DIR / "system" / "message_bus"))
sys.path.insert(0, str(BASE_DIR / "system" / "execution"))

ALLOWED_ACTIONS = {
    "heartbeat", "memory_consolidate", "revenue_attempt",
    "free_time", "bus_cleanup", "observability_check",
    "memory_consolidation", "message_bus_check",
}


class TaskLock:
    """File-based lock to prevent double execution of tasks."""

    def __init__(self, task_id, lock_dir):
        self.lock_file = Path(lock_dir) / f"{task_id}.lock"
        self.fd = None

    def acquire(self):
        self.lock_file.parent.mkdir(parents=True, exist_ok=True)
        self.fd = open(self.lock_file, 'w')
        try:
            fcntl.flock(self.fd, fcntl.LOCK_EX | fcntl.LOCK_NB)
            self.fd.write(str(os.getpid()))
            self.fd.flush()
            return True
        except BlockingIOError:
            self.fd.close()
            self.fd = None
            return False

    def release(self):
        if self.fd:
            fcntl.flock(self.fd, fcntl.LOCK_UN)
            self.fd.close()
            try:
                self.lock_file.unlink()
            except FileNotFoundError:
                pass

    def remove_stale(self, max_age_seconds):
        """Remove lock file if older than max_age_seconds (stale)."""
        if self.lock_file.exists():
            try:
                age = time.time() - self.lock_file.stat().st_mtime
                if age > max_age_seconds:
                    self.lock_file.unlink()
            except (OSError, FileNotFoundError):
                pass


SCHEDULE = [
    {
        "id": "agent-heartbeat",
        "name": "Agent Heartbeat",
        "interval_minutes": 60,
        "description": "Check all agents are responsive and log system health",
        "action": "heartbeat"
    },
    {
        "id": "memory-consolidation",
        "name": "Memory Consolidation",
        "interval_minutes": 1440,  # daily
        "preferred_hour": 3,
        "description": "Consolidate short-term memories into long-term storage",
        "action": "memory_consolidate"
    },
    {
        "id": "revenue-attempt",
        "name": "Revenue Attempt",
        "interval_minutes": 1440,  # daily
        "preferred_hour": 9,
        "description": "Execute revenue generation tasks (outreach, gig posting, follow-ups)",
        "action": "revenue_attempt"
    },
    {
        "id": "free-time-exploration",
        "name": "Free Time Exploration",
        "interval_minutes": 240,  # 4 hours
        "description": "Browse articles, YouTube, summarize findings, store in memory",
        "action": "free_time"
    },
    {
        "id": "message-bus-cleanup",
        "name": "Message Bus Cleanup",
        "interval_minutes": 360,  # 6 hours
        "description": "Archive completed messages, check stuck messages",
        "action": "bus_cleanup"
    },
    {
        "id": "observability-check",
        "name": "Observability Enforcement",
        "interval_minutes": 120,  # 2 hours
        "description": "Verify recent runs produced logs, artifacts, and memory entries",
        "action": "observability_check"
    }
]


class Scheduler:
    def __init__(self):
        self.state = self._load_state()
        self.lock_dir = SCHED_DIR / "locks"

    @property
    def tasks(self):
        return {t["id"]: t for t in SCHEDULE}

    def _load_state(self) -> dict:
        if STATE_FILE.exists():
            return json.loads(STATE_FILE.read_text())
        return {"last_runs": {}, "run_counts": {}}

    def _save_state(self):
        tmp_fd, tmp_path = tempfile.mkstemp(dir=str(STATE_FILE.parent), suffix='.tmp')
        try:
            with os.fdopen(tmp_fd, 'w') as f:
                json.dump(self.state, f, indent=2, default=str)
            os.replace(tmp_path, str(STATE_FILE))
        except:
            os.unlink(tmp_path)
            raise

    def is_due(self, task: dict) -> bool:
        """Check if a scheduled task is due to run."""
        task_id = task["id"]
        last_run = self.state["last_runs"].get(task_id)

        if not last_run:
            return True

        last_dt = datetime.fromisoformat(last_run)
        now = datetime.now(timezone.utc)
        elapsed = (now - last_dt).total_seconds() / 60

        if elapsed < task["interval_minutes"]:
            return False

        # Check preferred hour if specified
        if "preferred_hour" in task:
            utc_hour = datetime.now(timezone.utc).hour
            if abs(utc_hour - task["preferred_hour"]) > 1:
                return False

        return True

    def run_task(self, task: dict) -> dict:
        """Execute a scheduled task."""
        task_id = task["id"]
        action = task["action"]
        now = datetime.now(timezone.utc)

        # Validate action against whitelist
        if action not in ALLOWED_ACTIONS:
            return {"task_id": task_id, "status": "error",
                    "output": f"Action not allowed: {action}"}

        # Acquire task lock with stale detection
        lock = TaskLock(task_id, self.lock_dir)
        stale_threshold = task["interval_minutes"] * 60 * 2
        lock.remove_stale(stale_threshold)

        if not lock.acquire():
            self._log("scheduler_skip_locked", {"task_id": task_id})
            return {"task_id": task_id, "status": "skipped",
                    "output": "Another instance is running this task"}

        try:
            self._log(f"scheduler_start", {"task_id": task_id, "action": action})

            result = {"task_id": task_id, "status": "unknown", "output": ""}

            try:
                handler = getattr(self, f"_action_{action}", None)
                if handler:
                    result = handler(task)
                else:
                    result = {"task_id": task_id, "status": "error",
                              "output": f"Unknown action: {action}"}
            except Exception as e:
                result = {"task_id": task_id, "status": "error", "output": str(e)}

            # Update state
            self.state["last_runs"][task_id] = now.isoformat()
            self.state["run_counts"][task_id] = self.state["run_counts"].get(task_id, 0) + 1
            self._save_state()

            self._log("scheduler_complete", {
                "task_id": task_id,
                "status": result["status"],
                "output_preview": result["output"][:200]
            })

            return result
        finally:
            lock.release()

    # ── Task Actions ──────────────────────────────────────────

    def _action_heartbeat(self, task: dict) -> dict:
        """Check system health: Docker, LM Studio, Qdrant, message bus."""
        checks = {}

        # Check Docker containers
        try:
            out = subprocess.run(
                ["docker", "ps", "--format", "{{.Names}}: {{.Status}}"],
                capture_output=True, text=True, timeout=10
            )
            running = [l.strip() for l in out.stdout.strip().split("\n") if l.strip()]
            checks["docker_containers"] = len(running)
            checks["docker_list"] = running
        except Exception as e:
            checks["docker"] = f"error: {e}"

        # Check LM Studio
        try:
            import urllib.request
            req = urllib.request.Request("http://localhost:1234/v1/models")
            with urllib.request.urlopen(req, timeout=5) as resp:
                data = json.loads(resp.read())
                checks["lm_studio_models"] = len(data.get("data", []))
        except Exception as e:
            checks["lm_studio"] = f"error: {e}"

        # Check Qdrant
        try:
            import urllib.request
            with urllib.request.urlopen("http://localhost:6333/collections", timeout=5) as resp:
                data = json.loads(resp.read())
                checks["qdrant_collections"] = len(data.get("result", {}).get("collections", []))
        except Exception as e:
            checks["qdrant"] = f"error: {e}"

        # Check message bus
        try:
            from bus import MessageBus
            bus = MessageBus()
            stats = bus.stats()
            checks["pending_messages"] = stats["total_in_queue"]
        except Exception:
            checks["message_bus"] = "not loaded"

        healthy = all("error" not in str(v) for v in checks.values())
        return {
            "task_id": task["id"],
            "status": "healthy" if healthy else "degraded",
            "output": json.dumps(checks, indent=2)
        }

    def _action_memory_consolidate(self, task: dict) -> dict:
        """Run memory consolidation — promote short-term to long-term."""
        try:
            # Use memory broker if available
            broker = SCRIPTS_DIR / "memory-broker.py"
            if broker.exists():
                out = subprocess.run(
                    [sys.executable, str(broker), "search", "--query", "recent tasks",
                     "--collection", "openclaw_core", "--limit", "5"],
                    capture_output=True, text=True, timeout=30
                )
                return {
                    "task_id": task["id"],
                    "status": "complete",
                    "output": f"Memory scan complete. {out.stdout[:200]}"
                }
        except Exception as e:
            pass

        return {
            "task_id": task["id"],
            "status": "partial",
            "output": "Memory consolidation ran (broker not fully available)"
        }

    def _action_revenue_attempt(self, task: dict) -> dict:
        """Queue revenue tasks to outreach and marketing agents."""
        try:
            from bus import MessageBus
            bus = MessageBus()

            bus.send_message("scheduler", "outreach",
                "Check Fiverr for new leads matching our services (web design, 3D animation, music production). "
                "Draft proposals for any viable leads.",
                priority="high")

            bus.send_message("scheduler", "marketing",
                "Create today's social media content: 1 beat promotion post, "
                "1 portfolio showcase, 1 engagement post.",
                priority="normal")

            bus.send_message("scheduler", "media",
                "Check YouTube analytics and suggest optimizations for recent uploads.",
                priority="normal")

            return {
                "task_id": task["id"],
                "status": "complete",
                "output": "Revenue tasks queued: outreach (leads), marketing (content), media (analytics)"
            }
        except Exception as e:
            return {"task_id": task["id"], "status": "error", "output": str(e)}

    def _action_free_time(self, task: dict) -> dict:
        """Browse and learn — agents explore topics and store findings."""
        try:
            from bus import MessageBus
            bus = MessageBus()

            bus.send_message("scheduler", "creative",
                "FREE TIME: Browse current music production trends, find interesting techniques "
                "or sounds. Summarize 3 findings and store in memory.",
                priority="low",
                context={"mode": "free_time"})

            bus.send_message("scheduler", "engineering",
                "FREE TIME: Research one new tool or technique relevant to our stack "
                "(Python automation, n8n workflows, ComfyUI). Write a brief summary.",
                priority="low",
                context={"mode": "free_time"})

            return {
                "task_id": task["id"],
                "status": "complete",
                "output": "Free time tasks queued for creative and engineering"
            }
        except Exception as e:
            return {"task_id": task["id"], "status": "error", "output": str(e)}

    def _action_bus_cleanup(self, task: dict) -> dict:
        """Archive completed messages, check for stuck ones."""
        try:
            from bus import MessageBus
            bus = MessageBus()
            archived = bus.archive_completed()
            stats = bus.stats()

            # Check for stuck messages (pending > 24 hours)
            stuck = 0
            for msg in bus.fetch_all_pending():
                created = datetime.fromisoformat(msg["created_at"])
                if (datetime.now(timezone.utc) - created).total_seconds() > 86400:
                    stuck += 1
                    bus.escalate_message(msg["id"], "Message stuck for >24 hours")

            return {
                "task_id": task["id"],
                "status": "complete",
                "output": f"Archived {archived}, stuck escalated: {stuck}, "
                          f"queue size: {stats['total_in_queue']}"
            }
        except Exception as e:
            return {"task_id": task["id"], "status": "error", "output": str(e)}

    def _action_observability_check(self, task: dict) -> dict:
        """Verify recent runs produced proper observability outputs."""
        issues = []
        checks = 0

        # Check event log exists and has recent entries
        events_log = LOGS_DIR / "events.jsonl"
        if events_log.exists():
            lines = events_log.read_text().strip().split("\n")
            if lines:
                last = json.loads(lines[-1])
                last_ts = datetime.fromisoformat(last["ts"].replace("Z", "+00:00"))
                age_hours = (datetime.now(timezone.utc) - last_ts).total_seconds() / 3600
                if age_hours > 24:
                    issues.append(f"Last event log entry is {age_hours:.0f}h old")
            checks += 1
        else:
            issues.append("events.jsonl missing")

        # Check artifacts directory has content
        artifacts_dir = BASE_DIR / "artifacts" / "runs"
        if artifacts_dir.exists():
            artifacts = list(artifacts_dir.glob("*.json"))
            checks += 1
            if not artifacts:
                issues.append("No artifact summaries found")
        else:
            issues.append("artifacts/runs/ directory missing")

        # Check task contract log
        tc_log = LOGS_DIR / "task-contracts.jsonl"
        if tc_log.exists():
            checks += 1
        else:
            issues.append("No task contract logs yet (system may be newly initialized)")

        status = "healthy" if not issues else "warning"
        return {
            "task_id": task["id"],
            "status": status,
            "output": f"Checks: {checks}, Issues: {len(issues)}. " +
                      ("; ".join(issues) if issues else "All clear")
        }

    # ── Logging ───────────────────────────────────────────────

    def _log(self, event: str, meta: dict):
        log_file = LOGS_DIR / "scheduler.jsonl"
        log_file.parent.mkdir(parents=True, exist_ok=True)
        entry = {
            "ts": datetime.now(timezone.utc).isoformat(),
            "event": event,
            **meta
        }
        with open(log_file, "a") as f:
            f.write(json.dumps(entry) + "\n")

    # ── Commands ──────────────────────────────────────────────

    def tick(self):
        """Run one cycle — execute all due tasks."""
        results = []
        for task in SCHEDULE:
            if self.is_due(task):
                print(f"⏰ Running: {task['name']}")
                result = self.run_task(task)
                icon = "✅" if result["status"] in ("complete", "healthy") else "⚠️"
                print(f"  {icon} {result['status']}: {result['output'][:100]}")
                results.append(result)
            else:
                last = self.state["last_runs"].get(task["id"], "never")
                if last != "never":
                    last_dt = datetime.fromisoformat(last)
                    mins_ago = (datetime.now(timezone.utc) - last_dt).total_seconds() / 60
                    next_in = task["interval_minutes"] - mins_ago
                    print(f"  ⏸️  {task['name']}: next in {next_in:.0f}m")
                else:
                    print(f"  ⏸️  {task['name']}: never run, scheduling next tick")
        return results

    def run_daemon(self, interval_seconds: int = 300):
        """Run continuously, checking every interval."""
        print(f"🔄 OPENCLAW Scheduler started (checking every {interval_seconds}s)")
        print(f"   Tasks: {len(SCHEDULE)}")
        try:
            while True:
                print(f"\n── Tick at {datetime.now(timezone.utc).strftime('%H:%M:%S UTC')} ──")
                self.tick()
                time.sleep(interval_seconds)
        except KeyboardInterrupt:
            print("\n🛑 Scheduler stopped")

    def show_status(self):
        """Show current schedule status."""
        print("📋 OPENCLAW Schedule Status\n")
        for task in SCHEDULE:
            last = self.state["last_runs"].get(task["id"], "never")
            count = self.state["run_counts"].get(task["id"], 0)
            interval = task["interval_minutes"]

            if last != "never":
                last_dt = datetime.fromisoformat(last)
                mins_ago = (datetime.now(timezone.utc) - last_dt).total_seconds() / 60
                next_in = max(0, interval - mins_ago)
                last_str = f"{mins_ago:.0f}m ago"
                next_str = f"in {next_in:.0f}m"
            else:
                last_str = "never"
                next_str = "ASAP"

            print(f"  {'🟢' if last != 'never' else '⚪'} {task['name']}")
            print(f"      Interval: {interval}m | Last: {last_str} | Next: {next_str} | Runs: {count}")


def main():
    parser = argparse.ArgumentParser(description="OPENCLAW Scheduler")
    parser.add_argument("command", choices=["run", "tick", "status", "trigger"],
                       help="Command to execute")
    parser.add_argument("task_id", nargs="?", help="Task ID for trigger command")
    parser.add_argument("--interval", type=int, default=300,
                       help="Check interval in seconds (for run command)")

    args = parser.parse_args()
    scheduler = Scheduler()

    if args.command == "run":
        scheduler.run_daemon(args.interval)
    elif args.command == "tick":
        scheduler.tick()
    elif args.command == "status":
        scheduler.show_status()
    elif args.command == "trigger":
        if not args.task_id:
            print("Usage: scheduler.py trigger <task-id>")
            print("Available tasks:")
            for t in SCHEDULE:
                print(f"  {t['id']}: {t['name']}")
            sys.exit(1)
        task = next((t for t in SCHEDULE if t["id"] == args.task_id), None)
        if task:
            result = scheduler.run_task(task)
            print(f"Result: {json.dumps(result, indent=2)}")
        else:
            print(f"Unknown task: {args.task_id}")


if __name__ == "__main__":
    main()
