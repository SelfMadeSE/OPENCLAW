# OpenClaw Runtime Reconciliation

Generated: 2026-04-28T22:10:22.703029+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 4, "ok": 14}`
- Failed or blocked jobs:
  - Nightly OA Ops Review (orchestrator): error cron: job execution timed out
  - Nightly OA Engineering Review (engineering): error cron: job execution timed out
  - Nightly OA Creative Review (creative): error cron: job execution timed out
  - Hourly Prospect Research (outreach): error

## CRM

- Lead stages: `{"archived": 9, "lost": 2, "negotiating": 1, "outreach_drafted": 36, "prospect": 6, "scored": 2, "won": 2}`
- Recent actions: 10 loaded
  - 2026-04-28T22:09:16.584048+00:00 outreach researched lead=d66d0284f957: COS Plumbing prospect added via 4pm research cycle. AI content site. Email cosplumbing14@gmail.com verified.
  - 2026-04-28T22:09:16.560051+00:00 outreach draft_created lead=93dc098cb8f1: Logic HVAC/R — Draft in 4pm cycle. Completely blank website for Denver HVAC company. Email Logic@logichvacr.com verified. Phone (720) 863-7940. Highest urgency prospect from new research cycle.
  - 2026-04-28T22:08:49.255749+00:00 outreach researched lead=008cfdf01de9: Bronco Pro Kleen Carpet Cleaning. 339 Yelp reviews but generic template with no booking. Phone (303) 732-8577. Denver. No email found yet.
  - 2026-04-28T22:08:49.233495+00:00 outreach researched lead=478a4070a54b: Good People Tree Service. 23-person team. Contact page broken. No booking/quote system. Phone (303) 847-5221. Email info@BoulderTreeService.com found but may not be theirs. Boulder/Denver.
  - 2026-04-28T22:08:49.211538+00:00 outreach researched lead=9ac3eda23070: Skyline Landscape Design. Weebly subdomain site for landscape design company. No portfolio. Phone 970.218.8686. No email found yet (hotmail may bounce). Fort Collins.

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 2
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-28T22:09:12.478571+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-logic-hvACR-audit-draft.md (2399 bytes)
- 2026-04-28T22:07:21.842195+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/2026-04-28-prospect-research-cycle.md (6598 bytes)
- 2026-04-28T22:02:26.048122+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-3-48pm-email-discovery-report.md (2919 bytes)
- 2026-04-28T21:54:58.860054+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/account-setup/outbound-autonomy-social-profile-copy-deck.md (6113 bytes)
- 2026-04-28T21:53:01.771522+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/creative-briefs/manual-audit-worked-example-atlantic-dental-2026-04-28.md (9427 bytes)
- 2026-04-28T21:50:34.515126+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (4594 bytes)
- 2026-04-28T21:38:07.823570+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/audit-reports/heartbeat-2026-04-28T2137Z.md (2566 bytes)
- 2026-04-28T21:37:10.286756+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/account-setup/outbound-autonomy-account-checklist.md (4110 bytes)
- 2026-04-28T21:31:53.656243+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/site-health-2026-04-28T2130Z.md (5452 bytes)
- 2026-04-28T21:29:27.967507+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-prospect-targeting-criteria-2026-04-28.md (5008 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
