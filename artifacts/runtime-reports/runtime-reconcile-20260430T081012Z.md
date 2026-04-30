# OpenClaw Runtime Reconciliation

Generated: 2026-04-30T08:10:12.725579+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 1, "ok": 17}`
- Failed or blocked jobs:
  - Memory Dreaming Promotion (main): error cron: job execution timed out

## CRM

- Lead stages: `{"archived": 16, "lost": 2, "outreach_sent": 180, "prospect": 8, "qualified": 2, "reconciled_duplicate": 3, "scored": 7}`
- Recent actions: 10 loaded
  - 2026-04-30T02:58:39.109837+00:00 outreach status lead=heartbeat: 43rd cycle: Researched & sent 4 new WARM leads via Wix Google search. TCF Plumbing (69), Hart to Home (65), IV CONSTRUCTION (61), 180 Construction (59). All Wix templates with visible site problems. Pipeline: +4 outreach_sent. SMTP working via certifi SSL. 7 scored leads still pending Rylee (2 near-perfect + 5 no-email). 3 replied leads pending review.
  - 2026-04-30T02:58:34.049382+00:00 outreach sent lead=f129c5836fec: Email sent via SMTP (certifi SSL). WARM 69: TCF Emergency Plumbing - Wix template, minimal content, no portfolio. tcf.servicesllc@gmail.com.
  - 2026-04-30T02:58:34.040520+00:00 outreach sent lead=0fb0dabd723c: Email sent via SMTP (certifi SSL). WARM 59: 180 Construction - Wix template, no portfolio, generic content. 180ConstructionDenver@gmail.com.
  - 2026-04-30T02:58:34.040518+00:00 outreach sent lead=be56d746d08f: Email sent via SMTP (certifi SSL). WARM 61: IV CONSTRUCTION - Wix template, nav typo, stock social links. iv.const21@gmail.com.
  - 2026-04-30T02:58:34.040518+00:00 outreach sent lead=1fdaf9b7c844: Email sent via SMTP (certifi SSL). WARM 65: Hart to Home - Wix template, broken nav, typos. harttohomehandymansevices@gmail.com.
- Email ledger statuses: `{"failed": 16, "provider_accepted": 284, "reconciled_superseded": 12}`
- Email truth blockers: none from CRM sent-stage vs ledger provider evidence check
- Recent email attempts:
  - 2026-04-30T07:28:43.529248+00:00 #337 provider_accepted lead=be56d746d08f to=iv.const21@gmail.com via=gmail_smtp: <177753412077.80285.12155463855913411929@outboundautonomy.com>
  - 2026-04-30T07:28:42.830883+00:00 #340 provider_accepted lead=107fd3d014a9 to=info@aremodelcompany.com via=gmail_smtp: <177753412080.80283.17551239707489477571@outboundautonomy.com>
  - 2026-04-30T07:28:42.709814+00:00 #338 provider_accepted lead=f129c5836fec to=tcf.servicesllc@gmail.com via=gmail_smtp: <177753412077.80288.6794345231313736094@outboundautonomy.com>
  - 2026-04-30T07:28:42.485972+00:00 #336 provider_accepted lead=0fb0dabd723c to=180constructiondenver@gmail.com via=gmail_smtp: <177753412077.80284.7791633570694282064@outboundautonomy.com>
  - 2026-04-30T07:28:42.325213+00:00 #339 provider_accepted lead=1fdaf9b7c844 to=harttohomehandymansevices@gmail.com via=gmail_smtp: <177753412078.80287.454449598982715559@outboundautonomy.com>

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 8
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-30T08:03:49.883152+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-referral-activation-emails-2026-04-30.md (3965 bytes)
- 2026-04-30T07:59:36.881316+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/heartbeat-2026-04-30-0159MDT.md (1012 bytes)
- 2026-04-30T07:55:18.623763+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (11113 bytes)
- 2026-04-30T07:37:11.439696+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/distribution-plans/heartbeat-status-2026-04-30.md (1103 bytes)
- 2026-04-30T07:33:20.767034+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/DREAMS.md (16730 bytes)
- 2026-04-30T07:30:02.097109+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-website-self-assessment-checklist-2026-04-30.md (7285 bytes)
- 2026-04-30T07:23:01.594658+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-30-hourly-outreach-draft-queue-0120am.md (5682 bytes)
- 2026-04-30T07:17:21.155455+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/heartbeat-2026-04-30-0116MDT.md (1135 bytes)
- 2026-04-30T07:17:03.980124+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/engineering/monitoring-analytics-setup-2026-04-30.md (8150 bytes)
- 2026-04-30T07:14:01.849914+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/verified-builders-20260430-101215_website_audit_2026-04-30_101300.json (1903 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, email_attempts provider evidence, artifacts, transcripts, logs, or external confirmation. Browser/CDP send claims without provider evidence remain `unverified_claim`; anything else is `unverified` or `blocked`.
