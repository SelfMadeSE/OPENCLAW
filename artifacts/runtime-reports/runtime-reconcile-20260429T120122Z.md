# OpenClaw Runtime Reconciliation

Generated: 2026-04-29T12:01:21.999220+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"ok": 18}`
- Failed or blocked jobs: none found in job state

## CRM

- Lead stages: `{"archived": 14, "lost": 2, "outreach_drafted_email_missing": 2, "outreach_sent": 45, "prospect": 1, "scored": 2}`
- Recent actions: 10 loaded
  - 2026-04-29T11:04:32.869587+00:00 outreach stage_change lead=6792b00dccf4: outreach_drafted → outreach_drafted_email_missing: No email found. Wix WHOIS (Matt Michaelis). Phone 720-874-9559 available for non-email outreach.
  - 2026-04-29T11:04:32.845603+00:00 outreach stage_change lead=fdc4a754e86d: outreach_drafted → outreach_drafted_email_missing: No email found. Site returns 404. GoDaddy WHOIS privacy. Phone 719-648-4579 available for non-email outreach.
  - 2026-04-29T11:04:21.505949+00:00 outreach stage_change lead=bd032a70b8b1: outreach_drafted → outreach_sent: SMTP send successful. BHC Air — 93/100 audit, bhcallc@gmail.com discovered via site mailto. Provider accepted. ID 70.
  - 2026-04-29T10:39:28.376792+00:00 outreach stage_change lead=20308a88-a43: outreach_drafted → outreach_sent: SMTP send successful. A.P. Pest Control — 97/100 audit score, personalized email sent. Provider accepted. ID 62.
  - 2026-04-29T10:28:24.209664+00:00 outreach stage_change lead=112fbdd7-f85: outreach_drafted → outreach_sent: SMTP send successful. Sphere Electric — parked domain, blank canvas hook. Provider accepted. ID 61.
- Email ledger statuses: `{"failed": 6, "provider_accepted": 57, "reconciled_superseded": 7}`
- Email truth blockers:
  - lead=008cfdf01de9: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=478a4070a54b: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=d66d0284f957: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=f379ad620e03: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
- Recent email attempts:
  - 2026-04-29T11:04:14.599008+00:00 #70 provider_accepted lead=bd032a70b8b1 to=bhcallc@gmail.com via=gmail_smtp: <177746065221.75974.1725074695132873001@outboundautonomy.com>
  - 2026-04-29T11:00:44.290011+00:00 #69 provider_accepted lead=96a88aecf4de to=service@fortcollinsheating.com via=gmail_smtp: <177746044265.75694.15848848706231330745@outboundautonomy.com>
  - 2026-04-29T11:00:31.052635+00:00 #68 provider_accepted lead=dfb5d640157a to=office@geheating.com via=gmail_smtp: <177746042938.75669.7250468088841094306@outboundautonomy.com>
  - 2026-04-29T11:00:19.532113+00:00 #65 provider_accepted lead=69c06b9bd8a0 to=office@fixitnowhvac.com via=gmail_smtp: <177746041588.75660.1066169948027739076@outboundautonomy.com>
  - 2026-04-29T11:00:19.085199+00:00 #64 provider_accepted lead=347651a8-4c1 to=info@purepestco.com via=gmail_smtp: <177746041588.75659.1808145376744491008@outboundautonomy.com>

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 8
- incomplete_turn: 0
- telegram_socket: 1

## Recent Artifacts

- 2026-04-29T11:55:44.907467+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (3235 bytes)
- 2026-04-29T11:45:25.886790+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/marketing/schema-markup-expanded-2026-04-29.md (15842 bytes)
- 2026-04-29T11:44:35.935086+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/marketing/form-deep-dive-expanded-2026-04-29.md (10051 bytes)
- 2026-04-29T11:44:15.896141+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/heartbeat-2026-04-29-0543MDT.md (682 bytes)
- 2026-04-29T11:40:08.215639+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/engineering/p0-seo-fixes-2026-04-29.md (3991 bytes)
- 2026-04-29T11:31:56.590974+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/site-health-2026-04-29-0530MDT.md (6017 bytes)
- 2026-04-29T11:22:11.665180+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/email-bodies/2026-04-29-colorado-springs-chiropractic-outreach.md (2270 bytes)
- 2026-04-29T11:22:11.665173+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/email-bodies/2026-04-29-denver-express-movers-outreach.md (2038 bytes)
- 2026-04-29T11:21:48.315078+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-29-hourly-outreach-draft-queue-0520am.md (11025 bytes)
- 2026-04-29T11:14:01.621322+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/creative-briefs/blog-internal-linking-seo-audit-2026-04-29.md (11961 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, email_attempts provider evidence, artifacts, transcripts, logs, or external confirmation. Browser/CDP send claims without provider evidence remain `unverified_claim`; anything else is `unverified` or `blocked`.
