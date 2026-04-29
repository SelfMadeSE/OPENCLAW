# OpenClaw Runtime Reconciliation

Generated: 2026-04-28T18:05:08.690149+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 4, "ok": 14}`
- Failed or blocked jobs:
  - Nightly OA Ops Review (orchestrator): error cron: job execution timed out
  - Nightly OA Engineering Review (engineering): error cron: job execution timed out
  - Nightly OA Creative Review (creative): error cron: job execution timed out
  - Runtime Evidence Reconciliation (auditor): error

## CRM

- Lead stages: `{"archived": 8, "lost": 2, "negotiating": 1, "outreach_drafted": 29, "scored": 2, "won": 2}`
- Recent actions: 10 loaded
  - 2026-04-28T17:58:05.029750+00:00 audit_draft Duplicate entry for Colorado Chiropractic — merged into 6d9a2cc7409f. Marking as archived. lead=7e101bf1549c: --agent
  - 2026-04-28T17:57:50.400576+00:00 audit_draft 11:56 AM cycle: Scored 67 (WARM). Drafted audit-led outreach. 40+ year Denver landscaping co, basic template, no email on homepage, no portfolio, no booking. Email verified (beservices@live.com). Draft in 2026-04-28-hourly-outreach-draft-queue-1120am.md. lead=1cade1b3b401: --agent
  - 2026-04-28T17:57:50.379411+00:00 audit_draft 11:56 AM cycle: Scored 73 (HOT). Drafted audit-led outreach. Owner Jason Bonser. Contact page hides phone/email, no portfolio for visual business. Email and phone verified. Draft in 2026-04-28-hourly-outreach-draft-queue-1120am.md. lead=2cd47795072b: --agent
  - 2026-04-28T17:57:50.355318+00:00 audit_draft 11:56 AM cycle: Scored 55 (WARM). Drafted audit-led outreach. Schedulicity external booking instead of native, no live chat, no patient intake automation. Both email and phone verified on site. Draft in 2026-04-28-hourly-outreach-draft-queue-1120am.md. lead=6d9a2cc7409f: --agent
  - 2026-04-28T17:26:23.315103+00:00 outreach audit_draft lead=bc3a82428256: 11:24 AM cycle: Scored 69 (WARM). Drafted audit-led outreach. Family-owned electrician since 1971, no booking, no email on site, no quote. Draft in 2026-04-28-mighty-bee-electric-audit-draft.md. Phone on site (303) 288-7988, no email found.

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 0
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-28T18:04:29.604324+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/2026-04-28-prospect-research-cycle-1145am.md (2797 bytes)
- 2026-04-28T18:04:29.604252+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/apex-roofing-denver-20260428-210429_website_audit_research_2026-04-28_210429.json (1619 bytes)
- 2026-04-28T18:04:29.603121+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/danny-joes-lock-and-key-20260428-210429_website_audit_research_2026-04-28_210429.json (1533 bytes)
- 2026-04-28T18:04:29.602279+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/mile-high-fence-20260428-210429_website_audit_research_2026-04-28_210429.json (1474 bytes)
- 2026-04-28T18:04:29.601484+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/denver-window-cleaning-20260428-210429_website_audit_research_2026-04-28_210429.json (1528 bytes)
- 2026-04-28T18:04:29.600739+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/bug-man-inc-denver-pest-control-20260428-210429_website_audit_research_2026-04-28_210429.json (1575 bytes)
- 2026-04-28T18:00:06.832899+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/heartbeat-2026-04-28T1755Z.md (1773 bytes)
- 2026-04-28T17:59:47.363157+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/engineering-notes/vercel-audit-uncommitted-files-2026-04-28.md (9392 bytes)
- 2026-04-28T17:56:45.006608+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/audit-reports/auditor-heartbeat-20260428-1155mdt-corrected.md (3723 bytes)
- 2026-04-28T17:55:01.956616+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (11238 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
