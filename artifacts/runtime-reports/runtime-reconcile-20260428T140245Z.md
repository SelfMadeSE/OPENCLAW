# OpenClaw Runtime Reconciliation

Generated: 2026-04-28T14:02:45.946356+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 6, "ok": 12}`
- Failed or blocked jobs:
  - Daily Outbound Autonomy Audit-Funnel Content (marketing): error cron: job execution timed out
  - Nightly OA Ops Review (orchestrator): error cron: job execution timed out
  - Nightly OA Engineering Review (engineering): error cron: job execution timed out
  - Nightly OA Creative Review (creative): error cron: job execution timed out
  - Morning Mission Snapshot (orchestrator): error
  - Hourly Prospect Research (outreach): error FallbackSummaryError: All models failed (2): deepseek/deepseek-v4-flash: LLM request failed: provider rejected the request schema or tool payload. (format) | deepseek/deepseek-v4-pro: LLM request failed: provider rejected the request schema or tool payload. (format)

## CRM

- Lead stages: `{"archived": 6, "lost": 2, "negotiating": 1, "outreach_drafted": 9, "scored": 8, "won": 2}`
- Recent actions: 10 loaded
  - 2026-04-28T13:49:58.480113+00:00 outreach email-discovery lead=payless-rooter-20260426-121158: Email discovery attempted via web scrape (site source, contact page) and Google search. No email found on site (hibuwebsites.com builder, Yext template). No email in source code. Discovery method: web_fetch. Result: email NOT found. Contact only via phone (303) 981-0079 or contact form.
  - 2026-04-28T13:49:58.475085+00:00 outreach email-discovery lead=bce500970cbb: Email discovered via Keenesburg CO business directory (townofkeenesburg.com): royalservicesplumbing@gmail.com. Phone confirmed: (720) 740-0909. Additional phone: (720) 770-8205. Also listed on BBB, Yelp, Yahoo Local, ZoomInfo. 25+ years, family-owned, plumbing & HVAC.
  - 2026-04-28T13:49:58.475071+00:00 outreach prospect_research lead=bce500970cbb: HVAC vertical pivot Week 2. Website audit: WordPress template site, decent service pages and FAQs, contact form, no online booking. Dual plumbing+H+VAC opportunity. BBB not accredited. 5-star reviews on multiple platforms.
  - 2026-04-28T12:31:46.935578+00:00 outreach heartbeat lead=f903936e7d00: Contact discovered via footer - phone (720) 415-5251, email denverlawnlandscape@gmail.com. Scored 72 HOT.
  - 2026-04-28T12:31:46.935495+00:00 outreach heartbeat lead=152ab7f0d15f: Garbled duplicate of DC Plumbing Colorado archived. Clean entry de24eb30fb89 in outreach_drafted.

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 0
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-28T14:01:35.565069+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/campaigns/oa-integrated-campaign-schedule-2026-04-28.md (11220 bytes)
- 2026-04-28T14:01:29.746359+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-0753am.md (15764 bytes)
- 2026-04-28T14:00:38.599404+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/campaigns/oa-campaign-day1-status-2026-04-28.md (12053 bytes)
- 2026-04-28T13:59:27.879175+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/audit-reports/2026-04-28-roundtable-verify-1356Z.md (16115 bytes)
- 2026-04-28T13:59:24.332088+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/fort-collins-heating-and-air-20260428-1355_website_audit_research_2026-04-28_1355.json (2051 bytes)
- 2026-04-28T13:59:24.332078+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/horsetooth-heating-air-and-plumbing-20260428-1355_website_audit_research_2026-04-28_1355.json (2202 bytes)
- 2026-04-28T13:59:24.332074+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/davey-heating-and-air-20260428-1355_website_audit_research_2026-04-28_1355.json (1953 bytes)
- 2026-04-28T13:59:24.332028+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/hooley-heating-and-air-20260428-1355_website_audit_research_2026-04-28_1355.json (1813 bytes)
- 2026-04-28T13:59:24.332027+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/strong-heating-and-cooling-20260428-1355_website_audit_research_2026-04-28_1355.json (1988 bytes)
- 2026-04-28T13:57:23.788920+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/audit-reports/2026-04-28-boot-check-0749am.md (3940 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
