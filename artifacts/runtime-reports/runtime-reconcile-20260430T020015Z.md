# OpenClaw Runtime Reconciliation

Generated: 2026-04-30T02:00:15.447353+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 1, "ok": 17}`
- Failed or blocked jobs:
  - Memory Dreaming Promotion (main): error cron: job execution timed out

## CRM

- Lead stages: `{"archived": 16, "lost": 2, "outreach_sent": 167, "prospect": 2, "qualified": 5, "reconciled_duplicate": 3, "researched": 1, "scored": 7}`
- Recent actions: 10 loaded
  - 2026-04-30T01:46:45.770019+00:00 outreach status lead=heartbeat: 41st cycle: Found 3 new prospects via browser search (Roundtree Inc, A Remodel Co, Davids Drywall). Sent 2 WARM leads (Roundtree 63, A Remodel Co 54). Davids Drywall remains drafted. 3 replied leads, 2 scored near-perfect, 5 no-email leads still pending Rylee.
  - 2026-04-30T01:46:40.870523+00:00 outreach sent lead=107fd3d014a9: Email sent via SMTP (certifi SSL). WARM 54: A Remodel Company - Weebly text-wall, stock images, weak CTA. info@aremodelcompany.com.
  - 2026-04-30T01:46:40.870520+00:00 outreach sent lead=0eea6bd58674: Email sent via SMTP (certifi SSL). WARM 63: Roundtree Inc. - Wix template, placeholder social links, no portfolio. roundtreebuilders@gmail.com.
  - 2026-04-30T01:10:31.485483+00:00 outreach status lead=heartbeat: 40th cycle: 195 leads, 165 outreach_sent, 0 drafted. 244 provider_accepted. SMTP working. No new replies. Prospect discovery blocked by search engine captchas.
  - 2026-04-30T00:57:09.317693+00:00 outreach stage_change lead=evara-events-design: outreach_drafted → outreach_sent: SMTP send. Evara Events — no portfolio on homepage, Wix SEO penalty, Gmail contact. ID 298.
- Email ledger statuses: `{"failed": 24, "provider_accepted": 247, "reconciled_superseded": 10, "unverified_claim": 1}`
- Email truth blockers:
  - lead=008cfdf01de9: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=0d762c036f98: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=0eea6bd58674: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=107fd3d014a9: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=36ac5d0c1615: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=478a4070a54b: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=6626d2e2b5e2: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=d1f9105318c8: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
- Recent email attempts:
  - 2026-04-30T01:59:04.115234+00:00 #303 failed lead=0d762c036f98 to=nick@letali.com via=gmail_smtp: <177751434301.32064.4143336582732772412@secret://gmail_address>
  - 2026-04-30T01:59:04.115228+00:00 #302 failed lead=478a4070a54b to=office@goodpeopletreeservice.com via=gmail_smtp: <177751434300.32065.11697886992596654208@secret://gmail_address>
  - 2026-04-30T01:59:04.107833+00:00 #306 failed lead=6626d2e2b5e2 to=info@gr-treeservice.com via=gmail_smtp: <177751434302.32067.2588154758479625758@secret://gmail_address>
  - 2026-04-30T01:59:04.107832+00:00 #307 failed lead=f379ad620e03 to=denver@junkgenius.com via=gmail_smtp: <177751434302.32069.7414552409491438079@secret://gmail_address>
  - 2026-04-30T01:59:04.102884+00:00 #304 failed lead=36ac5d0c1615 to=info@macwoods.com via=gmail_smtp: <177751434301.32066.11748178629630432386@secret://gmail_address>

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 14
- incomplete_turn: 0
- telegram_socket: 1

## Recent Artifacts

- 2026-04-30T01:56:37.588131+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (6387 bytes)
- 2026-04-30T01:52:11.981930+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/creative-briefs/blog-seo-foundation-audit-2026-04-29.md (5736 bytes)
- 2026-04-30T01:37:13.621607+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/distribution-plans/heartbeat-status-2026-04-29-10.md (1017 bytes)
- 2026-04-30T01:33:17.870983+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/site-health-2026-04-29-1930MDT.md (8103 bytes)
- 2026-04-30T01:29:35.090489+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/outreach-roundtable-report-20260429-1930.md (5937 bytes)
- 2026-04-30T01:26:28.814587+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/task1-add-leads-send.py (12558 bytes)
- 2026-04-30T01:23:10.222382+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/crm-actions/2026-04-29-0720pm-CRM-actions.md (1994 bytes)
- 2026-04-30T01:22:19.389576+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-29-hourly-outreach-draft-queue-0720pm.md (4999 bytes)
- 2026-04-30T01:16:07.787190+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-abandoned-audit-recovery-emails-2026-04-29.md (6199 bytes)
- 2026-04-30T01:13:27.717026+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/it-geeks-20260430-041210_website_audit_2026-04-30_041327.json (2079 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, email_attempts provider evidence, artifacts, transcripts, logs, or external confirmation. Browser/CDP send claims without provider evidence remain `unverified_claim`; anything else is `unverified` or `blocked`.
