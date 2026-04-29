# Heartbeat Template

Every agent must produce one of these blocks at the start of any substantive turn. Append to `workspaces/<agent>/HEARTBEAT.md`. Keep last 5 in the file (rotate older to `HEARTBEAT.archive.md`).

```
HEARTBEAT <agent_codename>
ts: <ISO UTC>
mission: <mission-id or "idle">
last_artifact: <relative path or "none">
current_blocker: <one line or "none">
tool_failure: <tool_name + brief or "none">
next_autonomous_action: <one line — must be specific>
needs_approval: <yes:CLASS:reason | no>
needs_other_agent: <agent_id:reason | no>
evidence_path: <folder where artifacts land>
score_delta_proposed: <+0.1 execution / +0.2 audit / etc., or 0>
```

Example (good):
```
HEARTBEAT BRIDGE
ts: 2026-04-29T12:34:00Z
mission: mission-runtime-autonomy-repair-proof
last_artifact: artifacts/missions/mission-runtime-autonomy-repair-proof/bridge-output.md
current_blocker: outreach pipeline frozen by RUNTIME_FREEZE.json
tool_failure: none
next_autonomous_action: reconcile email_attempts with CRM and emit reconciliation-report.md
needs_approval: no
needs_other_agent: auditor:verify reconciliation
evidence_path: artifacts/missions/mission-runtime-autonomy-repair-proof/
score_delta_proposed: +0.1 execution_reliability
```

Example (bad, will be rejected by SENTINEL):
```
What do you want me to do next?
```
