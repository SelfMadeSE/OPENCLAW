# OpenClaw Runtime Reconciliation

Generated: 2026-04-30T01:37:47.082452+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 1, "ok": 17}`
- Failed or blocked jobs:
  - Memory Dreaming Promotion (main): error cron: job execution timed out

## CRM

- Lead stages: `{"archived": 16, "lost": 2, "outreach_sent": 165, "prospect": 2, "qualified": 5, "reconciled_duplicate": 3, "scored": 7}`
- Recent actions: 10 loaded
  - 2026-04-30T01:10:31.485483+00:00 outreach status lead=heartbeat: 40th cycle: 195 leads, 165 outreach_sent, 0 drafted. 244 provider_accepted. SMTP working. No new replies. Prospect discovery blocked by search engine captchas.
  - 2026-04-30T00:57:09.317693+00:00 outreach stage_change lead=evara-events-design: outreach_drafted → outreach_sent: SMTP send. Evara Events — no portfolio on homepage, Wix SEO penalty, Gmail contact. ID 298.
  - 2026-04-30T00:57:09.291643+00:00 outreach stage_change lead=kg-facility-solutions: outreach_drafted → outreach_sent: SMTP send. KG Facility Solutions — .co TLD, zero blog, broken Careers nav. ID 297.
  - 2026-04-30T00:57:09.263714+00:00 outreach stage_change lead=ec-lewis-law: outreach_drafted → outreach_sent: SMTP send. EC Lewis Law — IE6 code, Yoast 10 versions behind, zero testimonials. ID 296.
  - 2026-04-29T23:11:50.318867+00:00 3e6cc2916961 stage_change lead=heartbeat: Pipeline fully drained - no more drafts.
- Email ledger statuses: `{"failed": 16, "provider_accepted": 247, "reconciled_superseded": 10, "unverified_claim": 1}`
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
  - 2026-04-30T01:26:40.324541+00:00 #301 provider_accepted lead=kurli-codes-inc-20260430-041210 to=sales@kurlicodes.com via=gmail_smtp: <177751239815.30838.17065340329021311134@outboundautonomy.com>
  - 2026-04-30T01:26:38.154752+00:00 #300 provider_accepted lead=developers-capital-net-20260430-041210 to=info@developerscapital.net via=gmail_smtp: <177751239567.30838.4009958158030762926@outboundautonomy.com>
  - 2026-04-30T01:26:35.674039+00:00 #299 provider_accepted lead=proactivocommerce-20260430-041210 to=support@proactivocommerce.com via=gmail_smtp: <177751239390.30838.13831663861230837667@outboundautonomy.com>
  - 2026-04-30T00:56:50.207143+00:00 #298 provider_accepted lead=evara-events-design to=evaraeventco@gmail.com via=gmail_smtp: <177751060834.29791.14637517202092772676@outboundautonomy.com>
  - 2026-04-30T00:56:41.702040+00:00 #297 provider_accepted lead=kg-facility-solutions to=bizdev@kgfsco.com via=gmail_smtp: <177751060017.29787.2960095427122034308@outboundautonomy.com>

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 10
- incomplete_turn: 0
- telegram_socket: 1

## Recent Artifacts

- 2026-04-30T01:37:13.621607+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/distribution-plans/heartbeat-status-2026-04-29-10.md (1017 bytes)
- 2026-04-30T01:33:17.870983+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/site-health-2026-04-29-1930MDT.md (8103 bytes)
- 2026-04-30T01:29:35.090489+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/outreach-roundtable-report-20260429-1930.md (5937 bytes)
- 2026-04-30T01:26:28.814587+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/task1-add-leads-send.py (12558 bytes)
- 2026-04-30T01:23:10.222382+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/crm-actions/2026-04-29-0720pm-CRM-actions.md (1994 bytes)
- 2026-04-30T01:22:19.389576+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-29-hourly-outreach-draft-queue-0720pm.md (4999 bytes)
- 2026-04-30T01:21:59.851803+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (8401 bytes)
- 2026-04-30T01:16:07.787190+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-abandoned-audit-recovery-emails-2026-04-29.md (6199 bytes)
- 2026-04-30T01:13:27.717026+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/it-geeks-20260430-041210_website_audit_2026-04-30_041327.json (2079 bytes)
- 2026-04-30T01:13:27.716713+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/brands-that-bloom-20260430-041210_website_audit_2026-04-30_041327.json (2110 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, email_attempts provider evidence, artifacts, transcripts, logs, or external confirmation. Browser/CDP send claims without provider evidence remain `unverified_claim`; anything else is `unverified` or `blocked`.
