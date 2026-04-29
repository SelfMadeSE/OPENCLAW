# OpenClaw Runtime Reconciliation

Generated: 2026-04-28T10:23:26.548691+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 14, "ok": 4}`
- Failed or blocked jobs:
  - Daily Outbound Autonomy Audit-Funnel Content (marketing): error cron: job execution timed out
  - Nightly OA Ops Review (orchestrator): error cron: job execution timed out
  - Nightly OA Engineering Review (engineering): error cron: job execution timed out
  - Nightly OA Creative Review (creative): error cron: job execution timed out
  - Nightly OA Marketing Review (marketing): error
  - Nightly OA Outreach Review (outreach): error
  - Nightly OA Media Review (media): error
  - Nightly OA Audit Review (auditor): error

## CRM

- Lead stages: `{"archived": 5, "outreach_drafted": 4, "outreach_sent": 2, "responded": 2, "scored": 2}`
- Recent actions: 10 loaded
  - 2026-04-26T19:20:20.660201+00:00 outreach stage_change lead=d192cf575884: Archived: stale placeholder — score 0, no URL, no contact info.
  - 2026-04-26T19:20:20.573268+00:00 outreach stage_change lead=315f28b0e620: Archived: stale placeholder — score 0, no URL, no contact info.
  - 2026-04-26T19:20:20.472481+00:00 outreach stage_change lead=1daad68ebd8c: Archived: stale placeholder — score 0, no URL, no contact info.
  - 2026-04-26T19:20:20.389984+00:00 outreach stage_change lead=0820dfc425e1: Archived: stale placeholder — score 0, no URL, no contact info.
  - 2026-04-26T19:20:20.302871+00:00 outreach stage_change lead=42edd05bfa3c: Archived: stale placeholder — score 0, no URL, no contact info, no action taken.

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 0
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-28T10:21:40.426881+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (4096 bytes)
- 2026-04-28T10:20:32.606707+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/outbound-autonomy/review-audit-funnel-2026-04-28.md (12382 bytes)
- 2026-04-26T19:31:44.913635+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/site-health-check-2026-04-26T1930Z.md (4016 bytes)
- 2026-04-26T19:28:09.416075+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/audit-reports/boot-audit-2026-04-26.md (6147 bytes)
- 2026-04-26T19:26:44.443181+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/publishing-queue/outbound-autonomy-14-post-copy-deck-2026-04-26.md (14207 bytes)
- 2026-04-26T19:26:13.711487+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/engineering-notes/competitive-gap-task-2026-04-26.md (1541 bytes)
- 2026-04-26T19:25:03.680518+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-26-hourly-outreach-draft-queue-120pm.md (14285 bytes)
- 2026-04-26T19:24:39.015273+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/mission-001-runtime-connectivity-proof/nexus-summary.md (2366 bytes)
- 2026-04-26T19:24:39.015271+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/mission-001-runtime-connectivity-proof/postmortem.md (2812 bytes)
- 2026-04-26T19:24:39.015271+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/mission-001-runtime-connectivity-proof/sentinel-audit.md (3406 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
