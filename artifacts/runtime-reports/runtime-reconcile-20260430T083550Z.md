# OpenClaw Runtime Reconciliation

Generated: 2026-04-30T08:35:50.487801+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 2, "ok": 16}`
- Failed or blocked jobs:
  - Memory Dreaming Promotion (main): error cron: job execution timed out
  - Nightly OA Outreach Review (outreach): error cron: job execution timed out

## CRM

- Lead stages: `{"archived": 16, "lost": 2, "outreach_sent": 180, "prospect": 23, "qualified": 2, "reconciled_duplicate": 3, "scored": 7}`
- Recent actions: 10 loaded
  - 2026-04-30T02:58:39.109837+00:00 outreach status lead=heartbeat: 43rd cycle: Researched & sent 4 new WARM leads via Wix Google search. TCF Plumbing (69), Hart to Home (65), IV CONSTRUCTION (61), 180 Construction (59). All Wix templates with visible site problems. Pipeline: +4 outreach_sent. SMTP working via certifi SSL. 7 scored leads still pending Rylee (2 near-perfect + 5 no-email). 3 replied leads pending review.
  - 2026-04-30T02:58:34.049382+00:00 outreach sent lead=f129c5836fec: Email sent via SMTP (certifi SSL). WARM 69: TCF Emergency Plumbing - Wix template, minimal content, no portfolio. tcf.servicesllc@gmail.com.
  - 2026-04-30T02:58:34.040520+00:00 outreach sent lead=0fb0dabd723c: Email sent via SMTP (certifi SSL). WARM 59: 180 Construction - Wix template, no portfolio, generic content. 180ConstructionDenver@gmail.com.
  - 2026-04-30T02:58:34.040518+00:00 outreach sent lead=be56d746d08f: Email sent via SMTP (certifi SSL). WARM 61: IV CONSTRUCTION - Wix template, nav typo, stock social links. iv.const21@gmail.com.
  - 2026-04-30T02:58:34.040518+00:00 outreach sent lead=1fdaf9b7c844: Email sent via SMTP (certifi SSL). WARM 65: Hart to Home - Wix template, broken nav, typos. harttohomehandymansevices@gmail.com.
- Email ledger statuses: `{"failed": 19, "provider_accepted": 284, "reconciled_superseded": 12}`
- Email truth blockers: none from CRM sent-stage vs ledger provider evidence check
- Recent email attempts:
  - 2026-04-30T08:34:49.271871+00:00 #343 failed lead=knots-flooring-20260430-101105 to=dmccarty@knotsflooring.com via=gmail_smtp: <177753808807.88923.7531716811959380374@secret://gmail_address>
  - 2026-04-30T08:34:49.240785+00:00 #342 failed lead=best-service-company-appliance-repair-20260430-111811 to=tomhankins@bscappliancerepair.com via=gmail_smtp: <177753808806.88925.11990745400470176562@secret://gmail_address>
  - 2026-04-30T08:34:49.240784+00:00 #341 failed lead=peak-builders-denver-20260430-101141 to=info@peakbuildersdenver.com via=gmail_smtp: <177753808805.88924.1694833055555401821@secret://gmail_address>
  - 2026-04-30T07:28:43.529248+00:00 #337 provider_accepted lead=be56d746d08f to=iv.const21@gmail.com via=gmail_smtp: <177753412077.80285.12155463855913411929@outboundautonomy.com>
  - 2026-04-30T07:28:42.830883+00:00 #340 provider_accepted lead=107fd3d014a9 to=info@aremodelcompany.com via=gmail_smtp: <177753412080.80283.17551239707489477571@outboundautonomy.com>

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 0
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-30T08:35:25.568273+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-30-hourly-outreach-draft-queue-0228am.md (9500 bytes)
- 2026-04-30T08:33:13.306228+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/heartbeat-2026-04-30-0231MDT.md (1979 bytes)
- 2026-04-30T08:29:06.852056+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (4190 bytes)
- 2026-04-30T08:28:55.774515+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/prospects/batch-5-multi-category-2026-04-30.md (5821 bytes)
- 2026-04-30T08:26:03.116281+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/outreach/send-email-null-mid-fix-2026-04-30.md (9004 bytes)
- 2026-04-30T08:20:15.804826+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/2026-04-30-hourly-prospect-research-cycle-2am.md (4720 bytes)
- 2026-04-30T08:19:30.985996+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/urgent-mold-removal-denver-20260430-111847_research_2026-04-30_111930.json (1406 bytes)
- 2026-04-30T08:19:30.984544+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/fort-comfort-gutters-20260430-111736_research_2026-04-30_111930.json (820 bytes)
- 2026-04-30T08:19:30.980589+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/level-up-insulation-co-20260430-111831_research_2026-04-30_111930.json (1398 bytes)
- 2026-04-30T08:19:30.980356+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/denver-foundation-solutions-20260430-111753_research_2026-04-30_111930.json (1007 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, email_attempts provider evidence, artifacts, transcripts, logs, or external confirmation. Browser/CDP send claims without provider evidence remain `unverified_claim`; anything else is `unverified` or `blocked`.
