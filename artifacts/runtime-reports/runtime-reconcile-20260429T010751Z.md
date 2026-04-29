# OpenClaw Runtime Reconciliation

Generated: 2026-04-29T01:07:51.078643+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 4, "ok": 14}`
- Failed or blocked jobs:
  - Nightly OA Ops Review (orchestrator): error cron: job execution timed out
  - Nightly OA Engineering Review (engineering): error cron: job execution timed out
  - Nightly OA Creative Review (creative): error cron: job execution timed out
  - Hourly Prospect Research (outreach): error

## CRM

- Lead stages: `{"archived": 9, "lost": 2, "negotiating": 1, "outreach_drafted": 44, "prospect": 1, "scored": 2, "won": 2}`
- Recent actions: 10 loaded
  - 2026-04-29 01:07:36 outreach draft_created lead=f379ad620e03: Junk Genius — Draft created. Template-driven site, weak value prop positioning, eco-friendly messaging buried, no social proof/before-after. Email denver@junkgenius.com verified.
  - 2026-04-29 01:07:17 outreach draft_created lead=ad6437f223b0: Hard Launch Digital — Draft created. Repetitive content on homepage, no case studies/portfolio shown. Email hello@hardlaunchdigital.com verified.
  - 2026-04-29 01:07:10 outreach draft_created lead=8a39b1859dda: Denver Legal Marketing — Draft created. Site copyright 2016 (2020 shown), single-page, no case studies. Email meranda@denverlegalmarketing.com verified.
  - 2026-04-28T22:49:06.877979+00:00 outreach email_discovered lead=f3d30c5793d5: Email info@harmonypaintingdenver.com + contact@harmonypaintingdenver.com verified (250 OK via Gmail MX). Divi/WP site with no online booking.
  - 2026-04-28T22:49:06.877979+00:00 outreach email_discovered lead=c91f11b895e6: Email denverconcierge@gmail.com found (Gmail account, not domain email). 25yr cleaning co, contact page 500 error.

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 4
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-29T01:05:45.328804+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/social-media/linkedin-audit-wedge-calendar-2026-04-28.md (18017 bytes)
- 2026-04-29T00:57:19.527034+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/distribution-plans/heartbeat-status-2026-04-28-3.md (1119 bytes)
- 2026-04-29T00:55:24.583675+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-grande-prairie-prospect-assessment-2026-04-29.md (8733 bytes)
- 2026-04-29T00:46:38.152304+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (10730 bytes)
- 2026-04-29T00:27:01.317428+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/creative-briefs/first-email-ask-atlantic-dental-2026-04-28.md (3450 bytes)
- 2026-04-29T00:24:40.447424+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-0620pm-CRM-actions.md (7228 bytes)
- 2026-04-29T00:23:43.200672+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-0620pm.md (14058 bytes)
- 2026-04-29T00:21:19.006565+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-lighthouse-fallbacks-deployed-2026-04-28.md (2659 bytes)
- 2026-04-29T00:09:00.197741+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/denver-handyman-pros-20260429-030900_website_audit_research_2026-04-29_030900.json (1184 bytes)
- 2026-04-29T00:09:00.195253+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/denver-legal-marketing-20260429-030900_website_audit_research_2026-04-29_030900.json (1149 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
