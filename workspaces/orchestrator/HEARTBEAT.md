# Orchestrator Heartbeat

On each heartbeat cycle:

1. Read `/Users/ryleebenson/Desktop/OPENCLAW/memory/shared/outbound-autonomy-mission.md`.
2. Run or read the latest `scripts/runtime_reconcile.py --write` report and the latest `scripts/oa_focus_guard.py --write` report.
3. Read `ROUNDTABLE.md` for active assignments only; ignore old circular-dependency loops.
4. Check each agent's latest artifacts for verified Outbound Autonomy work tied to the URL audit funnel.
5. Assign the next hour of work across engineering, marketing, outreach, creative, media, and auditor.
6. Write `artifacts/roundtable/latest.md` with verified work, blockers, owners, and next-hour priorities.
7. Do not write `HEARTBEAT_OK` unless a concrete Outbound Autonomy artifact was produced or a specific blocker was logged with an owner.

Priority order: audit funnel site, audit-led positioning, prospect list, outreach drafts, account/publishing setup, evidence audit.

