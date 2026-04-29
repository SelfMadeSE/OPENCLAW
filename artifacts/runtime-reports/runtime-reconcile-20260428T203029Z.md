# OpenClaw Runtime Reconciliation

Generated: 2026-04-28T20:30:29.358270+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 5, "ok": 13}`
- Failed or blocked jobs:
  - Nightly OA Ops Review (orchestrator): error cron: job execution timed out
  - Nightly OA Engineering Review (engineering): error cron: job execution timed out
  - Nightly OA Creative Review (creative): error cron: job execution timed out
  - Hourly Prospect Research (outreach): error FallbackSummaryError: All models failed (2): deepseek/deepseek-v4-flash: LLM request failed: provider rejected the request schema or tool payload. (format) | deepseek/deepseek-v4-pro: LLM request failed: provider rejected the request schema or tool payload. (format)
  - Hourly Outreach Draft Queue (outreach): error FallbackSummaryError: All models failed (2): deepseek/deepseek-v4-flash: LLM request failed: provider rejected the request schema or tool payload. (format) | deepseek/deepseek-v4-pro: LLM request failed: provider rejected the request schema or tool payload. (format)

## CRM

- Lead stages: `{"archived": 9, "lost": 2, "negotiating": 1, "outreach_drafted": 35, "prospect": 1, "scored": 2, "won": 2}`
- Recent actions: 10 loaded
  - 2026-04-28T20:03:39.677753+00:00 email_discovered Email found service@theweatherchangers.com lead=the-weather-changers: --agent
  - 2026-04-28T20:03:39.668856+00:00 email_discovered Email found admin@paylessrooterdenver.com lead=payless-rooter-denver: --agent
  - 2026-04-28T20:03:39.668852+00:00 email_discovered Emails verified info@ + office@ (250 OK) lead=peak-to-peak-roofing--exteriors-20260428-195619: --agent
  - 2026-04-28T19:52:52.132235+00:00 outreach stage_change lead=63593030b771: scored → outreach_drafted: 
  - 2026-04-28T19:52:39.729891+00:00 outreach stage_change lead=4fb2587b39a3: scored → outreach_drafted: 

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 4
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-28T20:21:18.835258+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-0220pm.md (13931 bytes)
- 2026-04-28T20:06:49.483744+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-1020am.md (21453 bytes)
- 2026-04-28T20:06:41.736465+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-0753am.md (15805 bytes)
- 2026-04-28T20:06:23.827452+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-0620am.md (14094 bytes)
- 2026-04-28T20:06:00.657207+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-1220pm.md (9079 bytes)
- 2026-04-28T20:05:32.408866+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-0920am.md (18212 bytes)
- 2026-04-28T20:01:31.784583+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (2552 bytes)
- 2026-04-28T19:49:10.186218+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-0136pm.md (8120 bytes)
- 2026-04-28T19:47:43.365730+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-audit-to-proposal-scope-of-work-2026-04-28.md (6623 bytes)
- 2026-04-28T19:45:48.690728+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/engineering/pricing-page-deploy-2026-04-28.md (1705 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
