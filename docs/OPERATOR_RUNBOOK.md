# OPERATOR_RUNBOOK.md

Operator-facing runbook for OpenClaw. Extends `docs/RUNBOOK.md` (kept as the terse cheat-sheet) with the operator workflows from the autonomy realignment PRD.

> **For day-to-day commands, prefer `docs/RUNBOOK.md`.** This file is the structured walk-through.

---

## 1. Startup

Verify the gateway is alive and the realignment pieces are wired.

```bash
openclaw --version                     # expect 2026.4.15+
openclaw status                        # gateway, channels, agents, sessions, security
openclaw doctor --non-interactive      # validation + suggestions (non-destructive)
openclaw hooks check --json            # all internal hooks eligible
openclaw skills check --json           # eligible vs blocked vs missing-requirements
openclaw channels status --json        # telegram running + last in/out
```

Expected baseline:
- Gateway service: LaunchAgent loaded · running.
- Telegram: configured + running, last inbound/outbound recent.
- Hooks: 5 eligible (`boot-md`, `bootstrap-extra-files`, `command-logger`, `session-memory`, `memory-core-short-term-dreaming-cron`).
- Skills: 39 eligible / 2 blocked (`gh-issues`, `github`) / 34 missing-requirements (intentional — see capability matrix).

If memory shows `unavailable` in `openclaw status`, see §8 Memory.

## 2. Health check (10-second loop)

```bash
openclaw health                                            # quick liveness
tail -50 ~/.openclaw/logs/gateway.err.log                  # error stream
grep -E 'reasoning_content|content\\[\\]\\.thinking' \
  ~/.openclaw/logs/gateway.err.log | tail -20              # DeepSeek replay regression check
openclaw infer model run \
  --model deepseek/deepseek-v4-flash \
  --prompt "Reply with READY"                              # smoke test
```

## 3. Telegram operator console

```bash
openclaw pairing list telegram                              # pending pair codes
openclaw pairing approve telegram <CODE>                    # approve a pair
openclaw channels status                                    # per-channel state
```

Owner is durably set via `channels.telegram.allowFrom = [8331613806]` in `~/.openclaw/openclaw.json`. Bot DM tests:

```bash
TOKEN=$(openclaw config get channels.telegram.botToken)
curl -s "https://api.telegram.org/bot${TOKEN}/getMe" | jq
```

To enable Orange/Red approvals via Telegram:

```bash
openclaw config set channels.telegram.execApprovals.enabled true
openclaw config set channels.telegram.execApprovals.target dm
openclaw config set channels.telegram.execApprovals.approvers '[8331613806]'
```

## 4. Mission launch

From operator (via Telegram or local shell):

1. Pick a template from `_shared/missions/MISSION_*.json`.
2. Send Telegram DM to the bot:
   `mission MISSION_SITE_AUDIT target=https://example.com buyer="local plumbers" pain="form abandonment"`
3. NEXUS seeds `workspaces/orchestrator/artifacts/mission-<id>/`, writes `mission.json`, `brief.md`, then `plan.md`.
4. Sub-agents execute; SENTINEL audits; scoring + memory writes; NEXUS posts a one-message status to Telegram.

Verify a live mission:

```bash
ls workspaces/orchestrator/artifacts/ | tail -5
cat workspaces/orchestrator/artifacts/mission-<id>/mission.json | jq .state
```

State machine: `seeded → planned → executing → auditing → scored → closed`. See `_shared/missions/MISSION_PROTOCOL.md` for contract.

## 5. Sub-agent inspection

Inside a live session (CLI/TUI/Telegram):

```
/agents
/subagents list
/subagents info <id>
/subagents log <id> 200 tools
/subagents steer <id> "Refocus on the pricing block; ignore footer."
/subagents send <id> "Append a 3-bullet competitor compare to artifacts/site-audit.md."
```

## 6. Approvals (Orange / Red)

When a mission requires approval:

1. Outreach (or owning agent) writes `mission-<id>/approval-request.md` and appends to `_shared/revenue/approvals.jsonl`.
2. Telegram exec-approval prompt is sent to operator (`8331613806`).
3. Operator replies `approve` or `deny` in the prompt thread.
4. On approve: agent appends `attempts.jsonl` with `action="approved"` then proceeds; only writes `action="sent"` once delivery evidence is captured.

If approvals are **not** routing, check:
```bash
openclaw config get channels.telegram.execApprovals
```
Should show `enabled: true, target: dm, approvers: [8331613806]`.

## 7. Pause / resume autonomy

Pause all autonomous cron + heartbeats:
```bash
openclaw cron list
openclaw cron disable <job-id>            # per job
launchctl bootout gui/$(id -u)/ai.openclaw.gateway   # full stop
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/ai.openclaw.gateway.plist
```

Or set a global hold:
```bash
openclaw config set agents.defaults.maxConcurrent 0   # halts new agent turns
# resume:
openclaw config set agents.defaults.maxConcurrent 2
```

## 8. Memory (current state and fix path)

`openclaw status` shows `Memory: enabled (plugin memory-core) · unavailable`. The `memory-core` plugin loads (dreaming cron runs) but no primary store backend is wired.

Recommended canonical architecture (per PRD §10):
1. **Session memory** — official OpenClaw session store (already on).
2. **Workspace memory** — per-agent `MEMORY.md` injected by `bootstrap-extra-files` (see §11).
3. **Shared memory** — `~/Desktop/OPENCLAW/memory/shared/` plus `_shared/scoring/` and `_shared/social_memory/`.
4. **Vector (optional)** — Qdrant via docker-compose; bind via `neural-memory` skill only when actually queried.

To search workspace memory:
```bash
openclaw memory --help
openclaw memory search "outbound autonomy lane 1" --scope shared
```

## 9. Bootstrap files (wiring fix)

`bootstrap-extra-files` is enabled but has no patterns set, so per-agent `MISSION.md / SCORECARD.md / MEMORY.md / POLICY.md / DREAMS.md / HEARTBEAT.md / INBOX.md` are not injected. To wire:

```bash
openclaw config set hooks.bundled.bootstrap-extra-files.patterns \
  '["MISSION.md","SCORECARD.md","MEMORY.md","POLICY.md","DREAMS.md","HEARTBEAT.md","INBOX.md"]'
openclaw status   # should now report a non-zero bootstrap file count per agent
```

## 10. Archive / reset

Archive instead of delete (PRD §16). Move candidates to `~/Desktop/OPENCLAW/archive/<YYYY-MM-DD>/<category>/` and write a `MANIFEST.md` explaining each move.

Current archive candidates (2026-04-26):
- `workspaces/coder/`, `workspaces/marketer/`, `workspaces/test/` — orphan, not in `agents.list[]`.

Hard reset (last resort):
```bash
openclaw reset --help                # review options first; this is destructive
```

## 11. Recovery

DeepSeek replay regression (`reasoning_content` / `content[].thinking` 400):
1. `grep -E 'reasoning_content|content\\[\\]\\.thinking' ~/.openclaw/logs/gateway.err.log | tail`
2. Verify DeepSeek route: `openclaw config get models.providers.deepseek` — must show `baseUrl=https://api.deepseek.com/anthropic`, `api=anthropic-messages`, both models with `compat.requiresThinkingAsText=true`.
3. Reset stale `:main` keys in each `~/.openclaw/agents/<id>/sessions/sessions.json` (see fix-runbook in `~/.openclaw/fixes/deepseek-finalize-20260426T122015/`).
4. `launchctl kickstart -k gui/$(id -u)/ai.openclaw.gateway`.

LaunchAgent NVM-Node breakage on Node upgrade:
```bash
openclaw doctor --repair
```

## 12. Acceptance checks (PRD §18)

Run these once per significant change:
- `openclaw status` clean (no critical security findings, channels OK, agents 7).
- `openclaw skills check --json` matches the capability matrix (`artifacts/audits/<DATE>-capability-matrix.csv`).
- `openclaw hooks check --json` shows all 5 internal hooks eligible.
- One end-to-end Green-risk mission closes successfully (see Deliverable G).
- `_shared/scoring/history.jsonl` has fresh entries from the close.
- Telegram exec-approval prompt is delivered for Orange-risk dry run.
