# OpenClaw Runtime Reconciliation

Generated: 2026-04-28T17:00:15.759948+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 6, "ok": 12}`
- Failed or blocked jobs:
  - Nightly OA Ops Review (orchestrator): error cron: job execution timed out
  - Nightly OA Engineering Review (engineering): error cron: job execution timed out
  - Nightly OA Creative Review (creative): error cron: job execution timed out
  - Runtime Evidence Reconciliation (auditor): error
  - Hourly Prospect Research (outreach): error FallbackSummaryError: All models failed (2): deepseek/deepseek-v4-flash: LLM request failed: provider rejected the request schema or tool payload. (format) | deepseek/deepseek-v4-pro: LLM request failed: provider rejected the request schema or tool payload. (format)
  - Hourly Agent Roundtable Audit (orchestrator): error FailoverError: LLM request failed: provider rejected the request schema or tool payload.

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
- bootstrap_truncated: 2
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-28T17:00:04.146804+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/services-page-deploy-2026-04-28.md (2506 bytes)
- 2026-04-28T16:58:54.083180+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-week1-day3-email-outreach-2026-04-28.md (4689 bytes)
- 2026-04-28T16:58:51.186937+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach/berry-best-pipeline-2026-04-28.md (9147 bytes)
- 2026-04-28T16:58:32.638502+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-week2-agency-partner-inreach-2026-04-28.md (4907 bytes)
- 2026-04-28T16:58:13.365565+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-week2-dental-medspa-social-2026-04-28.md (4617 bytes)
- 2026-04-28T16:57:55.686909+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-week2-hvac-plumbing-social-2026-04-28.md (4489 bytes)
- 2026-04-28T16:52:19.128967+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/how-it-works-page-2026-04-28.md (7986 bytes)
- 2026-04-28T16:48:34.242895+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (8671 bytes)
- 2026-04-28T16:46:19.129921+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/audit-reports/2026-04-28-heartbeat-1045am.md (5683 bytes)
- 2026-04-28T16:45:17.000551+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/heartbeat-2026-04-28T1645Z.md (1764 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
