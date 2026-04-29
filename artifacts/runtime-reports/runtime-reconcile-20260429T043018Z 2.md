# OpenClaw Runtime Reconciliation

Generated: 2026-04-29T04:30:18.260977+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 5, "ok": 13}`
- Failed or blocked jobs:
  - Nightly OA Ops Review (orchestrator): error cron: job execution timed out
  - Nightly OA Engineering Review (engineering): error cron: job execution timed out
  - Nightly OA Creative Review (creative): error cron: job execution timed out
  - Hourly Prospect Research (outreach): error FallbackSummaryError: All models failed (2): deepseek/deepseek-v4-flash: LLM request failed: provider rejected the request schema or tool payload. (format) | deepseek/deepseek-v4-pro: LLM request failed: provider rejected the request schema or tool payload. (format)
  - Hourly Outreach Draft Queue (outreach): error ⚠️ 📝 Edit: `in ~/Desktop/OPENCLAW/workspaces/outreach/crm_data.json` failed

## CRM

- Lead stages: `{"archived": 11, "lost": 2, "negotiating": 1, "outreach_drafted": 44, "prospect": 1, "won": 2}`
- Recent actions: 10 loaded
  - 2026-04-29T04:06:49.198415+00:00 system stage_change lead=c01e9dc7a1de: scored → archived: Not an OA website-audit fit — B2B security product (NDA wall/prototype sharing), no visible website problems to audit
  - 2026-04-29T04:06:49.190687+00:00 system stage_change lead=1ba89e50a7a5: scored → archived: Not an OA website-audit fit — SaaS dashboard project from Upwork, no website to audit
  - 2026-04-29T03:35:01.118856+00:00 outreach draft_created lead=e7db265f63f0: Strong Heating and Cooling (87/HOT) — Audit draft created. Single-page WP site ~200 words, broken /contact page with no form, no visible phone/email, 20+ certs buried in text. Email office@strongheatingcooling.com verified. Draft saved.
  - 2026-04-29T03:34:52.022105+00:00 e7db265f63f0 --action-type lead=--lead-id: draft_created
  - 2026-04-29T02:59:56.602076+00:00 outreach email_discovered lead=e7db265f63f0: Strong Heating: email office@strongheatingcooling.com found via JSON-LD schema markup on their site. MX records verified (Google). Phone: 719-960-7208 from schema.

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 2
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-29T04:29:25.067223+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-seo-content-cluster-service-business-websites-2026-04-28.md (12201 bytes)
- 2026-04-29T04:27:44.116235+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (5075 bytes)
- 2026-04-29T04:21:03.514599+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-1020pm.md (5935 bytes)
- 2026-04-29T04:15:11.418213+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/audit-results-email-2026-04-28.md (7342 bytes)
- 2026-04-29T04:10:31.390266+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/2026-04-28-hourly-prospect-research-report.md (7124 bytes)
- 2026-04-29T04:01:51.478383+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/site-health-check-2026-04-28T2200MDT.md (4589 bytes)
- 2026-04-29T03:56:21.005793+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/audit-reports/heartbeat-2026-04-28-0955pm.md (2317 bytes)
- 2026-04-29T03:38:37.082346+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/distribution-plans/heartbeat-status-2026-04-28-7.md (808 bytes)
- 2026-04-29T03:37:20.110132+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/cookie-policy-page-2026-04-28.md (4629 bytes)
- 2026-04-29T03:37:20.110127+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/terms-of-service-page-2026-04-28.md (5673 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
