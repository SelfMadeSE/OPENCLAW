# Memory Evidence — proof mission

## Memory READ
- NEXUS read `workspaces/orchestrator/MISSION.md` (which symlinks/refers to APPROVAL_POLICY.md and AUTONOMY_LOOP.md) at session boot via the `bootstrap-extra-files` hook.
- BRIDGE read `data/crm.sqlite` `email_attempts` table — count by status (read-only).
- SENTINEL read `forge-output.md` and `bridge-output.md`.

## Memory WRITE
- NEXUS appended to `workspaces/orchestrator/MEMORY.md` (this mission summary).
- BRIDGE appended to `_shared/revenue/email-attempts.jsonl` (latest attempt mirror).
- SENTINEL appended 2 SCORE_EVENT lines to `_shared/scoring/history.jsonl`.
- All three agents updated their `workspaces/<agent>/HEARTBEAT.md`.

Verifiable at the listed paths.
