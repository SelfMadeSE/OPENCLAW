# OpenClaw Runtime Reconciliation

Generated: 2026-04-28T18:30:15.657603+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 4, "ok": 14}`
- Failed or blocked jobs:
  - Nightly OA Ops Review (orchestrator): error cron: job execution timed out
  - Nightly OA Engineering Review (engineering): error cron: job execution timed out
  - Nightly OA Creative Review (creative): error cron: job execution timed out
  - Hourly Prospect Research (outreach): error FallbackSummaryError: All models failed (2): deepseek/deepseek-v4-flash: LLM request failed: provider rejected the request schema or tool payload. (format) | deepseek/deepseek-v4-pro: LLM request failed: provider rejected the request schema or tool payload. (format)

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
- bootstrap_truncated: 2
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-28T18:22:03.933851+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-1220pm-CRM-actions.md (5721 bytes)
- 2026-04-28T18:21:25.450468+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-1220pm.md (10080 bytes)
- 2026-04-28T18:14:50.037546+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/2026-04-28-heartbeat.md (1850 bytes)
- 2026-04-28T18:10:36.564188+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/denver-tree-company-20260428-211036_website_audit_2026-04-28_211036.json (908 bytes)
- 2026-04-28T18:10:36.563666+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/colorado-power-wash-20260428-211036_website_audit_2026-04-28_211036.json (851 bytes)
- 2026-04-28T18:10:36.563210+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/elite-carpet-cleaning--repair-20260428-211036_website_audit_2026-04-28_211036.json (864 bytes)
- 2026-04-28T18:10:36.562483+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/fast-work-handyman-services-20260428-211036_website_audit_2026-04-28_211036.json (828 bytes)
- 2026-04-28T18:10:36.560488+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/john-egarts-tree-service-20260428-211036_website_audit_2026-04-28_211036.json (891 bytes)
- 2026-04-28T18:07:23.135831+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/site-health-2026-04-28T1805Z.md (5336 bytes)
- 2026-04-28T18:07:10.663386+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/creative/site-visual-overhaul-2026-04-28.md (42756 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
