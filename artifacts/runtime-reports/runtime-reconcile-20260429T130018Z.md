# OpenClaw Runtime Reconciliation

Generated: 2026-04-29T13:00:18.099040+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 1, "ok": 17}`
- Failed or blocked jobs:
  - Hourly Prospect Research (outreach): error cron: job execution timed out

## CRM

- Lead stages: `{"archived": 14, "lost": 2, "outreach_drafted_email_missing": 2, "outreach_sent": 51, "prospect": 1, "scored": 2}`
- Recent actions: 10 loaded
  - 2026-04-29T12:43:53.948430+00:00 outreach stage_change lead=57f24908a5ef: prospect → outreach_sent: SMTP send. Martin Mowing — 100/100 A. taylormartin@martinmowingllc.com discovered via site footer. Provider accepted ID 81.
  - 2026-04-29T12:43:53.922036+00:00 outreach stage_change lead=d1f9105318c8: prospect → outreach_sent: Duplicate of Denver Tree Removal Service. Same email, not re-sent.
  - 2026-04-29T12:43:53.895897+00:00 outreach stage_change lead=84ba777d9b27: prospect → outreach_sent: SMTP send. Denver Tree Removal Service — 89/B (no lead form). michael@astumpman.com. Provider accepted ID 77.
  - 2026-04-29T12:05:27.153928+00:00 heartbeat Prospect added. Copyright 2021, basic WordPress template, phone-only (720-829-8391), no email visible. Needs email discovery. lead=57f24908a5ef: added
  - 2026-04-29T12:05:23.821017+00:00 heartbeat Prospect added. Site copyright 2018, basic HTML, no mobile optimization. Contact: michael@astumpman.com lead=84ba777d9b27: added
- Email ledger statuses: `{"failed": 6, "provider_accepted": 71, "reconciled_superseded": 7}`
- Email truth blockers:
  - lead=008cfdf01de9: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=478a4070a54b: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=d1f9105318c8: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=d66d0284f957: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=f379ad620e03: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
- Recent email attempts:
  - 2026-04-29T12:59:31.867804+00:00 #84 provider_accepted lead=colorado-landscaping-batch5-20260429 to=coloradolandscapingandconcrete@gmail.com via=gmail_smtp: <177746756970.84016.2115301719008050407@outboundautonomy.com>
  - 2026-04-29T12:59:21.339165+00:00 #83 provider_accepted lead=balanced-plumbing-batch5-20260429 to=joshblair86@yahoo.com via=gmail_smtp: <177746755965.84003.15002940334937670724@outboundautonomy.com>
  - 2026-04-29T12:59:11.791966+00:00 #82 provider_accepted lead=red-star-plumbing-batch5-20260429 to=redstar.plumbinginc@yahoo.com via=gmail_smtp: <177746755002.83999.14812164246464506128@outboundautonomy.com>
  - 2026-04-29T12:43:34.084763+00:00 #81 provider_accepted lead=57f24908a5ef to=taylormartin@martinmowingllc.com via=gmail_smtp: <177746661198.81871.11980246293247279802@outboundautonomy.com>
  - 2026-04-29T12:42:40.797104+00:00 #80 provider_accepted lead=peak-to-peak-roofing-20260428-195619 to=info@peaktopeakroofing.com via=gmail_smtp: <177746655862.81619.8085399503654412924@outboundautonomy.com>

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 2
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-29T12:58:48.299372+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/blog-post-design-trust-signals-2026-04-29.md (10208 bytes)
- 2026-04-29T12:57:02.744050+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/audit-reports/heartbeat-2026-04-29-0656.md (4936 bytes)
- 2026-04-29T12:55:46.884682+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-day0-send-ready-mml-templates-2026-04-29.md (7700 bytes)
- 2026-04-29T12:55:09.088004+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-prospect-emails-resolved-2026-04-29.md (3624 bytes)
- 2026-04-29T12:52:32.113657+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/engineering/waitlist-fix-2026-04-29.md (2520 bytes)
- 2026-04-29T12:50:09.907595+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/creative/demo-walkthrough-assets-2026-04-29.md (12511 bytes)
- 2026-04-29T12:50:01.904164+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/auditor/latest-audit-2026-04-29-0645.md (7148 bytes)
- 2026-04-29T12:49:47.434483+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/site-health/sweep-2026-04-29-0645.md (4381 bytes)
- 2026-04-29T12:48:24.355284+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (9857 bytes)
- 2026-04-29T12:47:49.947362+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/outbound-autonomy/SHARED-STATE.md (3878 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, email_attempts provider evidence, artifacts, transcripts, logs, or external confirmation. Browser/CDP send claims without provider evidence remain `unverified_claim`; anything else is `unverified` or `blocked`.
