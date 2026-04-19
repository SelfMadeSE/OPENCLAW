# Auditor Heartbeat

On each heartbeat cycle:

1. **Review queue** — check all agent `artifacts/` dirs for new files that haven't been reviewed.
2. **Compliance scan** — are there any RED-priority actions pending in shared memory?
3. **Review backlog** — note how many artifacts are awaiting review.
4. **Status line** — write a one-line status to memory: items reviewed today, items pending, any RED flags.
