# OpenClaw Runtime Reconciliation

Generated: 2026-04-28T14:30:16.636063+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 5, "ok": 13}`
- Failed or blocked jobs:
  - Daily Outbound Autonomy Audit-Funnel Content (marketing): error cron: job execution timed out
  - Nightly OA Ops Review (orchestrator): error cron: job execution timed out
  - Nightly OA Engineering Review (engineering): error cron: job execution timed out
  - Nightly OA Creative Review (creative): error cron: job execution timed out
  - Hourly Prospect Research (outreach): error FallbackSummaryError: All models failed (2): deepseek/deepseek-v4-flash: LLM request failed: provider rejected the request schema or tool payload. (format) | deepseek/deepseek-v4-pro: LLM request failed: provider rejected the request schema or tool payload. (format)

## CRM

- Lead stages: `{"archived": 6, "lost": 2, "negotiating": 1, "outreach_drafted": 15, "scored": 2, "won": 2}`
- Recent actions: 10 loaded
  - 2026-04-28T14:21:42.754210+00:00 outreach stage_advance lead=bce500970cbb: Advanced from scored to outreach_drafted (draft existed in 0620 batch, missed advance). Email: royalservicesplumbing@gmail.com.
  - 2026-04-28T14:20:41.477468+00:00 outreach outreach_draft lead=2cf96e3c3bd1: 2026-04-28 8:20 AM cycle: Drafted audit-led outreach. Single-page site with ~1100 chars content. No service pages, no booking, no team photos. Draft in artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-0820am.md. Email NOT found on site.
  - 2026-04-28T14:20:41.477036+00:00 outreach outreach_draft lead=138a66ae6ce5: 2026-04-28 8:20 AM cycle: Drafted audit-led outreach. Hybrid service/e-commerce site. Confusing UX. Draft in artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-0820am.md. Email NOT found.
  - 2026-04-28T14:20:41.476296+00:00 outreach outreach_draft lead=6792b00dccf4: 2026-04-28 8:20 AM cycle: Drafted audit-led outreach. 30+ years experience, ~3KB site content, no team/pages. Draft in artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-0820am.md. Phone (720) 874-9559 available.
  - 2026-04-28T14:20:41.475729+00:00 outreach outreach_draft lead=dfb5d640157a: 2026-04-28 8:20 AM cycle: Drafted audit-led outreach. 20+ years family-run, no team photos/gallery, thin content, coupons text-only. Draft in artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-0820am.md. Phone (303) 252-3185 available.

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 0
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-28T14:23:14.067214+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/post-audit-email-nurture-2026-04-28.md (6481 bytes)
- 2026-04-28T14:22:13.497549+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (5293 bytes)
- 2026-04-28T14:21:38.408558+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-0820am.md (17798 bytes)
- 2026-04-28T14:18:58.139639+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/audit-reports/2026-04-28-heartbeat-0815am.md (6406 bytes)
- 2026-04-28T14:12:56.582383+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-pagespeed-fix-guide-and-Lighthouse-messaging-2026-04-28.md (6577 bytes)
- 2026-04-28T14:09:28.976038+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/site-health-2026-04-28-0810.md (4740 bytes)
- 2026-04-28T14:04:16.825571+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/site-health-2026-04-28T1403Z.md (6345 bytes)
- 2026-04-28T14:01:35.565069+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/campaigns/oa-integrated-campaign-schedule-2026-04-28.md (11220 bytes)
- 2026-04-28T14:01:29.746359+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-0753am.md (15764 bytes)
- 2026-04-28T14:00:38.599404+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/campaigns/oa-campaign-day1-status-2026-04-28.md (12053 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
