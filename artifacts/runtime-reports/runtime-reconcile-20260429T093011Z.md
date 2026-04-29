# OpenClaw Runtime Reconciliation

Generated: 2026-04-29T09:30:11.110961+00:00

## Cron

- Jobs: 13 enabled / 18 total
- Last-run statuses: `{"ok": 18}`
- Failed or blocked jobs: none found in job state

## CRM

- Lead stages: `{"archived": 11, "lost": 2, "negotiating": 1, "outreach_drafted": 13, "outreach_sent": 31, "prospect": 1, "won": 2}`
- Recent actions: 10 loaded
  - 2026-04-29T09:10:23.639286+00:00 outreach stage_change lead=6d9a2cc7409f: outreach_drafted → outreach_sent: Sent audit-led email via SMTP
  - 2026-04-29T09:10:23.596134+00:00 outreach stage_change lead=2c7aca0f9ca5: outreach_drafted → outreach_sent: Sent audit-led email via SMTP
  - 2026-04-29T09:10:23.554190+00:00 outreach stage_change lead=f3d30c5793d5: outreach_drafted → outreach_sent: Sent audit-led email via SMTP
  - 2026-04-29T09:10:23.512374+00:00 outreach stage_change lead=1cade1b3b401: outreach_drafted → outreach_sent: Sent audit-led email via SMTP
  - 2026-04-29T09:10:23.470919+00:00 outreach stage_change lead=b16805e59b40: outreach_drafted → outreach_sent: Sent audit-led email via SMTP
- Email ledger statuses: `{"failed": 5, "provider_accepted": 47, "unverified_claim": 7}`
- Email truth blockers:
  - lead=315f28b0e620: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=42edd05bfa3c: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=d192cf575884: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
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

- 2026-04-29T09:23:31.244357+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-blog-post-redesign-vs-incremental-fix-2026-04-29.md (7299 bytes)
- 2026-04-29T09:19:09.694174+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/creative/artifacts/creative-briefs/paid-ad-creative-audit-wedge-2026-04-29.md (7684 bytes)
- 2026-04-29T09:13:21.605679+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (8595 bytes)
- 2026-04-29T09:13:08.065874+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/2026-04-29-hourly-prospect-research-cycle-3am.md (6728 bytes)
- 2026-04-29T09:12:34.699703+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/deker-lawn-services-20260429-121205_website_audit_research_2026-04-29_121234.json (1006 bytes)
- 2026-04-29T09:12:29.202462+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/solares-lawn--landscaping-20260429-121127_website_audit_research_2026-04-29_121229.json (947 bytes)
- 2026-04-29T09:12:24.026509+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/keep-it-green-tree-care-20260429-121118_website_audit_research_2026-04-29_121224.json (964 bytes)
- 2026-04-29T09:12:17.515242+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/the-earnest-chop-20260429-121112_website_audit_research_2026-04-29_121217.json (984 bytes)
- 2026-04-29T09:12:11.671201+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/urban-forestry-tree-service-20260429-121028_website_audit_research_2026-04-29_121211.json (1014 bytes)
- 2026-04-29T09:11:58.566771+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/media/artifacts/distribution-plans/heartbeat-status-2026-04-29-4.md (756 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, email_attempts provider evidence, artifacts, transcripts, logs, or external confirmation. Browser/CDP send claims without provider evidence remain `unverified_claim`; anything else is `unverified` or `blocked`.
