# OpenClaw Runtime Reconciliation

Generated: 2026-04-29T20:01:45.752731+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 1, "ok": 17}`
- Failed or blocked jobs:
  - Memory Dreaming Promotion (main): error cron: job execution timed out

## CRM

- Lead stages: `{"archived": 16, "lost": 2, "outreach_sent": 89, "prospect": 2, "scored": 7}`
- Recent actions: 10 loaded
  - 2026-04-29T19:59:32.472948+00:00 heartbeat drafted lead=6626d2e2b5e2: Audit-led outreach email drafted. SMTP password expired (535 error) - could not send. Saved to artifacts/outreach-drafts/gr-tree-service-20260429.md. Browser compose window opened as draft (not sent). Needs app password regeneration.
  - 2026-04-29T19:57:13.200693+00:00 heartbeat scored lead=6626d2e2b5e2: Scored 77/100 (HOT). Site is Homestead template from 2013, table-based layout, no mobile responsiveness. High urgency for redesign. Email found: info@gr-treeservice.com
  - 2026-04-29T19:13:03.591029+00:00 --type reconciliation lead=denver-landscape-company: --desc
  - 2026-04-29T19:13:03.588120+00:00 --type reconciliation lead=denver-landscapes: --desc
  - 2026-04-29T19:13:03.587566+00:00 --type reconciliation lead=8494028ef6ac: --desc
- Email ledger statuses: `{"failed": 13, "provider_accepted": 139, "reconciled_superseded": 7, "unverified_claim": 1}`
- Email truth blockers:
  - lead=008cfdf01de9: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=0d762c036f98: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=36ac5d0c1615: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=478a4070a54b: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=6626d2e2b5e2: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=d1f9105318c8: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=d66d0284f957: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=f379ad620e03: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
- Recent email attempts:
  - 2026-04-29T19:59:15.284118+00:00 #160 unverified_claim lead=6626d2e2b5e2 to=info@gr-treeservice.com via=gmail_browser_cdp: <177749270596.9536.13750503614851378576@outboundautonomy.com>
  - 2026-04-29T18:41:20.384934+00:00 #159 provider_accepted lead=denver-landscape-company to=lesliegardendesign@outlook.com via=gmail_smtp: <177748807229.5216.17489158391828026080@outboundautonomy.com>
  - 2026-04-29T18:41:12.292068+00:00 #158 provider_accepted lead=denver-landscapes to=info@denverlandscapes.com via=gmail_smtp: <177748806483.5216.10137196295333237653@outboundautonomy.com>
  - 2026-04-29T18:41:04.836859+00:00 #157 provider_accepted lead=highlands-landscaping to=info@highlandslandscaping.com via=gmail_smtp: <177748805900.5216.3812359745914850058@outboundautonomy.com>
  - 2026-04-29T18:40:59.004313+00:00 #156 provider_accepted lead=floors-by-tomorrow to=floorsbytomorrow@gmail.com via=gmail_smtp: <177748805097.5216.10824574690146988272@outboundautonomy.com>

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 4
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-29T19:59:55.988789+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/prospects/multi-metro-research-2026-04-29-1350.md (7703 bytes)
- 2026-04-29T19:55:29.086648+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/auditor/focus-guard-2026-04-29-1350.md (6625 bytes)
- 2026-04-29T19:49:50.612103+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-social-ready-pack-03-audit-led-2026-04-29.md (4002 bytes)
- 2026-04-29T19:49:19.830556+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (17201 bytes)
- 2026-04-29T19:36:54.372953+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/heartbeat-2026-04-29-1336MDT.md (1069 bytes)
- 2026-04-29T19:27:01.265687+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/homepage-audio-audit-hero-variant-2026-04-29.md (7500 bytes)
- 2026-04-29T19:25:01.778770+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-29-hourly-outreach-draft-queue-0120pm.md (15895 bytes)
- 2026-04-29T19:10:05.599165+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/shea-mcgrath-photography-20260429-220908_research_2026-04-29_190500.json (1265 bytes)
- 2026-04-29T19:10:05.599159+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/dmr-media-20260429-220908_research_2026-04-29_190500.json (1459 bytes)
- 2026-04-29T19:10:05.599140+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/gheen--co-cpa-llc-20260429-220747_research_2026-04-29_190500.json (1390 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, email_attempts provider evidence, artifacts, transcripts, logs, or external confirmation. Browser/CDP send claims without provider evidence remain `unverified_claim`; anything else is `unverified` or `blocked`.
