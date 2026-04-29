# OpenClaw Runtime Reconciliation

Generated: 2026-04-28T11:19:57.726199+00:00

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

- Lead stages: `{"archived": 5, "lost": 2, "negotiating": 1, "outreach_drafted": 3, "scored": 2, "won": 2}`
- Recent actions: 10 loaded
  - 2026-04-28T11:12:54.673224+00:00 outreach heartbeat lead=fdc4a754e86d: 2026-04-28 heartbeat: draft still current. outboundautonomy.com now audit-led (was SaaS). Awaiting Rylee approval.
  - 2026-04-28T10:34:59.688733+00:00 outreach heartbeat lead=c01e9dc7a1de: 2026-04-28 heartbeat: still flagged — weak audit fit. Awaiting Rylee decision.
  - 2026-04-28T10:34:59.665855+00:00 outreach heartbeat lead=1ba89e50a7a5: 2026-04-28 heartbeat: still flagged — not ICP, no URL/contact. Awaiting Rylee decision.
  - 2026-04-28T10:34:59.645429+00:00 outreach heartbeat lead=2c7aca0f9ca5: 2026-04-28 heartbeat: draft still current. Awaiting Rylee approval to queue for send.
  - 2026-04-28T10:34:59.624637+00:00 outreach heartbeat lead=c669ec2695f2: 2026-04-28 heartbeat: draft still current. Awaiting Rylee approval to queue for send.

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 0
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-28T11:19:14.431659+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/audit-reports/2026-04-28-heartbeat-0518am.md (3162 bytes)
- 2026-04-28T11:02:44.285003+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/site-health-2026-04-28T1100Z.md (5845 bytes)
- 2026-04-28T10:51:00.383160+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (8177 bytes)
- 2026-04-28T10:50:12.071447+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/outbound-autonomy/SHARED-STATE.md (4600 bytes)
- 2026-04-28T10:46:24.084111+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-0444am.md (11564 bytes)
- 2026-04-28T10:46:20.029541+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/outbound-autonomy/email-outreach-templates.md (10794 bytes)
- 2026-04-28T10:35:59.795633+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/audit-led-outreach-templates-2026-04-28.md (5685 bytes)
- 2026-04-28T10:29:55.203079+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/account-setup/outbound-autonomy-account-checklist.md (4096 bytes)
- 2026-04-28T10:28:10.381100+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/social-media/carousel-what-tools-miss-2026-04-26.md (7247 bytes)
- 2026-04-28T10:26:19.034910+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/auditor/2026-04-28-sweep.md (9570 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
