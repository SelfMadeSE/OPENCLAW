# OpenClaw Runtime Reconciliation

Generated: 2026-04-29T12:39:16.347078+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 1, "ok": 17}`
- Failed or blocked jobs:
  - Hourly Prospect Research (outreach): error cron: job execution timed out

## CRM

- Lead stages: `{"archived": 14, "lost": 2, "outreach_drafted_email_missing": 2, "outreach_sent": 45, "prospect": 4, "scored": 2}`
- Recent actions: 10 loaded
  - 2026-04-29T12:05:27.153928+00:00 heartbeat Prospect added. Copyright 2021, basic WordPress template, phone-only (720-829-8391), no email visible. Needs email discovery. lead=57f24908a5ef: added
  - 2026-04-29T12:05:23.821017+00:00 heartbeat Prospect added. Site copyright 2018, basic HTML, no mobile optimization. Contact: michael@astumpman.com lead=84ba777d9b27: added
  - 2026-04-29T12:05:19.887503+00:00 84ba777d9b27 --action lead=--lead-id: heartbeat
  - 2026-04-29T12:05:19.886400+00:00 57f24908a5ef --action lead=--lead-id: heartbeat
  - 2026-04-29T11:04:32.869587+00:00 outreach stage_change lead=6792b00dccf4: outreach_drafted → outreach_drafted_email_missing: No email found. Wix WHOIS (Matt Michaelis). Phone 720-874-9559 available for non-email outreach.
- Email ledger statuses: `{"failed": 6, "provider_accepted": 59, "reconciled_superseded": 7}`
- Email truth blockers:
  - lead=008cfdf01de9: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=478a4070a54b: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=d66d0284f957: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=f379ad620e03: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
- Recent email attempts:
  - 2026-04-29T12:06:47.979698+00:00 #72 provider_accepted lead=diamond-hand-garage-20260429 to=info@coloradogaragedoorrepair.com via=gmail_smtp: <177746440385.80289.9169798475321739306@outboundautonomy.com>
  - 2026-04-29T12:06:43.847167+00:00 #71 provider_accepted lead=cspringschiro-20260429 to=frontdesk@cspringschiro.com via=gmail_smtp: <177746439929.80289.5488648802134113017@outboundautonomy.com>
  - 2026-04-29T11:04:14.599008+00:00 #70 provider_accepted lead=bd032a70b8b1 to=bhcallc@gmail.com via=gmail_smtp: <177746065221.75974.1725074695132873001@outboundautonomy.com>
  - 2026-04-29T11:00:44.290011+00:00 #69 provider_accepted lead=96a88aecf4de to=service@fortcollinsheating.com via=gmail_smtp: <177746044265.75694.15848848706231330745@outboundautonomy.com>
  - 2026-04-29T11:00:31.052635+00:00 #68 provider_accepted lead=dfb5d640157a to=office@geheating.com via=gmail_smtp: <177746042938.75669.7250468088841094306@outboundautonomy.com>

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 0
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-29T12:39:03.989396+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach/smtp-blitz-continued-2026-04-29.md (1019 bytes)
- 2026-04-29T12:07:32.432316+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/heartbeat-2026-04-29-0607MDT.md (471 bytes)
- 2026-04-29T12:07:11.381677+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/creative/demo-assets/oa-demo-fullpage.png (183846 bytes)
- 2026-04-29T12:07:00.229840+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/creative/demo-assets/oa-demo-fullpage.pdf (266113 bytes)
- 2026-04-29T12:06:54.930685+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/blog-cross-link-impl-brief-2026-04-29.md (8476 bytes)
- 2026-04-29T12:05:21.978200+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/marketing/x-content-calendar-14-day-2026-04-29.md (26442 bytes)
- 2026-04-29T12:04:05.061916+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/auditor/focus-guard-2026-04-29.md (6514 bytes)
- 2026-04-29T11:55:44.907467+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (3235 bytes)
- 2026-04-29T11:45:25.886790+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/marketing/schema-markup-expanded-2026-04-29.md (15842 bytes)
- 2026-04-29T11:44:35.935086+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/marketing/form-deep-dive-expanded-2026-04-29.md (10051 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, email_attempts provider evidence, artifacts, transcripts, logs, or external confirmation. Browser/CDP send claims without provider evidence remain `unverified_claim`; anything else is `unverified` or `blocked`.
