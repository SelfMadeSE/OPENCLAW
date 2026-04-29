# OpenClaw Runtime Reconciliation

Generated: 2026-04-26T18:07:49.744582+00:00

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

- 2026-04-26T18:07:48.500553+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/receptionist-kill-cleanup-2026-04-26.md (10374 bytes)
- 2026-04-26T18:07:31.085239+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/receptionist-kill-cross-agent-sweep-2026-04-26.md (24052 bytes)
- 2026-04-26T18:06:59.440058+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/receptionist-kill-cleanup-2026-04-26.md (11358 bytes)
- 2026-04-26T18:06:53.904842+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/linkedin-audit-funnel-content-strategy-2026-04-26.md (20001 bytes)
- 2026-04-26T18:06:48.977699+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/oa-roundtable-r1-2026-04-23.md (10567 bytes)
- 2026-04-26T18:06:48.977698+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/oa-roundtable-r3-2026-04-23.md (11397 bytes)
- 2026-04-26T18:06:48.977695+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/oa-roundtable-r2-2026-04-23.md (18665 bytes)
- 2026-04-26T18:06:48.601906+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/audit-to-proposal-bridge-2026-04-26.md (10823 bytes)
- 2026-04-26T18:06:41.221022+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/receptionist-kill-cleanup-2026-04-26.md (3763 bytes)
- 2026-04-26T18:06:33.751137+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-verification-2026-04-22.md (681 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
