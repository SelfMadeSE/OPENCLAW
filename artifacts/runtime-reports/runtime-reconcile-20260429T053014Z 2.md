# OpenClaw Runtime Reconciliation

Generated: 2026-04-29T05:30:14.772838+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 5, "ok": 13}`
- Failed or blocked jobs:
  - Nightly OA Ops Review (orchestrator): error cron: job execution timed out
  - Nightly OA Engineering Review (engineering): error cron: job execution timed out
  - Nightly OA Creative Review (creative): error cron: job execution timed out
  - Site Health Check (engineering): error
  - Hourly Prospect Research (outreach): error FallbackSummaryError: All models failed (2): deepseek/deepseek-v4-flash: LLM request failed: provider rejected the request schema or tool payload. (format) | deepseek/deepseek-v4-pro: LLM request failed: provider rejected the request schema or tool payload. (format)

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
- bootstrap_truncated: 10
- incomplete_turn: 0
- telegram_socket: 1

## Recent Artifacts

- 2026-04-29T05:25:43.811913+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-blog-post-grande-prairie-google-maps-local-seo-2026-04-28.md (6705 bytes)
- 2026-04-29T05:23:28.907511+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/auditor/focus-guard-2026-04-28.md (12775 bytes)
- 2026-04-29T05:23:02.880368+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/account-setup/oa-avatar-4000x4000.png (123001 bytes)
- 2026-04-29T05:21:40.023613+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-1120pm-CRM-actions.md (11336 bytes)
- 2026-04-29T05:20:09.659564+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (7421 bytes)
- 2026-04-29T04:59:29.850848+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/distribution-plans/heartbeat-status-2026-04-28-9.md (890 bytes)
- 2026-04-29T04:53:18.420986+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/audit-report-confirmation-interstitial-2026-04-28.md (7716 bytes)
- 2026-04-29T04:51:49.801331+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-blog-post-4-signals-website-audit-2026-04-28.md (11661 bytes)
- 2026-04-29T04:38:25.406040+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/audit-reports/heartbeat-2026-04-28-1037pm.md (2745 bytes)
- 2026-04-29T04:30:19.139611+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/distribution-plans/heartbeat-status-2026-04-28-8.md (862 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
