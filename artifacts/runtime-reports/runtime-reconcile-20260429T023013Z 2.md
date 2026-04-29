# OpenClaw Runtime Reconciliation

Generated: 2026-04-29T02:30:12.950597+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 4, "ok": 14}`
- Failed or blocked jobs:
  - Nightly OA Ops Review (orchestrator): error cron: job execution timed out
  - Nightly OA Engineering Review (engineering): error cron: job execution timed out
  - Nightly OA Creative Review (creative): error cron: job execution timed out
  - Hourly Prospect Research (outreach): error FallbackSummaryError: All models failed (2): deepseek/deepseek-v4-flash: LLM request failed: provider rejected the request schema or tool payload. (format) | deepseek/deepseek-v4-pro: LLM request failed: provider rejected the request schema or tool payload. (format)

## CRM

- Lead stages: `{"archived": 9, "lost": 2, "negotiating": 1, "outreach_drafted": 44, "prospect": 1, "scored": 2, "won": 2}`
- Recent actions: 10 loaded
  - 2026-04-29T02:24:55.854720+00:00 action_type=draft_created description=Good People Tree Service — Draft created. Single-page site with no service pages, no portfolio/gallery, no booking. Email office@goodpeopletreeservice.com verified. Promoted to outreach_drafted. lead=lead_id=478a4070a54b: result=draft_created
  - 2026-04-29T02:24:55.854718+00:00 action_type=draft_created description=Denver Concierge — Draft created. Dated WordPress site, award from 2016 highlighted, no online booking, Gmail contact instead of domain email. Email denverconcierge@gmail.com verified. lead=lead_id=c91f11b895e6: result=draft_created
  - 2026-04-29T02:24:55.854718+00:00 action_type=draft_created description=Bronco Pro Kleen — Draft created. Generic template site with keyword-stuffed content, no before/after gallery, no booking. Email contact@broncoprokleen.com verified. lead=lead_id=008cfdf01de9: result=draft_created
  - 2026-04-29T01:46:09.885387+00:00 c91f11b895e6 --action-type lead=--lead-id: email_discovered
  - 2026-04-29 01:07:36 outreach draft_created lead=f379ad620e03: Junk Genius — Draft created. Template-driven site, weak value prop positioning, eco-friendly messaging buried, no social proof/before-after. Email denver@junkgenius.com verified.

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 2
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-29T02:22:52.345154+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/legal-pages-privacy-tos-cookie-2026-04-28.md (7323 bytes)
- 2026-04-29T02:22:50.140038+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-0820pm-CRM-actions.md (7255 bytes)
- 2026-04-29T02:22:22.198684+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-0820pm.md (10606 bytes)
- 2026-04-29T02:21:09.279784+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (5121 bytes)
- 2026-04-29T02:17:20.657821+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/distribution-plans/heartbeat-status-2026-04-28-5.md (855 bytes)
- 2026-04-29T02:03:11.828804+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-grande-prairie-prospect-assessment-v2-2026-04-28.md (9054 bytes)
- 2026-04-29T01:48:15.997348+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/how-it-works-page-2026-04-28.md (7259 bytes)
- 2026-04-29T01:38:00.645912+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/distribution-plans/heartbeat-status-2026-04-28-4.md (855 bytes)
- 2026-04-29T01:29:27.036696+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-blog-post-service-business-website-leads-2026-04-28.md (8153 bytes)
- 2026-04-29T01:28:59.706977+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-alpine-hvac-personalized-outreach-2026-04-28.md (3961 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
