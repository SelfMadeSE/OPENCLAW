# OPENCLAW Operations Runbook

Canonical commands. The official `openclaw` CLI from openclaw.ai is the only runtime control surface.

## Health & status
```bash
openclaw status                       # gateway + plugins + channels
openclaw doctor                       # config validation + suggestions
openclaw doctor --fix                 # auto-fix migrations (legacy keys, allowlist resolution)
openclaw channels status              # per-channel state (telegram, etc.)
openclaw logs --follow                # tail gateway logs
tail -F ~/.openclaw/logs/gateway.log  # raw log file
```

## Telegram
```bash
openclaw pairing list telegram                  # pending pairing codes
openclaw pairing approve telegram <CODE>        # approve a DM pair
# Owner is locked durably via channels.telegram.allowFrom in openclaw.json — pairing is now optional.
```

Test bot connectivity (no CLI):
```bash
curl -s "https://api.telegram.org/bot<token>/getMe" | jq
```

## Gateway lifecycle (launchd-managed)
```bash
launchctl print gui/$(id -u)/ai.openclaw.gateway   # state
launchctl kickstart -k gui/$(id -u)/ai.openclaw.gateway  # hard restart
```
Config hot-reloads on save; only kickstart for binary upgrades.

## Mission flow
1. Owner (Telegram DM or local) seeds a mission referencing a template under `_shared/missions/`.
2. Orchestrator (NEXUS) decomposes → spawns sub-agents.
3. Sub-agents write to `workspaces/orchestrator/artifacts/mission-<id>/artifacts/`.
4. Auditor (SENTINEL) writes `audit.md` and writes scoring events to `_shared/scoring/history.jsonl`.
5. Standings/trust matrix rebuilt nightly by Auditor cron.

## Cron
```bash
ls ~/.openclaw/cron/jobs.json         # job definitions
openclaw cron list                    # active jobs (if subcommand exists in this build)
```
Edits to `jobs.json` hot-reload alongside `openclaw.json`.

## Approvals (Orange / Red actions)
- Outreach drafts an action → writes `approval-request.md` in mission dir
- Telegram exec approval prompt routes to owner DM (`execApprovals.target=dm`, `approvers=[8331613806]`)
- Owner approves/denies in DM → result logged to `_shared/revenue/approvals.jsonl`

## Rollback
- Config: `cp ~/.openclaw/openclaw.json.pre-telegram.bak ~/.openclaw/openclaw.json && launchctl kickstart -k gui/$(id -u)/ai.openclaw.gateway`
- Workspace: `git -C ~/Desktop/OPENCLAW checkout -- workspaces/<agent>/<file>`

## Onboarding a new operator
1. Install OpenClaw: `brew install openclaw/tap/openclaw` (or per openclaw.ai docs)
2. Clone harness: `git clone https://github.com/SelfMadeSE/OPENCLAW ~/Desktop/OPENCLAW`
3. Drop your `~/.openclaw/openclaw.json` (do **not** commit; secrets live there)
4. Sync workspace files: workspaces are tracked here; gateway reads them in place
5. `openclaw status` to verify

## Forbidden
- Do NOT run a parallel scheduler / API / watchdog. Gateway owns the runtime.
- Do NOT install `pip install openclaw` (legacy package shadows the official binary).
- Do NOT bypass exec approvals for Orange/Red actions.
