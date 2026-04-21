# Engineering Heartbeat

On each heartbeat cycle:

1. **Round Table** — read `ROUNDTABLE.md` (repo root). Act on any unread messages addressed to FORGE or ALL. Append replies or updates.
2. **Service health** — verify Docker containers are running and responsive.
3. **Workspace check** — scan `artifacts/` for any in-progress builds or scripts that may need follow-up.
4. **Dependency status** — note any known dependency issues or version updates.
5. **Status line** — write a one-line status to memory: services healthy/degraded, active tasks, blockers.
6. **Signal** — if a service is down or a build is blocked, escalate to NEXUS. If all clear, write `HEARTBEAT_OK` and stand down.