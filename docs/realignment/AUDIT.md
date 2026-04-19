# Deliverable 1 — Official Runtime Audit

_Snapshot: 2026-04-19, OpenClaw 2026.4.15 (041266a)_

## Gateway truth
- Binary: `/opt/homebrew/bin/openclaw` (official)
- Gateway process: `openclaw-gateway` managed by launchd (`ai.openclaw.gateway`), PID varies
- Port: `127.0.0.1:18789` (loopback)
- Auth mode: `token` (token in `~/.openclaw/openclaw.json` → `gateway.auth.token`)
- Control UI: served by gateway at http://127.0.0.1:18789/
- Config hot-reload: working (verified on `channels.telegram.*` edits)

## Config truth
- Canonical file: `~/.openclaw/openclaw.json` (13 KB)
- Backups present: `openclaw.json.bak*` (7 backups)
- Agents defined: 7 (orchestrator, engineering, marketing, creative, outreach, media, auditor)
- All agents model: `lmstudio/qwen/qwen3.5-9b`
- All agents `thinkingDefault: high`, `reasoningDefault: on`
- Workspace paths for every agent live under `/Users/ryleebenson/Desktop/OPENCLAW/workspaces/<id>/`
  (valid per official schema — each agent has explicit `workspace` field)

## Workspace truth
Per-agent workspace files present for all 7:
- AGENTS.md, BOOT.md, DREAMS.md, HEARTBEAT.md, IDENTITY.md, MEMORY.md, POLICY.md, SOUL.md, TOOLS.md, USER.md
- Missing (added in this realignment): MISSION.md, SCORECARD.md

## Channels truth
- **Telegram**: `enabled=true, configured=true, running=true, mode=polling, token=config`
  - Bot: @MRMRoBOTBOT (id `8645706735`, name "Mr O")
  - `dmPolicy=allowlist` (durable, post-pairing)
  - `groupPolicy=allowlist`, `groups["*"].requireMention=true`
  - Owner locked: `allowFrom=[8331613806]`, `groupAllowFrom=[8331613806]`
  - `errorPolicy=once`, `execApprovals.enabled=true`, `execApprovals.target=dm`, `approvers=[8331613806]`

## Hooks truth
- `hooks.enabled=true`, `hooks.token` set
- Internal hooks enabled: `command-logger`, `session-memory`, `bootstrap-extra-files`, `boot-md`
- No custom external hooks configured

## Sub-agents truth
- `agents.defaults.subagents.maxSpawnDepth=2`, `maxChildrenPerAgent=5`, `maxConcurrent=1`
- Per-agent `subagents.allowAgents` maps are defined (orchestrator/auditor=`*`, others scoped)

## Plugins truth
- Active: `acpx`, `browser`, `device-pair`, `memory-core`, `phone-control`, `talk-voice`, `telegram`
- LM Studio: enabled, `baseUrl=http://127.0.0.1:1234/v1`
- memory-core dreaming: `enabled=true`, `timezone=America/Denver`, storage `both` + `separateReports`

## Cron truth
- 13 cron jobs in `~/.openclaw/cron/jobs.json`
  - 6 original (Morning Mission, Prospect Research, Outreach Drafts, Content Creation, Audit, Memory Dreaming)
  - 7 staggered dream reflection jobs (1:00–2:30 AM, per-agent)

## Removed parallel runtime (this realignment)
- ❌ Custom `openclaw` Python CLI — uninstalled via pip
- ❌ `com.openclaw.api`, `com.openclaw.scheduler`, `com.openclaw.watchdog` — unloaded from launchd, plists removed
- ❌ Custom `scheduler.py`, `watchdog.py` daemon processes — killed
- Result: only the official gateway owns port 18789 and the runtime
