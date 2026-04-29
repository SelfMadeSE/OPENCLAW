# OpenClaw Runtime Reconciliation

Generated: 2026-04-29T08:57:24.511958+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"ok": 18}`
- Failed or blocked jobs: none found in job state

## CRM

- Lead stages: `{"archived": 11, "lost": 2, "negotiating": 1, "outreach_drafted": 21, "outreach_sent": 23, "prospect": 1, "won": 2}`
- Recent actions: 10 loaded
  - 2026-04-29T08:03:32.099466+00:00 outreach heartbeat lead=heartbeat-boot-20260429: Boot check @ 1:10 AM MT. SMTP working — 15 emails provider_accepted. 13 leads outreach_sent, 31 outreach_drafted. 0 replies received. Pipeline healthy.
  - 2026-04-29T07:59:13.294592 outreach stage_change lead=atlantic-dental-20260426-110754: outreach_drafted → outreach_sent: Sent audit-led email via SMTP. Lead: Atlantic Dental
  - 2026-04-29T07:59:13.294592 outreach stage_change lead=e7db265f63f0: outreach_drafted → outreach_sent: Sent audit-led email via SMTP. Lead: Strong Heating and Cooling
  - 2026-04-29T07:59:13.294592 outreach stage_change lead=payless-rooter-20260426-121158: outreach_drafted → outreach_sent: Sent audit-led email via SMTP. Lead: Payless Rooter
  - 2026-04-29T07:59:13.294592 outreach stage_change lead=93dc098cb8f1: outreach_drafted → outreach_sent: Sent audit-led email via SMTP. Lead: LogicHVACR
- Email ledger statuses: `{"failed": 3, "provider_accepted": 28, "unverified_claim": 7}`
- Email truth blockers:
  - lead=315f28b0e620: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=42edd05bfa3c: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=d192cf575884: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
- Recent email attempts:
  - 2026-04-29T08:51:24.160878+00:00 #38 provider_accepted lead=unknown to=support@denverappliance.co via=gmail_smtp: <177745268222.67123.2731951713158021877@outboundautonomy.com>
  - 2026-04-29T08:51:22.222808+00:00 #37 provider_accepted lead=unknown to=denverconcretepros974@gmail.com via=gmail_smtp: <177745268018.67123.639061285388160461@outboundautonomy.com>
  - 2026-04-29T08:51:20.178417+00:00 #36 provider_accepted lead=unknown to=dj@cologaragedoor.com via=gmail_smtp: <177745267821.67123.13662028671192049763@outboundautonomy.com>
  - 2026-04-29T08:31:50.279079+00:00 #35 provider_accepted lead=bc3a82428256 to=mtybeeinfo@gmail.com via=gmail_smtp: <177745150842.66043.15560499822443012344@outboundautonomy.com>
  - 2026-04-29T08:31:48.427135+00:00 #34 provider_accepted lead=9e7d8c6e22b0 to=dj@cologaragedoor.com via=gmail_smtp: <177745150585.66043.5856389176263951573@outboundautonomy.com>

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 6
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-29T08:57:12.834043+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/audit-reports/2026-04-29-boot-check-0856am.md (4634 bytes)
- 2026-04-29T08:55:17.896168+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-blog-post-website-cost-2026-04-29.md (7389 bytes)
- 2026-04-29T08:52:22.553379+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/audit-reports/2026-04-29-heartbeat-0251am.md (1305 bytes)
- 2026-04-29T08:49:59.713078+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-blog-post-local-seo-starter-kit-trades-2026-04-29.md (13848 bytes)
- 2026-04-29T08:48:12.620462+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (10464 bytes)
- 2026-04-29T08:44:16.862230+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/blog-content-strategy-2026-04-29.md (6163 bytes)
- 2026-04-29T08:43:00.727195+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/site-health-2026-04-29-0239.md (7358 bytes)
- 2026-04-29T08:42:13.796426+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/audit-reports/truth-blockers-cdp-cleanup-2026-04-29.md (6472 bytes)
- 2026-04-29T08:42:00.009064+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/fixes/body-hash-fix-2026-04-29.md (2889 bytes)
- 2026-04-29T08:41:42.599938+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/outreach-drafts/2026-04-29-email-send-results-0235-batch4.md (2538 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, email_attempts provider evidence, artifacts, transcripts, logs, or external confirmation. Browser/CDP send claims without provider evidence remain `unverified_claim`; anything else is `unverified` or `blocked`.
