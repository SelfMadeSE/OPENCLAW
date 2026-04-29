# OpenClaw Runtime Reconciliation

Generated: 2026-04-29T18:30:09.735284+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 1, "ok": 17}`
- Failed or blocked jobs:
  - Memory Dreaming Promotion (main): error cron: job execution timed out

## CRM

- Lead stages: `{"archived": 16, "lost": 2, "outreach_sent": 72, "prospect": 2, "scored": 7}`
- Recent actions: 10 loaded
  - 2026-04-29T17:57:24.860313+00:00 outreach heartbeat lead=heartbeat: 29th cycle (11:54 AM MT). Pipeline: 99 total, 72 outreach_sent, 7 scored (5 no-email blocked, 2 awaiting Rylee), 2 prospect (not actionable). 112 provider_accepted emails. SMTP working.
  - 2026-04-29T17:57:17.905062+00:00 heartbeat --description lead=--action-type: 29th cycle (11:54 AM MT). Pipeline: 99 total, 72 outreach_sent, 7 scored (5 no-email blocked, 2 awaiting Rylee), 2 prospect (not actionable). 112 provider_accepted emails. SMTP working.
  - 2026-04-29T17:57:14.036024+00:00 heartbeat --description lead=--action-type: 29th cycle (11:54 AM MT). Pipeline: 99 total, 72 outreach_sent, 7 scored (5 no-email blocked, 2 awaiting Rylee), 2 prospect (not actionable). 112 provider_accepted emails. SMTP WORKING. No new sends this cycle — focus on pipeline assessment.
  - 2026-04-29T17:57:09.784865+00:00 heartbeat-29th-cycle --action-type lead=--lead-id: heartbeat
  - 2026-04-29T16:34:44.917306+00:00 outreach heartbeat lead=bc151121-558: Scored lead: email discovery attempted via site crawl and contact page — no email found. Remains in scored for operator review.
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
- bootstrap_truncated: 6
- incomplete_turn: 0
- telegram_socket: 2

## Recent Artifacts

- 2026-04-29T18:27:37.120734+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/creative/x-posting-log-2026-04-29.md (1803 bytes)
- 2026-04-29T18:26:10.773275+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (7264 bytes)
- 2026-04-29T18:24:17.895367+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/crm-actions/2026-04-29-1220pm-CRM-actions.md (3109 bytes)
- 2026-04-29T18:23:49.989225+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-29-hourly-outreach-draft-queue-1220pm.md (27771 bytes)
- 2026-04-29T18:10:05.401533+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/2026-04-29-hourly-prospect-research-cycle-12pm.md (3234 bytes)
- 2026-04-29T18:09:28.708914+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/letali-llc-20260429-210928_website_audit_2026-04-29_210928.json (1568 bytes)
- 2026-04-29T18:09:28.705881+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/next-step-innovations-20260429-210928_website_audit_2026-04-29_210928.json (1651 bytes)
- 2026-04-29T18:09:28.702963+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/denver-flooring-collective-20260429-210928_website_audit_2026-04-29_210928.json (1564 bytes)
- 2026-04-29T18:09:28.700278+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/macdonald-hardwoods-20260429-210928_website_audit_2026-04-29_210928.json (1603 bytes)
- 2026-04-29T18:09:28.697709+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/sander--sons-20260429-210928_website_audit_2026-04-29_210928.json (1604 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, email_attempts provider evidence, artifacts, transcripts, logs, or external confirmation. Browser/CDP send claims without provider evidence remain `unverified_claim`; anything else is `unverified` or `blocked`.
