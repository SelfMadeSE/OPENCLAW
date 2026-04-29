# OpenClaw Runtime Reconciliation

Generated: 2026-04-29T16:22:38.025944+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"ok": 18}`
- Failed or blocked jobs: none found in job state

## CRM

- Lead stages: `{"archived": 16, "lost": 2, "outreach_sent": 71, "prospect": 2, "scored": 8}`
- Recent actions: 10 loaded
  - 2026-04-29T15:52:57.847202+00:00 outreach stage_change lead=9b97e7873137: scored → outreach_sent: Sent audit-led outreach email to ldplumber@hotmail.com. Subject: 'LD's Plumbing — Founder & CEO of OrangeStudio doesn't sound like a real customer'. Fake testimonials, Hotmail email, no booking. Score: 25-35/100. SMTP provider_accepted (ID 115).
  - 2026-04-29T15:52:34.312103+00:00 outreach scored lead=9b97e7873137: Scored LD's Plumbing LLC. Audit score 25-35/100. Hotmail, fake testimonials, no online booking.
  - 2026-04-29T14:27:52.863754+00:00 outreach stage_change lead=3c5d29727ab4: scored → outreach_sent: 
  - 2026-04-29T14:27:52.858984+00:00 outreach stage_change lead=fbbb94741ee2: scored → outreach_sent: 
  - 2026-04-29T14:27:52.855274+00:00 outreach stage_change lead=e0d9d76ab2d1: scored → outreach_sent: 
- Email ledger statuses: `{"failed": 11, "provider_accepted": 97, "reconciled_superseded": 7}`
- Email truth blockers:
  - lead=008cfdf01de9: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=478a4070a54b: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=d1f9105318c8: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=d66d0284f957: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=f379ad620e03: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
- Recent email attempts:
  - 2026-04-29T15:52:50.916015+00:00 #115 provider_accepted lead=9b97e7873137 to=ldplumber@hotmail.com via=gmail_smtp: <177747796709.92440.4577593796920934943@outboundautonomy.com>
  - 2026-04-29T14:26:23.746999+00:00 #114 provider_accepted lead=9c4f6bb5a4d2 to=info@coenergyelectric.com via=gmail_smtp: <177747277242.89681.14830695664907547675@outboundautonomy.com>
  - 2026-04-29T14:25:58.614441+00:00 #113 provider_accepted lead=7453245706d9 to=keegan@cleanteamdenver.com via=gmail_smtp: <177747274868.89668.16121421550032345390@outboundautonomy.com>
  - 2026-04-29T14:21:11.891635+00:00 #111 provider_accepted lead=3c5d29727ab4 to=marquezfence@yahoo.com via=gmail_smtp: <177747246479.89503.11144963714877888542@outboundautonomy.com>
  - 2026-04-29T14:21:11.715007+00:00 #110 provider_accepted lead=fbbb94741ee2 to=greg@greenbynature.net via=gmail_smtp: <177747246479.89501.2426087804953581034@outboundautonomy.com>

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 8
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-29T16:22:13.612692+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-ppc-landing-page-copy-2026-04-29.md (5836 bytes)
- 2026-04-29T16:16:52.041678+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/404-page-audit-led-2026-04-29.md (4472 bytes)
- 2026-04-29T16:12:24.719670+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/2026-04-29-hourly-prospect-research-cycle-10am.md (6792 bytes)
- 2026-04-29T16:11:56.744487+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/franklin-paralegal-services-llc-20260429-191151_website_audit_research_2026-04-29_191156.json (845 bytes)
- 2026-04-29T16:11:48.063262+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/prospect_data_franklin_paralegal.json (1736 bytes)
- 2026-04-29T16:11:36.548562+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/tonis-ark-dog-walking--pet-sitting-20260429-191130_website_audit_research_2026-04-29_191136.json (840 bytes)
- 2026-04-29T16:11:26.142775+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/prospect_data_tonis_ark.json (1615 bytes)
- 2026-04-29T16:11:12.381286+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/westwood-animal-hospital-20260429-191106_website_audit_research_2026-04-29_191112.json (824 bytes)
- 2026-04-29T16:11:02.304055+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/prospect_data_westwood_animal.json (1682 bytes)
- 2026-04-29T16:10:48.662894+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/boost-marketing-group-20260429-191041_website_audit_research_2026-04-29_191048.json (895 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, email_attempts provider evidence, artifacts, transcripts, logs, or external confirmation. Browser/CDP send claims without provider evidence remain `unverified_claim`; anything else is `unverified` or `blocked`.
