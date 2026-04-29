# OpenClaw Runtime Reconciliation

Generated: 2026-04-28T12:03:59.651826+00:00

## Cron

- Jobs: 15 enabled / 18 total
- Last-run statuses: `{"error": 6, "ok": 12}`
- Failed or blocked jobs:
  - Daily Outbound Autonomy Audit-Funnel Content (marketing): error cron: job execution timed out
  - Nightly OA Ops Review (orchestrator): error cron: job execution timed out
  - Nightly OA Engineering Review (engineering): error cron: job execution timed out
  - Nightly OA Creative Review (creative): error cron: job execution timed out
  - Morning Mission Snapshot (orchestrator): error cron: job execution timed out
  - Hourly Prospect Research (outreach): error FallbackSummaryError: All models failed (2): deepseek/deepseek-v4-flash: LLM request failed: provider rejected the request schema or tool payload. (format) | deepseek/deepseek-v4-pro: LLM request failed: provider rejected the request schema or tool payload. (format)

## CRM

- Lead stages: `{"archived": 5, "lost": 2, "negotiating": 1, "outreach_drafted": 3, "scored": 5, "won": 2}`
- Recent actions: 10 loaded
  - 2026-04-28T11:23:18.392778+00:00 outreach outreach_draft lead=payless-rooter-20260426-121158: Audit-led outreach draft completed for Payless Rooter. Key finding: Yext template placeholder text visible on live contact page. Full 3-email sequence saved.
  - 2026-04-28T11:23:18.392778+00:00 outreach outreach_draft lead=atlantic-dental-20260426-110754: Audit-led outreach draft completed for Atlantic Dental. Key finding: site has no booking, no contact form, no phone, no dentist bios. Complete lead capture failure.
  - 2026-04-28T11:23:18.392778+00:00 outreach outreach_draft lead=the-weather-changers-20260426-110754: Audit-led outreach draft completed for The Weather Changers. Key finding: coupon-first CTA positions as discount provider, missing emergency service prominence. No online booking or live chat.
  - 2026-04-28T11:12:54.673224+00:00 outreach heartbeat lead=fdc4a754e86d: 2026-04-28 heartbeat: draft still current. outboundautonomy.com now audit-led (was SaaS). Awaiting Rylee approval.
  - 2026-04-28T10:34:59.688733+00:00 outreach heartbeat lead=c01e9dc7a1de: 2026-04-28 heartbeat: still flagged — weak audit fit. Awaiting Rylee decision.

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 0
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-28T12:02:20.311965+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/auditor/evidence-audit-2026-04-28.md (9784 bytes)
- 2026-04-28T12:02:01.202169+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach/prospect-verify-2026-04-28.md (12916 bytes)
- 2026-04-28T12:00:26.862552+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/about-page-audit-led-2026-04-28.md (7221 bytes)
- 2026-04-28T11:59:57.927520+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/services-page-audit-led-2026-04-28.md (10998 bytes)
- 2026-04-28T11:59:49.969449+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/outbound-autonomy/SHARED-STATE.md (5238 bytes)
- 2026-04-28T11:59:22.323055+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/marketing/positioning-prep-2026-04-28.md (5663 bytes)
- 2026-04-28T11:51:30.413135+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-post-audit-email-nurture-sequence-2026-04-28.md (6174 bytes)
- 2026-04-28T11:50:43.599598+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/audit-reports/2026-04-28-heartbeat-0550am.md (1708 bytes)
- 2026-04-28T11:50:04.778276+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (8329 bytes)
- 2026-04-28T11:19:14.431659+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/audit-reports/2026-04-28-heartbeat-0518am.md (3162 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
