# OpenClaw Runtime Reconciliation

Generated: 2026-04-26T16:05:30.038433+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 9, "ok": 9}`
- Failed or blocked jobs:
  - Nightly OA Ops Review (orchestrator): error GatewayDrainingError: Gateway is draining for restart; new tasks are not accepted
  - Nightly OA Engineering Review (engineering): error GatewayDrainingError: Gateway is draining for restart; new tasks are not accepted
  - Nightly OA Creative Review (creative): error GatewayDrainingError: Gateway is draining for restart; new tasks are not accepted
  - Nightly OA Marketing Review (marketing): error GatewayDrainingError: Gateway is draining for restart; new tasks are not accepted
  - Nightly OA Outreach Review (outreach): error GatewayDrainingError: Gateway is draining for restart; new tasks are not accepted
  - Nightly OA Media Review (media): error GatewayDrainingError: Gateway is draining for restart; new tasks are not accepted
  - Nightly OA Audit Review (auditor): error GatewayDrainingError: Gateway is draining for restart; new tasks are not accepted
  - Hourly Prospect Research (outreach): error GatewayDrainingError: Gateway is draining for restart; new tasks are not accepted

## CRM

- Lead stages: `{"outreach_drafted": 3, "prospect": 4, "researched": 5, "scored": 1}`
- Recent actions: 10 loaded
  - 2026-04-24T18:38:00.156874+00:00 --action-type outreach_draft lead=rosen--schneider-20260424-121214: --description
  - 2026-04-24T18:37:54.651322+00:00 --action-type outreach_draft lead=denver-digital-20260424-121214: --description
  - 2026-04-24T18:37:50.541385+00:00 --action-type outreach_draft lead=absolute-carpet-care-20260424-121214: --description
  - 2026-04-24T18:37:45.954983+00:00 --action-type outreach_draft lead=colorados-best-roofing-20260424-121214: --description
  - 2026-04-24T18:37:40.310904+00:00 --action-type outreach_draft lead=skyline-heating-20260424-121214: --description

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 0
- incomplete_turn: 0
- telegram_socket: 1

## Recent Artifacts

- 2026-04-26T16:03:57.500279+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/oa-audit-funnel-evidence-gap-report-2026-04-26.md (8049 bytes)
- 2026-04-26T16:02:56.133652+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/oa-audit-intake-market-context-spec-2026-04-26.md (12707 bytes)
- 2026-04-26T16:02:10.462153+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/outbound-autonomy-audit-funnel-offer-brief-2026-04-26.md (11133 bytes)
- 2026-04-26T16:01:57.451303+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/oa-audit-deliverable-package.md (12213 bytes)
- 2026-04-26T16:01:04.805118+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/site-health-check-2026-04-26T1557Z.md (4637 bytes)
- 2026-04-26T15:59:09.698415+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/tmp/20260426T1557Z/summary.txt (278 bytes)
- 2026-04-26T15:59:09.077365+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/tmp/20260426T1557Z/api_post_notaurl.body (37 bytes)
- 2026-04-26T15:59:09.068766+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/tmp/20260426T1557Z/headers.txt (3743 bytes)
- 2026-04-26T15:59:08.699596+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/tmp/20260426T1557Z/api_post_empty.body (27 bytes)
- 2026-04-26T15:59:08.408720+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/tmp/20260426T1557Z/api_post_example.body (3274 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
