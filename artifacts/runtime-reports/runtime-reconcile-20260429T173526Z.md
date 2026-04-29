# OpenClaw Runtime Reconciliation

Generated: 2026-04-29T17:35:26.167145+00:00

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

- 2026-04-29T17:31:48.799507+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/cleaner-denver.json (6899 bytes)
- 2026-04-29T17:28:59.430550+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/pest-control-denver.json (10238 bytes)
- 2026-04-29T17:28:53.369851+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/roofer-denver.json (9458 bytes)
- 2026-04-29T17:28:42.808008+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/mover-denver.json (7467 bytes)
- 2026-04-29T17:27:11.099499+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/hvac-colorado-springs.json (6912 bytes)
- 2026-04-29T17:25:31.500830+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/audit-reports/2026-04-29-boot-check-1124am.md (1479 bytes)
- 2026-04-29T17:24:34.215073+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/crm-actions/2026-04-29-1120am-CRM-actions.md (970 bytes)
- 2026-04-29T17:24:16.946162+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-29-hourly-outreach-draft-queue-1120am.md (24292 bytes)
- 2026-04-29T17:17:39.787743+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/landscaper-denver-littlefoot.json (6747 bytes)
- 2026-04-29T17:17:35.710325+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/electrician-denver-ra-enterprises.json (7171 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, email_attempts provider evidence, artifacts, transcripts, logs, or external confirmation. Browser/CDP send claims without provider evidence remain `unverified_claim`; anything else is `unverified` or `blocked`.
