# OpenClaw Runtime Reconciliation

Generated: 2026-04-29T22:00:17.643446+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 1, "ok": 17}`
- Failed or blocked jobs:
  - Memory Dreaming Promotion (main): error cron: job execution timed out

## CRM

- Lead stages: `{"archived": 16, "lost": 2, "outreach_sent": 160, "prospect": 4, "reconciled_duplicate": 3, "scored": 7}`
- Recent actions: 10 loaded
  - 2026-04-29T21:29:50.411804+00:00 heartbeat drafted lead=3e6cc2916961: Community Auto Repair — WARM lead (text-wall site, no clear CTA). Draft saved to artifacts/outreach-drafts/. Ready to send when pipeline needs filling.
  - 2026-04-29T21:29:50.411804+00:00 heartbeat drafted lead=a213b9521e57: Becker Electrical Services — WARM lead (stock-photo-heavy, dead menu link, keyword stuffing). Draft saved. Ready to send.
  - 2026-04-29T21:29:50.411804+00:00 heartbeat scored lead=f8284a34d632: Scored Wild Irishman Tree & Landscape — HOT. Placeholder contact page, typos, stock testimonial content. denverlandscaping@gmail.com found.
  - 2026-04-29T21:29:50.411804+00:00 heartbeat scored lead=1f27dc8cc3c5: Scored My Denver Locksmith — HOT. HTTP-only (no SSL) critical for locksmith. 404 contact page. 2017-era WordPress. mydenverlocksmith@gmail.com found.
  - 2026-04-29T21:29:50.411804+00:00 heartbeat scored lead=3a23d930da7f: Scored Letali LLC — HOT. Wix template, copyright 2022, keyword-stuffed footer, no portfolio. nick@letali.com found.
- Email ledger statuses: `{"failed": 15, "provider_accepted": 211, "queued": 1, "reconciled_superseded": 10, "unverified_claim": 1}`
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
  - 2026-04-29T21:29:39.659719+00:00 #265 provider_accepted lead=1f27dc8cc3c5 to=mydenverlocksmith@gmail.com via=gmail_smtp: <46762b8c31704e3e2eda0282a2c70074@outboundautonomy.com>
  - 2026-04-29T21:29:38.970288+00:00 #264 provider_accepted lead=3a23d930da7f to=nick@letali.com via=gmail_smtp: <240b8cd3b509ee37d14985831edd39a4@outboundautonomy.com>
  - 2026-04-29T21:29:38.825050+00:00 #263 provider_accepted lead=f8284a34d632 to=denverlandscaping@gmail.com via=gmail_smtp: <5f8e338bdfd41492c70b0c09df330de6@outboundautonomy.com>
  - 2026-04-29T21:16:59.258886+00:00 #262 provider_accepted lead=e1b7c9d2 to=skylineheatingac@aol.com via=gmail_smtp: <013a176b3d4a01035ee1becec0a637e6@outboundautonomy.com>
  - 2026-04-29T21:16:59.258341+00:00 #261 provider_accepted lead=f2c8d0e3 to=contact@denverductpros.com via=gmail_smtp: <0caf5d1b1876d319575be30e694c16ef@outboundautonomy.com>

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 2
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-29T21:59:48.636847+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/prospects/_batch3_results.json (3543 bytes)
- 2026-04-29T21:58:49.704907+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/prospects/_batch3_scraper2.py (7493 bytes)
- 2026-04-29T21:56:04.049749+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/prospects/_batch3_scraper.py (8216 bytes)
- 2026-04-29T21:49:01.839114+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/prospects/_pro_scraper.py (10372 bytes)
- 2026-04-29T21:48:10.383960+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (11354 bytes)
- 2026-04-29T21:43:52.011802+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/prospects/_professional_services_scraper.py (12595 bytes)
- 2026-04-29T21:38:20.071570+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/distribution-plans/heartbeat-status-2026-04-29-8.md (1023 bytes)
- 2026-04-29T21:37:51.711994+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/audit-reports/2026-04-29-boot-check-1537pm.md (2214 bytes)
- 2026-04-29T21:32:54.947194+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/audit-led-proposal-template-2026-04-29.md (8012 bytes)
- 2026-04-29T21:31:48.183358+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-custom-proposal-template-2026-04-29.md (8776 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, email_attempts provider evidence, artifacts, transcripts, logs, or external confirmation. Browser/CDP send claims without provider evidence remain `unverified_claim`; anything else is `unverified` or `blocked`.
