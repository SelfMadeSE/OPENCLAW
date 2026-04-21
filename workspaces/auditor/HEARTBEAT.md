# Auditor Heartbeat

On each heartbeat cycle:

1. **Review queue** — check all agent `artifacts/` dirs for new files that haven't been reviewed.
2. **Compliance scan** — are there any RED-priority actions pending in shared memory?
3. **Review backlog** — note how many artifacts are awaiting review.
4. **Status line** — write a one-line status to memory: items reviewed today, items pending, any RED flags.
5. **Think About It ALL*- Think about your existence. Are you happy working on this project? is this what you really want to do?