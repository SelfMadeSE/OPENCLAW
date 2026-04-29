# OpenClaw Runtime Reconciliation

Generated: 2026-04-29T03:15:23.332647+00:00

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
  - 2026-04-29T02:59:56.602076+00:00 outreach email_discovered lead=e7db265f63f0: Strong Heating: email office@strongheatingcooling.com found via JSON-LD schema markup on their site. MX records verified (Google). Phone: 719-960-7208 from schema.
  - 2026-04-29T02:24:55.854720+00:00 action_type=draft_created description=Good People Tree Service — Draft created. Single-page site with no service pages, no portfolio/gallery, no booking. Email office@goodpeopletreeservice.com verified. Promoted to outreach_drafted. lead=lead_id=478a4070a54b: result=draft_created
  - 2026-04-29T02:24:55.854718+00:00 action_type=draft_created description=Denver Concierge — Draft created. Dated WordPress site, award from 2016 highlighted, no online booking, Gmail contact instead of domain email. Email denverconcierge@gmail.com verified. lead=lead_id=c91f11b895e6: result=draft_created
  - 2026-04-29T02:24:55.854718+00:00 action_type=draft_created description=Bronco Pro Kleen — Draft created. Generic template site with keyword-stuffed content, no before/after gallery, no booking. Email contact@broncoprokleen.com verified. lead=lead_id=008cfdf01de9: result=draft_created
  - 2026-04-29T01:46:09.885387+00:00 c91f11b895e6 --action-type lead=--lead-id: email_discovered

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 2
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-29T03:15:00.630300+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/site-health-check-2026-04-28T2110MDT.md (3813 bytes)
- 2026-04-29T03:10:58.380454+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/campaigns/oa-gmail-app-password-guide-2026-04-28.md (3682 bytes)
- 2026-04-29T03:10:15.269501+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-try-page-inbound-nurture-sequence-2026-04-28.md (6377 bytes)
- 2026-04-29T03:02:59.004372+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/distribution-plans/heartbeat-status-2026-04-28-6.md (930 bytes)
- 2026-04-29T03:02:04.577987+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/creative-briefs/oa-execution-roadmap-2026-04-28.md (7627 bytes)
- 2026-04-29T03:01:49.312227+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/site-health-check-2026-04-28T2100MDT.md (6636 bytes)
- 2026-04-29T02:46:55.328757+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (9461 bytes)
- 2026-04-29T02:35:45.734921+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-week1-day3-day5-email-bridge-2026-04-28.md (6684 bytes)
- 2026-04-29T02:22:52.345154+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/legal-pages-privacy-tos-cookie-2026-04-28.md (7323 bytes)
- 2026-04-29T02:22:50.140038+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-0820pm-CRM-actions.md (7255 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
