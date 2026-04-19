#!/usr/bin/env python3
"""OPENCLAW Watchdog — Monitors all services, auto-restarts crashed ones."""
import os
import sys
import json
import time
import signal
import subprocess
import urllib.request
from pathlib import Path
from datetime import datetime, timezone

BASE = Path(__file__).resolve().parent.parent
LOGS_DIR = BASE / "logs"
RUN_DIR = BASE / "run"
LOGS_DIR.mkdir(exist_ok=True)
RUN_DIR.mkdir(exist_ok=True)

CHECK_INTERVAL = 60  # seconds
running = True


def _log(event: str, data: dict):
    entry = {"ts": datetime.now(timezone.utc).isoformat(), "event": event, **data}
    with open(LOGS_DIR / "watchdog.jsonl", "a") as f:
        f.write(json.dumps(entry) + "\n")


def _http_check(url: str, timeout: int = 5) -> bool:
    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return resp.status == 200
    except Exception:
        return False


def _pid_alive(pid_file: Path) -> bool:
    if not pid_file.exists():
        return False
    try:
        pid = int(pid_file.read_text().strip())
        os.kill(pid, 0)
        return True
    except (ValueError, ProcessLookupError, PermissionError):
        return False


def check_docker() -> dict:
    """Check Docker containers are running."""
    try:
        result = subprocess.run(
            ["docker", "ps", "--filter", "name=openclaw", "--format", "{{.Names}}: {{.Status}}"],
            capture_output=True, text=True, timeout=10
        )
        lines = [l for l in result.stdout.strip().split("\n") if l]
        expected = {"openclaw-webui", "openclaw-n8n", "openclaw-postgres", "openclaw-qdrant", "openclaw-searxng"}
        running_names = {l.split(":")[0].strip() for l in lines}
        missing = expected - running_names
        return {"healthy": len(missing) == 0, "running": len(running_names), "missing": list(missing)}
    except Exception as e:
        return {"healthy": False, "error": str(e)}


def check_api_server() -> dict:
    alive = _http_check("http://localhost:18800/")
    pid_alive = _pid_alive(RUN_DIR / "api.pid")
    return {"healthy": alive, "pid_alive": pid_alive}


def check_scheduler() -> dict:
    pid_alive = _pid_alive(RUN_DIR / "scheduler.pid")
    state_file = BASE / "system" / "scheduler" / "state.json"
    stale = True
    if state_file.exists():
        try:
            mtime = state_file.stat().st_mtime
            stale = (time.time() - mtime) > 7200  # 2 hours
        except Exception:
            pass
    return {"healthy": pid_alive and not stale, "pid_alive": pid_alive, "state_stale": stale}


def check_lm_studio() -> dict:
    alive = _http_check("http://localhost:1234/v1/models")
    return {"healthy": alive}


def check_qdrant() -> dict:
    alive = _http_check("http://localhost:6333/collections")
    return {"healthy": alive}


def restart_docker():
    """Restart Docker containers."""
    compose_file = BASE / "docker" / "docker-compose.yml"
    if compose_file.exists():
        _log("restart", {"service": "docker", "action": "docker compose up -d"})
        subprocess.run(
            ["docker", "compose", "-f", str(compose_file), "up", "-d"],
            capture_output=True, timeout=120
        )


def restart_api_server():
    """Restart API server."""
    pid_file = RUN_DIR / "api.pid"
    if pid_file.exists():
        try:
            pid = int(pid_file.read_text().strip())
            os.kill(pid, signal.SIGTERM)
            time.sleep(2)
        except Exception:
            pass
        pid_file.unlink(missing_ok=True)

    _log("restart", {"service": "api_server"})
    proc = subprocess.Popen(
        [sys.executable, "-m", "uvicorn", "api.server:app", "--host", "0.0.0.0", "--port", "18800"],
        cwd=str(BASE), stdout=open(LOGS_DIR / "api-stdout.log", "a"),
        stderr=open(LOGS_DIR / "api-stderr.log", "a"), start_new_session=True
    )
    pid_file.write_text(str(proc.pid))


def restart_scheduler():
    """Restart scheduler."""
    pid_file = RUN_DIR / "scheduler.pid"
    if pid_file.exists():
        try:
            pid = int(pid_file.read_text().strip())
            os.kill(pid, signal.SIGTERM)
            time.sleep(2)
        except Exception:
            pass
        pid_file.unlink(missing_ok=True)

    _log("restart", {"service": "scheduler"})
    proc = subprocess.Popen(
        [sys.executable, str(BASE / "system" / "scheduler" / "scheduler.py"), "run"],
        cwd=str(BASE), stdout=open(LOGS_DIR / "scheduler-stdout.log", "a"),
        stderr=open(LOGS_DIR / "scheduler-stderr.log", "a"), start_new_session=True
    )
    pid_file.write_text(str(proc.pid))


def run_check():
    """Run one health check cycle."""
    results = {
        "docker": check_docker(),
        "api_server": check_api_server(),
        "scheduler": check_scheduler(),
        "lm_studio": check_lm_studio(),
        "qdrant": check_qdrant(),
    }

    all_healthy = all(r.get("healthy", False) for r in results.values())
    _log("health_check", {"all_healthy": all_healthy, "results": results})

    # Auto-restart logic
    if not results["docker"]["healthy"]:
        missing = results["docker"].get("missing", [])
        if missing:
            _log("alert", {"service": "docker", "missing": missing})
            restart_docker()

    if not results["api_server"]["healthy"]:
        _log("alert", {"service": "api_server"})
        restart_api_server()

    if not results["scheduler"]["healthy"]:
        _log("alert", {"service": "scheduler"})
        restart_scheduler()

    return results


def signal_handler(signum, frame):
    global running
    running = False
    _log("shutdown", {"signal": signum})


def main():
    global running
    signal.signal(signal.SIGTERM, signal_handler)
    signal.signal(signal.SIGINT, signal_handler)

    pid_file = RUN_DIR / "watchdog.pid"
    pid_file.write_text(str(os.getpid()))
    _log("start", {"pid": os.getpid(), "interval": CHECK_INTERVAL})

    print(f"🐕 OPENCLAW Watchdog started (PID {os.getpid()}, interval {CHECK_INTERVAL}s)")

    while running:
        try:
            results = run_check()
            healthy = sum(1 for r in results.values() if r.get("healthy"))
            total = len(results)
            if healthy < total:
                print(f"⚠️  {healthy}/{total} services healthy")
            else:
                print(f"✅ {healthy}/{total} services healthy")
        except Exception as e:
            _log("error", {"error": str(e)})
            print(f"❌ Check error: {e}")

        for _ in range(CHECK_INTERVAL):
            if not running:
                break
            time.sleep(1)

    pid_file.unlink(missing_ok=True)
    _log("stopped", {})
    print("🐕 Watchdog stopped")


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "check":
        results = run_check()
        for name, data in results.items():
            status = "✅" if data.get("healthy") else "❌"
            print(f"  {status} {name}: {json.dumps(data)}")
    else:
        main()
