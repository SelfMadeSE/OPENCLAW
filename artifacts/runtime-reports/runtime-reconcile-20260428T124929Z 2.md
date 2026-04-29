# OpenClaw Runtime Reconciliation

Generated: 2026-04-28T12:49:29.793219+00:00

## Cron

- Jobs: 15 enabled / 18 total
- Last-run statuses: `{"error": 6, "ok": 12}`
- Failed or blocked jobs:
  - Daily Outbound Autonomy Audit-Funnel Content (marketing): error cron: job execution timed out
  - Nightly OA Ops Review (orchestrator): error cron: job execution timed out
  - Nightly OA Engineering Review (engineering): error cron: job execution timed out
  - Nightly OA Creative Review (creative): error cron: job execution timed out
  - Morning Mission Snapshot (orchestrator): error cron: job execution timed out
  - Hourly Prospect Research (outreach): error FallbackSummaryError: All models failed (2): deepseek/deepseek-v4-flash: LLM request failed: provider rejected the request schema or tool payload. (format) | deepseek/deepseek-v4-pro: LLM request failed: provider rejected the request schema or tool payload. (format)

## CRM

- Lead stages: `{"archived": 6, "lost": 2, "negotiating": 1, "outreach_drafted": 9, "scored": 2, "won": 2}`
- Recent actions: 10 loaded
  - 2026-04-28T12:31:46.935578+00:00 outreach heartbeat lead=f903936e7d00: Contact discovered via footer - phone (720) 415-5251, email denverlawnlandscape@gmail.com. Scored 72 HOT.
  - 2026-04-28T12:31:46.935495+00:00 outreach heartbeat lead=152ab7f0d15f: Garbled duplicate of DC Plumbing Colorado archived. Clean entry de24eb30fb89 in outreach_drafted.
  - 2026-04-28T12:22:56.291756+00:00 outreach heartbeat lead=the-weather-changers-20260426-110754: 2026-04-28 cycle: Advanced from scored to outreach_drafted. Draft already logged via earlier cycle.
  - 2026-04-28T12:22:56.290926+00:00 outreach heartbeat lead=atlantic-dental-20260426-110754: 2026-04-28 cycle: Advanced from scored to outreach_drafted. Draft already logged via earlier cycle.
  - 2026-04-28T12:22:56.290458+00:00 outreach heartbeat lead=payless-rooter-20260426-121158: 2026-04-28 cycle: Advanced from scored to outreach_drafted. Draft already logged via earlier cycle.

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 0
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-28T12:47:56.364011+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (19048 bytes)
- 2026-04-28T12:45:32.789530+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/little-foot-landscaping-20260428-154532_website_audit_research_2026-04-28_154532.json (746 bytes)
- 2026-04-28T12:45:32.788720+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/be-services-inc-20260428-154532_website_audit_research_2026-04-28_154532.json (708 bytes)
- 2026-04-28T12:45:32.787895+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/cherry-medical-aesthetics-20260428-154532_website_audit_research_2026-04-28_154532.json (706 bytes)
- 2026-04-28T12:45:32.787548+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/harris-family-chiropractic-and-massage-20260428-154532_website_audit_research_2026-04-28_154532.json (756 bytes)
- 2026-04-28T12:45:32.786547+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/oak--canyon-landscape-20260428-154532_website_audit_research_2026-04-28_154532.json (692 bytes)
- 2026-04-28T12:37:42.337957+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/outbound-autonomy/SHARED-STATE.md (2822 bytes)
- 2026-04-28T12:37:16.883608+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/outbound-autonomy/SHARED-STATE.md (2812 bytes)
- 2026-04-28T12:37:08.564605+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach/mission-alignment-2026-04-28.md (12228 bytes)
- 2026-04-28T12:36:46.955641+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/media/mission-alignment-2026-04-28.md (6169 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
