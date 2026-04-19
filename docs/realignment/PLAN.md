# Deliverable 2 — Realignment Plan

## Principle
Official OpenClaw gateway + CLI = canonical runtime. `~/.openclaw/openclaw.json` = canonical config. `~/Desktop/OPENCLAW/workspaces/*` = canonical agent workspaces (as referenced by every agent's `workspace` field in official config).

`~/Desktop/OPENCLAW` = **source-of-truth repository** that generates/syncs workspace content and hosts harness assets (missions, scoring, revenue, shared memory). It does **not** run a parallel runtime.

## What stays
- `workspaces/<agent>/` — all per-agent markdown (SOUL/POLICY/MISSION/SCORECARD/BOOT/MEMORY/HEARTBEAT/AGENTS/USER/IDENTITY/TOOLS/DREAMS)
- `workspaces/<agent>/artifacts/` — agent output (git-ignored selectively)
- `workspaces/<agent>/memory/` — per-agent memory files + Qdrant pointers
- `skills/` — custom skills repo (agent-dream, heartbeat-pro, etc.)
- `docs/` — architecture + runbook + this realignment set
- `revenue/` → moved into `_shared/revenue/` (canonical lane + attempts log)
- `_shared/missions/` — mission templates
- `_shared/scoring/` — score schema + history
- `_shared/social_memory/` — trust/reputation schema
- `scripts/lmstudio-proxy.mjs` — external helper (used by LM Studio config)
- `docker-compose.yml` — non-runtime support containers (n8n, qdrant, etc. — used for skills only, not agent runtime)
- `README.md`, `LICENSE`, `.gitignore`

## What was removed (competing runtime — Rule #1)
- `api/` (FastAPI bridge, 8 files) — the official gateway *is* the bridge
- `cli/`, `pyproject.toml`, `openclaw.egg-info/` — the official `openclaw` CLI is canonical
- `daemon/watchdog.py` + 3 launchd plists — official gateway is launchd-managed
- `system/scheduler/` — official cron handles scheduling
- `system/mission_runner.py` — replaced by mission templates + sub-agents
- `tools/openclaw_tools.py` — not needed, direct agent-to-agent via sub-agents
- `scripts/install-tools.py`, `scripts/import-n8n-workflows.py` — one-shot setup scripts, not runtime

## What is generated/synced
- Agent MISSION.md + SCORECARD.md — generated from `_shared/` templates
- Scoring history JSON — written by agents/auditor during missions
- Revenue attempts log — appended by outreach/marketing per attempt

## What is deleted outright
- Legacy `system/` parallel modules (replaced by workspace files + sub-agents + hooks)
- Dead `run/*.pid` files from old daemon
- Any `com.openclaw.*` LaunchAgents previously installed by the old CLI
