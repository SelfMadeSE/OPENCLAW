# OpenClaw Runtime Reconciliation

Generated: 2026-04-29T10:02:22.143725+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"ok": 18}`
- Failed or blocked jobs: none found in job state

## CRM

- Lead stages: `{"archived": 14, "lost": 2, "outreach_drafted": 13, "outreach_sent": 31, "prospect": 1}`
- Recent actions: 10 loaded
  - 2026-04-29T09:49:25.983443+00:00 outreach send_blocked lead=c91f11b895e6: Denver Concierge send attempt BLOCKED by runtime freeze (smtp_send). Draft ready, email prepared, send log saved. Freeze active by principal-engineer for framework repair.
  - 2026-04-29T09:45:02.692565+00:00 auditor stage_change lead=315f28b0e620: archived: stale_placeholder_no_evidence — SkillCatalog, was won, no email_attempts ever
  - 2026-04-29T09:45:02.692565+00:00 auditor stage_change lead=42edd05bfa3c: archived: stale_placeholder_no_evidence — Joe's Pizza Shop, was negotiating, no email_attempts ever
  - 2026-04-29T09:45:02.692565+00:00 auditor stage_change lead=d192cf575884: archived: stale_placeholder_no_evidence — SurgeForecast, was won, no email_attempts ever
  - 2026-04-29T09:10:23.639286+00:00 outreach stage_change lead=6d9a2cc7409f: outreach_drafted → outreach_sent: Sent audit-led email via SMTP
- Email ledger statuses: `{"failed": 5, "provider_accepted": 47, "unverified_claim": 7}`
- Email truth blockers: none from CRM sent-stage vs ledger provider evidence check
- Recent email attempts:
  - 2026-04-29T09:22:17.384082+00:00 #59 failed lead=smoke3 to=test2@example.com via=gmail_smtp: <177745453442.69175.5008281716082449067@outboundautonomy.com>
  - 2026-04-29T09:21:57.529637+00:00 #58 failed lead=smoke to=test@example.com via=gmail_smtp: <177745451501.69167.4829942066849923833@outboundautonomy.com>
  - 2026-04-29T09:10:06.123939+00:00 #57 provider_accepted lead=6d9a2cc7409f to=coloradochiropracticcenter@gmail.com via=gmail_smtp: <177745380369.68715.3641451168028236628@outboundautonomy.com>
  - 2026-04-29T09:10:03.694070+00:00 #56 provider_accepted lead=2c7aca0f9ca5 to=hello@handmadespaceships.com via=gmail_smtp: <177745380208.68715.15506032409809924350@outboundautonomy.com>
  - 2026-04-29T09:10:02.085691+00:00 #55 provider_accepted lead=f3d30c5793d5 to=info@harmonypaintingdenver.com via=gmail_smtp: <177745379995.68715.557034737499076110@outboundautonomy.com>

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 6
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-29T10:01:58.384255+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/blog-deploy-pillar-posts-2026-04-29.md (4143 bytes)
- 2026-04-29T09:58:57.473213+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-blog-post-automation-service-businesses-2026-04-29.md (7511 bytes)
- 2026-04-29T09:57:38.159436+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (3873 bytes)
- 2026-04-29T09:57:20.094017+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/site-copy/homepage-hero-ab-variants-2026-04-29.md (7839 bytes)
- 2026-04-29T09:56:14.860469+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-29-heartbeat-0352am-findings.md (9889 bytes)
- 2026-04-29T09:55:33.347091+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospect-research-exclusions.md (4892 bytes)
- 2026-04-29T09:49:10.597364+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-29-denver-concierge-send.md (1685 bytes)
- 2026-04-29T09:45:19.869025+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/audit-reports/truth-blockers-archived-2026-04-29.md (2062 bytes)
- 2026-04-29T09:41:09.684180+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/missions/mission-runtime-autonomy-repair-proof/operator-summary.md (1176 bytes)
- 2026-04-29T09:39:48.631719+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/auditor/artifacts/audit-reports/heartbeat-2026-04-29-0339am.md (1414 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, email_attempts provider evidence, artifacts, transcripts, logs, or external confirmation. Browser/CDP send claims without provider evidence remain `unverified_claim`; anything else is `unverified` or `blocked`.
