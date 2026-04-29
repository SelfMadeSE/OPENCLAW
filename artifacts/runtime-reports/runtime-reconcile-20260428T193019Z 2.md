# OpenClaw Runtime Reconciliation

Generated: 2026-04-28T19:30:19.632045+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"error": 3, "ok": 15}`
- Failed or blocked jobs:
  - Nightly OA Ops Review (orchestrator): error cron: job execution timed out
  - Nightly OA Engineering Review (engineering): error cron: job execution timed out
  - Nightly OA Creative Review (creative): error cron: job execution timed out

## CRM

- Lead stages: `{"archived": 9, "lost": 2, "negotiating": 1, "outreach_drafted": 32, "scored": 2, "won": 2}`
- Recent actions: 10 loaded
  - 2026-04-28T19:20:00Z outreach-agent-1.20pm outreach_draft lead=peak-to-peak-roofing--exteriors-20260428-195619: Created email/phone outreach draft for Peak to Peak Roofing. Email needs discovery (contact form only on site). Hook: excellent content + zero digital lead capture. Score: 65. Phone script variant ready. Email variant awaiting email discovery.
  - 2026-04-28T19:11:01.145540+00:00 --action advance lead=7301b6604b28: --agent
  - 2026-04-28T19:09:39.512771+00:00 --action researched lead=7301b6604b28: --agent
  - 2026-04-28T19:08:59.768657+00:00 --action archive lead=5ffbe6a27861: --agent
  - 2026-04-28T19:08:59.768654+00:00 --action cleanup lead=7301b6604b28: --agent

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 2
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-28T19:26:28.328413+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/outbound-autonomy/SHARED-STATE.md (3914 bytes)
- 2026-04-28T19:23:08.567320+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-28-hourly-outreach-draft-queue-1220pm.md (9053 bytes)
- 2026-04-28T19:22:51.083797+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/pricing-page-deployment-brief-2026-04-28.md (5825 bytes)
- 2026-04-28T19:07:34.829194+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/harmony-painting-denver-20260428-220734_website_audit_research_2026-04-28_220734.json (1245 bytes)
- 2026-04-28T19:07:34.827120+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/dry-coats-painting-20260428-220734_website_audit_research_2026-04-28_220734.json (1262 bytes)
- 2026-04-28T19:07:34.825177+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/denver-appliance-repair-20260428-220734_website_audit_research_2026-04-28_220734.json (1330 bytes)
- 2026-04-28T19:07:34.822960+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/aw-auto-body-inc-20260428-220734_website_audit_research_2026-04-28_220734.json (1181 bytes)
- 2026-04-28T19:07:34.820956+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/colorado-garage-door-service-20260428-220734_website_audit_research_2026-04-28_220734.json (1257 bytes)
- 2026-04-28T19:07:28.141060+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/2026-04-28-deploy-verified.md (1873 bytes)
- 2026-04-28T19:02:54.498320+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/email-discovery-2026-04-28.md (7129 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, artifacts, transcripts, logs, or external confirmation. Anything else is `unverified` or `blocked`.
