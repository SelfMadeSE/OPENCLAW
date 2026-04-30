# OpenClaw Runtime Reconciliation

Generated: 2026-04-29T19:30:13.803568+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 1, "ok": 17}`
- Failed or blocked jobs:
  - Memory Dreaming Promotion (main): error cron: job execution timed out

## CRM

- Lead stages: `{"archived": 16, "lost": 2, "outreach_sent": 88, "prospect": 2, "scored": 7}`
- Recent actions: 10 loaded
  - 2026-04-29T19:13:03.591029+00:00 --type reconciliation lead=denver-landscape-company: --desc
  - 2026-04-29T19:13:03.588120+00:00 --type reconciliation lead=denver-landscapes: --desc
  - 2026-04-29T19:13:03.587566+00:00 --type reconciliation lead=8494028ef6ac: --desc
  - 2026-04-29T19:13:03.587064+00:00 --type reconciliation lead=bde2b8fb3a6b: --desc
  - 2026-04-29T19:02:24.400298+00:00 heartbeat --action-type lead=--lead-id: heartbeat
- Email ledger statuses: `{"failed": 13, "provider_accepted": 139, "reconciled_superseded": 7}`
- Email truth blockers:
  - lead=008cfdf01de9: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=0d762c036f98: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=36ac5d0c1615: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=478a4070a54b: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=d1f9105318c8: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=d66d0284f957: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=f379ad620e03: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
- Recent email attempts:
  - 2026-04-29T18:41:20.384934+00:00 #159 provider_accepted lead=denver-landscape-company to=lesliegardendesign@outlook.com via=gmail_smtp: <177748807229.5216.17489158391828026080@outboundautonomy.com>
  - 2026-04-29T18:41:12.292068+00:00 #158 provider_accepted lead=denver-landscapes to=info@denverlandscapes.com via=gmail_smtp: <177748806483.5216.10137196295333237653@outboundautonomy.com>
  - 2026-04-29T18:41:04.836859+00:00 #157 provider_accepted lead=highlands-landscaping to=info@highlandslandscaping.com via=gmail_smtp: <177748805900.5216.3812359745914850058@outboundautonomy.com>
  - 2026-04-29T18:40:59.004313+00:00 #156 provider_accepted lead=floors-by-tomorrow to=floorsbytomorrow@gmail.com via=gmail_smtp: <177748805097.5216.10824574690146988272@outboundautonomy.com>
  - 2026-04-29T18:40:50.973992+00:00 #155 provider_accepted lead=my-denver-plumber to=info@mydenverplumber.net via=gmail_smtp: <177748804126.5216.4732464337674640969@outboundautonomy.com>

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 4
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-29T19:27:01.265687+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/homepage-audio-audit-hero-variant-2026-04-29.md (7500 bytes)
- 2026-04-29T19:25:01.778770+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-29-hourly-outreach-draft-queue-0120pm.md (15895 bytes)
- 2026-04-29T19:10:05.599165+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/shea-mcgrath-photography-20260429-220908_research_2026-04-29_190500.json (1265 bytes)
- 2026-04-29T19:10:05.599159+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/dmr-media-20260429-220908_research_2026-04-29_190500.json (1459 bytes)
- 2026-04-29T19:10:05.599140+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/gheen--co-cpa-llc-20260429-220747_research_2026-04-29_190500.json (1390 bytes)
- 2026-04-29T19:10:05.599070+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/two-hills-cpas-20260429-220818_research_2026-04-29_190500.json (1333 bytes)
- 2026-04-29T19:10:05.599064+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/cornerstone-cpa-group-20260429-220908_research_2026-04-29_190500.json (1301 bytes)
- 2026-04-29T19:09:52.195407+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/website-leak-checklist-lead-magnet-2026-04-29.md (6760 bytes)
- 2026-04-29T19:03:16.848366+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/site-health-2026-04-29-1300MDT.md (8984 bytes)
- 2026-04-29T18:50:13.814161+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (12154 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, email_attempts provider evidence, artifacts, transcripts, logs, or external confirmation. Browser/CDP send claims without provider evidence remain `unverified_claim`; anything else is `unverified` or `blocked`.
