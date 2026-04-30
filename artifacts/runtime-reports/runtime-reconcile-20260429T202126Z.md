# OpenClaw Runtime Reconciliation

Generated: 2026-04-29T20:21:26.712245+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 1, "ok": 17}`
- Failed or blocked jobs:
  - Memory Dreaming Promotion (main): error cron: job execution timed out

## CRM

- Lead stages: `{"archived": 16, "lost": 2, "outreach_sent": 117, "prospect": 2, "scored": 7}`
- Recent actions: 10 loaded
  - 2026-04-29T19:59:32.472948+00:00 heartbeat drafted lead=6626d2e2b5e2: Audit-led outreach email drafted. SMTP password expired (535 error) - could not send. Saved to artifacts/outreach-drafts/gr-tree-service-20260429.md. Browser compose window opened as draft (not sent). Needs app password regeneration.
  - 2026-04-29T19:57:13.200693+00:00 heartbeat scored lead=6626d2e2b5e2: Scored 77/100 (HOT). Site is Homestead template from 2013, table-based layout, no mobile responsiveness. High urgency for redesign. Email found: info@gr-treeservice.com
  - 2026-04-29T19:02:07.624389+00:00 heartbeat reconciliation lead=daemon-6a1a8810920b330e: Email sent by daemon with unknown lead_id. Reconciled and registered by heartbeat.
  - 2026-04-29T19:02:07.624389+00:00 heartbeat reconciliation lead=daemon-61e2bc686df27406: Email sent by daemon with unknown lead_id. Reconciled and registered by heartbeat.
  - 2026-04-29T19:02:07.624389+00:00 heartbeat reconciliation lead=daemon-6cd3e8216fecdaf4: Email sent by daemon with unknown lead_id. Reconciled and registered by heartbeat.
- Email ledger statuses: `{"failed": 13, "provider_accepted": 168, "reconciled_superseded": 7, "unverified_claim": 1}`
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
  - 2026-04-29T20:12:50.776828+00:00 #189 provider_accepted lead=f1a3c028 to=rcraigewing@gmail.com via=gmail: 250 OK
  - 2026-04-29T20:12:45.910315+00:00 #188 provider_accepted lead=f1a3c027 to=Senefftp@gmail.com via=gmail: 250 OK
  - 2026-04-29T20:12:43.230151+00:00 #187 provider_accepted lead=f1a3c026 to=subieauto@gmail.com via=gmail: 250 OK
  - 2026-04-29T20:12:37.564518+00:00 #186 provider_accepted lead=f1a3c025 to=novickautomtive@gmail.com via=gmail: 250 OK
  - 2026-04-29T20:12:34.752705+00:00 #185 provider_accepted lead=f1a3c024 to=jkautorepair.aurora@gmail.com via=gmail: 250 OK

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 2
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-29T20:14:57.683506+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (7220 bytes)
- 2026-04-29T20:12:51.432194+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/outreach/30-prospect-batch-send-2026-04-29-1403.md (3404 bytes)
- 2026-04-29T20:12:32.147200+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/cavalry-mechanical-20260429-231051_research_2026-04-29_231232.json (1274 bytes)
- 2026-04-29T20:12:10.799136+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/south-denver-electric-20260429-231033_research_2026-04-29_231210.json (1456 bytes)
- 2026-04-29T20:11:37.106956+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/enlightened-electrical-services-20260429-231015_research_2026-04-29_231137.json (1660 bytes)
- 2026-04-29T20:11:22.091473+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/brook-forest-electric-20260429-230958_research_2026-04-29_231122.json (1458 bytes)
- 2026-04-29T20:11:07.806792+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/jump-hvac-20260429-230939_research_2026-04-29_231107.json (1457 bytes)
- 2026-04-29T19:59:55.988789+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/prospects/multi-metro-research-2026-04-29-1350.md (7703 bytes)
- 2026-04-29T19:55:29.086648+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/auditor/focus-guard-2026-04-29-1350.md (6625 bytes)
- 2026-04-29T19:49:50.612103+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-social-ready-pack-03-audit-led-2026-04-29.md (4002 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, email_attempts provider evidence, artifacts, transcripts, logs, or external confirmation. Browser/CDP send claims without provider evidence remain `unverified_claim`; anything else is `unverified` or `blocked`.
