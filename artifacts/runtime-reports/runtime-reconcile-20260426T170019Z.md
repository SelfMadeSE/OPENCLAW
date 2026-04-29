# OpenClaw Runtime Reconciliation

Generated: 2026-04-26T17:00:19.489521+00:00

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
  - Hourly Prospect Research (outreach): error FallbackSummaryError: All models failed (2): deepseek/deepseek-v4-flash: HTTP 401: Authentication Fails, Your api key: ****_key is invalid (auth) | deepseek/deepseek-v4-pro: HTTP 401: Authentication Fails, Your api key: ****_key is invalid (auth)

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

- 2026-04-26T16:57:35.045983+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/publishing-queue/outbound-autonomy-posting-calendar.md (4028 bytes)
- 2026-04-26T16:47:55.640947+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-audit-report-score-copy-2026-04-26.md (5407 bytes)
- 2026-04-26T16:34:15.012178+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/site-health-check-2026-04-26T1631Z.md (4960 bytes)
- 2026-04-26T16:32:48.275523+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/tmp/20260426T1631Z/_listing.txt (2373 bytes)
- 2026-04-26T16:32:48.269984+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/tmp/20260426T1631Z/recent_site_health_artifacts.txt (3059 bytes)
- 2026-04-26T16:32:48.262866+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/tmp/20260426T1631Z/recent_outbound_artifacts.txt (1807 bytes)
- 2026-04-26T16:32:48.255072+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/tmp/20260426T1631Z/api_audit_post_invalid.meta (9 bytes)
- 2026-04-26T16:32:48.245044+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/tmp/20260426T1631Z/api_audit_post_invalid.body (37 bytes)
- 2026-04-26T16:32:48.244578+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/tmp/20260426T1631Z/api_audit_post_invalid.headers (398 bytes)
- 2026-04-26T16:32:47.953355+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/tmp/20260426T1631Z/api_audit_post_empty.meta (9 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
