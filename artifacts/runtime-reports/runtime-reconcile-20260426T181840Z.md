# OpenClaw Runtime Reconciliation

Generated: 2026-04-26T18:18:40.597804+00:00

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

- Lead stages: `{"archived": 5, "outreach_drafted": 4, "researched": 1, "scored": 4}`
- Recent actions: 10 loaded
  - 2026-04-26T18:04:34.701654+00:00 outreach archive lead=42edd05bfa3c: Archiving Joe's Pizza Shop — placeholder lead, no real contact info or research. Created Apr 18, never researched. Not actionable.
  - 2026-04-26T18:04:31.138638+00:00 outreach outreach_drafted lead=2c7aca0f9ca5: Audit-led outreach draft completed for Val Sopi (Blogmaker / Handmade Spaceships). Audit observation: handmadespaceships.com has zero visual portfolio, lists sunsetted products, no lead capture CTA. Full 4-email sequence saved to artifacts/outreach-drafts/2026-06-26-val-sopi-handmade-spaceships-audit-draft.md
  - 2026-04-26T17:19:24.740328+00:00 outreach stage_change lead=89f5b4ff40e5: outreach_drafted → archived: Libredesk - not ICP. Open source helpdesk, not local service business.
  - 2026-04-26T17:19:24.739810+00:00 outreach stage_change lead=76075c574957: prospect → archived: Dirty name field (--name / Mountain View HVAC). Clean duplicate of Mountain View Mechanical (fdc4a754e86d).
  - 2026-04-26T17:19:24.735524+00:00 outreach stage_change lead=b407ec1a5f8c: researched → archived: Dirty placeholder name (--name / Ben Dansby). Contact info preserved but not ICP.

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 0
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-26T18:16:49.242846+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (3549 bytes)
- 2026-04-26T18:14:15.102484+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/brand-oa/04-website-audit.md (11354 bytes)
- 2026-04-26T18:13:53.563568+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/receptionist-kill-cleanup-2026-04-26.md (8051 bytes)
- 2026-04-26T18:13:23.508659+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/proof-assets-sprint-2026-04-23.md (4579 bytes)
- 2026-04-26T18:13:23.508590+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/creative-briefs/homepage-hero-2026-04-27.md (2955 bytes)
- 2026-04-26T18:13:03.279451+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/receptionist-kill-cleanup-2026-04-26.md (5816 bytes)
- 2026-04-26T18:12:53.522725+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/distribution-plans/outbound-autonomy-audit-content-plan.md (8864 bytes)
- 2026-04-26T18:11:58.902670+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/payless-rooter-20260426-121158_website_audit_research_2026-04-26_121158.json (1196 bytes)
- 2026-04-26T18:11:58.902354+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/royal-services-plumbing-heating--air-20260426-121158_website_audit_research_2026-04-26_121158.json (1158 bytes)
- 2026-04-26T18:11:58.902161+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/berry-best-plumbing-20260426-121158_website_audit_research_2026-04-26_121158.json (1054 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
