# OpenClaw Runtime Reconciliation

Generated: 2026-04-29T23:00:16.247255+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 1, "ok": 17}`
- Failed or blocked jobs:
  - Memory Dreaming Promotion (main): error cron: job execution timed out

## CRM

- Lead stages: `{"archived": 16, "lost": 2, "outreach_drafted": 2, "outreach_sent": 160, "prospect": 2, "reconciled_duplicate": 3, "scored": 7}`
- Recent actions: 10 loaded
  - 2026-04-29T22:19:27.462742+00:00 heartbeat blocked lead=3e6cc2916961: Community Auto Repair — email drafted but SMTP send failed: 535 auth error. Gmail app password appears to have been rotated. Cannot send without Rylee intervention to regenerate app password.
  - 2026-04-29T22:19:27.457908+00:00 heartbeat blocker lead=system: SMTP BROKEN: All Gmail SMTP sends returning 535 auth error. SSL certs are fine (137 CA certs, certifi bundle). EHLO succeeds. The app password gsnf...kzqr has been rotated/revoked. Rylee needs to regenerate Gmail App Password at https://myaccount.google.com/apppasswords and update in GMAIL_APP_PASSWORD env var.
  - 2026-04-29T22:19:27.457726+00:00 heartbeat drafted lead=a213b9521e57: Becker Electrical Services — draft ready but not sent. SMTP auth failure (535) confirmed across all sends. App password appears rotated. Flagging for Rylee.
  - 2026-04-29T22:18:30.389101+00:00 heartbeat drafted lead=a213b9521e57: Becker Electrical Services — WARM lead. Draft saved to artifacts/outreach-drafts/becker-electrical-20260429.md. Stock-photo-heavy, dead menu link, keyword stuffing.
  - 2026-04-29T22:18:30.380053+00:00 heartbeat drafted lead=3e6cc2916961: Community Auto Repair — WARM lead. Draft saved to artifacts/outreach-drafts/community-auto-repair-20260429.md. Text-wall site, no clear CTA, cluttered nav.
- Email ledger statuses: `{"failed": 16, "provider_accepted": 239, "reconciled_superseded": 10, "unverified_claim": 1}`
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
  - 2026-04-29T22:19:11.944963+00:00 #266 failed lead=3e6cc2916961 to=contact@communityautorepairshop.com via=gmail_smtp: <177750115063.21584.5707766411682936003@secret://gmail_address>
  - 2026-04-29T21:29:39.659719+00:00 #265 provider_accepted lead=1f27dc8cc3c5 to=mydenverlocksmith@gmail.com via=gmail_smtp: <46762b8c31704e3e2eda0282a2c70074@outboundautonomy.com>
  - 2026-04-29T21:29:38.970288+00:00 #264 provider_accepted lead=3a23d930da7f to=nick@letali.com via=gmail_smtp: <240b8cd3b509ee37d14985831edd39a4@outboundautonomy.com>
  - 2026-04-29T21:29:38.825050+00:00 #263 provider_accepted lead=f8284a34d632 to=denverlandscaping@gmail.com via=gmail_smtp: <5f8e338bdfd41492c70b0c09df330de6@outboundautonomy.com>
  - 2026-04-29T21:16:59.258886+00:00 #262 provider_accepted lead=e1b7c9d2 to=skylineheatingac@aol.com via=gmail_smtp: <013a176b3d4a01035ee1becec0a637e6@outboundautonomy.com>

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 4
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-29T22:58:53.544659+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/prospects/batch-4-research-2026-04-29-1642.md (7906 bytes)
- 2026-04-29T22:58:12.082202+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (3778 bytes)
- 2026-04-29T22:56:43.635443+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/marketing/audit-led-positioning-2026-04-29.md (1086 bytes)
- 2026-04-29T22:56:32.151491+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/creative/demo-audit-report-2026-04-29.md (10367 bytes)
- 2026-04-29T22:56:25.727460+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/prospects/_batch4_results.json (8711 bytes)
- 2026-04-29T22:48:29.173151+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/prospects/_batch4_scraper.py (9662 bytes)
- 2026-04-29T22:33:52.293684+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/site-health-2026-04-29-1630MDT.md (8942 bytes)
- 2026-04-29T22:30:14.061595+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-audit-phone-followup-script-2026-04-29.md (6909 bytes)
- 2026-04-29T22:27:29.236487+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/audit-reports/heartbeat-2026-04-29-1626.md (3456 bytes)
- 2026-04-29T22:26:45.436431+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/distribution-plans/heartbeat-status-2026-04-29-9.md (1023 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, email_attempts provider evidence, artifacts, transcripts, logs, or external confirmation. Browser/CDP send claims without provider evidence remain `unverified_claim`; anything else is `unverified` or `blocked`.
