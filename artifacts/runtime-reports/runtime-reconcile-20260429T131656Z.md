# OpenClaw Runtime Reconciliation

Generated: 2026-04-29T13:16:56.351641+00:00

## Cron

- Jobs: 16 enabled / 18 total
- Last-run statuses: `{"ok": 18}`
- Failed or blocked jobs: none found in job state

## CRM

- Lead stages: `{"archived": 14, "lost": 2, "outreach_sent": 55, "prospect": 1, "scored": 3}`
- Recent actions: 10 loaded
  - 2026-04-29T13:16:10.854449+00:00 outreach stage_change lead=09045987-6c5: outreach_drafted → scored: Competition Auto Glass — 100/A perfect site. Moved to scored for Rylee decision (low urgency per near-perfect site policy).
  - 2026-04-29T13:16:08.039716+00:00 outreach stage_change lead=85df6e45-3c7: outreach_drafted → outreach_sent: SMTP send. Colorado Green Landscaping — 92/A, missing meta+service pages. Provider accepted ID 89.
  - 2026-04-29T13:16:08.013395+00:00 outreach stage_change lead=18205fea-e6f: outreach_drafted → outreach_sent: SMTP send. Front Range Locksmith — 90/A, no lead form. Provider accepted ID 88.
  - 2026-04-29T13:16:07.986587+00:00 outreach stage_change lead=6792b00dccf4: outreach_drafted → outreach_sent: SMTP send. DenTech — 96/A, no lead form. Provider accepted ID 87.
  - 2026-04-29T13:16:07.960199+00:00 outreach stage_change lead=fdc4a754e86d: outreach_drafted → outreach_sent: SMTP send. MVM — site 404, email discovered. Provider accepted ID 86.
- Email ledger statuses: `{"failed": 7, "provider_accepted": 75, "reconciled_superseded": 7}`
- Email truth blockers:
  - lead=008cfdf01de9: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=478a4070a54b: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=d1f9105318c8: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=d66d0284f957: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
  - lead=f379ad620e03: CRM stage implies sent/replied but no provider_accepted or sent_verified email_attempt row exists
- Recent email attempts:
  - 2026-04-29T13:15:50.076132+00:00 #89 provider_accepted lead=85df6e45-3c7 to=george@coloradogreenlandscaping.com via=gmail_smtp: <177746854771.85684.3936760959077917822@outboundautonomy.com>
  - 2026-04-29T13:15:40.715949+00:00 #88 provider_accepted lead=18205fea-e6f to=frontrangelocksmith@gmail.com via=gmail_smtp: <177746853857.85667.3849130273826125323@outboundautonomy.com>
  - 2026-04-29T13:15:36.491384+00:00 #85 failed lead=18205fea-e6f to=frontrangelocksmith@gmail.com via=gmail_smtp: <177746853502.85660.13652053353322266564@secret://gmail_address>
  - 2026-04-29T13:15:31.776755+00:00 #87 provider_accepted lead=6792b00dccf4 to=dentechvac@gmail.com via=gmail_smtp: <177746853016.85651.6236726682017357410@outboundautonomy.com>
  - 2026-04-29T13:15:21.741524+00:00 #86 provider_accepted lead=fdc4a754e86d to=mvmheatingandcooling@gmail.com via=gmail_smtp: <177746851939.85620.17464157687110153322@outboundautonomy.com>

## Runtime Log Signals

- Recent gateway lines scanned: 500
- n8n_404: 0
- elephant_model: 0
- memory_no_vectors: 0
- bootstrap_truncated: 4
- incomplete_turn: 0
- telegram_socket: 0

## Recent Artifacts

- 2026-04-29T13:16:13.022039+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/marketing/prospect-case-study-deploy-2026-04-29.md (2028 bytes)
- 2026-04-29T13:12:47.616204+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/engineering/artifacts/site-health/heartbeat-2026-04-29-0711MDT.md (1956 bytes)
- 2026-04-29T13:11:45.638599+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/marketing/artifacts/marketing/prospect-case-study-blog-2026-04-29.md (8290 bytes)
- 2026-04-29T13:11:19.259496+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/roundtable/latest.md (2904 bytes)
- 2026-04-29T13:11:14.520638+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/2026-04-29-hourly-prospect-research-cycle-7am.md (6869 bytes)
- 2026-04-29T13:10:47.110240+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/bluespring-cleaning-20260429-161002_website_audit_research_2026-04-29_161047.json (1789 bytes)
- 2026-04-29T13:10:37.687075+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/jjc-auto-collision-center-20260429-160953_website_audit_research_2026-04-29_161037.json (1610 bytes)
- 2026-04-29T13:10:29.818601+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/garcias-auto-repair-llc-20260429-160946_website_audit_research_2026-04-29_161029.json (1773 bytes)
- 2026-04-29T13:10:20.801484+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/mobile-mechanic-of-denver-20260429-160938_website_audit_research_2026-04-29_161020.json (1838 bytes)
- 2026-04-29T13:10:11.718044+00:00 /Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects/ddl-cleaning-services-20260429-160930_website_audit_research_2026-04-29_161011.json (1597 bytes)

## Reporting Rule

Agents must report only verified facts backed by CRM rows, email_attempts provider evidence, artifacts, transcripts, logs, or external confirmation. Browser/CDP send claims without provider evidence remain `unverified_claim`; anything else is `unverified` or `blocked`.
