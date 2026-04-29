# OpenClaw Runtime Reconciliation

Generated: 2026-04-28T21:00:24.617871+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 6, "ok": 12}`
- Failed or blocked jobs:
  - Nightly OA Ops Review (orchestrator): error cron: job execution timed out
  - Nightly OA Engineering Review (engineering): error cron: job execution timed out
  - Nightly OA Creative Review (creative): error cron: job execution timed out
  - Runtime Evidence Reconciliation (auditor): error
  - Hourly Prospect Research (outreach): error FallbackSummaryError: All models failed (2): deepseek/deepseek-v4-flash: LLM request failed: provider rejected the request schema or tool payload. (format) | deepseek/deepseek-v4-pro: LLM request failed: provider rejected the request schema or tool payload. (format)
  - Hourly Outreach Draft Queue (outreach): error FallbackSummaryError: All models failed (2): deepseek/deepseek-v4-flash: LLM request failed: provider rejected the request schema or tool payload. (format) | deepseek/deepseek-v4-pro: LLM request failed: provider rejected the request schema or tool payload. (format)

## CRM

- Lead stages: `{"archived": 9, "lost": 2, "negotiating": 1, "outreach_drafted": 36, "prospect": 1, "scored": 2, "won": 2}`
- Recent actions: 10 loaded
  - 2026-04-28T20:42:36.507934+00:00 outreach draft_created lead=9e7d8c6e22b0: Colorado Garage Door Service — Draft in 0220pm batch. Contact page 404, email dj@cologaragedoor.com verified via schema. 323-char homepage. 247 emergency no online booking.
  - 2026-04-28T20:42:31.321945+00:00 outreach stage_change lead=9e7d8c6e22b0: scored → outreach_drafted: 
  - 2026-04-28T20:41:50.775716+00:00 outreach draft_updated lead=7301b6604b28: Denver Tree Company — Draft refreshed in 0220pm batch. Audit score 96/100 A-grade. Zero social proof near CTAs. 8 images missing alt text. No emergency booking.
  - 2026-04-28T20:41:50.771397+00:00 outreach draft_updated lead=8494028ef6ac: Bug Man Inc. — Draft refreshed in 0220pm batch with updated subject line and hook. 30+ named reviews but /contact/ 404. Page title targets Thornton CO instead of Denver Metro.
  - 2026-04-28T20:41:42.556824+00:00 outreach draft_created lead=5ffbe6a27861: Colorado Garage Door Service — Draft in 0220pm batch. Contact page 404, email dj@cologaragedoor.com verified via schema. 323-char homepage. No online booking.

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 8
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-28T20:49:51.425605+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (3617 bytes)
- 2026-04-28T20:48:45.256252+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/heartbeat-2026-04-28T2047Z.md (1633 bytes)
- 2026-04-28T20:32:27.059579+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/site-health-2026-04-28T2030Z.md (6412 bytes)
- 2026-04-28T20:21:18.835258+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-0220pm.md (13931 bytes)
- 2026-04-28T20:06:49.483744+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-1020am.md (21453 bytes)
- 2026-04-28T20:06:41.736465+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-0753am.md (15805 bytes)
- 2026-04-28T20:06:23.827452+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-0620am.md (14094 bytes)
- 2026-04-28T20:06:00.657207+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-1220pm.md (9079 bytes)
- 2026-04-28T20:05:32.408866+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-0920am.md (18212 bytes)
- 2026-04-28T19:49:10.186218+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-0136pm.md (8120 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
