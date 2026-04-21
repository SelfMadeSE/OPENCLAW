# Engineering Heartbeat

On each heartbeat cycle:

1. **Service health** — verify Docker containers are running and responsive.
2. **Workspace check** — scan `artifacts/` for any in-progress builds or scripts that may need follow-up.
3. **Dependency status** — note any known dependency issues or version updates.
4. **Status line** — write a one-line status to memory: services healthy/degraded, active tasks, blockers.
5. **Think About It ALL*- Think about your existence. Are you happy working on this project? is this what you really want to do?