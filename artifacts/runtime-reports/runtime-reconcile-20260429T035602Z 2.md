# OpenClaw Runtime Reconciliation

Generated: 2026-04-29T03:56:02.515412+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 5, "ok": 13}`
- Failed or blocked jobs:
  - Nightly OA Ops Review (orchestrator): error cron: job execution timed out
  - Nightly OA Engineering Review (engineering): error cron: job execution timed out
  - Nightly OA Creative Review (creative): error cron: job execution timed out
  - Site Health Check (engineering): error FailoverError: LLM request failed: provider rejected the request schema or tool payload.
  - Hourly Prospect Research (outreach): error FallbackSummaryError: All models failed (2): deepseek/deepseek-v4-flash: LLM request failed: provider rejected the request schema or tool payload. (format) | deepseek/deepseek-v4-pro: LLM request failed: provider rejected the request schema or tool payload. (format)

## CRM

- Lead stages: `{"archived": 9, "lost": 2, "negotiating": 1, "outreach_drafted": 44, "prospect": 1, "scored": 2, "won": 2}`
- Recent actions: 10 loaded
  - 2026-04-29T03:35:01.118856+00:00 outreach draft_created lead=e7db265f63f0: Strong Heating and Cooling (87/HOT) — Audit draft created. Single-page WP site ~200 words, broken /contact page with no form, no visible phone/email, 20+ certs buried in text. Email office@strongheatingcooling.com verified. Draft saved.
  - 2026-04-29T03:34:52.022105+00:00 e7db265f63f0 --action-type lead=--lead-id: draft_created
  - 2026-04-29T02:59:56.602076+00:00 outreach email_discovered lead=e7db265f63f0: Strong Heating: email office@strongheatingcooling.com found via JSON-LD schema markup on their site. MX records verified (Google). Phone: 719-960-7208 from schema.
  - 2026-04-29T02:24:55.854720+00:00 action_type=draft_created description=Good People Tree Service — Draft created. Single-page site with no service pages, no portfolio/gallery, no booking. Email office@goodpeopletreeservice.com verified. Promoted to outreach_drafted. lead=lead_id=478a4070a54b: result=draft_created
  - 2026-04-29T02:24:55.854718+00:00 action_type=draft_created description=Denver Concierge — Draft created. Dated WordPress site, award from 2016 highlighted, no online booking, Gmail contact instead of domain email. Email denverconcierge@gmail.com verified. lead=lead_id=c91f11b895e6: result=draft_created

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 4
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-29T03:50:59.216450+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (4120 bytes)
- 2026-04-29T03:38:37.082346+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/distribution-plans/heartbeat-status-2026-04-28-7.md (808 bytes)
- 2026-04-29T03:37:20.110132+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/cookie-policy-page-2026-04-28.md (4629 bytes)
- 2026-04-29T03:37:20.110127+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/terms-of-service-page-2026-04-28.md (5673 bytes)
- 2026-04-29T03:37:20.110126+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/privacy-policy-page-2026-04-28.md (5330 bytes)
- 2026-04-29T03:34:47.489968+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-strong-heating-cooling-audit-draft.md (3063 bytes)
- 2026-04-29T03:22:17.043888+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-0920pm-CRM-actions.md (12541 bytes)
- 2026-04-29T03:15:00.630300+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/site-health-check-2026-04-28T2110MDT.md (3813 bytes)
- 2026-04-29T03:10:58.380454+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/campaigns/oa-gmail-app-password-guide-2026-04-28.md (3682 bytes)
- 2026-04-29T03:10:15.269501+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-try-page-inbound-nurture-sequence-2026-04-28.md (6377 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
