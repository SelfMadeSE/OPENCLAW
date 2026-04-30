# OpenClaw Runtime Reconciliation

Generated: 2026-04-30T00:00:17.410848+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 1, "ok": 17}`
- Failed or blocked jobs:
  - Memory Dreaming Promotion (main): error cron: job execution timed out

## CRM

- Lead stages: `{"archived": 16, "lost": 2, "outreach_sent": 162, "prospect": 2, "reconciled_duplicate": 3, "scored": 7}`
- Recent actions: 10 loaded
  - 2026-04-29T23:11:50.318867+00:00 3e6cc2916961 stage_change lead=heartbeat: Pipeline fully drained - no more drafts.
  - 2026-04-29T23:11:50.285416+00:00 heartbeat stage_change lead=3e6cc2916961: outreach_drafted -> outreach_sent: Sent via certifi SSL SMTP. Pipeline fully drained.
  - 2026-04-29T23:11:30.002304+00:00 heartbeat sent lead=3e6cc2916961: Email sent successfully via SMTP (certifi SSL). WARM: Community Auto Repair — text-wall site, no CTA.
  - 2026-04-29T23:11:30.002302+00:00 heartbeat sent lead=a213b9521e57: Email sent successfully via SMTP (certifi SSL). WARM: Becker Electrical — stock photos, dead nav link, keyword stuffing.
  - 2026-04-29T23:10:02.864604+00:00 heartbeat stage_change lead=3e6cc2916961: outreach_drafted -> outreach_sent: Email sent via SMTP (certifi SSL). Community Auto Repair WARM lead.
- Email ledger statuses: `{"failed": 16, "provider_accepted": 241, "reconciled_superseded": 10, "unverified_claim": 1}`
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
  - 2026-04-29T23:11:25.226005+00:00 #295 provider_accepted lead=a213b9521e57 to=beckerelectrical@gmail.com via=gmail_smtp: no provider evidence
  - 2026-04-29T23:10:26.846287+00:00 #294 provider_accepted lead=3e6cc2916961 to=contact@communityautorepairshop.com via=gmail_smtp: no provider evidence
  - 2026-04-29T23:09:29.446276+00:00 #266 failed lead=3e6cc2916961 to=contact@communityautorepairshop.com via=gmail_smtp: <177750416831.25356.5569127637234532478@secret://gmail_address>
  - 2026-04-29T21:29:39.659719+00:00 #265 provider_accepted lead=1f27dc8cc3c5 to=mydenverlocksmith@gmail.com via=gmail_smtp: <46762b8c31704e3e2eda0282a2c70074@outboundautonomy.com>
  - 2026-04-29T21:29:38.970288+00:00 #264 provider_accepted lead=3a23d930da7f to=nick@letali.com via=gmail_smtp: <240b8cd3b509ee37d14985831edd39a4@outboundautonomy.com>

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 10
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-29T23:52:23.453884+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (8189 bytes)
- 2026-04-29T23:32:47.248552+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/site-health-2026-04-29-1730MDT.md (6178 bytes)
- 2026-04-29T23:32:12.018147+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/audit-reports/heartbeat-2026-04-29-1731.md (1782 bytes)
- 2026-04-29T23:25:41.188749+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-29-hourly-outreach-draft-queue-0520pm.md (26899 bytes)
- 2026-04-29T23:12:08.043341+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/denver-floor-coatings-20260430-021002_website_audit_research_2026-04-30_021208.json (1017 bytes)
- 2026-04-29T23:12:08.043254+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/denver-janitorial-pike-enterprises-inc-20260430-021002_website_audit_research_2026-04-30_021208.json (1025 bytes)
- 2026-04-29T23:12:08.043169+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/mak-cleaning-llc-20260430-021002_website_audit_research_2026-04-30_021208.json (1001 bytes)
- 2026-04-29T23:12:08.043083+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/foothills-paving--maintenance-inc-20260430-021002_website_audit_research_2026-04-30_021208.json (1015 bytes)
- 2026-04-29T23:12:08.042669+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/soria--sons-paving-20260430-021002_website_audit_research_2026-04-30_021208.json (867 bytes)
- 2026-04-29T23:07:56.772155+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/heartbeat-2026-04-29-1707MDT.md (978 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, email_attempts provider evidence, artifacts, transcripts, logs, or external confirmation. Browser/CDP send claims without provider evidence remain `unverified_claim`; anything else is `unverified` or `blocked`.
