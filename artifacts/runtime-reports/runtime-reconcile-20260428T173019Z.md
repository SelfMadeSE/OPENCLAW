# OpenClaw Runtime Reconciliation

Generated: 2026-04-28T17:30:19.568981+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 5, "ok": 13}`
- Failed or blocked jobs:
  - Nightly OA Ops Review (orchestrator): error cron: job execution timed out
  - Nightly OA Engineering Review (engineering): error cron: job execution timed out
  - Nightly OA Creative Review (creative): error cron: job execution timed out
  - Hourly Prospect Research (outreach): error FallbackSummaryError: All models failed (2): deepseek/deepseek-v4-flash: LLM request failed: provider rejected the request schema or tool payload. (format) | deepseek/deepseek-v4-pro: LLM request failed: provider rejected the request schema or tool payload. (format)
  - Hourly Agent Roundtable Audit (orchestrator): error FailoverError: LLM request failed: provider rejected the request schema or tool payload.

## CRM

- Lead stages: `{"archived": 7, "lost": 2, "negotiating": 1, "outreach_drafted": 26, "scored": 2, "won": 2}`
- Recent actions: 10 loaded
  - 2026-04-28T17:26:23.315103+00:00 outreach audit_draft lead=bc3a82428256: 11:24 AM cycle: Scored 69 (WARM). Drafted audit-led outreach. Family-owned electrician since 1971, no booking, no email on site, no quote. Draft in 2026-04-28-mighty-bee-electric-audit-draft.md. Phone on site (303) 288-7988, no email found.
  - 2026-04-28T17:26:23.315102+00:00 outreach audit_draft lead=c91f11b895e6: 11:24 AM cycle: Scored 61 (WARM). Drafted audit-led outreach. Cleaning company since 1999. Contact page 500 error, no booking/quoting, old WP. Draft in 2026-04-28-denver-concierge-audit-draft.md.
  - 2026-04-28T17:26:23.315090+00:00 outreach audit_draft lead=69c06b9bd8a0: 11:24 AM cycle: Scored 69 (WARM). Drafted audit-led outreach. Contact page redirects to empty backup. Family-owned HVAC, 25+ locations, no email/booking. Draft in 2026-04-28-fix-it-now-hvac-audit-draft.md.
  - 2026-04-28T17:26:23.315087+00:00 outreach audit_draft lead=a15dfce68176: 11:24 AM cycle: Scored 67 (WARM). Drafted audit-led outreach. Testimonial-only site, no service pages, no booking. Email verified (info@mydenverplumber.net). Draft in 2026-04-28-my-denver-plumber-audit-draft.md.
  - 2026-04-28T17:26:23.315087+00:00 outreach audit_draft lead=0c719514c71f: 11:24 AM cycle: Scored 81 (HOT). Drafted audit-led outreach. CRITICAL — ALL contact pages 404. No phone/email anywhere on site. Most urgent case. Draft in 2026-04-28-colorado-native-plumbing-audit-draft.md. No verified contact info.

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 4
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-28T17:29:17.115437+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/pricing-deployment-brief-2026-04-28.md (2433 bytes)
- 2026-04-28T17:28:40.215915+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/audit-reports/auditor-heartbeat-20260428-1128mdt.md (2552 bytes)
- 2026-04-28T17:26:12.033057+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-fix-it-now-hvac-audit-draft.md (2069 bytes)
- 2026-04-28T17:26:12.033032+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-my-denver-plumber-audit-draft.md (1977 bytes)
- 2026-04-28T17:26:12.033029+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-colorado-native-plumbing-audit-draft.md (2575 bytes)
- 2026-04-28T17:26:12.033019+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-denver-concierge-audit-draft.md (2042 bytes)
- 2026-04-28T17:26:12.033014+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-mighty-bee-electric-audit-draft.md (2284 bytes)
- 2026-04-28T17:23:00.813983+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (10380 bytes)
- 2026-04-28T17:21:28.606289+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-1120am.md (8140 bytes)
- 2026-04-28T17:05:08.419293+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/heartbeat-2026-04-28T1703Z.md (2255 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
