# OpenClaw Runtime Reconciliation

Generated: 2026-04-26T18:33:29.630480+00:00

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

- Lead stages: `{"archived": 5, "outreach_drafted": 5, "outreach_sent": 2, "scored": 3}`
- Recent actions: 10 loaded
  - 2026-04-26T18:31:48.491983+00:00 outreach outreach_drafted lead=c669ec2695f2: Audit-led outreach draft completed for Believe That Carpet & Upholstery Cleaning (HOT, 73). Site audit observations: broken Z placeholder characters, no portfolio/gallery, phone-only contact, no booking, thin content vs competitors. Full 4-email sequence saved to artifacts/outreach-drafts/2026-04-26-believe-that-carpet-audit-draft.md
  - 2026-04-26T18:31:26.131085+00:00 outreach audit_research lead=c669ec2695f2: Verified site audit. believethatcarpetsupholstery.com has broken Z placeholder characters on homepage, no portfolio/gallery, no online booking, phone-only contact (no form), thin content, no review badges. Score: 73 (HOT). Contact: 719-266-2777, 6050 Stetson Hills Blvd Suite 153, Colorado Springs, CO.
  - 2026-04-26T18:29:56.144560+00:00 outreach stage_change lead=315f28b0e620: Cleaned up: SkillCatalog - stale placeholder. No contact info, no URL, zero score.
  - 2026-04-26T18:29:56.144501+00:00 outreach stage_change lead=0820dfc425e1: Cleaned up: Edunation - stale placeholder lead advanced accidentally. Not actionable — no contact info, no URL, zero score.
  - 2026-04-26T18:29:56.144451+00:00 outreach stage_change lead=d192cf575884: Cleaned up: SurgeForecast - stale placeholder. No contact info, no URL, zero score.

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 0
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-26T18:32:19.049413+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/site-health-check-2026-04-26T1830Z.md (8224 bytes)
- 2026-04-26T18:31:44.795811+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-26-believe-that-carpet-audit-draft.md (5257 bytes)
- 2026-04-26T18:27:38.641314+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (3239 bytes)
- 2026-04-26T18:26:31.512977+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/boot-check-2026-04-26T1825Z.md (2909 bytes)
- 2026-04-26T18:22:39.577576+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-26-hourly-outreach-draft-queue-1220pm.md (9551 bytes)
- 2026-04-26T18:14:15.102484+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/brand-oa/04-website-audit.md (11354 bytes)
- 2026-04-26T18:13:53.563568+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/receptionist-kill-cleanup-2026-04-26.md (8051 bytes)
- 2026-04-26T18:13:23.508659+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/proof-assets-sprint-2026-04-23.md (4579 bytes)
- 2026-04-26T18:13:23.508590+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/creative-briefs/homepage-hero-2026-04-27.md (2955 bytes)
- 2026-04-26T18:13:03.279451+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/receptionist-kill-cleanup-2026-04-26.md (5816 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
