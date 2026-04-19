#!/usr/bin/env python3
"""
OPENCLAW System Orchestrator — The Glue

Master script that connects all subsystems and provides a unified interface
for running missions, managing agents, and operating the system.

Usage:
    python orchestrator.py mission <name>     # Execute a mission
    python orchestrator.py health             # Full system health check
    python orchestrator.py validate           # Run system validation
    python orchestrator.py demo               # Run demo mission proving system works
"""

import os
import sys
import json
import argparse
import tempfile
from pathlib import Path
from datetime import datetime, timezone

BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR / "system" / "execution"))
sys.path.insert(0, str(BASE_DIR / "system" / "message_bus"))
sys.path.insert(0, str(BASE_DIR / "system" / "scheduler"))
sys.path.insert(0, str(BASE_DIR / "system" / "approval"))
sys.path.insert(0, str(BASE_DIR / "system" / "memory"))

from task_contract import TaskContract, validate_artifact
from bus import MessageBus
from approval import ApprovalSystem
from memory_bridge import MemoryBridge

LOGS_DIR = BASE_DIR / "logs"


def system_health():
    """Full system health check."""
    print("🏥 OPENCLAW System Health Check\n")
    results = {}

    # 1. Check Docker
    print("  Docker...")
    try:
        import subprocess
        out = subprocess.run(
            ["docker", "ps", "--format", "{{.Names}}"],
            capture_output=True, text=True, timeout=10
        )
        containers = [c.strip() for c in out.stdout.strip().split("\n") if c.strip()]
        expected = ["openclaw-webui", "openclaw-n8n", "openclaw-qdrant",
                     "openclaw-postgres", "openclaw-searxng", "openclaw-pipelines"]
        running = [c for c in expected if c in containers]
        results["docker"] = {
            "healthy": len(running) >= 4,
            "details": {"running": len(running), "expected": len(expected)}
        }
        status = "✅" if results["docker"]["healthy"] else "⚠️"
        print(f"    {status} {len(running)}/{len(expected)} containers running")
    except Exception as e:
        results["docker"] = {"healthy": False, "details": str(e)}
        print(f"    ❌ Docker not accessible: {e}")

    # 2. Check Message Bus
    print("  Message Bus...")
    try:
        bus = MessageBus()
        stats = bus.stats()
        results["message_bus"] = {
            "healthy": True,
            "details": {"total_in_queue": stats['total_in_queue'], "total_archived": stats['total_archived']}
        }
        print(f"    ✅ Queue: {stats['total_in_queue']} | Archive: {stats['total_archived']}")
    except Exception as e:
        results["message_bus"] = {"healthy": False, "details": str(e)}
        print(f"    ❌ {e}")

    # 3. Check Approval System
    print("  Approval System...")
    try:
        approval = ApprovalSystem()
        pending = approval.list_pending()
        results["approval"] = {"healthy": True, "details": {"pending": len(pending)}}
        print(f"    ✅ Pending approvals: {len(pending)}")
    except Exception as e:
        results["approval"] = {"healthy": False, "details": str(e)}
        print(f"    ❌ {e}")

    # 4. Check Memory
    print("  Memory System...")
    try:
        memory = MemoryBridge()
        mem_status = memory.status()
        fs_total = sum(v for v in mem_status["filesystem"].values() if isinstance(v, int))
        qdrant_info = mem_status["qdrant"]
        results["memory"] = {
            "healthy": True,
            "details": {"filesystem_entries": fs_total, "qdrant_collections": len(qdrant_info)}
        }
        print(f"    ✅ Filesystem: {fs_total} entries | Qdrant: {len(qdrant_info)} collections")
    except Exception as e:
        results["memory"] = {"healthy": False, "details": str(e)}
        print(f"    ❌ {e}")

    # 5. Check Logs
    print("  Logs...")
    try:
        log_files = list(LOGS_DIR.glob("*.jsonl")) if LOGS_DIR.exists() else []
        total_lines = 0
        for lf in log_files:
            with open(lf) as fh:
                total_lines += sum(1 for _ in fh)
        results["logs"] = {
            "healthy": len(log_files) > 0,
            "details": {"files": len(log_files), "total_lines": total_lines}
        }
        status = "✅" if results["logs"]["healthy"] else "⚠️"
        print(f"    {status} {len(log_files)} log files, {total_lines} total entries")
    except Exception as e:
        results["logs"] = {"healthy": False, "details": str(e)}
        print(f"    ❌ {e}")

    # 6. Check Artifacts
    print("  Artifacts...")
    try:
        artifacts_dir = BASE_DIR / "artifacts" / "runs"
        artifacts = list(artifacts_dir.glob("*.json")) if artifacts_dir.exists() else []
        results["artifacts"] = {
            "healthy": True,
            "details": {"count": len(artifacts)}
        }
        print(f"    ✅ {len(artifacts)} run summaries")
    except Exception as e:
        results["artifacts"] = {"healthy": False, "details": str(e)}
        print(f"    ❌ {e}")

    # Summary
    all_healthy = all(r.get("healthy", False) for r in results.values())
    print(f"\n{'✅ SYSTEM HEALTHY' if all_healthy else '⚠️  SYSTEM DEGRADED'}")
    return results


def run_validation():
    """Full system validation — inaugural mission replay."""
    print("🔥 OPENCLAW System Validation\n")
    print("Running validation mission to prove all subsystems work...\n")

    results = {}

    # Test 1: Task Contract + Artifact Validation
    print("1️⃣  Task Contract & Artifact Validation...")
    try:
        with TaskContract("orchestrator", "validation-001", "system-check") as task:
            task.write("health.json", json.dumps({
                "system": "openclaw",
                "status": "validating",
                "ts": datetime.now(timezone.utc).isoformat()
            }))
            task.write("readme.txt",
                "OPENCLAW Validation Artifact\n"
                "This file proves the task contract system works.\n"
                f"Generated: {datetime.now(timezone.utc).isoformat()}\n")
        results["task_contract"] = "✅ PASS"
        print(f"   ✅ 2 artifacts created and validated")

        # Verify with standalone validator
        for a in task.artifacts:
            v = validate_artifact(a["path"])
            assert v["valid"], f"Validation failed for {a['path']}"
        results["artifact_validator"] = "✅ PASS"
        print(f"   ✅ Standalone validator confirmed")
    except Exception as e:
        results["task_contract"] = f"❌ FAIL: {e}"
        results["artifact_validator"] = f"❌ FAIL: {e}"
        print(f"   ❌ {e}")

    # Test 2: Message Bus (using temp dir to avoid polluting production queue)
    print("2️⃣  Message Bus...")
    try:
        import bus as bus_module
        _orig_queue = bus_module.QUEUE_FILE
        _orig_archive = bus_module.ARCHIVE_FILE
        tmp_bus_dir = Path(tempfile.mkdtemp(dir=str(BASE_DIR)))
        try:
            bus_module.QUEUE_FILE = tmp_bus_dir / "queue.json"
            bus_module.ARCHIVE_FILE = tmp_bus_dir / "archive.json"

            bus = MessageBus()
            msg = bus.send_message("orchestrator", "engineering",
                "Validation test message", priority="normal")
            assert msg["id"]
            assert msg["status"] == "pending"

            fetched = bus.fetch_messages("engineering")
            assert any(m["id"] == msg["id"] for m in fetched)

            bus.acknowledge_message(msg["id"], result="test complete")
            results["message_bus"] = "✅ PASS"
            print(f"   ✅ Send→Fetch→Ack cycle working")
        finally:
            bus_module.QUEUE_FILE = _orig_queue
            bus_module.ARCHIVE_FILE = _orig_archive
            import shutil
            shutil.rmtree(tmp_bus_dir, ignore_errors=True)
    except Exception as e:
        results["message_bus"] = f"❌ FAIL: {e}"
        print(f"   ❌ {e}")

    # Test 3: Approval System
    print("3️⃣  Approval System...")
    try:
        approval = ApprovalSystem()

        # Green tier should auto-approve
        req = approval.request_approval("engineering", "search_web")
        assert req["status"] == "approved"
        assert req["decided_by"] == "auto"

        # Yellow tier should require review
        req2 = approval.request_approval("outreach", "draft_email", details="validation test")
        assert req2["status"] == "pending"

        # Approve it
        approval.approve(req2["id"], "orchestrator", "validation test")
        checked = approval.check(req2["id"])
        assert checked["status"] == "approved"

        results["approval"] = "✅ PASS"
        print(f"   ✅ Green auto-approve + Yellow manual approve working")
    except Exception as e:
        results["approval"] = f"❌ FAIL: {e}"
        print(f"   ❌ {e}")

    # Test 4: Memory Bridge
    print("4️⃣  Memory Bridge...")
    try:
        memory = MemoryBridge()
        entry = memory.write(
            "Validation test: system is operational",
            "short-term", "orchestrator", tags=["validation"]
        )
        assert entry.get("stored_at")

        found = memory.read("validation", "short-term", "orchestrator")
        assert len(found) > 0
        results["memory"] = "✅ PASS"
        print(f"   ✅ Write→Read cycle working (filesystem)")
    except Exception as e:
        results["memory"] = f"❌ FAIL: {e}"
        print(f"   ❌ {e}")

    # Test 5: Agent Delegation (via message bus, using temp dir)
    print("5️⃣  Agent Delegation...")
    try:
        import bus as bus_module
        _orig_queue = bus_module.QUEUE_FILE
        _orig_archive = bus_module.ARCHIVE_FILE
        tmp_bus_dir = Path(tempfile.mkdtemp(dir=str(BASE_DIR)))
        try:
            bus_module.QUEUE_FILE = tmp_bus_dir / "queue.json"
            bus_module.ARCHIVE_FILE = tmp_bus_dir / "archive.json"

            bus = MessageBus()
            bus.send_message("orchestrator", "creative",
                "Create album concept for SPECTOR project", priority="high")
            bus.send_message("orchestrator", "outreach",
                "Draft 3 Fiverr gig descriptions", priority="high")
            bus.send_message("orchestrator", "media",
                "Generate YouTube metadata for latest beat", priority="normal")

            creative_msgs = bus.fetch_messages("creative")
            outreach_msgs = bus.fetch_messages("outreach")
            media_msgs = bus.fetch_messages("media")
            assert len(creative_msgs) > 0
            assert len(outreach_msgs) > 0
            assert len(media_msgs) > 0

            results["delegation"] = "✅ PASS"
            print(f"   ✅ Multi-agent delegation working (3 agents received tasks)")
        finally:
            bus_module.QUEUE_FILE = _orig_queue
            bus_module.ARCHIVE_FILE = _orig_archive
            import shutil
            shutil.rmtree(tmp_bus_dir, ignore_errors=True)
    except Exception as e:
        results["delegation"] = f"❌ FAIL: {e}"
        print(f"   ❌ {e}")

    # Test 6: Observability
    print("6️⃣  Observability...")
    try:
        # Check log files exist and have entries
        log_types = [
            "task-contracts.jsonl",
            "message-bus.jsonl",
            "approvals.jsonl",
            "memory-bridge.jsonl"
        ]
        found_logs = 0
        for log_name in log_types:
            log_path = LOGS_DIR / log_name
            if log_path.exists() and log_path.stat().st_size > 0:
                found_logs += 1
        assert found_logs >= 3, f"Only {found_logs}/4 log files active"
        results["observability"] = "✅ PASS"
        print(f"   ✅ {found_logs}/{len(log_types)} log files active")
    except Exception as e:
        results["observability"] = f"❌ FAIL: {e}"
        print(f"   ❌ {e}")

    # Final Summary
    print(f"\n{'='*50}")
    print("VALIDATION RESULTS:")
    print(f"{'='*50}")
    passes = 0
    for k, v in results.items():
        print(f"  {v}  {k}")
        if "PASS" in str(v):
            passes += 1
    total = len(results)
    print(f"\n  {passes}/{total} checks passed")

    if passes == total:
        print("\n🎉 SYSTEM FULLY OPERATIONAL")
    elif passes >= total - 1:
        print("\n⚡ SYSTEM NEARLY OPERATIONAL — minor issues")
    else:
        print("\n⚠️  SYSTEM NEEDS ATTENTION")

    # Save validation artifact
    artifact_dir = BASE_DIR / "artifacts" / "runs"
    artifact_dir.mkdir(parents=True, exist_ok=True)
    validation_file = artifact_dir / f"validation-{datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%S')}.json"
    validation_file.write_text(json.dumps({
        "type": "system_validation",
        "ts": datetime.now(timezone.utc).isoformat(),
        "results": results,
        "passed": passes,
        "total": total,
        "status": "operational" if passes == total else "degraded"
    }, indent=2))
    print(f"\n📄 Validation saved: {validation_file}")

    return results


def main():
    parser = argparse.ArgumentParser(description="OPENCLAW System Orchestrator")
    parser.add_argument("command", choices=["health", "validate", "demo"],
                       help="Command to execute")
    args = parser.parse_args()

    if args.command == "health":
        system_health()
    elif args.command == "validate":
        run_validation()
    elif args.command == "demo":
        run_validation()


if __name__ == "__main__":
    main()
