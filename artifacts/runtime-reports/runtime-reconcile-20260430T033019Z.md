# OpenClaw Runtime Reconciliation

Generated: 2026-04-30T03:30:19.058040+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 1, "ok": 17}`
- Failed or blocked jobs:
  - Memory Dreaming Promotion (main): error cron: job execution timed out

## CRM

- Lead stages: `{"archived": 16, "lost": 2, "outreach_sent": 176, "prospect": 3, "qualified": 2, "reconciled_duplicate": 3, "scored": 7}`
- Recent actions: 10 loaded
  - 2026-04-30T02:58:39.109837+00:00 outreach status lead=heartbeat: 43rd cycle: Researched & sent 4 new WARM leads via Wix Google search. TCF Plumbing (69), Hart to Home (65), IV CONSTRUCTION (61), 180 Construction (59). All Wix templates with visible site problems. Pipeline: +4 outreach_sent. SMTP working via certifi SSL. 7 scored leads still pending Rylee (2 near-perfect + 5 no-email). 3 replied leads pending review.
  - 2026-04-30T02:58:34.049382+00:00 outreach sent lead=f129c5836fec: Email sent via SMTP (certifi SSL). WARM 69: TCF Emergency Plumbing - Wix template, minimal content, no portfolio. tcf.servicesllc@gmail.com.
  - 2026-04-30T02:58:34.040520+00:00 outreach sent lead=0fb0dabd723c: Email sent via SMTP (certifi SSL). WARM 59: 180 Construction - Wix template, no portfolio, generic content. 180ConstructionDenver@gmail.com.
  - 2026-04-30T02:58:34.040518+00:00 outreach sent lead=be56d746d08f: Email sent via SMTP (certifi SSL). WARM 61: IV CONSTRUCTION - Wix template, nav typo, stock social links. iv.const21@gmail.com.
  - 2026-04-30T02:58:34.040518+00:00 outreach sent lead=1fdaf9b7c844: Email sent via SMTP (certifi SSL). WARM 65: Hart to Home - Wix template, broken nav, typos. harttohomehandymansevices@gmail.com.
- Email ledger statuses: `{"failed": 16, "provider_accepted": 256, "reconciled_superseded": 11, "sent": 1}`
- Email truth blockers:
  - lead=0eea6bd58674: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=0fb0dabd723c: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=107fd3d014a9: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=1fdaf9b7c844: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=be56d746d08f: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=denver-janitorial: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=f129c5836fec: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
- Recent email attempts:
  - 2026-04-30T02:53:37.817999Z #311 sent lead=denver-janitorial to=mark@pikeent.com via=gmail: no provider evidence
  - 2026-04-30T02:19:57.729839+00:00 #310 provider_accepted lead=73936bb5be8c to=davidsrepair62@gmail.com via=gmail_smtp: <177751559625.32844.13601908068691947415@outboundautonomy.com>
  - 2026-04-30T02:01:29.239615+00:00 #302 provider_accepted lead=478a4070a54b to=office@goodpeopletreeservice.com via=gmail_smtp: <177751448558.32171.13073702605306391198@outboundautonomy.com>
  - 2026-04-30T02:01:29.000136+00:00 #307 provider_accepted lead=f379ad620e03 to=denver@junkgenius.com via=gmail_smtp: <177751448560.32177.14880487883762286204@outboundautonomy.com>
  - 2026-04-30T02:01:28.691858+00:00 #305 provider_accepted lead=d1f9105318c8 to=michael@astumpman.com via=gmail_smtp: <177751448558.32175.1195409911722563019@outboundautonomy.com>

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 8
- incomplete_turn: 0
- telegram_socket: 1

## Recent Artifacts

- 2026-04-30T03:23:42.866827+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-29-hourly-outreach-draft-queue-0920pm.md (8852 bytes)
- 2026-04-30T03:21:48.314632+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (4771 bytes)
- 2026-04-30T03:17:56.200128+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/evara-events-design-20260430-061428_website_audit_research_2026-04-30_010902.json (970 bytes)
- 2026-04-30T03:17:56.199663+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/outsource-it-20260430-061428_website_audit_research_2026-04-30_010902.json (957 bytes)
- 2026-04-30T03:17:56.199209+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/aspire-technology-solutions-20260430-061428_website_audit_research_2026-04-30_010902.json (821 bytes)
- 2026-04-30T03:17:56.198619+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/simple-cleaning-20260430-061428_website_audit_research_2026-04-30_010902.json (797 bytes)
- 2026-04-30T03:17:56.198093+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/kg-facility-solutions-20260430-061428_website_audit_research_2026-04-30_010902.json (777 bytes)
- 2026-04-30T03:17:22.902817+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/2026-04-29-hourly-prospect-research-cycle-9pm.md (5209 bytes)
- 2026-04-30T03:15:10.123420+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/williams-and-sons-electric-20260430-060815_research_2026-04-30_061510.json (679 bytes)
- 2026-04-30T03:15:10.123330+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/sundog-electric-20260430-061428_research_2026-04-30_061510.json (575 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, email_attempts provider evidence, artifacts, transcripts, logs, or external confirmation. Browser/CDP send claims without provider evidence remain `unverified_claim`; anything else is `unverified` or `blocked`.
