# OpenClaw Runtime Reconciliation

Generated: 2026-04-28T12:30:16.090636+00:00

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

- Lead stages: `{"archived": 5, "lost": 2, "negotiating": 1, "outreach_drafted": 9, "prospect": 1, "scored": 2, "won": 2}`
- Recent actions: 10 loaded
  - 2026-04-28T12:22:56.291756+00:00 outreach heartbeat lead=the-weather-changers-20260426-110754: 2026-04-28 cycle: Advanced from scored to outreach_drafted. Draft already logged via earlier cycle.
  - 2026-04-28T12:22:56.290926+00:00 outreach heartbeat lead=atlantic-dental-20260426-110754: 2026-04-28 cycle: Advanced from scored to outreach_drafted. Draft already logged via earlier cycle.
  - 2026-04-28T12:22:56.290458+00:00 outreach heartbeat lead=payless-rooter-20260426-121158: 2026-04-28 cycle: Advanced from scored to outreach_drafted. Draft already logged via earlier cycle.
  - 2026-04-28T12:22:50.438192+00:00 outreach heartbeat lead=f903936e7d00: 2026-04-28 6:20 AM cycle: Denver Lawn & Landscape added to CRM and advanced to outreach_drafted. No email/phone on site. Draft in artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-0444am.md
  - 2026-04-28T12:22:50.438180+00:00 outreach heartbeat lead=de24eb30fb89: 2026-04-28 6:20 AM cycle: DC Plumbing Colorado added to CRM and advanced to outreach_drafted. Draft exists in artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-0444am.md

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 0
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-28T12:25:05.454449+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/faq-page-2026-04-28.md (9346 bytes)
- 2026-04-28T12:21:32.195448+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-0620am.md (14090 bytes)
- 2026-04-28T12:20:45.367053+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (13968 bytes)
- 2026-04-28T12:16:42.852429+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/heartbeat-2026-04-28T1215Z.md (2503 bytes)
- 2026-04-28T12:13:06.872111+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/heartbeat-2026-04-28T1208Z.md (2653 bytes)
- 2026-04-28T12:05:46.296602+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/engineering/infra-fixes-2026-04-28.md (4535 bytes)
- 2026-04-28T12:04:46.303223+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/audit-reports/2026-04-28-heartbeat-0603am.md (5048 bytes)
- 2026-04-28T12:02:20.311965+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/auditor/evidence-audit-2026-04-28.md (9784 bytes)
- 2026-04-28T12:02:01.202169+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach/prospect-verify-2026-04-28.md (12916 bytes)
- 2026-04-28T12:00:26.862552+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/about-page-audit-led-2026-04-28.md (7221 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
