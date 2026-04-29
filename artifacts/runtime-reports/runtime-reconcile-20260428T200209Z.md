# OpenClaw Runtime Reconciliation

Generated: 2026-04-28T20:02:09.573746+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 3, "ok": 15}`
- Failed or blocked jobs:
  - Nightly OA Ops Review (orchestrator): error cron: job execution timed out
  - Nightly OA Engineering Review (engineering): error cron: job execution timed out
  - Nightly OA Creative Review (creative): error cron: job execution timed out

## CRM

- Lead stages: `{"archived": 9, "lost": 2, "negotiating": 1, "outreach_drafted": 35, "scored": 2, "won": 2}`
- Recent actions: 10 loaded
  - 2026-04-28T19:52:52.132235+00:00 outreach stage_change lead=63593030b771: scored → outreach_drafted: 
  - 2026-04-28T19:52:39.729891+00:00 outreach stage_change lead=4fb2587b39a3: scored → outreach_drafted: 
  - 2026-04-28T19:49:55.168416+00:00 outreach stage_change lead=f3d30c5793d5: scored → outreach_drafted: 
  - 2026-04-28T19:49:40.028115+00:00 outreach email_discovery lead=the-weather-changers-20260426-110754: Verified service@theweatherchangers.com via SMTP (Microsoft 365). Only verified pattern — admin, info, contact, hello all rejected (Access denied). M365 MX confirmed. Author account admin@ exists but mailbox rejects.
  - 2026-04-28T19:49:40.028115+00:00 outreach email_discovery lead=payless-rooter-20260426-121158: Verified admin@paylessrooterdenver.com via SMTP (Google Workspace). Only verified pattern — info, service, contact, hello all rejected. Yext template site. Score 85.

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 4
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-28T20:01:31.784583+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (2552 bytes)
- 2026-04-28T19:49:10.186218+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-0136pm.md (8120 bytes)
- 2026-04-28T19:47:43.365730+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-audit-to-proposal-scope-of-work-2026-04-28.md (6623 bytes)
- 2026-04-28T19:45:48.690728+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/engineering/pricing-page-deploy-2026-04-28.md (1705 bytes)
- 2026-04-28T19:26:28.328413+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/outbound-autonomy/SHARED-STATE.md (3914 bytes)
- 2026-04-28T19:23:08.567320+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-1220pm.md (9053 bytes)
- 2026-04-28T19:22:51.083797+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/pricing-page-deployment-brief-2026-04-28.md (5825 bytes)
- 2026-04-28T19:07:34.829194+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/harmony-painting-denver-20260428-220734_website_audit_research_2026-04-28_220734.json (1245 bytes)
- 2026-04-28T19:07:34.827120+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/dry-coats-painting-20260428-220734_website_audit_research_2026-04-28_220734.json (1262 bytes)
- 2026-04-28T19:07:34.825177+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/denver-appliance-repair-20260428-220734_website_audit_research_2026-04-28_220734.json (1330 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
