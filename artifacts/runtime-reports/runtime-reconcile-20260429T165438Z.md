# OpenClaw Runtime Reconciliation

Generated: 2026-04-29T16:54:38.378527+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 1, "ok": 17}`
- Failed or blocked jobs:
  - Memory Dreaming Promotion (main): error cron: job execution timed out

## CRM

- Lead stages: `{"archived": 16, "lost": 2, "outreach_sent": 72, "prospect": 2, "scored": 7}`
- Recent actions: 10 loaded
  - 2026-04-29T16:34:44.917306+00:00 outreach heartbeat lead=bc151121-558: Scored lead: email discovery attempted via site crawl and contact page — no email found. Remains in scored for operator review.
  - 2026-04-29T16:34:44.892134+00:00 outreach heartbeat lead=8f24ea99-cc3: Scored lead: email discovery attempted via site crawl and contact page — no email found. Remains in scored for operator review.
  - 2026-04-29T16:34:44.867347+00:00 outreach heartbeat lead=45cfd1f67c45: Scored lead: email discovery attempted via site crawl and contact page — no email found. Remains in scored for operator review.
  - 2026-04-29T16:34:44.842387+00:00 outreach heartbeat lead=1415632b5c93: Scored lead: email discovery attempted via site crawl and contact page — no email found. Remains in scored for operator review.
  - 2026-04-29T16:34:44.818486+00:00 outreach heartbeat lead=ceabeced36b7: Scored lead: email discovery attempted via site crawl and contact page — no email found. Remains in scored for operator review.
- Email ledger statuses: `{"failed": 11, "provider_accepted": 112, "reconciled_superseded": 7}`
- Email truth blockers:
  - lead=008cfdf01de9: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=478a4070a54b: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=d1f9105318c8: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=d66d0284f957: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=f379ad620e03: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
- Recent email attempts:
  - 2026-04-29T16:49:57.695695+00:00 #130 provider_accepted lead=prospect-reliableroof-20260429 to=vaughntromburg@icloud.com via=gmail_smtp: <177748139312.97663.17697955341271443252@outboundautonomy.com>
  - 2026-04-29T16:49:53.125982+00:00 #129 provider_accepted lead=prospect-denroof-20260429 to=service@mydenverroofers.com via=gmail_smtp: <177748138426.97663.2038504801072737745@outboundautonomy.com>
  - 2026-04-29T16:49:44.262863+00:00 #128 provider_accepted lead=prospect-bearbros-20260429 to=denver@bearbrothersroofing.com via=gmail_smtp: <177748137797.97663.8147577141223913758@outboundautonomy.com>
  - 2026-04-29T16:49:37.973161+00:00 #127 provider_accepted lead=prospect-coloroof-20260429 to=info@coloradoroofingcompany.com via=gmail_smtp: <177748136951.97663.17080114365070010680@outboundautonomy.com>
  - 2026-04-29T16:49:29.506873+00:00 #126 provider_accepted lead=prospect-appest-20260429 to=ap_pestcontrol@yahoo.com via=gmail_smtp: <177748135958.97663.5381460185029380552@outboundautonomy.com>

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 2
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-29T16:51:11.471272+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach/prospect-refill-2026-04-29.md (24336 bytes)
- 2026-04-29T16:42:15.380590+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/auditor/pipeline-audit-2026-04-29.md (4051 bytes)
- 2026-04-29T16:40:37.066654+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/audit-reports/2026-04-29-boot-check-1053am.md (2134 bytes)
- 2026-04-29T16:30:29.163231+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-case-study-template-2026-04-29.md (3112 bytes)
- 2026-04-29T16:30:11.663110+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-print-ready-one-pager-2026-04-29.md (3518 bytes)
- 2026-04-29T16:24:08.739784+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-29-hourly-outreach-draft-queue-1020am.md (22297 bytes)
- 2026-04-29T16:22:59.838291+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/distribution-plans/heartbeat-status-2026-04-29-6.md (1349 bytes)
- 2026-04-29T16:22:13.612692+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-ppc-landing-page-copy-2026-04-29.md (5836 bytes)
- 2026-04-29T16:16:52.041678+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/404-page-audit-led-2026-04-29.md (4472 bytes)
- 2026-04-29T16:12:24.719670+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/2026-04-29-hourly-prospect-research-cycle-10am.md (6792 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, email_attempts provider evidence, artifacts, transcripts, logs, or external confirmation. Browser/CDP send claims without provider evidence remain `unverified_claim`; anything else is `unverified` or `blocked`.
