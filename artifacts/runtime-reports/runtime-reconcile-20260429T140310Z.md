# OpenClaw Runtime Reconciliation

Generated: 2026-04-29T14:03:10.646953+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"ok": 18}`
- Failed or blocked jobs: none found in job state

## CRM

- Lead stages: `{"archived": 16, "lost": 2, "outreach_sent": 65, "prospect": 2, "scored": 2}`
- Recent actions: 10 loaded
  - 2026-04-29T13:42:59.964681+00:00 outreach stage_change lead=09045987-6c5: scored → outreach_sent: SMTP send. Competition Auto Glass — 100/100 A perfect site, low urgency. Provider accepted ID 109.
  - 2026-04-29T13:40:38.759329+00:00 outreach outreach_sent lead=07ee791ce30a: Sent audit-led outreach email to stevenbasurto@gmail.com. Subject: 'Your fence website needs some updates'. Highlighted HTTP/no-SSL, no mobile, keyword-stuffed nav, no estimate form. Score: 45/100. SMTP sent successfully (provider_accepted).
  - 2026-04-29T13:40:38.759328+00:00 outreach outreach_sent lead=c6a9859fbeb7: Sent audit-led outreach email to glass@denveractionautoglass.com. Subject: 'Quick heads up — your homepage still has Lorem Ipsum'. Highlighted Lorem Ipsum, keyword-stuffed title, missing portfolio/booking. Score: 51/100. SMTP sent successfully (provider_accepted).
  - 2026-04-29T13:35:12.095038+00:00 outreach draft_ready lead=07ee791ce30a: Drafted audit-led outreach email for stevenbasurto@gmail.com. Score: 45/100. Early-2000s ASP.NET site, HTTP no SSL, no mobile, keyword-stuffed. Slam dunk case for full rebuild.
  - 2026-04-29T13:35:12.085983+00:00 outreach draft_ready lead=c6a9859fbeb7: Drafted audit-led outreach email for glass@denveractionautoglass.com. Score: 51/100. KEY FINDING: Lorem Ipsum placeholder on live homepage. Easy opener.
- Email ledger statuses: `{"failed": 11, "provider_accepted": 91, "reconciled_superseded": 7}`
- Email truth blockers:
  - lead=008cfdf01de9: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=478a4070a54b: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=d1f9105318c8: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=d66d0284f957: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=f379ad620e03: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
- Recent email attempts:
  - 2026-04-29T13:42:48.478295+00:00 #109 provider_accepted lead=09045987-6c5 to=info@competitionautoglass.com via=gmail_smtp: <177747016587.87466.3618385256209951495@outboundautonomy.com>
  - 2026-04-29T13:40:25.363137+00:00 #108 provider_accepted lead=07ee791ce30a to=stevenbasurto@gmail.com via=gmail_smtp: <177747002359.87349.14548044924041950729@outboundautonomy.com>
  - 2026-04-29T13:40:16.729407+00:00 #107 provider_accepted lead=c6a9859fbeb7 to=glass@denveractionautoglass.com via=gmail_smtp: <177747001359.87342.9145004679551026208@outboundautonomy.com>
  - 2026-04-29T13:35:36.351279+00:00 #106 provider_accepted lead=bde2b8fb3a6b to=info@denverconcretecompany.net via=gmail_smtp: <177746973479.87222.14809562279875199140@outboundautonomy.com>
  - 2026-04-29T13:35:28.241449+00:00 #105 provider_accepted lead=522cac77ddcd to=info@sunnyday-concrete.com via=gmail_smtp: <177746972571.87217.9094624061559208766@outboundautonomy.com>

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 0
- incomplete_turn: 0
- telegram_socket: 1

## Recent Artifacts

- 2026-04-29T14:02:20.499188+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/research/cycle2-fencing-concrete.json (9438 bytes)
- 2026-04-29T13:59:46.837159+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-hero-tsx-url-first-implementation-2026-04-29.md (2796 bytes)
- 2026-04-29T13:52:17.653909+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/research/cycle2-pest-landscape-windows.json (8409 bytes)
- 2026-04-29T13:51:39.108157+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (5010 bytes)
- 2026-04-29T13:48:38.798584+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/blog-post-competitive-position-2026-04-29.md (14983 bytes)
- 2026-04-29T13:42:48.788573+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-29-0710-prospects-and-sends.md (1545 bytes)
- 2026-04-29T13:36:03.250371+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-29-0720-sends.md (2531 bytes)
- 2026-04-29T13:30:40.895362+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/2026-04-29-prospect-research.md (6997 bytes)
- 2026-04-29T13:30:04.175395+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-29-big-horn-painting-audit-email.md (587 bytes)
- 2026-04-29T13:29:57.470223+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-29-denver-concrete-company-audit-email.md (523 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, email_attempts provider evidence, artifacts, transcripts, logs, or external confirmation. Browser/CDP send claims without provider evidence remain `unverified_claim`; anything else is `unverified` or `blocked`.
