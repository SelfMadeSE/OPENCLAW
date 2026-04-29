# OpenClaw Runtime Reconciliation

Generated: 2026-04-29T18:38:23.379860+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 1, "ok": 17}`
- Failed or blocked jobs:
  - Memory Dreaming Promotion (main): error cron: job execution timed out

## CRM

- Lead stages: `{"archived": 16, "lost": 2, "outreach_sent": 74, "prospect": 3, "scored": 7}`
- Recent actions: 10 loaded
  - 2026-04-29T18:37:43.297358+00:00 heartbeat outreach lead=heartbeat: 30th cycle (12:31 PM MT). Pipeline: 102 total, 74 outreach_sent (+2 this cycle), 7 scored (unchanged), 3 prospect. 121 provider_accepted emails. New sends: MacDonald Hardwoods (info@macwoods.com), Letali LLC (nick@letali.com). Emails discovered via contact page scraping. SMTP working (intermittent 535 on script, direct SMTP fine).
  - 2026-04-29T18:36:18.196570+00:00 heartbeat outreach lead=macdonald-hardwoods-20260429-12pm: Audit-led email sent to info@macwoods.com. Score 58/100. Key issues: single-page site, no gallery filtering, text-only testimonials, no after-hours conversion.
  - 2026-04-29T18:36:18.196550+00:00 heartbeat outreach lead=letali-llc-20260429-12pm: Audit-led email sent to nick@letali.com. Score 35/100. Key issues: raw URLs visible on page, duplicate service pages, buried testimonials, 16-day claim undersold.
  - 2026-04-29T17:57:24.860313+00:00 outreach heartbeat lead=heartbeat: 29th cycle (11:54 AM MT). Pipeline: 99 total, 72 outreach_sent, 7 scored (5 no-email blocked, 2 awaiting Rylee), 2 prospect (not actionable). 112 provider_accepted emails. SMTP working.
  - 2026-04-29T17:57:17.905062+00:00 heartbeat --description lead=--action-type: 29th cycle (11:54 AM MT). Pipeline: 99 total, 72 outreach_sent, 7 scored (5 no-email blocked, 2 awaiting Rylee), 2 prospect (not actionable). 112 provider_accepted emails. SMTP working.
- Email ledger statuses: `{"attempted": 1, "failed": 13, "provider_accepted": 125, "reconciled_superseded": 7}`
- Email truth blockers:
  - lead=008cfdf01de9: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=0d762c036f98: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=36ac5d0c1615: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=478a4070a54b: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=d1f9105318c8: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=d66d0284f957: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=f379ad620e03: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
- Recent email attempts:
  - 2026-04-29T18:38:21.895825+00:00 #146 attempted lead=unknown to=info@denverlandscapes.com via=gmail_smtp: <177748790189.4983.17390656947578733802@outboundautonomy.com>
  - 2026-04-29T18:38:21.892986+00:00 #145 provider_accepted lead=unknown to=lesliegardendesign@outlook.com via=gmail_smtp: <177748789573.4983.15767400388477520807@outboundautonomy.com>
  - 2026-04-29T18:38:06.398696+00:00 #144 provider_accepted lead=unknown to=info@denverhandymansolutions.com via=gmail_smtp: <177748788064.4903.4109173503271456424@outboundautonomy.com>
  - 2026-04-29T18:38:00.638892+00:00 #143 provider_accepted lead=unknown to=info@denverconcretecompany.net via=gmail_smtp: <177748787339.4903.8869336450998154636@outboundautonomy.com>
  - 2026-04-29T18:37:53.392546+00:00 #142 provider_accepted lead=unknown to=milehighmovers303@gmail.com via=gmail_smtp: <177748786789.4903.12710065626155947038@outboundautonomy.com>

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 0
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-29T18:38:04.953186+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/batch5-emails.jsonl (5724 bytes)
- 2026-04-29T18:34:55.210690+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/site-health-2026-04-29-1230MDT.md (10563 bytes)
- 2026-04-29T18:31:16.810883+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/distribution-plans/heartbeat-status-2026-04-29-7.md (1347 bytes)
- 2026-04-29T18:27:37.120734+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/creative/x-posting-log-2026-04-29.md (1803 bytes)
- 2026-04-29T18:26:10.773275+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (7264 bytes)
- 2026-04-29T18:24:17.895367+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/crm-actions/2026-04-29-1220pm-CRM-actions.md (3109 bytes)
- 2026-04-29T18:23:49.989225+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-29-hourly-outreach-draft-queue-1220pm.md (27771 bytes)
- 2026-04-29T18:10:05.401533+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/2026-04-29-hourly-prospect-research-cycle-12pm.md (3234 bytes)
- 2026-04-29T18:09:28.708914+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/letali-llc-20260429-210928_website_audit_2026-04-29_210928.json (1568 bytes)
- 2026-04-29T18:09:28.705881+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/next-step-innovations-20260429-210928_website_audit_2026-04-29_210928.json (1651 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, email_attempts provider evidence, artifacts, transcripts, logs, or external confirmation. Browser/CDP send claims without provider evidence remain `unverified_claim`; anything else is `unverified` or `blocked`.
