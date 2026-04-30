# OpenClaw Runtime Reconciliation

Generated: 2026-04-30T07:16:21.025777+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 2, "ok": 16}`
- Failed or blocked jobs:
  - Memory Dreaming Promotion (main): error cron: job execution timed out
  - Hourly Agent Roundtable Audit (orchestrator): error cron: job execution timed out

## CRM

- Lead stages: `{"archived": 16, "lost": 2, "outreach_sent": 180, "prospect": 8, "qualified": 2, "reconciled_duplicate": 3, "scored": 7}`
- Recent actions: 10 loaded
  - 2026-04-30T02:58:39.109837+00:00 outreach status lead=heartbeat: 43rd cycle: Researched & sent 4 new WARM leads via Wix Google search. TCF Plumbing (69), Hart to Home (65), IV CONSTRUCTION (61), 180 Construction (59). All Wix templates with visible site problems. Pipeline: +4 outreach_sent. SMTP working via certifi SSL. 7 scored leads still pending Rylee (2 near-perfect + 5 no-email). 3 replied leads pending review.
  - 2026-04-30T02:58:34.049382+00:00 outreach sent lead=f129c5836fec: Email sent via SMTP (certifi SSL). WARM 69: TCF Emergency Plumbing - Wix template, minimal content, no portfolio. tcf.servicesllc@gmail.com.
  - 2026-04-30T02:58:34.040520+00:00 outreach sent lead=0fb0dabd723c: Email sent via SMTP (certifi SSL). WARM 59: 180 Construction - Wix template, no portfolio, generic content. 180ConstructionDenver@gmail.com.
  - 2026-04-30T02:58:34.040518+00:00 outreach sent lead=be56d746d08f: Email sent via SMTP (certifi SSL). WARM 61: IV CONSTRUCTION - Wix template, nav typo, stock social links. iv.const21@gmail.com.
  - 2026-04-30T02:58:34.040518+00:00 outreach sent lead=1fdaf9b7c844: Email sent via SMTP (certifi SSL). WARM 65: Hart to Home - Wix template, broken nav, typos. harttohomehandymansevices@gmail.com.
- Email ledger statuses: `{"failed": 16, "provider_accepted": 277, "reconciled_superseded": 11, "sent": 1}`
- Email truth blockers:
  - lead=0eea6bd58674: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=0fb0dabd723c: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=107fd3d014a9: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=1fdaf9b7c844: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=be56d746d08f: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=denver-janitorial: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=f129c5836fec: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
- Recent email attempts:
  - 2026-04-30T06:06:59.146727+00:00 #333 provider_accepted lead=the-good-move-20260430-071454 to=info@thegoodmovellc.com via=gmail_smtp: <177752921586.73913.16442678637324436242@outboundautonomy.com>
  - 2026-04-30T06:06:47.425615+00:00 #332 provider_accepted lead=colorado-roofing-company-20260430-061428 to=info@coloradoroofingcompany.com via=gmail_smtp: <177752920402.73861.7252373906465713906@outboundautonomy.com>
  - 2026-04-30T06:06:33.867097+00:00 #331 provider_accepted lead=aspire-technology-solutions-20260430-061428 to=email@aspiredenver.com via=gmail_smtp: <177752919081.73845.252160950425788320@outboundautonomy.com>
  - 2026-04-30T05:24:33.773962+00:00 #330 provider_accepted lead=morning-blitz-20260430-front-range-fence to=info@frontrangefence.com via=gmail_smtp: <177752667205.72258.3250784922513047030@outboundautonomy.com>
  - 2026-04-30T05:24:32.051185+00:00 #329 provider_accepted lead=morning-blitz-20260430-garcia's-auto-repair to=garciasautorepair558@gmail.com via=gmail_smtp: <177752667045.72258.9948206701588704150@outboundautonomy.com>

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 4
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-30T07:14:01.849914+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/verified-builders-20260430-101215_website_audit_2026-04-30_101300.json (1903 bytes)
- 2026-04-30T07:13:42.274770+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/carspa-denver-20260430-101159_website_audit_2026-04-30_101300.json (1911 bytes)
- 2026-04-30T07:13:24.964909+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/peak-builders-denver-20260430-101141_website_audit_2026-04-30_101300.json (1899 bytes)
- 2026-04-30T07:12:48.408997+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/big-orange-planet-20260430-101123_website_audit_2026-04-30_101248.json (1888 bytes)
- 2026-04-30T07:12:31.253624+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/knots-flooring-20260430-101105_website_audit_2026-04-30_101231.json (1711 bytes)
- 2026-04-30T06:58:25.906698+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-sms-follow-up-templates-2026-04-30.md (4995 bytes)
- 2026-04-30T06:57:18.653227+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/heartbeat-2026-04-30-0000MDT.md (2112 bytes)
- 2026-04-30T06:56:14.944620+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (3397 bytes)
- 2026-04-30T06:51:17.396003+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/blog-post-01-your-website-is-making-people-leave-2026-04-30.md (7536 bytes)
- 2026-04-30T06:33:44.615902+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/site-health-2026-04-30-0030MDT.md (5315 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, email_attempts provider evidence, artifacts, transcripts, logs, or external confirmation. Browser/CDP send claims without provider evidence remain `unverified_claim`; anything else is `unverified` or `blocked`.
