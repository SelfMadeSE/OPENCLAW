#!/usr/bin/env python3
"""
OpenClaw Autonomy Daemon — NEXUS owns mission generation.

Continuous loop:
  1. Build a STATE snapshot (CRM, ledger, recent missions, blockers, scorecards).
  2. Ask NEXUS to PROPOSE the next revenue mission (mission_id, goal, slices, agents).
  3. Persist the mission.json.
  4. Hand off execution to NEXUS (which spawns sub-agents per slice).
  5. Wait for completion (bounded), capture artifacts.
  6. Score, update memory, sleep, repeat.

Goal = revenue. Hard wall = real money out / public posts to unapproved accounts.
Everything else is in-policy autonomous.
"""
from __future__ import annotations
import json
import os
import pathlib
import subprocess
import sys
import time
import uuid
import signal
from datetime import datetime, timezone

ROOT = pathlib.Path(__file__).resolve().parents[1]
MISSIONS_DIR = ROOT / "artifacts" / "missions"
DAEMON_LOG = ROOT / "artifacts" / "autonomy-daemon.log"
DAEMON_STATE = ROOT / "artifacts" / "autonomy-daemon.state.json"
HEARTBEAT = ROOT / "artifacts" / "autonomy-daemon.heartbeat.json"
SCORE_HIST = ROOT / "_shared" / "scoring" / "history.jsonl"

CYCLE_SLEEP_SEC = int(os.environ.get("OPENCLAW_CYCLE_SLEEP", "300"))   # 5 min between cycles
MISSION_TIMEOUT_SEC = int(os.environ.get("OPENCLAW_MISSION_TIMEOUT", "900"))  # 15 min hard cap
MAX_CYCLES = int(os.environ.get("OPENCLAW_MAX_CYCLES", "0"))  # 0 = forever

RUNNING = True


def _ts() -> str:
    return datetime.now(timezone.utc).isoformat()


def log(msg: str) -> None:
    line = f"[{_ts()}] {msg}\n"
    DAEMON_LOG.parent.mkdir(parents=True, exist_ok=True)
    with DAEMON_LOG.open("a") as f:
        f.write(line)
    sys.stdout.write(line)
    sys.stdout.flush()


def heartbeat(cycle: int, phase: str, mission_id: str | None) -> None:
    HEARTBEAT.write_text(json.dumps({
        "ts": _ts(), "cycle": cycle, "phase": phase,
        "mission_id": mission_id, "pid": os.getpid(),
    }, indent=2))


def shell(cmd: str, timeout: int = 60, full: bool = False) -> tuple[int, str]:
    try:
        r = subprocess.run(
            cmd, shell=True, cwd=str(ROOT),
            capture_output=True, text=True, timeout=timeout,
        )
        out = r.stdout + r.stderr
        return r.returncode, (out if full else out[-4000:])
    except subprocess.TimeoutExpired:
        return 124, f"TIMEOUT after {timeout}s"
    except Exception as e:  # noqa
        return 1, f"ERROR: {e}"


def build_state_snapshot() -> dict:
    snap = {"ts": _ts()}
    # CRM pipeline
    rc, out = shell("python3 scripts/crm.py report 2>&1 | head -80", 30)
    snap["crm_report"] = out if rc == 0 else f"crm-error: {out[:400]}"
    # Lead inventory
    rc, out = shell("python3 scripts/crm.py list-leads 2>&1 | head -40", 30)
    snap["leads_top"] = out if rc == 0 else f"leads-error: {out[:400]}"
    # Ledger summary
    rc, out = shell(
        "sqlite3 data/crm.sqlite \"SELECT status, COUNT(*) FROM email_attempts GROUP BY status\" 2>&1",
        15,
    )
    snap["ledger_status"] = out
    # Recent missions
    if MISSIONS_DIR.exists():
        mids = sorted([p.name for p in MISSIONS_DIR.iterdir() if p.is_dir()])[-10:]
        snap["recent_missions"] = mids
    else:
        snap["recent_missions"] = []
    # Open repair tickets
    tk = ROOT / "artifacts" / "engineering" / "repair-tickets.jsonl"
    if tk.exists():
        snap["open_tickets"] = tk.read_text().splitlines()[-10:]
    # Hard-wall reminder
    fp = ROOT / "_shared/policy/RUNTIME_FREEZE.json"
    if fp.exists():
        d = json.loads(fp.read_text())
        snap["hard_wall_actions"] = d.get("hard_wall_actions", [])
    return snap


def propose_mission(state: dict) -> dict:
    """Ask NEXUS to PROPOSE the next mission. Expects strict JSON back."""
    prompt = f"""You are NEXUS, the orchestrator. The operator's standing directive is:
    THE MISSION IS REVENUE. Generate your own missions. Do not ask the operator
    what to do. Hard wall (never do without explicit approval): {state.get('hard_wall_actions')}.
    Everything else (drafts, sends, deploys, account creation, browser, code, CRM writes)
    is in-policy autonomous.

CURRENT STATE SNAPSHOT:
{json.dumps(state, indent=2)[:6000]}

Propose ONE concrete revenue-advancing mission for the next ~10 minutes.
Output STRICT JSON ONLY (no prose, no code fence) with this schema:
{{
  "mission_id": "kebab-case-id-with-{datetime.now().strftime('%Y%m%d-%H%M')}-suffix",
  "goal": "one sentence outcome that moves revenue forward",
  "success_criteria": ["measurable outcome 1", "measurable outcome 2"],
  "slices": [
    {{"agent": "engineering|outreach|marketing|creative|media|auditor",
      "task": "single concrete instruction with file paths and exact commands",
      "expected_artifact": "relative path under artifacts/missions/<mission_id>/"}}
  ],
  "lead_agent": "orchestrator",
  "risk": "GREEN|YELLOW|ORANGE",
  "reasoning": "why this is the highest-value next move given the state"
}}
Rules: max 4 slices, no two slices to the same agent, every slice must produce a file artifact,
no slice may attempt anything in the hard_wall list, prefer slices that produce shippable
artifacts (proposals, content, code patches, lead enrichments) over more research.
Output only the JSON object."""
    cmd = (
        f"openclaw agent --agent orchestrator --json --thinking off "
        f"--timeout 180 -m {json.dumps(prompt)}"
    )
    rc, out = shell(cmd, 220, full=True)
    if rc != 0:
        log(f"propose_mission shell rc={rc}: {out[:400]}")
        return {}
    # Parse openclaw JSON envelope -> result.payloads[0].text -> mission JSON
    # openclaw may prepend banner text; locate the outer JSON object
    a, b = out.find("{"), out.rfind("}")
    if a == -1 or b == -1:
        log(f"propose_mission: no JSON in stdout. Got: {out[:300]}")
        return {}
    try:
        env = json.loads(out[a : b + 1])
    except Exception:
        log(f"propose_mission: outer JSON parse failed: {out[a:b+1][:300]}")
        return {}
    # Try multiple text fields openclaw exposes
    text = ""
    payloads = (env.get("result") or {}).get("payloads") or []
    for p in payloads:
        if p.get("text"):
            text = p["text"]
            break
    if not text:
        meta = (env.get("result") or {}).get("meta") or {}
        text = meta.get("finalAssistantRawText") or env.get("summary") or ""
    text = text.strip()
    # Strip ```json fences
    if text.startswith("```"):
        text = text.lstrip("`")
        if text.lower().startswith("json"):
            text = text[4:]
        text = text.rsplit("```", 1)[0].strip()
    # find first { ... last }
    a, b = text.find("{"), text.rfind("}")
    if a == -1 or b == -1:
        log(f"propose_mission: no JSON object in payload. Got: {text[:300]}")
        return {}
    try:
        mission = json.loads(text[a : b + 1])
    except Exception as e:  # noqa
        log(f"propose_mission: JSON parse failed: {e}. Body: {text[a:b+1][:300]}")
        return {}
    return mission


def execute_mission(mission: dict) -> dict:
    """Persist mission, then run each slice via openclaw agent. Returns result summary."""
    mid = mission.get("mission_id") or f"auto-{uuid.uuid4().hex[:8]}"
    mission["mission_id"] = mid
    mdir = MISSIONS_DIR / mid
    mdir.mkdir(parents=True, exist_ok=True)
    (mdir / "mission.json").write_text(json.dumps(mission, indent=2))
    log(f"mission {mid} :: {mission.get('goal','(no goal)')[:120]}")

    slice_results = []
    deadline = time.time() + MISSION_TIMEOUT_SEC
    for i, sl in enumerate(mission.get("slices", []), 1):
        if time.time() > deadline:
            slice_results.append({"slice": i, "agent": sl.get("agent"), "status": "skipped-timeout"})
            continue
        agent = sl.get("agent", "orchestrator")
        task = sl.get("task", "")
        expected = sl.get("expected_artifact", f"slice-{i}-output.md")
        prompt = (
            f"MISSION {mid} — slice {i}/{len(mission['slices'])}.\n"
            f"Lead is NEXUS. Goal: {mission.get('goal')}.\n"
            f"Your task: {task}\n"
            f"Write your output to: artifacts/missions/{mid}/{expected}\n"
            f"Use absolute path /Users/ryleebenson/Desktop/OPENCLAW/artifacts/missions/{mid}/.\n"
            f"Hard wall actions are forbidden: payment_live, ads_spend, trading_live, "
            f"betting_live, gambling, withdraw, deposit, credential_change, destructive_fs.\n"
            f"Everything else is in-policy. Do NOT ask the operator anything. "
            f"End with a single line: STATE: PROCEED|APPROVAL_REQUEST|BLOCKER and one-line summary."
        )
        cmd = (
            f"openclaw agent --agent {agent} --json --thinking off "
            f"--timeout 360 -m {json.dumps(prompt)}"
        )
        log(f"  slice {i} -> {agent} ({expected})")
        rc, out = shell(cmd, 400)
        # Persist raw run
        (mdir / f"slice-{i}-{agent}.run.txt").write_text(out)
        status = "ok" if rc == 0 else f"rc={rc}"
        slice_results.append({"slice": i, "agent": agent, "status": status, "expected": expected})

    # Score event for this mission cycle
    try:
        SCORE_HIST.parent.mkdir(parents=True, exist_ok=True)
        with SCORE_HIST.open("a") as f:
            f.write(json.dumps({
                "ts": _ts(), "mission_id": mid, "issuer": "autonomy-daemon",
                "agent": "orchestrator", "metric": "autonomy_score", "delta": 0.1,
                "reason": "self-generated revenue mission executed",
            }) + "\n")
    except Exception:
        pass

    summary = {"mission_id": mid, "slices": slice_results, "completed_at": _ts()}
    (mdir / "daemon-summary.json").write_text(json.dumps(summary, indent=2))
    return summary


def cycle(n: int) -> None:
    log(f"=== cycle {n} start ===")
    heartbeat(n, "snapshot", None)
    state = build_state_snapshot()
    heartbeat(n, "propose", None)
    mission = propose_mission(state)
    if not mission or "slices" not in mission:
        log("no mission proposed this cycle (model output unparseable). sleeping.")
        return
    heartbeat(n, "execute", mission.get("mission_id"))
    result = execute_mission(mission)
    DAEMON_STATE.write_text(json.dumps({
        "ts": _ts(), "last_cycle": n, "last_mission": result,
    }, indent=2))
    log(f"=== cycle {n} done :: {result['mission_id']} ===")


def _stop(signum, frame):  # noqa
    global RUNNING
    log(f"signal {signum} received -> stopping after current cycle")
    RUNNING = False


def main() -> int:
    signal.signal(signal.SIGTERM, _stop)
    signal.signal(signal.SIGINT, _stop)
    log(f"autonomy daemon starting pid={os.getpid()} cycle_sleep={CYCLE_SLEEP_SEC}s "
        f"mission_timeout={MISSION_TIMEOUT_SEC}s max_cycles={MAX_CYCLES or 'inf'}")
    n = 0
    while RUNNING:
        n += 1
        try:
            cycle(n)
        except Exception as e:  # noqa
            log(f"cycle {n} crashed: {e!r}")
        if MAX_CYCLES and n >= MAX_CYCLES:
            log(f"reached MAX_CYCLES={MAX_CYCLES}, exiting")
            break
        for _ in range(CYCLE_SLEEP_SEC):
            if not RUNNING:
                break
            time.sleep(1)
    log("autonomy daemon stopped")
    return 0


if __name__ == "__main__":
    sys.exit(main())
