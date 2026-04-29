# OpenClaw Runtime Reconciliation

Generated: 2026-04-28T22:30:14.284603+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 4, "ok": 14}`
- Failed or blocked jobs:
  - Nightly OA Ops Review (orchestrator): error cron: job execution timed out
  - Nightly OA Engineering Review (engineering): error cron: job execution timed out
  - Nightly OA Creative Review (creative): error cron: job execution timed out
  - Hourly Outreach Draft Queue (outreach): error FallbackSummaryError: All models failed (2): deepseek/deepseek-v4-flash: LLM request failed: provider rejected the request schema or tool payload. (format) | deepseek/deepseek-v4-pro: LLM request failed: provider rejected the request schema or tool payload. (format)

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
- bootstrap_truncated: 10
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-28T22:23:10.119809+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-0420pm-CRM-actions.md (3083 bytes)
- 2026-04-28T22:22:40.129025+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-0420pm.md (8690 bytes)
- 2026-04-28T22:21:49.991432+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (7974 bytes)
- 2026-04-28T22:17:18.691106+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/distribution-plans/heartbeat-status-2026-04-28.md (1207 bytes)
- 2026-04-28T22:16:21.363542+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/beeline-pest-control-20260429-011600_website_audit_research_2026-04-29_011621.json (1154 bytes)
- 2026-04-28T22:16:21.363452+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/dentech-heating--air-conditioning-20260429-011600_website_audit_research_2026-04-29_011621.json (1255 bytes)
- 2026-04-28T22:16:21.363364+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/paint-right-denver-20260429-011600_website_audit_research_2026-04-29_011621.json (1151 bytes)
- 2026-04-28T22:16:21.363269+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/hard-launch-digital-20260429-011600_website_audit_research_2026-04-29_011621.json (1652 bytes)
- 2026-04-28T22:16:21.363151+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/truecoat-painters-20260429-011600_website_audit_research_2026-04-29_011621.json (1286 bytes)
- 2026-04-28T22:12:04.162362+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/site-health-2026-04-28T2210Z.md (7236 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
