# OpenClaw Runtime Reconciliation

Generated: 2026-04-26T18:00:20.253655+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 7, "ok": 11}`
- Failed or blocked jobs:
  - Nightly OA Ops Review (orchestrator): error GatewayDrainingError: Gateway is draining for restart; new tasks are not accepted
  - Nightly OA Engineering Review (engineering): error GatewayDrainingError: Gateway is draining for restart; new tasks are not accepted
  - Nightly OA Creative Review (creative): error GatewayDrainingError: Gateway is draining for restart; new tasks are not accepted
  - Nightly OA Marketing Review (marketing): error GatewayDrainingError: Gateway is draining for restart; new tasks are not accepted
  - Nightly OA Outreach Review (outreach): error GatewayDrainingError: Gateway is draining for restart; new tasks are not accepted
  - Nightly OA Media Review (media): error GatewayDrainingError: Gateway is draining for restart; new tasks are not accepted
  - Nightly OA Audit Review (auditor): error GatewayDrainingError: Gateway is draining for restart; new tasks are not accepted

## CRM

- Lead stages: `{"archived": 5, "outreach_drafted": 3, "prospect": 1, "researched": 2, "scored": 3}`
- Recent actions: 10 loaded
  - 2026-04-26T17:19:24.740328+00:00 outreach stage_change lead=89f5b4ff40e5: outreach_drafted → archived: Libredesk - not ICP. Open source helpdesk, not local service business.
  - 2026-04-26T17:19:24.739810+00:00 outreach stage_change lead=76075c574957: prospect → archived: Dirty name field (--name / Mountain View HVAC). Clean duplicate of Mountain View Mechanical (fdc4a754e86d).
  - 2026-04-26T17:19:24.735524+00:00 outreach stage_change lead=b407ec1a5f8c: researched → archived: Dirty placeholder name (--name / Ben Dansby). Contact info preserved but not ICP.
  - 2026-04-26T17:19:24.734948+00:00 outreach stage_change lead=2ae4e291902c: prospect → archived: Out of scope: beat-promotion is not Outbound Autonomy ICP per mission lock
  - 2026-04-26T17:19:24.733942+00:00 outreach stage_change lead=6ab99d5ca78e: prospect → archived: Dirty placeholder data (name=--name, type=Libredesk). No real prospect.

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 0
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-26T17:56:42.561248+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (5269 bytes)
- 2026-04-26T17:55:14.568748+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-audit-funnel-social-series-2026-04-26.md (8529 bytes)
- 2026-04-26T17:40:50.886216+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/distribution-plans/outbound-autonomy-vertical-versioning-sheet-2026-04-26.md (10755 bytes)
- 2026-04-26T17:38:27.884180+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/heartbeat-2026-04-26-1737UTC.md (2796 bytes)
- 2026-04-26T17:32:11.146661+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/site-health-check-2026-04-26T1730Z.md (6344 bytes)
- 2026-04-26T17:23:06.540978+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-26-hourly-outreach-draft-queue-1120am.md (7777 bytes)
- 2026-04-26T17:07:54.934546+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/denver-roofing-co-20260426-110754_website_audit_2026-04-26_110754.json (1286 bytes)
- 2026-04-26T17:07:54.933303+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/the-weather-changers-20260426-110754_website_audit_2026-04-26_110754.json (1155 bytes)
- 2026-04-26T17:07:54.931060+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/denver-lawn--landscape-20260426-110754_website_audit_2026-04-26_110754.json (1254 bytes)
- 2026-04-26T17:07:54.931058+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/dc-plumbing-colorado-20260426-110754_website_audit_2026-04-26_110754.json (1175 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
