# OpenClaw Runtime Reconciliation

Generated: 2026-04-29T21:06:36.590621+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 1, "ok": 17}`
- Failed or blocked jobs:
  - Memory Dreaming Promotion (main): error cron: job execution timed out

## CRM

- Lead stages: `{"archived": 16, "lost": 2, "outreach_sent": 155, "prospect": 4, "reconciled_duplicate": 3, "scored": 7}`
- Recent actions: 10 loaded
  - 2026-04-29T19:59:32.472948+00:00 heartbeat drafted lead=6626d2e2b5e2: Audit-led outreach email drafted. SMTP password expired (535 error) - could not send. Saved to artifacts/outreach-drafts/gr-tree-service-20260429.md. Browser compose window opened as draft (not sent). Needs app password regeneration.
  - 2026-04-29T19:57:13.200693+00:00 heartbeat scored lead=6626d2e2b5e2: Scored 77/100 (HOT). Site is Homestead template from 2013, table-based layout, no mobile responsiveness. High urgency for redesign. Email found: info@gr-treeservice.com
  - 2026-04-29T19:02:07.624389+00:00 heartbeat reconciliation lead=daemon-6a1a8810920b330e: Email sent by daemon with unknown lead_id. Reconciled and registered by heartbeat.
  - 2026-04-29T19:02:07.624389+00:00 heartbeat reconciliation lead=daemon-61e2bc686df27406: Email sent by daemon with unknown lead_id. Reconciled and registered by heartbeat.
  - 2026-04-29T19:02:07.624389+00:00 heartbeat reconciliation lead=daemon-6cd3e8216fecdaf4: Email sent by daemon with unknown lead_id. Reconciled and registered by heartbeat.
- Email ledger statuses: `{"failed": 13, "provider_accepted": 206, "reconciled_superseded": 10, "unverified_claim": 1}`
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
  - 2026-04-29T21:05:00 #246 reconciled_superseded lead=e0d5a7b9 to=estimating@allstarelectrical.com via=gmail_smtp: no provider evidence
  - 2026-04-29T21:05:00 #245 reconciled_superseded lead=d9c4f6a8 to=LeslieGardenDesign@outlook.com via=gmail_smtp: no provider evidence
  - 2026-04-29T21:05:00 #244 reconciled_superseded lead=c8b3e5f7 to=Help@DaveyHeating.com via=gmail_smtp: no provider evidence
  - 2026-04-29T21:02:08.190263+00:00 #257 provider_accepted lead=d1a6f8b0 to=grassbustersco@gmail.com via=gmail_smtp: no provider evidence
  - 2026-04-29T21:02:08.190263+00:00 #256 provider_accepted lead=c0f5e7a9 to=info@fredellent.com via=gmail_smtp: no provider evidence

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 2
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-29T21:06:08.975474+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/outreach/_send_remaining.py (3704 bytes)
- 2026-04-29T21:05:32.483675+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-proposal-request-page-copy-2026-04-29.md (7607 bytes)
- 2026-04-29T21:04:26.975663+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/heartbeat-2026-04-29-1504MDT.md (810 bytes)
- 2026-04-29T21:03:30.342123+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (6289 bytes)
- 2026-04-29T21:03:06.168972+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/site-health-2026-04-29-1500MDT.md (5398 bytes)
- 2026-04-29T21:02:49.632707+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/outreach/batch-2-trades-send-2026-04-29-1413.md (5182 bytes)
- 2026-04-29T20:59:06.934921+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/prospects/batch-2-trades-research-2026-04-29-1413.md (6487 bytes)
- 2026-04-29T20:53:43.581830+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/outreach/batch-2-trades-send-results.json (4915 bytes)
- 2026-04-29T20:53:15.965383+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/outreach/_send_batch2_gws.py (9325 bytes)
- 2026-04-29T20:50:37.048299+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/outreach/_send_batch2_himalaya.py (8841 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, email_attempts provider evidence, artifacts, transcripts, logs, or external confirmation. Browser/CDP send claims without provider evidence remain `unverified_claim`; anything else is `unverified` or `blocked`.
