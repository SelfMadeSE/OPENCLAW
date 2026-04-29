# OpenClaw Runtime Reconciliation

Generated: 2026-04-28T21:06:00.493437+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 7, "ok": 11}`
- Failed or blocked jobs:
  - Nightly OA Ops Review (orchestrator): error cron: job execution timed out
  - Nightly OA Engineering Review (engineering): error cron: job execution timed out
  - Nightly OA Creative Review (creative): error cron: job execution timed out
  - Runtime Evidence Reconciliation (auditor): error FallbackSummaryError: All models failed (2): deepseek/deepseek-v4-flash: LLM request failed: provider rejected the request schema or tool payload. (format) | deepseek/deepseek-v4-pro: LLM request failed: provider rejected the request schema or tool payload. (format)
  - Site Health Check (engineering): error FailoverError: LLM request failed: provider rejected the request schema or tool payload.
  - Hourly Prospect Research (outreach): error
  - Hourly Outreach Draft Queue (outreach): error FallbackSummaryError: All models failed (2): deepseek/deepseek-v4-flash: LLM request failed: provider rejected the request schema or tool payload. (format) | deepseek/deepseek-v4-pro: LLM request failed: provider rejected the request schema or tool payload. (format)

## CRM

- Lead stages: `{"archived": 9, "lost": 2, "negotiating": 1, "outreach_drafted": 36, "prospect": 1, "scored": 2, "won": 2}`
- Recent actions: 10 loaded
  - 2026-04-28T21:03:01.818160+00:00 outreach email_discovered lead=atlantic-dental-20260426-110754: Email found manager@myatlanticdental.com via website scrape. Score 88 (HOT).
  - 2026-04-28T21:03:01.818160+00:00 outreach email_discovered lead=payless-rooter-20260426-121158: Email admin@paylessrooterdenver.com restored to contact_info. Had gone missing from previous cycle save.
  - 2026-04-28T21:03:01.818160+00:00 outreach email_discovered lead=the-weather-changers-20260426-110754: Email service@theweatherchangers.com restored to contact_info.
  - 2026-04-28T21:03:01.818160+00:00 outreach email_discovered lead=138a66ae6ce5: Email rsparks9@hotmail.com found for Sparks Heating and Air. Hotmail MX validates.
  - 2026-04-28T21:03:01.818160+00:00 outreach email_discovered lead=bc3a82428256: Email mtybeeinfo@gmail.com found and SMTP-verified (250 OK). Mighty Bee Electric 54yr family-owned electrical.

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 7
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-28T21:05:15.259542+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-sample-audit-report-deliverable-2026-04-28.md (15429 bytes)
- 2026-04-28T20:49:51.425605+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (3617 bytes)
- 2026-04-28T20:48:45.256252+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/heartbeat-2026-04-28T2047Z.md (1633 bytes)
- 2026-04-28T20:32:27.059579+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/site-health-2026-04-28T2030Z.md (6412 bytes)
- 2026-04-28T20:21:18.835258+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-0220pm.md (13931 bytes)
- 2026-04-28T20:06:49.483744+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-1020am.md (21453 bytes)
- 2026-04-28T20:06:41.736465+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-0753am.md (15805 bytes)
- 2026-04-28T20:06:23.827452+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-0620am.md (14094 bytes)
- 2026-04-28T20:06:00.657207+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-1220pm.md (9079 bytes)
- 2026-04-28T20:05:32.408866+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-0920am.md (18212 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
