# OpenClaw Runtime Reconciliation

Generated: 2026-04-29T13:30:14.342001+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"ok": 18}`
- Failed or blocked jobs: none found in job state

## CRM

- Lead stages: `{"archived": 14, "lost": 2, "outreach_sent": 58, "prospect": 2, "researched": 4, "scored": 3}`
- Recent actions: 10 loaded
  - 2026-04-29T13:28:53.421248+00:00 outreach stage_change lead=962667664475: prospect → researched: Full website audit research completed.
  - 2026-04-29T13:28:53.395022+00:00 outreach stage_change lead=bde2b8fb3a6b: prospect → researched: Full website audit research completed.
  - 2026-04-29T13:28:53.369136+00:00 outreach stage_change lead=f4bc84848b46: prospect → researched: Full website audit research completed.
  - 2026-04-29T13:28:53.341420+00:00 outreach stage_change lead=522cac77ddcd: prospect → researched: Full website audit research completed.
  - 2026-04-29T13:24:33.256958+00:00 outreach draft_ready lead=mile-high-fence-001: Drafted audit-led outreach email. SMTP 535 - app password rejected (gsnfzoihiufnkzqr). Could not send. Needs Rylee to provide new app password.
- Email ledger statuses: `{"failed": 11, "provider_accepted": 80, "reconciled_superseded": 7}`
- Email truth blockers:
  - lead=008cfdf01de9: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=478a4070a54b: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=d1f9105318c8: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=d66d0284f957: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=f379ad620e03: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
- Recent email attempts:
  - 2026-04-29T13:29:28.479576+00:00 #98 provider_accepted lead=6792b00dccf4 to=dentechvac@gmail.com via=gmail_smtp: <177746936546.86654.17765516503517268142@outboundautonomy.com>
  - 2026-04-29T13:29:16.751134+00:00 #97 provider_accepted lead=fdc4a754e86d to=mvmheatingandcooling@gmail.com via=gmail_smtp: <177746934063.86637.6964242263283054715@outboundautonomy.com>
  - 2026-04-29T13:26:10.182507+00:00 #96 provider_accepted lead=colorado-concrete-pros-001 to=info@coloradoconcretepros.com via=gmail_smtp: <177746916870.86495.4136242173871353647@outboundautonomy.com>
  - 2026-04-29T13:25:59.070569+00:00 #95 provider_accepted lead=front-range-fence-001 to=info@frontrangefence.com via=gmail_smtp: <177746915760.86489.7292806516736517717@outboundautonomy.com>
  - 2026-04-29T13:25:46.509876+00:00 #93 provider_accepted lead=mile-high-fence-001 to=milehighfenceinc@gmail.com via=gmail_smtp: <177746914399.86482.12194687780559050022@outboundautonomy.com>

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 0
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-29T13:30:04.175395+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-29-big-horn-painting-audit-email.md (587 bytes)
- 2026-04-29T13:29:57.470223+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-29-denver-concrete-company-audit-email.md (523 bytes)
- 2026-04-29T13:29:48.316720+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-29-denver-stamped-concrete-audit-email.md (591 bytes)
- 2026-04-29T13:29:38.176852+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-29-sunny-day-concrete-audit-email.md (603 bytes)
- 2026-04-29T13:29:33.700996+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/2026-04-29-big-horn-painting-audit.md (671 bytes)
- 2026-04-29T13:29:25.114719+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/2026-04-29-denver-concrete-company-audit.md (676 bytes)
- 2026-04-29T13:29:20.068613+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/2026-04-29-denver-stamped-concrete-audit.md (705 bytes)
- 2026-04-29T13:29:06.542369+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/2026-04-29-sunny-day-concrete-audit.md (753 bytes)
- 2026-04-29T13:27:52.275462+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/oa-content-drafts/oa-homepage-positioning-audit-and-copy-2026-04-29.md (6273 bytes)
- 2026-04-29T13:26:47.913167+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/outreach-drafts/2026-04-29-0700-resolution-plus-prospects.md (7712 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, email_attempts provider evidence, artifacts, transcripts, logs, or external confirmation. Browser/CDP send claims without provider evidence remain `unverified_claim`; anything else is `unverified` or `blocked`.
