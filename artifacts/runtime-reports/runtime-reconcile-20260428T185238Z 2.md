# OpenClaw Runtime Reconciliation

Generated: 2026-04-28T18:52:38.350822+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 4, "ok": 14}`
- Failed or blocked jobs:
  - Nightly OA Ops Review (orchestrator): error cron: job execution timed out
  - Nightly OA Engineering Review (engineering): error cron: job execution timed out
  - Nightly OA Creative Review (creative): error cron: job execution timed out
  - Hourly Prospect Research (outreach): error FallbackSummaryError: All models failed (2): deepseek/deepseek-v4-flash: LLM request failed: provider rejected the request schema or tool payload. (format) | deepseek/deepseek-v4-pro: LLM request failed: provider rejected the request schema or tool payload. (format)

## CRM

- Lead stages: `{"archived": 9, "lost": 2, "negotiating": 1, "outreach_drafted": 32, "scored": 2, "won": 2}`
- Recent actions: 10 loaded
  - 2026-04-28T18:42:37.962780+00:00 --agent cleanup lead=5ffbe6a27861: --type
  - 2026-04-28T18:41:56.477207+00:00 --agent outreach lead=7301b6604b28: --type
  - 2026-04-28T18:41:56.453572+00:00 --agent outreach lead=8494028ef6ac: --type
  - 2026-04-28T18:41:50.933024+00:00 --agent outreach lead=d0a627a3a460: --type
  - 2026-04-28T17:58:05.029750+00:00 audit_draft Duplicate entry for Colorado Chiropractic — merged into 6d9a2cc7409f. Marking as archived. lead=7e101bf1549c: --agent

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 4
- incomplete_turn: 0
- telegram_socket: 2

## Recent Artifacts

- 2026-04-28T18:49:12.884499+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/heartbeat-2026-04-28T1847Z.md (1573 bytes)
- 2026-04-28T18:46:31.098056+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (7911 bytes)
- 2026-04-28T18:42:08.630517+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach/grande-prairie-blitz-2026-04-28.md (12208 bytes)
- 2026-04-28T18:40:09.675759+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/campaigns/oa-week3-campaign-plan-2026-04-28.md (12572 bytes)
- 2026-04-28T18:35:39.245871+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach/tree-company-blitz-2026-04-28.md (5784 bytes)
- 2026-04-28T18:32:22.764467+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/denver-tree-companies-2026-04-28.md (3250 bytes)
- 2026-04-28T18:32:11.850466+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/site-health-2026-04-28T1830Z.md (4418 bytes)
- 2026-04-28T18:22:03.933851+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-1220pm-CRM-actions.md (5721 bytes)
- 2026-04-28T18:21:25.450468+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-1220pm.md (10080 bytes)
- 2026-04-28T18:14:50.037546+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/2026-04-28-heartbeat.md (1850 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
