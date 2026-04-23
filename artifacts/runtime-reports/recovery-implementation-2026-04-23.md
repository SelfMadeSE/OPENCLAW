# OpenClaw Recovery Implementation - 2026-04-23

## Applied

- Backed up active runtime files:
  - `/Users/ryleebenson/.openclaw/openclaw.json.pre-recovery-20260423.bak`
  - `/Users/ryleebenson/.openclaw/cron/jobs.json.pre-recovery-20260423.bak`
- Disabled the broken `n8n-mcp` server by setting `mcp.servers` to `{}` in `~/.openclaw/openclaw.json`.
- Reduced default heartbeat load by enabling light context and lowering default heartbeat timeout to 900 seconds.
- Disabled prompt/system capture in diagnostics cache trace to reduce sensitive/oversized runtime logging.
- Disabled memory search in config until an embedding provider is available; doctor now reports memory search as explicitly disabled instead of misconfigured.
- Replaced unsupported/rate-limited active model routes:
  - `auditor` primary changed from unsupported `openai-codex/gpt-5.2-codex` to `openai-codex/gpt-5.4-mini`.
  - `marketing`, `outreach`, and `creative` primaries changed from rate-limited `zai/glm-5.1` to `zai/glm-4.5`.
- Removed invalid per-job `payload.model` overrides from cron jobs so they use validated agent defaults.
- Replaced daily-only outreach/prospect jobs with evidence-logged recurring jobs:
  - `Runtime Evidence Reconciliation` every 30 minutes
  - `Site Health Check` every 30 minutes
  - `Hourly Prospect Research` hourly at minute 5
  - `Hourly Outreach Draft Queue` hourly at minute 20
  - `Hourly Agent Roundtable Audit` hourly at minute 45
- Replaced the timed-out `Morning Mission Planning` job with a bounded 10-minute `Morning Mission Snapshot`.
- Added `scripts/runtime_reconcile.py` to generate evidence-based runtime reports from cron state, gateway logs, CRM, and artifacts.
- Updated agent docs/boot instructions so agents must label claims as verified, attempted, blocked, or unverified and must cite evidence paths.

## Verified

- `~/.openclaw/openclaw.json` validates with `openclaw config validate`.
- `~/.openclaw/cron/jobs.json` parses successfully with `jq`.
- Gateway restarted and loaded the corrected config.
- Gateway log shows `cron: started` with 18 jobs and the next wake scheduled.
- No new `n8n-mcp` startup attempts appeared after the corrected restart.
- Runtime reconciliation reports were generated under `artifacts/runtime-reports/`.
- Web UI connected after restart and gateway logs show successful `sessions.list`, `node.list`, `commands.list`, `models.list`, and `chat.history` calls.
- Site health job generated a real artifact at `workspaces/engineering/artifacts/site-health/`.
- Outreach job generated CRM action rows and drafts under `workspaces/outreach/artifacts/`.

## Still Open

- `openclaw status` still reports local WebSocket reachability failure `1006`, even while the gateway process is active and the web UI is successfully issuing `sessions.list`, `node.list`, and other gateway calls.
- The latest `Runtime Evidence Reconciliation` cron status is still `error` from a pre-fix run using `gpt-5.2-codex`; the next scheduled run should replace that status with the corrected auditor model.
- Several workspace `MEMORY.md` files still exceed bootstrap limits and are being truncated.
- Gateway still logs a CLI/mobile-style WebSocket handshake timeout, but web UI connections succeed.
- Remote skills/bin probing is timing out and needs a separate node-connectivity pass if remote skills are required.
