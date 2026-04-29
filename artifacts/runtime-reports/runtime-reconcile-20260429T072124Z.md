# OpenClaw Runtime Reconciliation

Generated: 2026-04-29T07:21:24.562075+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 3, "ok": 15}`
- Failed or blocked jobs:
  - Nightly OA Creative Review (creative): error cron: job execution timed out
  - Site Health Check (engineering): error FailoverError: LLM request failed: provider rejected the request schema or tool payload.
  - Hourly Prospect Research (outreach): error

## CRM

- Lead stages: `{"archived": 11, "lost": 2, "negotiating": 1, "outreach_drafted": 44, "prospect": 1, "won": 2}`
- Recent actions: 10 loaded
  - 2026-04-29T04:06:49.198415+00:00 system stage_change lead=c01e9dc7a1de: scored → archived: Not an OA website-audit fit — B2B security product (NDA wall/prototype sharing), no visible website problems to audit
  - 2026-04-29T04:06:49.190687+00:00 system stage_change lead=1ba89e50a7a5: scored → archived: Not an OA website-audit fit — SaaS dashboard project from Upwork, no website to audit
  - 2026-04-29T03:35:01.118856+00:00 outreach draft_created lead=e7db265f63f0: Strong Heating and Cooling (87/HOT) — Audit draft created. Single-page WP site ~200 words, broken /contact page with no form, no visible phone/email, 20+ certs buried in text. Email office@strongheatingcooling.com verified. Draft saved.
  - 2026-04-29T03:34:52.022105+00:00 e7db265f63f0 --action-type lead=--lead-id: draft_created
  - 2026-04-29T02:59:56.602076+00:00 outreach email_discovered lead=e7db265f63f0: Strong Heating: email office@strongheatingcooling.com found via JSON-LD schema markup on their site. MX records verified (Google). Phone: 719-960-7208 from schema.
- Email ledger statuses: `{"unverified_claim": 7}`
- Email truth blockers:
  - lead=315f28b0e620: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=42edd05bfa3c: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=d192cf575884: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
- Recent email attempts:
  - 2026-04-29T07:21:16.255432+00:00 #7 unverified_claim lead=d0a627a3a460 to=info@apexroofingdenver.com via=gmail_browser_cdp: legacy browser/CDP claim imported from /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/email-send-results-2026-04-28.md
  - 2026-04-29T07:21:16.255333+00:00 #6 unverified_claim lead=0c719514c71f to=nativefamily.plumbingandheating@gmail.com via=gmail_browser_cdp: legacy browser/CDP claim imported from /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/email-send-results-2026-04-28.md
  - 2026-04-29T07:21:16.255211+00:00 #5 unverified_claim lead=de24eb30fb89 to=sales@dcplumbingcolorado.com via=gmail_browser_cdp: legacy browser/CDP claim imported from /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/email-send-results-2026-04-28.md
  - 2026-04-29T07:21:16.255109+00:00 #4 unverified_claim lead=6f1c8727eb66 to=office@hooleyhvac.com via=gmail_browser_cdp: legacy browser/CDP claim imported from /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/email-send-results-2026-04-28.md
  - 2026-04-29T07:21:16.254991+00:00 #3 unverified_claim lead=93dc098cb8f1 to=logic@logichvacr.com via=gmail_browser_cdp: legacy browser/CDP claim imported from /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/email-send-results-2026-04-28.md

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 6
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-29T07:08:15.188377+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-blog-post-website-leaking-leads-pillar-2026-04-29.md (15299 bytes)
- 2026-04-29T06:59:41.419629+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/distribution-plans/heartbeat-status-2026-04-29-2.md (747 bytes)
- 2026-04-29T06:51:56.211257+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (7008 bytes)
- 2026-04-29T06:48:50.167509+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/creative-briefs/live-audit-report-ui-visual-language-2026-04-29.md (16131 bytes)
- 2026-04-29T06:33:50.723861+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-blog-post-how-to-read-audit-score-2026-04-29.md (11412 bytes)
- 2026-04-29T06:32:07.681941+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/site-health-check-2026-04-28T2330MDT.md (6578 bytes)
- 2026-04-29T06:21:45.621437+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-29-hourly-outreach-draft-queue-1220am.md (6817 bytes)
- 2026-04-29T06:17:13.407955+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/distribution-plans/heartbeat-status-2026-04-29.md (747 bytes)
- 2026-04-29T06:09:18.305869+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/consultation-prep-2026-04-28.md (6493 bytes)
- 2026-04-29T05:59:44.117720+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-blog-post-free-website-audit-what-it-checks-2026-04-28.md (6386 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, email_attempts provider evidence, artifacts, transcripts, logs, or external confirmation. Browser/CDP send claims without provider evidence remain `unverified_claim`; anything else is `unverified` or `blocked`.
