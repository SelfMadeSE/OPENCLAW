# OpenClaw Runtime Reconciliation

Generated: 2026-04-28T21:30:22.761995+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 6, "ok": 12}`
- Failed or blocked jobs:
  - Nightly OA Ops Review (orchestrator): error cron: job execution timed out
  - Nightly OA Engineering Review (engineering): error cron: job execution timed out
  - Nightly OA Creative Review (creative): error cron: job execution timed out
  - Runtime Evidence Reconciliation (auditor): error
  - Site Health Check (engineering): error
  - Hourly Prospect Research (outreach): error FallbackSummaryError: All models failed (2): deepseek/deepseek-v4-flash: LLM request failed: provider rejected the request schema or tool payload. (format) | deepseek/deepseek-v4-pro: LLM request failed: provider rejected the request schema or tool payload. (format)

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

- 2026-04-28T21:29:27.967507+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-prospect-targeting-criteria-2026-04-28.md (5008 bytes)
- 2026-04-28T21:22:25.627471+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-0320pm-CRM-actions.md (3634 bytes)
- 2026-04-28T21:22:11.084295+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-0320pm.md (18440 bytes)
- 2026-04-28T21:21:16.191601+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (4337 bytes)
- 2026-04-28T21:16:51.922856+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/creative-briefs/manual-audit-outreach-workflow-2026-04-28.md (4091 bytes)
- 2026-04-28T21:06:12.142274+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/audit-reports/heartbeat-2026-04-28T2106Z.md (1435 bytes)
- 2026-04-28T21:05:15.259542+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-sample-audit-report-deliverable-2026-04-28.md (15429 bytes)
- 2026-04-28T20:48:45.256252+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/heartbeat-2026-04-28T2047Z.md (1633 bytes)
- 2026-04-28T20:32:27.059579+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/site-health-2026-04-28T2030Z.md (6412 bytes)
- 2026-04-28T20:21:18.835258+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-0220pm.md (13931 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
