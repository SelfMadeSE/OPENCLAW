# OpenClaw Runtime Reconciliation

Generated: 2026-04-30T02:23:26.171719+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 1, "ok": 17}`
- Failed or blocked jobs:
  - Memory Dreaming Promotion (main): error cron: job execution timed out

## CRM

- Lead stages: `{"archived": 16, "lost": 2, "outreach_sent": 168, "prospect": 2, "qualified": 5, "reconciled_duplicate": 3, "scored": 7}`
- Recent actions: 10 loaded
  - 2026-04-30T02:20:13.897268+00:00 outreach status lead=heartbeat: 42nd cycle: Sent David's Drywall (WARM 54) - Wix template, placeholder links, minimal content. Pipeline: 203 total, 168 outreach_sent. SMTP working when GMAIL_ADDRESS passed directly (secret:// resolution was breaking it). 1 scored near-perfect, 5 no-email, 3 replied leads still pending Rylee.
  - 2026-04-30T02:20:09.429265+00:00 outreach sent lead=73936bb5be8c: Email sent via SMTP (certifi SSL). WARM 54: Davids Drywall - Wix template, placeholder social links, no content. davidsrepair62@gmail.com.
  - 2026-04-30T01:46:45.770019+00:00 outreach status lead=heartbeat: 41st cycle: Found 3 new prospects via browser search (Roundtree Inc, A Remodel Co, Davids Drywall). Sent 2 WARM leads (Roundtree 63, A Remodel Co 54). Davids Drywall remains drafted. 3 replied leads, 2 scored near-perfect, 5 no-email leads still pending Rylee.
  - 2026-04-30T01:46:40.870523+00:00 outreach sent lead=107fd3d014a9: Email sent via SMTP (certifi SSL). WARM 54: A Remodel Company - Weebly text-wall, stock images, weak CTA. info@aremodelcompany.com.
  - 2026-04-30T01:46:40.870520+00:00 outreach sent lead=0eea6bd58674: Email sent via SMTP (certifi SSL). WARM 63: Roundtree Inc. - Wix template, placeholder social links, no portfolio. roundtreebuilders@gmail.com.
- Email ledger statuses: `{"failed": 16, "provider_accepted": 256, "reconciled_superseded": 10, "unverified_claim": 1}`
- Email truth blockers:
  - lead=0eea6bd58674: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=107fd3d014a9: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
- Recent email attempts:
  - 2026-04-30T02:19:57.729839+00:00 #310 provider_accepted lead=73936bb5be8c to=davidsrepair62@gmail.com via=gmail_smtp: <177751559625.32844.13601908068691947415@outboundautonomy.com>
  - 2026-04-30T02:01:29.239615+00:00 #302 provider_accepted lead=478a4070a54b to=office@goodpeopletreeservice.com via=gmail_smtp: <177751448558.32171.13073702605306391198@outboundautonomy.com>
  - 2026-04-30T02:01:29.000136+00:00 #307 provider_accepted lead=f379ad620e03 to=denver@junkgenius.com via=gmail_smtp: <177751448560.32177.14880487883762286204@outboundautonomy.com>
  - 2026-04-30T02:01:28.691858+00:00 #305 provider_accepted lead=d1f9105318c8 to=michael@astumpman.com via=gmail_smtp: <177751448558.32175.1195409911722563019@outboundautonomy.com>
  - 2026-04-30T02:01:28.539151+00:00 #304 provider_accepted lead=36ac5d0c1615 to=info@macwoods.com via=gmail_smtp: <177751448558.32174.17900002103394271078@outboundautonomy.com>

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 6
- incomplete_turn: 0
- telegram_socket: 1

## Recent Artifacts

- 2026-04-30T02:22:55.476500+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (5032 bytes)
- 2026-04-30T02:22:30.078261+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/crm-actions/2026-04-29-0820pm-CRM-actions.md (2254 bytes)
- 2026-04-30T02:22:07.160407+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-29-hourly-outreach-draft-queue-0820pm.md (5521 bytes)
- 2026-04-30T02:13:45.066353+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/denver-prospects-2026-04-29.md (16875 bytes)
- 2026-04-30T02:12:54.178855+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/rocky-mountain-tech-team-20260430-051154_research_2026-04-30_051254.json (782 bytes)
- 2026-04-30T02:12:45.193466+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/netirio-managed-it-solutions-20260430-051154_research_2026-04-30_051245.json (789 bytes)
- 2026-04-30T02:12:35.528288+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/denver-party-rentals-20260430-051153_research_2026-04-30_051235.json (720 bytes)
- 2026-04-30T02:12:25.264196+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/keyrenter-denver-property-management-20260430-051153_research_2026-04-30_051225.json (803 bytes)
- 2026-04-30T02:12:15.860248+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/mile-high-detailing-20260430-051147_research_2026-04-30_051215.json (783 bytes)
- 2026-04-30T02:03:09.143130+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/outreach-truth-blocker-resend-20260429-1953.md (4590 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, email_attempts provider evidence, artifacts, transcripts, logs, or external confirmation. Browser/CDP send claims without provider evidence remain `unverified_claim`; anything else is `unverified` or `blocked`.
