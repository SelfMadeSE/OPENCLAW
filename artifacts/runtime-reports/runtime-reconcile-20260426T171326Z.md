# OpenClaw Runtime Reconciliation

Generated: 2026-04-26T17:13:26.676338+00:00

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
  - Hourly Agent Roundtable Audit (orchestrator): error FailoverError: HTTP 401: Authentication Fails, Your api key: ****_key is invalid

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

- 2026-04-26T17:07:54.934546+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/denver-roofing-co-20260426-110754_website_audit_2026-04-26_110754.json (1286 bytes)
- 2026-04-26T17:07:54.933303+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/the-weather-changers-20260426-110754_website_audit_2026-04-26_110754.json (1155 bytes)
- 2026-04-26T17:07:54.931060+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/denver-lawn--landscape-20260426-110754_website_audit_2026-04-26_110754.json (1254 bytes)
- 2026-04-26T17:07:54.931058+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/dc-plumbing-colorado-20260426-110754_website_audit_2026-04-26_110754.json (1175 bytes)
- 2026-04-26T17:07:54.930881+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/atlantic-dental-20260426-110754_website_audit_2026-04-26_110754.json (1159 bytes)
- 2026-04-26T17:02:45.124591+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/site-health-check-2026-04-26T1702Z.md (6571 bytes)
- 2026-04-26T16:57:35.045983+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/publishing-queue/outbound-autonomy-posting-calendar.md (4028 bytes)
- 2026-04-26T16:47:55.640947+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-audit-report-score-copy-2026-04-26.md (5407 bytes)
- 2026-04-26T16:34:15.012178+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/site-health-check-2026-04-26T1631Z.md (4960 bytes)
- 2026-04-26T16:32:48.275523+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/tmp/20260426T1631Z/_listing.txt (2373 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
