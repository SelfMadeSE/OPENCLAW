# OpenClaw Runtime Reconciliation

Generated: 2026-04-30T04:25:47.374356+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 1, "ok": 17}`
- Failed or blocked jobs:
  - Memory Dreaming Promotion (main): error cron: job execution timed out

## CRM

- Lead stages: `{"archived": 16, "lost": 2, "outreach_sent": 175, "prospect": 7, "qualified": 2, "reconciled_duplicate": 3, "scored": 7}`
- Recent actions: 10 loaded
  - 2026-04-30T02:58:39.109837+00:00 outreach status lead=heartbeat: 43rd cycle: Researched & sent 4 new WARM leads via Wix Google search. TCF Plumbing (69), Hart to Home (65), IV CONSTRUCTION (61), 180 Construction (59). All Wix templates with visible site problems. Pipeline: +4 outreach_sent. SMTP working via certifi SSL. 7 scored leads still pending Rylee (2 near-perfect + 5 no-email). 3 replied leads pending review.
  - 2026-04-30T02:58:34.049382+00:00 outreach sent lead=f129c5836fec: Email sent via SMTP (certifi SSL). WARM 69: TCF Emergency Plumbing - Wix template, minimal content, no portfolio. tcf.servicesllc@gmail.com.
  - 2026-04-30T02:58:34.040520+00:00 outreach sent lead=0fb0dabd723c: Email sent via SMTP (certifi SSL). WARM 59: 180 Construction - Wix template, no portfolio, generic content. 180ConstructionDenver@gmail.com.
  - 2026-04-30T02:58:34.040518+00:00 outreach sent lead=be56d746d08f: Email sent via SMTP (certifi SSL). WARM 61: IV CONSTRUCTION - Wix template, nav typo, stock social links. iv.const21@gmail.com.
  - 2026-04-30T02:58:34.040518+00:00 outreach sent lead=1fdaf9b7c844: Email sent via SMTP (certifi SSL). WARM 65: Hart to Home - Wix template, broken nav, typos. harttohomehandymansevices@gmail.com.
- Email ledger statuses: `{"failed": 17, "provider_accepted": 256, "reconciled_superseded": 11, "sent": 1}`
- Email truth blockers:
  - lead=0eea6bd58674: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=0fb0dabd723c: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=107fd3d014a9: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=1fdaf9b7c844: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=be56d746d08f: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=denver-janitorial: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=f129c5836fec: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
- Recent email attempts:
  - 2026-04-30T04:24:41.358463+00:00 #312 failed lead=sundogelectric to=info@sundogelectric.com via=gmail_smtp: (535, b'5.7.8 Username and Password not accepted. For more information, go to\n5.7.8  https://support.google.com/mail/?p=BadCredentials 5b1f17b1804b1-48a7b900af7sm34536145e9.1 - gsmtp')
  - 2026-04-30T02:53:37.817999Z #311 sent lead=denver-janitorial to=mark@pikeent.com via=gmail: no provider evidence
  - 2026-04-30T02:19:57.729839+00:00 #310 provider_accepted lead=73936bb5be8c to=davidsrepair62@gmail.com via=gmail_smtp: <177751559625.32844.13601908068691947415@outboundautonomy.com>
  - 2026-04-30T02:01:29.239615+00:00 #302 provider_accepted lead=478a4070a54b to=office@goodpeopletreeservice.com via=gmail_smtp: <177751448558.32171.13073702605306391198@outboundautonomy.com>
  - 2026-04-30T02:01:29.000136+00:00 #307 provider_accepted lead=f379ad620e03 to=denver@junkgenius.com via=gmail_smtp: <177751448560.32177.14880487883762286204@outboundautonomy.com>

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 6
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-30T04:23:34.890574+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-29-hourly-outreach-draft-queue-1020pm.md (11062 bytes)
- 2026-04-30T04:21:02.373775+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (6743 bytes)
- 2026-04-30T04:17:21.833084+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/2026-04-29-hourly-prospect-research-cycle-10pm.md (4223 bytes)
- 2026-04-30T04:17:12.118294+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/distribution-plans/heartbeat-status-2026-04-29-12.md (1017 bytes)
- 2026-04-30T04:16:09.430080+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/colorado-pest-management-20260430-071515_website_audit_2026-04-30_071609.json (1018 bytes)
- 2026-04-30T04:15:56.896542+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/the-good-move-20260430-071454_website_audit_2026-04-30_071556.json (849 bytes)
- 2026-04-30T04:15:46.071261+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/denver-commercial-coatings-20260430-071435_website_audit_2026-04-30_071546.json (946 bytes)
- 2026-04-30T04:15:35.550463+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/denver-door-to-door-movers-20260430-071415_website_audit_2026-04-30_071535.json (913 bytes)
- 2026-04-30T04:15:25.457901+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/ap-pest-control-20260430-071341_website_audit_2026-04-30_071525.json (794 bytes)
- 2026-04-30T04:03:39.626496+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/nexus-report-20260429-2150.md (6468 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, email_attempts provider evidence, artifacts, transcripts, logs, or external confirmation. Browser/CDP send claims without provider evidence remain `unverified_claim`; anything else is `unverified` or `blocked`.
