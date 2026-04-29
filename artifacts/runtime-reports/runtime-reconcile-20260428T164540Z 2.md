# OpenClaw Runtime Reconciliation

Generated: 2026-04-28T16:45:40.551154+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 4, "ok": 14}`
- Failed or blocked jobs:
  - Nightly OA Ops Review (orchestrator): error cron: job execution timed out
  - Nightly OA Engineering Review (engineering): error cron: job execution timed out
  - Nightly OA Creative Review (creative): error cron: job execution timed out
  - Hourly Prospect Research (outreach): error FallbackSummaryError: All models failed (2): deepseek/deepseek-v4-flash: LLM request failed: provider rejected the request schema or tool payload. (format) | deepseek/deepseek-v4-pro: LLM request failed: provider rejected the request schema or tool payload. (format)

## CRM

- Lead stages: `{"archived": 7, "lost": 2, "negotiating": 1, "outreach_drafted": 21, "prospect": 5, "scored": 2, "won": 2}`
- Recent actions: 10 loaded
  - 2026-04-28T16:08:21.819243+00:00 --action-type stage_change lead=de24eb30fb89: --description
  - 2026-04-28T16:08:21.819241+00:00 --action-type stage_change lead=ee49ba3606c3: --description
  - 2026-04-28T16:07:26.912016+00:00 --action-type stage_change lead=ee49ba3606c3: --description
  - 2026-04-28T16:07:26.912014+00:00 --action-type stage_change lead=de24eb30fb89: --description
  - 2026-04-28T15:31:49.043135+00:00 outreach outreach_draft lead=b16805e59b40: 2026-04-28 9:20 AM cycle (caught up this cycle): Drafted audit-led outreach. Thin contact page (XOXO) + 3rd-party iframe form. Email and phone verified on site. Draft in 2026-04-28-hourly-outreach-draft-queue-0920am.md.

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 4
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-28T16:45:17.000551+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/heartbeat-2026-04-28T1645Z.md (1764 bytes)
- 2026-04-28T16:41:55.461937+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/audit-reports/2026-04-28-heartbeat-1040am.md (8528 bytes)
- 2026-04-28T16:37:15.707659+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-pending-approval-pre-send-review.md (10085 bytes)
- 2026-04-28T16:35:59.377326+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/2026-04-28-prospect-research-cycle-2.md (3401 bytes)
- 2026-04-28T16:27:21.149078+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/roundtable-pitch.md (1242 bytes)
- 2026-04-28T16:27:14.901350+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/competitive-research/local-service-social-competitive-benchmark-2026-04-28.md (6808 bytes)
- 2026-04-28T16:26:50.732398+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/distribution-plans/outbound-autonomy-social-launch-calendar-days-1-7.md (11810 bytes)
- 2026-04-28T16:26:18.428723+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-launch-thread-x-linkedin-2026-04-28.md (4055 bytes)
- 2026-04-28T16:25:43.663540+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-nurture-3-email-report-viewers-2026-04-28.md (4404 bytes)
- 2026-04-28T16:25:25.622494+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-enter-url-demo-report-funnel-2026-04-28.md (4549 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
