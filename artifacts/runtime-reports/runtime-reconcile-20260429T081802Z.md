# OpenClaw Runtime Reconciliation

Generated: 2026-04-29T08:18:02.315515+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 3, "ok": 15}`
- Failed or blocked jobs:
  - Nightly OA Creative Review (creative): error
  - Site Health Check (engineering): error
  - Hourly Prospect Research (outreach): error

## CRM

- Lead stages: `{"archived": 11, "lost": 2, "negotiating": 1, "outreach_drafted": 31, "outreach_sent": 13, "prospect": 1, "won": 2}`
- Recent actions: 10 loaded
  - 2026-04-29T08:03:32.099466+00:00 outreach heartbeat lead=heartbeat-boot-20260429: Boot check @ 1:10 AM MT. SMTP working — 15 emails provider_accepted. 13 leads outreach_sent, 31 outreach_drafted. 0 replies received. Pipeline healthy.
  - 2026-04-29T07:59:13.294592 outreach stage_change lead=atlantic-dental-20260426-110754: outreach_drafted → outreach_sent: Sent audit-led email via SMTP. Lead: Atlantic Dental
  - 2026-04-29T07:59:13.294592 outreach stage_change lead=e7db265f63f0: outreach_drafted → outreach_sent: Sent audit-led email via SMTP. Lead: Strong Heating and Cooling
  - 2026-04-29T07:59:13.294592 outreach stage_change lead=payless-rooter-20260426-121158: outreach_drafted → outreach_sent: Sent audit-led email via SMTP. Lead: Payless Rooter
  - 2026-04-29T07:59:13.294592 outreach stage_change lead=93dc098cb8f1: outreach_drafted → outreach_sent: Sent audit-led email via SMTP. Lead: LogicHVACR
- Email ledger statuses: `{"failed": 3, "provider_accepted": 15, "unverified_claim": 7}`
- Email truth blockers:
  - lead=315f28b0e620: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=42edd05bfa3c: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=d192cf575884: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
- Recent email attempts:
  - 2026-04-29T08:03:04.128847+00:00 #25 provider_accepted lead=engineering-smtp-test-20260429-v3 to=owner@outboundautonomy.com via=gmail_smtp: <177744978110.38383.17145142663088667989@outboundautonomy.com>
  - 2026-04-29T08:02:38.537347+00:00 #24 failed lead=engineering-smtp-test-20260429-v2 to=owner@outboundautonomy.com via=gmail_smtp: <177744975561.38376.16279598516442227739@secret://gmail_address>
  - 2026-04-29T08:02:18.765147+00:00 #23 failed lead=engineering-smtp-test-20260429 to=owner@outboundautonomy.com via=gmail_smtp: <177744973210.38363.8193460964226220348@outboundautonomy.com>
  - 2026-04-29T07:58:52.650762+00:00 #22 provider_accepted lead=d0a627a3a460 to=info@apexroofingdenver.com via=gmail_smtp: <177744952923.37615.12937104367158981620@outboundautonomy.com>
  - 2026-04-29T07:58:49.228868+00:00 #21 provider_accepted lead=0c719514c71f to=nativefamily.plumbingandheating@gmail.com via=gmail_smtp: <177744952692.37615.15041546337165306562@outboundautonomy.com>

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 6
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-29T08:17:58.870579+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/distribution-plans/heartbeat-status-2026-04-29-3.md (757 bytes)
- 2026-04-29T08:16:36.162007+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-blog-post-how-to-read-audit-score-2026-04-29.md (7778 bytes)
- 2026-04-29T08:09:07.881731+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/crm-actions/2026-04-29-0207am-outreach-draft-log.md (4265 bytes)
- 2026-04-29T08:08:40.747989+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-29-hourly-outreach-draft-queue-0207am.md (9061 bytes)
- 2026-04-29T08:08:13.210705+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/audit-reports/2026-04-29-heartbeat-0207am.md (1149 bytes)
- 2026-04-29T08:06:29.246928+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/denver-dog-walkers-20260429-110616_website_audit_research_2026-04-29_110629.json (1886 bytes)
- 2026-04-29T08:06:07.018738+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/diamond-hand-garage-doors-20260429-110553_website_audit_research_2026-04-29_110607.json (1965 bytes)
- 2026-04-29T08:05:57.917778+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/audit-reports/2026-04-29-boot-check-0804am.md (4865 bytes)
- 2026-04-29T08:05:39.429194+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/colorado-pro-wash-denver-pressure-washing-20260429-110526_website_audit_research_2026-04-29_110539.json (1997 bytes)
- 2026-04-29T08:05:14.955158+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/junk-genius-denver-junk-removal-20260429-110502_website_audit_research_2026-04-29_110514.json (1679 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, email_attempts provider evidence, artifacts, transcripts, logs, or external confirmation. Browser/CDP send claims without provider evidence remain `unverified_claim`; anything else is `unverified` or `blocked`.
