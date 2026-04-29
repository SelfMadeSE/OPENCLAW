# OpenClaw Runtime Reconciliation

Generated: 2026-04-28T23:30:17.833946+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 5, "ok": 13}`
- Failed or blocked jobs:
  - Nightly OA Ops Review (orchestrator): error cron: job execution timed out
  - Nightly OA Engineering Review (engineering): error cron: job execution timed out
  - Nightly OA Creative Review (creative): error cron: job execution timed out
  - Hourly Prospect Research (outreach): error FallbackSummaryError: All models failed (2): deepseek/deepseek-v4-flash: LLM request failed: provider rejected the request schema or tool payload. (format) | deepseek/deepseek-v4-pro: LLM request failed: provider rejected the request schema or tool payload. (format)
  - Hourly Outreach Draft Queue (outreach): error FallbackSummaryError: All models failed (2): deepseek/deepseek-v4-flash: LLM request failed: provider rejected the request schema or tool payload. (format) | deepseek/deepseek-v4-pro: LLM request failed: provider rejected the request schema or tool payload. (format)

## CRM

- Lead stages: `{"archived": 9, "lost": 2, "negotiating": 1, "outreach_drafted": 41, "prospect": 1, "scored": 2, "won": 2}`
- Recent actions: 10 loaded
  - 2026-04-28T22:49:06.877979+00:00 outreach email_discovered lead=f3d30c5793d5: Email info@harmonypaintingdenver.com + contact@harmonypaintingdenver.com verified (250 OK via Gmail MX). Divi/WP site with no online booking.
  - 2026-04-28T22:49:06.877979+00:00 outreach email_discovered lead=c91f11b895e6: Email denverconcierge@gmail.com found (Gmail account, not domain email). 25yr cleaning co, contact page 500 error.
  - 2026-04-28T22:49:06.877979+00:00 outreach email_discovered lead=63593030b771: Emails info@, support@, service@, hello@denverappliance.co all verified (250 OK via Mailgun). Clean Webflow site, FixiForce booking modal.
  - 2026-04-28T22:47:56.348299+00:00 outreach email_discovered lead=478a4070a54b: Email office@goodpeopletreeservice.com found and SMTP-verified (250 OK). Phone (303) 847-5221. Good People Tree Service.
  - 2026-04-28T22:47:56.348299+00:00 outreach email_discovered lead=008cfdf01de9: Email contact@broncoprokleen.com found and SMTP-verified (250 OK). Phone (303) 732-8577. Bronco Pro Kleen.

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 8
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-28T23:29:10.940241+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (4228 bytes)
- 2026-04-28T23:21:32.069027+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-0520pm-CRM-actions.md (11285 bytes)
- 2026-04-28T23:11:59.674848+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/creative-briefs/audit-tool-technical-spec-2026-04-28.md (16516 bytes)
- 2026-04-28T23:02:08.907279+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/site-health-2026-04-28T2301Z.md (4695 bytes)
- 2026-04-28T22:58:39.869486+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/distribution-plans/heartbeat-status-2026-04-28-2.md (1024 bytes)
- 2026-04-28T22:58:16.607335+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/heartbeat-2026-04-28-1655MDT.md (2525 bytes)
- 2026-04-28T22:47:13.752440+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-skyline-landscape-design-audit-draft.md (1032 bytes)
- 2026-04-28T22:47:13.752423+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-good-people-tree-service-audit-draft.md (2473 bytes)
- 2026-04-28T22:47:13.752421+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-cos-plumbing-audit-draft.md (1813 bytes)
- 2026-04-28T22:47:13.752417+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-bronco-pro-kleen-audit-draft.md (2442 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
