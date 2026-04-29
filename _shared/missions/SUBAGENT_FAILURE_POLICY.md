# Sub-Agent Failure Policy (Fallback Ladder)

Loaded by NEXUS at every mission boot. Never silently collapse a sub-agent failure to direct NEXUS execution.

## Ladder

When a `sessions_spawn` returns failure or a child run errors:

1. **Retry once with same agent + model after 60s.**
   - If pass → continue, log a `+0.1 collaboration` minus on the failure source (provider/agent unknown until logged).
2. **Retry with same agent + fallback model.**
   - Order: `deepseek-v4-pro` → `deepseek-v4-flash` → `openai-codex/gpt-5.4-mini` (subject to quota).
3. **Retry with `--thinking off` (diagnostic mode only).**
   - This is a DIAGNOSTIC fallback. If this is the level that succeeds, file a repair ticket: thinking-mode is suspect for that agent/model combo.
4. **Convert to direct NEXUS execution ONLY if mission-critical** AND tagged `mission_critical: true` in `mission.json`. Otherwise emit BLOCKER.
5. **Log sub-agent failure to** `artifacts/engineering/subagent-failures.jsonl` with the schema below.
6. **Open a repair ticket** at `artifacts/engineering/repair-tickets.jsonl` if step 1–3 all failed.
7. **Score impact**:
   - Provider/infra cause → no agent score penalty.
   - Agent-specific cause (bad prompt, mis-routed tool) → `-0.1 execution_reliability` for that agent.

## Failure log schema

```jsonc
{
  "ts": "2026-04-29T12:34:00Z",
  "mission": "<id>",
  "task": "<short>",
  "parent_agent": "orchestrator",
  "child_agent": "engineering",
  "model": "deepseek/deepseek-v4-pro",
  "thinking": "off",
  "error": "<short>",
  "raw_excerpt": "<≤500 chars>",
  "gateway_restart": false,
  "replay_invalid": false,
  "ladder_step_reached": 3,
  "final_result": "fallback_succeeded | escalated_blocker | converted_to_nexus",
  "score_delta": { "agent": "engineering", "metric": "execution_reliability", "delta": -0.1 }
}
```

## Hard limits

- Maximum 7 ladder runs per mission per child agent (mirrors `subagents.maxChildrenPerAgent`).
- After 3 consecutive ladder escalations across the same mission, NEXUS pauses the mission and emits a single ESCALATION to the operator.
