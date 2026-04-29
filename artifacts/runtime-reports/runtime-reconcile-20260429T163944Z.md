# OpenClaw Runtime Reconciliation

Generated: 2026-04-29T16:39:43.963679+00:00

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
- Email ledger statuses: `{"failed": 11, "provider_accepted": 98, "reconciled_superseded": 7}`
- Email truth blockers:
  - lead=008cfdf01de9: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=478a4070a54b: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=d1f9105318c8: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=d66d0284f957: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=f379ad620e03: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
- Recent email attempts:
  - 2026-04-29T16:34:22.161220+00:00 #116 provider_accepted lead=2d9451834012 to=service@lagunapoolsllc.com via=gmail_smtp: <177748046025.95690.16686318144344853590@outboundautonomy.com>
  - 2026-04-29T15:52:50.916015+00:00 #115 provider_accepted lead=9b97e7873137 to=ldplumber@hotmail.com via=gmail_smtp: <177747796709.92440.4577593796920934943@outboundautonomy.com>
  - 2026-04-29T14:26:23.746999+00:00 #114 provider_accepted lead=9c4f6bb5a4d2 to=info@coenergyelectric.com via=gmail_smtp: <177747277242.89681.14830695664907547675@outboundautonomy.com>
  - 2026-04-29T14:25:58.614441+00:00 #113 provider_accepted lead=7453245706d9 to=keegan@cleanteamdenver.com via=gmail_smtp: <177747274868.89668.16121421550032345390@outboundautonomy.com>
  - 2026-04-29T14:21:11.891635+00:00 #111 provider_accepted lead=3c5d29727ab4 to=marquezfence@yahoo.com via=gmail_smtp: <177747246479.89503.11144963714877888542@outboundautonomy.com>

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 2
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-29T16:30:29.163231+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-case-study-template-2026-04-29.md (3112 bytes)
- 2026-04-29T16:30:11.663110+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-print-ready-one-pager-2026-04-29.md (3518 bytes)
- 2026-04-29T16:24:08.739784+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-29-hourly-outreach-draft-queue-1020am.md (22297 bytes)
- 2026-04-29T16:22:59.838291+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/distribution-plans/heartbeat-status-2026-04-29-6.md (1349 bytes)
- 2026-04-29T16:22:13.612692+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-ppc-landing-page-copy-2026-04-29.md (5836 bytes)
- 2026-04-29T16:16:52.041678+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/404-page-audit-led-2026-04-29.md (4472 bytes)
- 2026-04-29T16:12:24.719670+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/2026-04-29-hourly-prospect-research-cycle-10am.md (6792 bytes)
- 2026-04-29T16:11:56.744487+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/franklin-paralegal-services-llc-20260429-191151_website_audit_research_2026-04-29_191156.json (845 bytes)
- 2026-04-29T16:11:48.063262+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/prospect_data_franklin_paralegal.json (1736 bytes)
- 2026-04-29T16:11:36.548562+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/tonis-ark-dog-walking--pet-sitting-20260429-191130_website_audit_research_2026-04-29_191136.json (840 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, email_attempts provider evidence, artifacts, transcripts, logs, or external confirmation. Browser/CDP send claims without provider evidence remain `unverified_claim`; anything else is `unverified` or `blocked`.
