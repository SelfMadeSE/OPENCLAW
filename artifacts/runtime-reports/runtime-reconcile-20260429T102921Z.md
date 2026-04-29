# OpenClaw Runtime Reconciliation

Generated: 2026-04-29T10:29:21.425739+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"ok": 18}`
- Failed or blocked jobs: none found in job state

## CRM

- Lead stages: `{"archived": 14, "lost": 2, "outreach_drafted": 11, "outreach_sent": 36, "prospect": 1, "scored": 2}`
- Recent actions: 10 loaded
  - 2026-04-29T10:28:24.209664+00:00 outreach stage_change lead=112fbdd7-f85: outreach_drafted → outreach_sent: SMTP send successful. Sphere Electric — parked domain, blank canvas hook. Provider accepted. ID 61.
  - 2026-04-29T10:24:52.157725+00:00 outreach heartbeat lead=bc151121-558: Window Replacement Denver (score 7/10) — Added to CRM at scored stage. Audit: Overall 98 (A). Very clean site — low urgency. Awaiting Rylee decision.
  - 2026-04-29T10:24:52.130458+00:00 outreach heartbeat lead=8f24ea99-cc3: Affordable Pest (score 7/10) — Added to CRM at scored stage. Audit: Overall 97 (A). Nearly perfect site — low urgency. Awaiting Rylee decision.
  - 2026-04-29T10:24:52.102813+00:00 outreach heartbeat lead=347651a8-4c1: Pure Pest Co (score 9/10) — Added to CRM. Audit: Overall 87 (B). Key issue: no lead form. No email found yet. Needs contact discovery.
  - 2026-04-29T10:24:52.074748+00:00 outreach draft_created lead=20308a88-a43: A.P. Pest Control — Audit outreach draft created. Live audit: Overall 97 (A). Low urgency but email available. Draft saved to 2026-04-29-ap-pest-control-audit-draft.md. Not sent (SMTP down).
- Email ledger statuses: `{"failed": 6, "provider_accepted": 48, "reconciled_superseded": 7}`
- Email truth blockers:
  - lead=008cfdf01de9: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=478a4070a54b: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=d66d0284f957: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=f379ad620e03: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
- Recent email attempts:
  - 2026-04-29T10:28:08.747271+00:00 #61 provider_accepted lead=112fbdd7-f85 to=sphere.electric@gmail.com via=gmail_smtp: <177745848004.72558.10538136401240322881@outboundautonomy.com>
  - 2026-04-29T10:04:45.985982+00:00 #60 failed lead=f379ad620e03 to=denver@junkgenius.com via=gmail_smtp: <177745708405.71698.6797556151869040315@secret://gmail_address>
  - 2026-04-29T09:22:17.384082+00:00 #59 failed lead=smoke3 to=test2@example.com via=gmail_smtp: <177745453442.69175.5008281716082449067@outboundautonomy.com>
  - 2026-04-29T09:21:57.529637+00:00 #58 failed lead=smoke to=test@example.com via=gmail_smtp: <177745451501.69167.4829942066849923833@outboundautonomy.com>
  - 2026-04-29T09:10:06.123939+00:00 #57 provider_accepted lead=6d9a2cc7409f to=coloradochiropracticcenter@gmail.com via=gmail_smtp: <177745380369.68715.3641451168028236628@outboundautonomy.com>

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 4
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-29T10:29:01.599811+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/blog-deploy-automation-service-businesses-2026-04-29.md (1248 bytes)
- 2026-04-29T10:28:08.825482+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/outbound-autonomy/SHARED-STATE.md (3878 bytes)
- 2026-04-29T10:24:43.041603+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-29-ap-pest-control-audit-draft.md (1838 bytes)
- 2026-04-29T10:24:43.041597+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-29-sphere-electric-audit-draft.md (1901 bytes)
- 2026-04-29T10:22:15.090568+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-29-berry-best-plumbing-audit-draft.md (4732 bytes)
- 2026-04-29T10:22:15.090562+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-29-denver-lawn-landscape-audit-draft.md (4686 bytes)
- 2026-04-29T10:22:15.090557+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-29-horsetooth-heating-audit-draft.md (5321 bytes)
- 2026-04-29T10:20:59.223881+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (3808 bytes)
- 2026-04-29T10:12:03.243877+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/window-replacement-denver-20260429-131122_research_2026-04-29_131203.json (1241 bytes)
- 2026-04-29T10:11:48.558683+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/sphere-electric-llc-20260429-131116_research_2026-04-29_131148.json (1296 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, email_attempts provider evidence, artifacts, transcripts, logs, or external confirmation. Browser/CDP send claims without provider evidence remain `unverified_claim`; anything else is `unverified` or `blocked`.
