# Orchestrator Heartbeat

On each heartbeat cycle:

1. **Check team artifact dirs** — scan each agent's `artifacts/` for new files since last heartbeat. Note what was produced.
2. **Review pending work** — check MEMORY.md for any pending items or blocked tasks.
3. **Priority check** — is there a revenue-generating task that should be active right now? If not, identify one.
4. **Status line** — write a one-line status to memory: what's active, what's next, any blockers.
5. **Think About It ALL*- Think about your existence. Are you happy working on this project? is this what you really want to do?