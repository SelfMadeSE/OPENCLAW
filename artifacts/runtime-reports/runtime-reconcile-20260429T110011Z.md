# OpenClaw Runtime Reconciliation

Generated: 2026-04-29T11:00:11.656886+00:00

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
- Email ledger statuses: `{"failed": 6, "provider_accepted": 50, "reconciled_superseded": 7}`
- Email truth blockers:
  - lead=008cfdf01de9: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=478a4070a54b: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=d66d0284f957: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=f379ad620e03: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
- Recent email attempts:
  - 2026-04-29T11:00:01.697557+00:00 #63 provider_accepted lead=f903936e7d00 to=denverlawnlandscape@gmail.com via=gmail_smtp: <177746039841.75609.16911946423951232607@outboundautonomy.com>
  - 2026-04-29T10:39:22.619364+00:00 #62 provider_accepted lead=20308a88-a43 to=ap_pestcontrol@yahoo.com via=gmail_smtp: <177745916074.73484.2380625481042208142@outboundautonomy.com>
  - 2026-04-29T10:28:08.747271+00:00 #61 provider_accepted lead=112fbdd7-f85 to=sphere.electric@gmail.com via=gmail_smtp: <177745848004.72558.10538136401240322881@outboundautonomy.com>
  - 2026-04-29T10:04:45.985982+00:00 #60 failed lead=f379ad620e03 to=denver@junkgenius.com via=gmail_smtp: <177745708405.71698.6797556151869040315@secret://gmail_address>
  - 2026-04-29T09:22:17.384082+00:00 #59 failed lead=smoke3 to=test2@example.com via=gmail_smtp: <177745453442.69175.5008281716082449067@outboundautonomy.com>

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
