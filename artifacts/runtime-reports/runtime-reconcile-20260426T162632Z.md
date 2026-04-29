# OpenClaw Runtime Reconciliation

Generated: 2026-04-26T16:26:32.835794+00:00

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

- Lead stages: `{"outreach_drafted": 4, "prospect": 4, "researched": 5, "scored": 1}`
- Recent actions: 10 loaded
  - 2026-04-26T16:08:47.306464+00:00 outreach stage_change lead=fdc4a754e86d: scored → outreach_drafted: Audit-led outreach draft completed and saved to workspaces/outreach/artifacts/outreach-drafts/2026-04-26-mountain-view-mechanical-audit-draft.md
  - 2026-04-26T16:08:41.063125+00:00 outreach audit_research lead=fdc4a754e86d: Verified current run issue: Google listing ranks, but https://www.mvmheatingandcooling.com/ shows a public unavailable page. Drafted audit-led outreach and saved artifact at workspaces/outreach/artifacts/outreach-drafts/2026-04-26-mountain-view-mechanical-audit-draft.md
  - 2026-04-24T18:38:00.156874+00:00 --action-type outreach_draft lead=rosen--schneider-20260424-121214: --description
  - 2026-04-24T18:37:54.651322+00:00 --action-type outreach_draft lead=denver-digital-20260424-121214: --description
  - 2026-04-24T18:37:50.541385+00:00 --action-type outreach_draft lead=absolute-carpet-care-20260424-121214: --description

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 0
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-26T16:21:54.662601+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-26-hourly-outreach-draft-queue-1020am.md (6326 bytes)
- 2026-04-26T16:18:22.017742+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/distribution-plans/outbound-autonomy-audit-offer-adaptation-plan-2026-04-26.md (5193 bytes)
- 2026-04-26T16:15:16.393104+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/creative-briefs/oa-audit-flow-visual-brief-2026-04-26.md (5087 bytes)
- 2026-04-26T16:14:26.618058+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/campaigns/oa-audit-led-cta-stack-2026-04-26.md (4103 bytes)
- 2026-04-26T16:09:49.063829+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/site-health-check-2026-04-26T1606Z.md (5047 bytes)
- 2026-04-26T16:08:26.674828+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-26-mountain-view-mechanical-audit-draft.md (2551 bytes)
- 2026-04-26T16:07:52.522364+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/tmp/20260426T1606Z/api_audit_post_invalid.meta (64 bytes)
- 2026-04-26T16:07:52.520325+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/tmp/20260426T1606Z/api_audit_post_invalid.body (37 bytes)
- 2026-04-26T16:07:52.519712+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/tmp/20260426T1606Z/api_audit_post_invalid.headers (398 bytes)
- 2026-04-26T16:07:51.925585+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/tmp/20260426T1606Z/api_audit_post_empty.meta (64 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
