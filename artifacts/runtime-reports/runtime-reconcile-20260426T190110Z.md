# OpenClaw Runtime Reconciliation

Generated: 2026-04-26T19:01:10.857926+00:00

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
  - 2026-04-26T18:39:04.901806+00:00 outreach audit_research lead=c669ec2695f2: Re-verified site (2026-04-26): believethatcarpetsupholstery.com — confirmed broken Z placeholder characters (8x Z visible on homepage), no portfolio/gallery, phone-only contact, no booking, thin content. 4-email audit-led outreach draft saved to artifacts.
  - 2026-04-26T18:37:59.627914+00:00 outreach outreach_drafted lead=fdc4a754e86d: REPLACED stale Apr 24 draft (wrong URL). New draft: artifacts/outreach-drafts/2026-04-26-mountain-view-mechanical-audit-draft.md. Site CONFIRMED DOWN (404). 4-email sequence leads with site-down urgency. URL: mvmheatingandcooling.com. 132 Google reviews — strong Maps presence, recovery is high-ROI.
  - 2026-04-26T18:37:59.627781+00:00 outreach outreach_drafted lead=c669ec2695f2: Audit-led outreach draft saved to artifacts/outreach-drafts/2026-04-26-believe-that-carpet-audit-draft.md. 4-email sequence covering: broken Z placeholder characters, no portfolio/gallery, phone-only contact (no form/booking), thin content. Contact: 719-266-2777
  - 2026-04-26T18:37:51.249923+00:00 c669ec2695f2 --type lead=--lead-id: outreach_drafted
  - 2026-04-26T18:37:51.249920+00:00 fdc4a754e86d --type lead=--lead-id: outreach_drafted

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 0
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-26T19:00:17.478969+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/engineering-notes/pre-deploy-commit-2026-04-26T1857Z.md (3133 bytes)
- 2026-04-26T19:00:10.553295+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/sample-report-page-2026-04-26.md (8596 bytes)
- 2026-04-26T18:58:12.500524+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-how-it-works-section-2026-04-26.md (3698 bytes)
- 2026-04-26T18:57:56.769975+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (5806 bytes)
- 2026-04-26T18:56:43.658389+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/mission-001-runtime-proof-20260426/scorecard.json (671 bytes)
- 2026-04-26T18:56:43.658376+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/mission-001-runtime-proof-20260426/artifacts/score-breakdown.json (810 bytes)
- 2026-04-26T18:56:43.658375+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/mission-001-runtime-proof-20260426/postmortem.md (2283 bytes)
- 2026-04-26T18:56:43.658352+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/mission-001-runtime-proof-20260426/artifacts/site-audit.md (5964 bytes)
- 2026-04-26T18:56:43.658351+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/mission-001-runtime-proof-20260426/audit.md (1615 bytes)
- 2026-04-26T18:55:28.917979+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/site-health-check-2026-04-26T1856Z.md (1454 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
