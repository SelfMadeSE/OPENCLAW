# OpenClaw Runtime Reconciliation

Generated: 2026-04-29T06:30:28.459260+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 6, "ok": 12}`
- Failed or blocked jobs:
  - Nightly OA Ops Review (orchestrator): error cron: job execution timed out
  - Nightly OA Engineering Review (engineering): error cron: job execution timed out
  - Nightly OA Creative Review (creative): error cron: job execution timed out
  - Site Health Check (engineering): error
  - Hourly Prospect Research (outreach): error FallbackSummaryError: All models failed (2): deepseek/deepseek-v4-flash: LLM request failed: provider rejected the request schema or tool payload. (format) | deepseek/deepseek-v4-pro: LLM request failed: provider rejected the request schema or tool payload. (format)
  - Hourly Agent Roundtable Audit (orchestrator): error FailoverError: LLM request failed: provider rejected the request schema or tool payload.

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
- bootstrap_truncated: 4
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-29T06:21:45.621437+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-29-hourly-outreach-draft-queue-1220am.md (6817 bytes)
- 2026-04-29T06:21:18.294153+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (3983 bytes)
- 2026-04-29T06:17:13.407955+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/distribution-plans/heartbeat-status-2026-04-29.md (747 bytes)
- 2026-04-29T06:09:18.305869+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/consultation-prep-2026-04-28.md (6493 bytes)
- 2026-04-29T05:59:44.117720+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-blog-post-free-website-audit-what-it-checks-2026-04-28.md (6386 bytes)
- 2026-04-29T05:40:43.159096+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/distribution-plans/heartbeat-status-2026-04-28-10.md (747 bytes)
- 2026-04-29T05:39:19.464548+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/outbound-autonomy/SHARED-STATE.md (3914 bytes)
- 2026-04-29T05:31:05.331915+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/pending-deployment-bundle-2026-04-28.md (10461 bytes)
- 2026-04-29T05:25:43.811913+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-blog-post-grande-prairie-google-maps-local-seo-2026-04-28.md (6705 bytes)
- 2026-04-29T05:23:28.907511+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/auditor/focus-guard-2026-04-28.md (12775 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
