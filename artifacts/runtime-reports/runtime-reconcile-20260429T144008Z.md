# OpenClaw Runtime Reconciliation

Generated: 2026-04-29T14:40:08.765552+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"ok": 18}`
- Failed or blocked jobs: none found in job state

## CRM

- Lead stages: `{"archived": 16, "lost": 2, "outreach_sent": 70, "prospect": 2, "scored": 8}`
- Recent actions: 10 loaded
  - 2026-04-29T14:27:52.863754+00:00 outreach stage_change lead=3c5d29727ab4: scored → outreach_sent: 
  - 2026-04-29T14:27:52.858984+00:00 outreach stage_change lead=fbbb94741ee2: scored → outreach_sent: 
  - 2026-04-29T14:27:52.855274+00:00 outreach stage_change lead=e0d9d76ab2d1: scored → outreach_sent: 
  - 2026-04-29T14:27:25.591461+00:00 7453245706d9 --action-type lead=--lead-id: Sent audit-led outreach email to Keegan@cleanteamdenver.com. Subject: 'The Clean Team — your site's copyright says it's 2019'. Copyright stuck at 2019, no online booking, thin site. Score: 80/100. SMTP provider_accepted (ID 113).
  - 2026-04-29T14:27:25.584070+00:00 9c4f6bb5a4d2 --action-type lead=--lead-id: Sent audit-led outreach email to info@coenergyelectric.com. Subject: 'Your Colorado Springs electrical site is working with one hand tied behind its back'. Single-page site, no booking, reviews not leveraged. Score: 77/100. SMTP provider_accepted (ID 114).
- Email ledger statuses: `{"failed": 11, "provider_accepted": 96, "reconciled_superseded": 7}`
- Email truth blockers:
  - lead=008cfdf01de9: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=478a4070a54b: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=d1f9105318c8: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=d66d0284f957: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=f379ad620e03: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
- Recent email attempts:
  - 2026-04-29T14:26:23.746999+00:00 #114 provider_accepted lead=9c4f6bb5a4d2 to=info@coenergyelectric.com via=gmail_smtp: <177747277242.89681.14830695664907547675@outboundautonomy.com>
  - 2026-04-29T14:25:58.614441+00:00 #113 provider_accepted lead=7453245706d9 to=keegan@cleanteamdenver.com via=gmail_smtp: <177747274868.89668.16121421550032345390@outboundautonomy.com>
  - 2026-04-29T14:21:11.891635+00:00 #111 provider_accepted lead=3c5d29727ab4 to=marquezfence@yahoo.com via=gmail_smtp: <177747246479.89503.11144963714877888542@outboundautonomy.com>
  - 2026-04-29T14:21:11.715007+00:00 #110 provider_accepted lead=fbbb94741ee2 to=greg@greenbynature.net via=gmail_smtp: <177747246479.89501.2426087804953581034@outboundautonomy.com>
  - 2026-04-29T14:21:11.712449+00:00 #112 provider_accepted lead=e0d9d76ab2d1 to=denverfence@gmail.com via=gmail_smtp: <177747246480.89502.11670549641457425805@outboundautonomy.com>

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 4
- incomplete_turn: 0
- telegram_socket: 1

## Recent Artifacts

- 2026-04-29T14:35:02.729863+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/creative-briefs/blog-deployment-sequencing-2026-04-29.md (5017 bytes)
- 2026-04-29T14:32:21.176350+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (5422 bytes)
- 2026-04-29T14:30:56.699516+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/outbound-autonomy/outbound-autonomy.db (0 bytes)
- 2026-04-29T14:23:55.911495+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/crm-actions/2026-04-29-0820-hrly-draft-queue.md (2436 bytes)
- 2026-04-29T14:23:22.863310+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-29-hourly-outreach-draft-queue-0820am.md (13647 bytes)
- 2026-04-29T14:19:44.298281+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/20260429-cycle2-green-by-nature.json (1474 bytes)
- 2026-04-29T14:19:44.298281+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/20260429-cycle2-marquez-fencing.json (1397 bytes)
- 2026-04-29T14:19:44.298280+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/20260429-cycle2-dfc-fence.json (1511 bytes)
- 2026-04-29T14:14:09.547025+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/research/new-prospects-20260429-cycle2.json (7606 bytes)
- 2026-04-29T14:09:23.005550+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/research/cycle2-painting-hvac-plumbing.json (8989 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, email_attempts provider evidence, artifacts, transcripts, logs, or external confirmation. Browser/CDP send claims without provider evidence remain `unverified_claim`; anything else is `unverified` or `blocked`.
