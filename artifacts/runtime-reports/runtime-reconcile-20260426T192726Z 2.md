# OpenClaw Runtime Reconciliation

Generated: 2026-04-26T19:27:26.125768+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 8, "ok": 10}`
- Failed or blocked jobs:
  - Nightly OA Ops Review (orchestrator): error GatewayDrainingError: Gateway is draining for restart; new tasks are not accepted
  - Nightly OA Engineering Review (engineering): error GatewayDrainingError: Gateway is draining for restart; new tasks are not accepted
  - Nightly OA Creative Review (creative): error GatewayDrainingError: Gateway is draining for restart; new tasks are not accepted
  - Nightly OA Marketing Review (marketing): error GatewayDrainingError: Gateway is draining for restart; new tasks are not accepted
  - Nightly OA Outreach Review (outreach): error GatewayDrainingError: Gateway is draining for restart; new tasks are not accepted
  - Nightly OA Media Review (media): error GatewayDrainingError: Gateway is draining for restart; new tasks are not accepted
  - Nightly OA Audit Review (auditor): error GatewayDrainingError: Gateway is draining for restart; new tasks are not accepted
  - Hourly Prospect Research (outreach): error FallbackSummaryError: All models failed (2): deepseek/deepseek-v4-flash: LLM request failed: provider rejected the request schema or tool payload. (format) | deepseek/deepseek-v4-pro: LLM request failed: provider rejected the request schema or tool payload. (format)

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

- 2026-04-26T19:26:44.443181+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/publishing-queue/outbound-autonomy-14-post-copy-deck-2026-04-26.md (14207 bytes)
- 2026-04-26T19:26:13.711487+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/engineering-notes/competitive-gap-task-2026-04-26.md (1541 bytes)
- 2026-04-26T19:25:03.680518+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-26-hourly-outreach-draft-queue-120pm.md (14285 bytes)
- 2026-04-26T19:24:39.015273+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/mission-001-runtime-connectivity-proof/nexus-summary.md (2366 bytes)
- 2026-04-26T19:24:39.015271+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/mission-001-runtime-connectivity-proof/postmortem.md (2812 bytes)
- 2026-04-26T19:24:39.015271+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/mission-001-runtime-connectivity-proof/sentinel-audit.md (3406 bytes)
- 2026-04-26T19:24:10.130029+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/pricing-page-audit-led-2026-04-26.md (7536 bytes)
- 2026-04-26T19:23:34.294512+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/mission-001-runtime-connectivity-proof/memory-read-evidence.md (2574 bytes)
- 2026-04-26T19:23:34.294511+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/mission-001-runtime-connectivity-proof/subagent-log-index.md (2045 bytes)
- 2026-04-26T19:23:34.294510+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/mission-001-runtime-connectivity-proof/memory-write-evidence.md (1322 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
