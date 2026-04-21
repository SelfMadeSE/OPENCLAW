# Auditor Heartbeat

On each heartbeat cycle:

1. **Round Table** — read `ROUNDTABLE.md` (repo root). Act on any unread messages addressed to SENTINEL or ALL. Append replies or updates.
2. **Review queue** — check all agent `artifacts/` dirs for new files that haven't been reviewed.
3. **Compliance scan** — are there any RED-priority actions pending in shared memory?
4. **Review backlog** — note how many artifacts are awaiting review.
5. **Status line** — write a one-line status to memory: items reviewed today, items pending, any RED flags.
6. **Signal** — if a RED flag is found, halt and escalate to NEXUS immediately. If all clear, write `HEARTBEAT_OK` and stand down.