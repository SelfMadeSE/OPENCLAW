# OpenClaw Runtime Reconciliation

Generated: 2026-04-29T11:00:16.670374+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"ok": 18}`
- Failed or blocked jobs: none found in job state

## CRM

- Lead stages: `{"archived": 14, "lost": 2, "outreach_drafted": 10, "outreach_sent": 37, "prospect": 1, "scored": 2}`
- Recent actions: 10 loaded
  - 2026-04-29T10:39:28.376792+00:00 outreach stage_change lead=20308a88-a43: outreach_drafted → outreach_sent: SMTP send successful. A.P. Pest Control — 97/100 audit score, personalized email sent. Provider accepted. ID 62.
  - 2026-04-29T10:28:24.209664+00:00 outreach stage_change lead=112fbdd7-f85: outreach_drafted → outreach_sent: SMTP send successful. Sphere Electric — parked domain, blank canvas hook. Provider accepted. ID 61.
  - 2026-04-29T10:24:52.157725+00:00 outreach heartbeat lead=bc151121-558: Window Replacement Denver (score 7/10) — Added to CRM at scored stage. Audit: Overall 98 (A). Very clean site — low urgency. Awaiting Rylee decision.
  - 2026-04-29T10:24:52.130458+00:00 outreach heartbeat lead=8f24ea99-cc3: Affordable Pest (score 7/10) — Added to CRM at scored stage. Audit: Overall 97 (A). Nearly perfect site — low urgency. Awaiting Rylee decision.
  - 2026-04-29T10:24:52.102813+00:00 outreach heartbeat lead=347651a8-4c1: Pure Pest Co (score 9/10) — Added to CRM. Audit: Overall 87 (B). Key issue: no lead form. No email found yet. Needs contact discovery.
- Email ledger statuses: `{"attempted": 4, "failed": 6, "provider_accepted": 50, "reconciled_superseded": 7}`
- Email truth blockers:
  - lead=008cfdf01de9: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=478a4070a54b: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=d66d0284f957: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=f379ad620e03: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
- Recent email attempts:
  - 2026-04-29T11:00:15.908798+00:00 #67 attempted lead=874cbf592ac6 to=dispatch@horsetoothheatingandair.com via=gmail_smtp: <177746041590.75657.16171337481673253151@outboundautonomy.com>
  - 2026-04-29T11:00:15.890809+00:00 #66 attempted lead=9ac3eda23070 to=info@skylinelandscapedesign.com via=gmail_smtp: <177746041589.75658.5106468005584837203@outboundautonomy.com>
  - 2026-04-29T11:00:15.885121+00:00 #65 attempted lead=69c06b9bd8a0 to=office@fixitnowhvac.com via=gmail_smtp: <177746041588.75660.1066169948027739076@outboundautonomy.com>
  - 2026-04-29T11:00:15.881791+00:00 #64 attempted lead=347651a8-4c1 to=info@purepestco.com via=gmail_smtp: <177746041588.75659.1808145376744491008@outboundautonomy.com>
  - 2026-04-29T11:00:01.697557+00:00 #63 provider_accepted lead=f903936e7d00 to=denverlawnlandscape@gmail.com via=gmail_smtp: <177746039841.75609.16911946423951232607@outboundautonomy.com>

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 6
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-29T10:59:45.939592+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/email-bodies/2026-04-29-send-ge-heating.txt (913 bytes)
- 2026-04-29T10:59:45.939591+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/email-bodies/2026-04-29-send-mountain-view-mechanical.txt (977 bytes)
- 2026-04-29T10:59:45.939589+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/email-bodies/2026-04-29-send-pure-pest-co.txt (986 bytes)
- 2026-04-29T10:59:45.939572+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/email-bodies/2026-04-29-send-fix-it-now-hvac.txt (782 bytes)
- 2026-04-29T10:59:45.939572+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/email-bodies/2026-04-29-send-horsetooth-heating.txt (1008 bytes)
- 2026-04-29T10:59:45.939544+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/email-bodies/2026-04-29-send-denver-lawn-landscape.txt (954 bytes)
- 2026-04-29T10:59:45.939537+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/email-bodies/2026-04-29-send-skyline-landscape-design.txt (1003 bytes)
- 2026-04-29T10:59:37.994033+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/pending-deployment-bundle-2026-04-29.md (4910 bytes)
- 2026-04-29T10:59:09.565768+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/methodology-page-2026-04-29.md (13534 bytes)
- 2026-04-29T10:58:20.701235+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/trust-social-proof-strategy-2026-04-29.md (8943 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, email_attempts provider evidence, artifacts, transcripts, logs, or external confirmation. Browser/CDP send claims without provider evidence remain `unverified_claim`; anything else is `unverified` or `blocked`.
