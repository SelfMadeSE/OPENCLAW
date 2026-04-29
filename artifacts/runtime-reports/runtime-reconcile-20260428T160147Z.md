# OpenClaw Runtime Reconciliation

Generated: 2026-04-28T16:01:47.404807+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 5, "ok": 13}`
- Failed or blocked jobs:
  - Daily Outbound Autonomy Audit-Funnel Content (marketing): error
  - Nightly OA Ops Review (orchestrator): error cron: job execution timed out
  - Nightly OA Engineering Review (engineering): error cron: job execution timed out
  - Nightly OA Creative Review (creative): error cron: job execution timed out
  - Hourly Prospect Research (outreach): error FallbackSummaryError: All models failed (2): deepseek/deepseek-v4-flash: LLM request failed: provider rejected the request schema or tool payload. (format) | deepseek/deepseek-v4-pro: LLM request failed: provider rejected the request schema or tool payload. (format)

## CRM

- Lead stages: `{"archived": 6, "lost": 2, "negotiating": 1, "outreach_drafted": 21, "scored": 2, "won": 2}`
- Recent actions: 10 loaded
  - 2026-04-28T15:31:49.043135+00:00 outreach outreach_draft lead=b16805e59b40: 2026-04-28 9:20 AM cycle (caught up this cycle): Drafted audit-led outreach. Thin contact page (XOXO) + 3rd-party iframe form. Email and phone verified on site. Draft in 2026-04-28-hourly-outreach-draft-queue-0920am.md.
  - 2026-04-28T15:31:49.042875+00:00 outreach stage_change lead=b16805e59b40: scored → outreach_drafted: scored + drafted
  - 2026-04-28T15:31:32.799773+00:00 outreach outreach_draft lead=874cbf592ac6: 2026-04-28 9:30 AM cycle: Drafted audit-led outreach. Best existing site of batch, award-winner, missing online booking. Draft in 2026-04-28-hourly-outreach-draft-queue-0820am.md. Phone verified 970-286-0640, no email.
  - 2026-04-28T15:31:32.799446+00:00 outreach stage_change lead=874cbf592ac6: scored → outreach_drafted: scored
  - 2026-04-28T15:31:32.799226+00:00 outreach outreach_draft lead=96a88aecf4de: 2026-04-28 9:30 AM cycle: Drafted audit-led outreach. 85yr legacy, BBB Torch Award, staging URL leak in production. Draft in 2026-04-28-hourly-outreach-draft-queue-0920am.md. Phone 970-533-8570 from search, no email.

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 2
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-28T16:00:28.505775+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-enter-url-demo-report-funnel-2026-04-28.md (4379 bytes)
- 2026-04-28T15:52:24.797122+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (10925 bytes)
- 2026-04-28T15:49:33.639149+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/campaigns/oa-execution-checklist-2026-04-28.md (5894 bytes)
- 2026-04-28T15:34:47.857069+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/audit-walkthrough-video-script-2026-04-28.md (5512 bytes)
- 2026-04-28T15:22:42.072086+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-0920am.md (18100 bytes)
- 2026-04-28T15:21:58.507351+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/audit-reports/2026-04-28-heartbeat-0920am.md (5879 bytes)
- 2026-04-28T15:15:35.749820+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-hero-patch-deployable-2026-04-28.md (4530 bytes)
- 2026-04-28T14:58:15.016753+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/seo-landing-pages-vertical-pack-2026-04-28.md (10553 bytes)
- 2026-04-28T14:41:25.644963+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-hero-fallback-copy-2026-04-28.md (4185 bytes)
- 2026-04-28T14:38:41.847522+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/audit-reports/2026-04-28-heartbeat-0837am.md (5396 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
