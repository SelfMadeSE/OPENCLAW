#!/usr/bin/env python3
"""
OPENCLAW CLI — One command to rule them all.

Usage:
    openclaw start          Start all services
    openclaw stop           Stop all services
    openclaw status         Show system status
    openclaw health         Deep health check
    openclaw mission run    Execute a mission
    openclaw logs           Tail log files
    openclaw bus stats      Message bus statistics
    openclaw install        Install as macOS launchd services
    openclaw uninstall      Remove launchd services
"""

import os
import sys
import signal
import socket
import subprocess
import json
import time
from pathlib import Path
from datetime import datetime, timezone
from typing import Optional

import typer
import httpx
from rich.console import Console
from rich.table import Table
from rich.panel import Panel
from rich.text import Text
from rich import box

# ── Paths ────────────────────────────────────────────────────────────────────

BASE_DIR = Path(__file__).resolve().parent.parent
RUN_DIR = BASE_DIR / "run"
LOGS_DIR = BASE_DIR / "logs"
DOCKER_COMPOSE = BASE_DIR / "docker" / "docker-compose.yml"
SCHEDULER_SCRIPT = BASE_DIR / "system" / "scheduler" / "scheduler.py"
ORCHESTRATOR_SCRIPT = BASE_DIR / "system" / "orchestrator.py"
BUS_QUEUE = BASE_DIR / "system" / "message_bus" / "queue.json"
MEMORY_DIR = BASE_DIR / "memory"
SCHEDULER_STATE = BASE_DIR / "system" / "scheduler" / "state.json"

API_PORT = 18800
LM_STUDIO_PORT = 1234
QDRANT_PORT = 6333

LAUNCHD_DIR = Path.home() / "Library" / "LaunchAgents"
PLIST_PREFIX = "com.openclaw"

console = Console()

# ── Typer apps ───────────────────────────────────────────────────────────────

app = typer.Typer(
    name="openclaw",
    help="🦞 OPENCLAW — Autonomous Multi-Agent System CLI",
    no_args_is_help=True,
    rich_markup_mode="rich",
)
bus_app = typer.Typer(help="Message bus commands")
mission_app = typer.Typer(help="Mission commands")
app.add_typer(bus_app, name="bus")
app.add_typer(mission_app, name="mission")

# ── Helpers ──────────────────────────────────────────────────────────────────


def _ensure_run_dir():
    RUN_DIR.mkdir(parents=True, exist_ok=True)


def _write_pid(name: str, pid: int):
    _ensure_run_dir()
    (RUN_DIR / f"{name}.pid").write_text(str(pid))


def _read_pid(name: str) -> Optional[int]:
    pid_file = RUN_DIR / f"{name}.pid"
    if not pid_file.exists():
        return None
    try:
        pid = int(pid_file.read_text().strip())
        os.kill(pid, 0)  # check if alive
        return pid
    except (ValueError, ProcessLookupError, PermissionError):
        pid_file.unlink(missing_ok=True)
        return None


def _kill_pid(name: str) -> bool:
    pid = _read_pid(name)
    if pid is None:
        return False
    try:
        os.kill(pid, signal.SIGTERM)
        # Wait briefly for clean shutdown
        for _ in range(10):
            time.sleep(0.3)
            try:
                os.kill(pid, 0)
            except ProcessLookupError:
                break
        (RUN_DIR / f"{name}.pid").unlink(missing_ok=True)
        return True
    except ProcessLookupError:
        (RUN_DIR / f"{name}.pid").unlink(missing_ok=True)
        return False


def _port_open(port: int, host: str = "127.0.0.1", timeout: float = 1.0) -> bool:
    try:
        with socket.create_connection((host, port), timeout=timeout):
            return True
    except (ConnectionRefusedError, OSError, socket.timeout):
        return False


def _docker_containers() -> list[dict]:
    """Return list of docker containers with openclaw- prefix."""
    try:
        result = subprocess.run(
            [
                "docker", "ps", "-a",
                "--filter", "name=openclaw-",
                "--format", '{{.Names}}\t{{.Status}}\t{{.Ports}}'
            ],
            capture_output=True, text=True, timeout=10,
        )
        containers = []
        for line in result.stdout.strip().splitlines():
            if not line.strip():
                continue
            parts = line.split("\t")
            containers.append({
                "name": parts[0] if len(parts) > 0 else "?",
                "status": parts[1] if len(parts) > 1 else "?",
                "ports": parts[2] if len(parts) > 2 else "",
            })
        return containers
    except (subprocess.TimeoutExpired, FileNotFoundError):
        return []


def _status_icon(ok: bool) -> str:
    return "[green]●[/green]" if ok else "[red]○[/red]"


def _safe_json_load(path: Path) -> any:
    try:
        return json.loads(path.read_text())
    except (FileNotFoundError, json.JSONDecodeError):
        return None


# ── START ────────────────────────────────────────────────────────────────────

@app.command()
def start(
    no_docker: bool = typer.Option(False, "--no-docker", help="Skip Docker stack"),
    no_api: bool = typer.Option(False, "--no-api", help="Skip API server"),
    no_scheduler: bool = typer.Option(False, "--no-scheduler", help="Skip scheduler"),
):
    """Start the OPENCLAW system."""
    console.print(Panel("[bold cyan]🦞 Starting OPENCLAW[/bold cyan]", box=box.ROUNDED))

    # 1. Docker stack
    if not no_docker:
        console.print("\n[bold]Docker stack…[/bold]")
        if not DOCKER_COMPOSE.exists():
            console.print(f"  [yellow]⚠ docker-compose.yml not found at {DOCKER_COMPOSE}[/yellow]")
        else:
            try:
                result = subprocess.run(
                    ["docker", "compose", "-f", str(DOCKER_COMPOSE), "up", "-d"],
                    capture_output=True, text=True, timeout=120,
                )
                if result.returncode == 0:
                    console.print("  [green]✓ Docker stack started[/green]")
                else:
                    console.print(f"  [red]✗ Docker compose failed:[/red]\n{result.stderr[:500]}")
            except FileNotFoundError:
                console.print("  [red]✗ docker not found in PATH[/red]")
            except subprocess.TimeoutExpired:
                console.print("  [yellow]⚠ Docker compose timed out (may still be starting)[/yellow]")

    # 2. API server
    if not no_api:
        console.print("\n[bold]API server…[/bold]")
        existing_pid = _read_pid("api")
        if existing_pid:
            console.print(f"  [yellow]⚠ Already running (PID {existing_pid})[/yellow]")
        else:
            _ensure_run_dir()
            log_file = LOGS_DIR / "api-server.log"
            log_file.parent.mkdir(parents=True, exist_ok=True)
            with open(log_file, "a") as lf:
                proc = subprocess.Popen(
                    [
                        sys.executable, "-m", "uvicorn",
                        "api.server:app",
                        "--host", "0.0.0.0",
                        "--port", str(API_PORT),
                    ],
                    cwd=str(BASE_DIR),
                    stdout=lf,
                    stderr=subprocess.STDOUT,
                    start_new_session=True,
                )
            _write_pid("api", proc.pid)
            console.print(f"  [green]✓ API server started (PID {proc.pid}, port {API_PORT})[/green]")

    # 3. Scheduler
    if not no_scheduler:
        console.print("\n[bold]Scheduler…[/bold]")
        existing_pid = _read_pid("scheduler")
        if existing_pid:
            console.print(f"  [yellow]⚠ Already running (PID {existing_pid})[/yellow]")
        else:
            if not SCHEDULER_SCRIPT.exists():
                console.print(f"  [yellow]⚠ Scheduler not found at {SCHEDULER_SCRIPT}[/yellow]")
            else:
                _ensure_run_dir()
                log_file = LOGS_DIR / "scheduler-daemon.log"
                log_file.parent.mkdir(parents=True, exist_ok=True)
                with open(log_file, "a") as lf:
                    proc = subprocess.Popen(
                        [sys.executable, str(SCHEDULER_SCRIPT), "run"],
                        cwd=str(BASE_DIR),
                        stdout=lf,
                        stderr=subprocess.STDOUT,
                        start_new_session=True,
                    )
                _write_pid("scheduler", proc.pid)
                console.print(f"  [green]✓ Scheduler started (PID {proc.pid})[/green]")

    console.print()
    status()


# ── STOP ─────────────────────────────────────────────────────────────────────

@app.command()
def stop(
    keep_docker: bool = typer.Option(False, "--keep-docker", help="Don't stop Docker stack"),
):
    """Stop the OPENCLAW system."""
    console.print(Panel("[bold red]🛑 Stopping OPENCLAW[/bold red]", box=box.ROUNDED))

    # 1. Scheduler
    if _kill_pid("scheduler"):
        console.print("  [green]✓ Scheduler stopped[/green]")
    else:
        console.print("  [dim]  Scheduler was not running[/dim]")

    # 2. API server
    if _kill_pid("api"):
        console.print("  [green]✓ API server stopped[/green]")
    else:
        console.print("  [dim]  API server was not running[/dim]")

    # 3. Docker
    if not keep_docker:
        if DOCKER_COMPOSE.exists():
            console.print("\n[bold]Stopping Docker stack…[/bold]")
            try:
                result = subprocess.run(
                    ["docker", "compose", "-f", str(DOCKER_COMPOSE), "down"],
                    capture_output=True, text=True, timeout=60,
                )
                if result.returncode == 0:
                    console.print("  [green]✓ Docker stack stopped[/green]")
                else:
                    console.print(f"  [red]✗ {result.stderr[:300]}[/red]")
            except (FileNotFoundError, subprocess.TimeoutExpired):
                console.print("  [yellow]⚠ Could not stop Docker[/yellow]")

    console.print("\n[bold green]System stopped.[/bold green]")


# ── STATUS ───────────────────────────────────────────────────────────────────

@app.command()
def status():
    """Show full system status."""
    console.print(Panel("[bold cyan]🦞 OPENCLAW Status[/bold cyan]", box=box.ROUNDED))

    # ── Docker containers ──
    containers = _docker_containers()
    if containers:
        t = Table(title="Docker Containers", box=box.SIMPLE_HEAVY)
        t.add_column("Container", style="cyan")
        t.add_column("Status")
        t.add_column("Ports", style="dim")
        for c in containers:
            is_up = "Up" in c["status"]
            st = f"[green]{c['status']}[/green]" if is_up else f"[red]{c['status']}[/red]"
            t.add_row(c["name"], st, c["ports"][:60])
        console.print(t)
    else:
        console.print("[dim]No Docker containers found.[/dim]")

    # ── Core services ──
    t = Table(title="Core Services", box=box.SIMPLE_HEAVY)
    t.add_column("Service", style="cyan")
    t.add_column("Status")
    t.add_column("Details", style="dim")

    # API server
    api_pid = _read_pid("api")
    api_port = _port_open(API_PORT)
    if api_pid and api_port:
        t.add_row("API Server", f"{_status_icon(True)} Running", f"PID {api_pid} · port {API_PORT}")
    elif api_pid:
        t.add_row("API Server", f"[yellow]●[/yellow] PID alive", f"PID {api_pid} · port {API_PORT} not responding")
    elif api_port:
        t.add_row("API Server", f"{_status_icon(True)} Running", f"port {API_PORT} (external)")
    else:
        t.add_row("API Server", f"{_status_icon(False)} Stopped", f"port {API_PORT}")

    # Scheduler
    sched_pid = _read_pid("scheduler")
    sched_state = _safe_json_load(SCHEDULER_STATE)
    last_tick = ""
    if sched_state and isinstance(sched_state, dict):
        lt = sched_state.get("last_tick", "")
        if lt:
            last_tick = f"last tick: {lt}"
    if sched_pid:
        t.add_row("Scheduler", f"{_status_icon(True)} Running", f"PID {sched_pid} {last_tick}")
    else:
        t.add_row("Scheduler", f"{_status_icon(False)} Stopped", last_tick or "")

    # LM Studio
    lm_ok = _port_open(LM_STUDIO_PORT)
    t.add_row("LM Studio", f"{_status_icon(lm_ok)} {'Running' if lm_ok else 'Stopped'}", f"port {LM_STUDIO_PORT} (native macOS)")

    # Qdrant
    qdrant_ok = _port_open(QDRANT_PORT)
    t.add_row("Qdrant", f"{_status_icon(qdrant_ok)} {'Healthy' if qdrant_ok else 'Down'}", f"port {QDRANT_PORT}")

    console.print(t)

    # ── Message bus ──
    bus_data = _safe_json_load(BUS_QUEUE)
    if bus_data and isinstance(bus_data, list):
        pending = [m for m in bus_data if m.get("status") == "pending"]
        console.print(f"\n[bold]Message Bus:[/bold] {len(pending)} pending / {len(bus_data)} total")
    else:
        console.print("\n[bold]Message Bus:[/bold] [dim]no queue data[/dim]")

    # ── Memory ──
    _show_memory_counts()

    # ── Recent logs ──
    _show_recent_logs(5)


def _show_memory_counts():
    """Show counts of memory entries."""
    t = Table(title="Memory", box=box.SIMPLE_HEAVY)
    t.add_column("Store", style="cyan")
    t.add_column("Entries", justify="right")

    for mem_type in ["short-term", "long-term", "shared"]:
        mem_dir = MEMORY_DIR / mem_type
        if mem_dir.is_dir():
            count = sum(1 for f in mem_dir.iterdir() if f.suffix == ".json")
            t.add_row(mem_type, str(count))
        else:
            mem_file = MEMORY_DIR / f"{mem_type}.json"
            if mem_file.exists():
                data = _safe_json_load(mem_file)
                count = len(data) if isinstance(data, list) else (1 if data else 0)
                t.add_row(mem_type, str(count))
            else:
                t.add_row(mem_type, "[dim]—[/dim]")

    console.print(t)


def _show_recent_logs(n: int = 5):
    """Show the N most recent log events across all log files."""
    events: list[str] = []
    if LOGS_DIR.is_dir():
        for logfile in sorted(LOGS_DIR.glob("*.jsonl")):
            try:
                lines = logfile.read_text().strip().splitlines()
                for line in lines[-n:]:
                    try:
                        entry = json.loads(line)
                        ts = entry.get("timestamp", entry.get("ts", ""))[:19]
                        msg = entry.get("event", entry.get("message", entry.get("task", str(entry)[:80])))
                        events.append(f"[dim]{ts}[/dim] [{logfile.stem}] {msg}")
                    except json.JSONDecodeError:
                        events.append(f"[{logfile.stem}] {line[:100]}")
            except Exception:
                pass

    events.sort(reverse=True)
    if events:
        console.print(Panel("\n".join(events[:n]), title="Recent Logs", box=box.SIMPLE))
    else:
        console.print("\n[dim]No recent logs.[/dim]")


# ── HEALTH ───────────────────────────────────────────────────────────────────

@app.command()
def health():
    """Deep health check of all OPENCLAW services."""
    console.print(Panel("[bold cyan]🩺 OPENCLAW Health Check[/bold cyan]", box=box.ROUNDED))

    checks: list[tuple[str, bool, str]] = []

    # API health endpoint
    api_ok = False
    api_detail = ""
    if _port_open(API_PORT):
        try:
            resp = httpx.get(f"http://127.0.0.1:{API_PORT}/health", timeout=5.0)
            if resp.status_code == 200:
                api_ok = True
                api_detail = str(resp.json()) if resp.headers.get("content-type", "").startswith("application/json") else resp.text[:200]
            else:
                api_detail = f"HTTP {resp.status_code}"
        except Exception as e:
            api_detail = str(e)[:100]
    else:
        api_detail = "port not responding"
        # Try orchestrator health directly
        if ORCHESTRATOR_SCRIPT.exists():
            try:
                result = subprocess.run(
                    [sys.executable, str(ORCHESTRATOR_SCRIPT), "health"],
                    capture_output=True, text=True, timeout=30, cwd=str(BASE_DIR),
                )
                api_detail = f"orchestrator: {result.stdout[:200]}"
                api_ok = result.returncode == 0
            except Exception as e:
                api_detail = f"orchestrator error: {e}"

    checks.append(("API / Orchestrator", api_ok, api_detail))

    # LM Studio
    lm_ok = False
    lm_detail = ""
    if _port_open(LM_STUDIO_PORT):
        try:
            resp = httpx.get(f"http://127.0.0.1:{LM_STUDIO_PORT}/v1/models", timeout=5.0)
            if resp.status_code == 200:
                lm_ok = True
                models = resp.json().get("data", [])
                lm_detail = f"{len(models)} model(s) loaded"
            else:
                lm_detail = f"HTTP {resp.status_code}"
        except Exception as e:
            lm_detail = str(e)[:100]
    else:
        lm_detail = "not responding on port 1234"
    checks.append(("LM Studio", lm_ok, lm_detail))

    # Qdrant
    qdrant_ok = False
    qdrant_detail = ""
    if _port_open(QDRANT_PORT):
        try:
            resp = httpx.get(f"http://127.0.0.1:{QDRANT_PORT}/collections", timeout=5.0)
            if resp.status_code == 200:
                qdrant_ok = True
                collections = resp.json().get("result", {}).get("collections", [])
                qdrant_detail = f"{len(collections)} collection(s)"
            else:
                qdrant_detail = f"HTTP {resp.status_code}"
        except Exception as e:
            qdrant_detail = str(e)[:100]
    else:
        qdrant_detail = "not responding on port 6333"
    checks.append(("Qdrant", qdrant_ok, qdrant_detail))

    # Docker
    docker_ok = len(_docker_containers()) > 0
    running = [c for c in _docker_containers() if "Up" in c.get("status", "")]
    checks.append(("Docker Stack", docker_ok, f"{len(running)} container(s) running"))

    # Scheduler
    sched_ok = _read_pid("scheduler") is not None
    checks.append(("Scheduler", sched_ok, f"PID {_read_pid('scheduler')}" if sched_ok else "not running"))

    # Message bus
    bus_data = _safe_json_load(BUS_QUEUE)
    bus_ok = bus_data is not None
    pending = len([m for m in bus_data if m.get("status") == "pending"]) if isinstance(bus_data, list) else 0
    checks.append(("Message Bus", bus_ok, f"{pending} pending" if bus_ok else "queue file missing"))

    # Print results
    t = Table(box=box.SIMPLE_HEAVY)
    t.add_column("Component", style="cyan")
    t.add_column("Status")
    t.add_column("Details", style="dim")

    all_ok = True
    for name, ok, detail in checks:
        if not ok:
            all_ok = False
        icon = "[bold green]PASS[/bold green]" if ok else "[bold red]FAIL[/bold red]"
        t.add_row(name, icon, detail[:80])

    console.print(t)

    if all_ok:
        console.print("\n[bold green]✓ All systems healthy[/bold green]")
    else:
        failed = [n for n, ok, _ in checks if not ok]
        console.print(f"\n[bold yellow]⚠ Issues detected: {', '.join(failed)}[/bold yellow]")


# ── MISSION ──────────────────────────────────────────────────────────────────

@mission_app.command("run")
def mission_run(
    name: str = typer.Argument(help="Mission name to execute"),
):
    """Execute a mission by name."""
    console.print(Panel(f"[bold cyan]🚀 Mission: {name}[/bold cyan]", box=box.ROUNDED))

    # Try API first
    if _port_open(API_PORT):
        console.print("[dim]Sending to API…[/dim]")
        try:
            resp = httpx.post(
                f"http://127.0.0.1:{API_PORT}/mission/run",
                json={"name": name},
                timeout=60.0,
            )
            if resp.status_code == 200:
                console.print(f"[green]✓ Mission accepted[/green]")
                data = resp.json() if resp.headers.get("content-type", "").startswith("application/json") else {}
                if data:
                    console.print_json(data=data)
                return
            else:
                console.print(f"[yellow]API returned {resp.status_code}, falling back to direct execution…[/yellow]")
        except Exception as e:
            console.print(f"[yellow]API error ({e}), falling back to direct execution…[/yellow]")

    # Direct execution via orchestrator
    if not ORCHESTRATOR_SCRIPT.exists():
        console.print("[red]✗ Orchestrator not found and API not running[/red]")
        raise typer.Exit(1)

    console.print("[dim]Running via orchestrator directly…[/dim]")
    try:
        result = subprocess.run(
            [sys.executable, str(ORCHESTRATOR_SCRIPT), "mission", name],
            cwd=str(BASE_DIR),
            timeout=300,
        )
        if result.returncode == 0:
            console.print(f"\n[bold green]✓ Mission '{name}' completed[/bold green]")
        else:
            console.print(f"\n[bold red]✗ Mission '{name}' failed (exit {result.returncode})[/bold red]")
            raise typer.Exit(result.returncode)
    except subprocess.TimeoutExpired:
        console.print("[red]✗ Mission timed out after 5 minutes[/red]")
        raise typer.Exit(1)


# ── LOGS ─────────────────────────────────────────────────────────────────────

LOG_TYPE_MAP = {
    "all": "*.jsonl",
    "bus": "message-bus.jsonl",
    "scheduler": "scheduler.jsonl",
    "approvals": "approvals.jsonl",
    "tasks": "task-contracts.jsonl",
    "memory": "events.jsonl",
    "api": "api-server.log",
    "revenue": "revenue.jsonl",
}

@app.command()
def logs(
    follow: bool = typer.Option(False, "--follow", "-f", help="Continuously tail logs"),
    log_type: str = typer.Option("all", "--type", "-t", help=f"Log type: {', '.join(LOG_TYPE_MAP.keys())}"),
):
    """Tail log files from the logs/ directory."""
    if log_type not in LOG_TYPE_MAP:
        console.print(f"[red]Unknown log type '{log_type}'. Choose from: {', '.join(LOG_TYPE_MAP.keys())}[/red]")
        raise typer.Exit(1)

    pattern = LOG_TYPE_MAP[log_type]
    files = sorted(LOGS_DIR.glob(pattern))

    if not files:
        console.print(f"[yellow]No log files matching '{pattern}' in {LOGS_DIR}[/yellow]")
        raise typer.Exit(0)

    if follow:
        # Use tail -f on all matching files
        cmd = ["tail", "-f"] + [str(f) for f in files]
        console.print(f"[dim]Following {len(files)} log file(s)… (Ctrl+C to stop)[/dim]\n")
        try:
            subprocess.run(cmd)
        except KeyboardInterrupt:
            console.print("\n[dim]Stopped.[/dim]")
    else:
        # Show last 30 lines from each file
        for f in files:
            console.print(f"\n[bold cyan]── {f.name} ──[/bold cyan]")
            try:
                lines = f.read_text().strip().splitlines()
                for line in lines[-30:]:
                    try:
                        entry = json.loads(line)
                        ts = entry.get("timestamp", entry.get("ts", ""))[:19]
                        msg = entry.get("event", entry.get("message", entry.get("task", "")))
                        agent = entry.get("agent", entry.get("from", ""))
                        prefix = f"[dim]{ts}[/dim]"
                        if agent:
                            prefix += f" [cyan]{agent}[/cyan]"
                        console.print(f"  {prefix} {msg}")
                    except json.JSONDecodeError:
                        console.print(f"  {line[:120]}")
            except Exception as e:
                console.print(f"  [red]Error reading: {e}[/red]")


# ── BUS ──────────────────────────────────────────────────────────────────────

@bus_app.command("stats")
def bus_stats():
    """Show message bus statistics."""
    console.print(Panel("[bold cyan]📨 Message Bus Stats[/bold cyan]", box=box.ROUNDED))

    bus_data = _safe_json_load(BUS_QUEUE)
    if not bus_data or not isinstance(bus_data, list):
        console.print("[yellow]No message bus data found.[/yellow]")
        raise typer.Exit(0)

    total = len(bus_data)
    pending = [m for m in bus_data if m.get("status") == "pending"]
    acknowledged = [m for m in bus_data if m.get("status") == "acknowledged"]
    other = total - len(pending) - len(acknowledged)

    console.print(f"  Total messages: [bold]{total}[/bold]")
    console.print(f"  Pending:        [yellow]{len(pending)}[/yellow]")
    console.print(f"  Acknowledged:   [green]{len(acknowledged)}[/green]")
    if other > 0:
        console.print(f"  Other:          [dim]{other}[/dim]")

    # Pending by agent
    if pending:
        by_agent: dict[str, int] = {}
        by_priority: dict[str, int] = {}
        for m in pending:
            agent = m.get("to", "unknown")
            by_agent[agent] = by_agent.get(agent, 0) + 1
            prio = m.get("priority", "normal")
            by_priority[prio] = by_priority.get(prio, 0) + 1

        t = Table(title="Pending by Agent", box=box.SIMPLE_HEAVY)
        t.add_column("Agent", style="cyan")
        t.add_column("Count", justify="right")
        for agent, count in sorted(by_agent.items(), key=lambda x: -x[1]):
            t.add_row(agent, str(count))
        console.print(t)

        t2 = Table(title="Pending by Priority", box=box.SIMPLE_HEAVY)
        t2.add_column("Priority", style="cyan")
        t2.add_column("Count", justify="right")
        for prio, count in sorted(by_priority.items()):
            color = "red" if prio == "high" else ("yellow" if prio == "normal" else "dim")
            t2.add_row(f"[{color}]{prio}[/{color}]", str(count))
        console.print(t2)


# ── INSTALL (launchd) ────────────────────────────────────────────────────────

def _plist_content(label: str, program_args: list[str], log_name: str) -> str:
    """Generate a launchd plist XML string."""
    args_xml = "\n".join(f"        <string>{a}</string>" for a in program_args)
    return f"""<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>{label}</string>
    <key>ProgramArguments</key>
    <array>
{args_xml}
    </array>
    <key>WorkingDirectory</key>
    <string>{BASE_DIR}</string>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardOutPath</key>
    <string>{LOGS_DIR / (log_name + '.log')}</string>
    <key>StandardErrorPath</key>
    <string>{LOGS_DIR / (log_name + '-error.log')}</string>
    <key>EnvironmentVariables</key>
    <dict>
        <key>PATH</key>
        <string>/usr/local/bin:/usr/bin:/bin:/opt/homebrew/bin</string>
    </dict>
</dict>
</plist>
"""


@app.command()
def install():
    """Install OPENCLAW as macOS launchd services."""
    console.print(Panel("[bold cyan]📦 Installing OPENCLAW Services[/bold cyan]", box=box.ROUNDED))

    LAUNCHD_DIR.mkdir(parents=True, exist_ok=True)
    python = sys.executable

    services = [
        {
            "name": "api",
            "label": f"{PLIST_PREFIX}.api",
            "args": [python, "-m", "uvicorn", "api.server:app", "--host", "0.0.0.0", "--port", str(API_PORT)],
            "log": "api-launchd",
        },
        {
            "name": "scheduler",
            "label": f"{PLIST_PREFIX}.scheduler",
            "args": [python, str(SCHEDULER_SCRIPT), "run"],
            "log": "scheduler-launchd",
        },
        {
            "name": "watchdog",
            "label": f"{PLIST_PREFIX}.watchdog",
            "args": [python, str(BASE_DIR / "daemon" / "watchdog.py")],
            "log": "watchdog-launchd",
        },
    ]

    for svc in services:
        plist_path = LAUNCHD_DIR / f"{svc['label']}.plist"
        plist_content = _plist_content(svc["label"], svc["args"], svc["log"])
        plist_path.write_text(plist_content)
        console.print(f"  [green]✓ Created {plist_path.name}[/green]")

        # Unload first if already loaded (ignore errors)
        subprocess.run(
            ["launchctl", "unload", str(plist_path)],
            capture_output=True,
        )

        result = subprocess.run(
            ["launchctl", "load", str(plist_path)],
            capture_output=True, text=True,
        )
        if result.returncode == 0:
            console.print(f"  [green]✓ Loaded {svc['label']}[/green]")
        else:
            console.print(f"  [yellow]⚠ Load issue: {result.stderr.strip() or 'unknown'}[/yellow]")

    console.print(f"\n[bold green]✓ Installed {len(services)} services[/bold green]")
    console.print(f"[dim]Plist files in: {LAUNCHD_DIR}[/dim]")


# ── UNINSTALL ────────────────────────────────────────────────────────────────

@app.command()
def uninstall():
    """Remove OPENCLAW launchd services."""
    console.print(Panel("[bold red]🗑  Uninstalling OPENCLAW Services[/bold red]", box=box.ROUNDED))

    labels = [f"{PLIST_PREFIX}.api", f"{PLIST_PREFIX}.scheduler", f"{PLIST_PREFIX}.watchdog"]
    removed = 0

    for label in labels:
        plist_path = LAUNCHD_DIR / f"{label}.plist"
        if plist_path.exists():
            subprocess.run(
                ["launchctl", "unload", str(plist_path)],
                capture_output=True,
            )
            plist_path.unlink()
            console.print(f"  [green]✓ Removed {label}[/green]")
            removed += 1
        else:
            console.print(f"  [dim]  {label} not installed[/dim]")

    if removed:
        console.print(f"\n[bold green]✓ Removed {removed} service(s)[/bold green]")
    else:
        console.print("\n[dim]Nothing to remove.[/dim]")


# ── Entry point ──────────────────────────────────────────────────────────────

if __name__ == "__main__":
    app()
