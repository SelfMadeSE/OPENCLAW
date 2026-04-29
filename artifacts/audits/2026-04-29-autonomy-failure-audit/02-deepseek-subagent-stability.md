# 02 — DeepSeek / Sub-Agent Stability Matrix

Captured: 2026-04-29 12:25–12:30 EEST
Method: live `openclaw agent --json` runs against the production gateway (PID 67492). Each test bounded by a 180–240s perl alarm. Raw stdout/stderr in `02-tests/T*.{out,err}`.

## Result Matrix

| # | Agent | Model | Thinking | Goal | Tool calls | Replay invalid | Stop reason | Duration | Result | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|
| T1 | orchestrator | deepseek-v4-pro | off | reply `PING` | 0 | false | end_turn | 20s | `PING` | **PASS** |
| T2 | engineering | deepseek-v4-pro | off | 3 bullet self-description | 0 | false | end_turn | 6s | 3 bullets returned | **PASS** |
| T3 | auditor | deepseek-v4-flash | off | confirm identity | 0 | false | end_turn | 12s | identity returned | **PASS** |
| T4 | auditor | deepseek-v4-flash | medium | reply `READY` | 0 | false | end_turn | 5s | `READY` | **PASS** |
| T5 | orchestrator | deepseek-v4-pro | high | reply `SCHEMA_OK_PRO` | 0 | false | end_turn | 8s | `SCHEMA_OK_PRO` | **PASS** |
| T6 | orchestrator | deepseek-v4-pro | off | spawn auditor sub-agent via `sessions_spawn` | 2 (`sessions_spawn`, `sessions_yield`) | true | end_turn | 19s | spawn + yield clean (0 failures) | **PASS** (with note) |
| T7 | orchestrator | deepseek-v4-pro | off | continuation in T1's session id | 0 | false | stop | 8s | `CONT_OK` | **PASS** |
| T8 | engineering | deepseek-v4-pro | off | exec chained shell (`cd … && python3 -c …`) — exercises the patched preflight extractor | 1 (`exec`) | true | stop | 24s | `PREFLIGHT_FIX_LIVE` | **PASS** |

**Pass/fail**: 8/8 PASS.

## What was directly disproven

| Prior claim | Reality |
|---|---|
| "DeepSeek v4-flash and v4-pro reject sub-agent spawns" | False. T6 used `sessions_spawn` with v4-pro and the call returned with 0 failures. |
| "Provider rejected the request schema or tool payload" | Not reproducible on any model/thinking combo today. The fix at 10:43:30 (pi-ai patch + `compat.requiresThinkingAsText: true` + `thinkingDefault: "off"`) holds across off/medium/high. |
| "Sub-agent runs die when Gateway restarts" | True only as transient `1006 abnormal closure` reconnect noise. The 5 gateway restarts today were operator-initiated; no auto-restart loop was found in `gateway.err.log`. |
| "DeepSeek thinking-mode replay poison" | Replay invalidation does still flag (`replayInvalid: true` on T6, T8) but is **non-fatal** — completion finishes with `stopReason: end_turn` and the tool result is honored. The compat layer drops the offending `thinking` block from the next assistant turn, which is the documented behavior. |

## What is real but not a sub-agent failure

- **Browser CDP unavailable** — `connect ECONNREFUSED 127.0.0.1:18800`. The browser bridge is offline. This explains BRIDGE/MUSE/SIGNAL browser tool failures historically labelled as "sub-agent crashes." It is a separate plugin-availability issue, classified `BLOCKED_BY_INFRASTRUCTURE` in artifact 03 (capability matrix).
- **OpenAI/Codex fallback in cooldown** — quota-only, expected to lift ~14:48 EEST.

## Runtime configuration that proved correct

```jsonc
agents.defaults.thinkingDefault = "off"
agents.defaults.subagents.thinking = "off"
agents.defaults.subagents.model = "deepseek/deepseek-v4-flash"
models.providers.deepseek.models[*].compat.requiresThinkingAsText = true
models.providers.deepseek.models[*].reasoning = false
```

The pi-ai bundle patch (operator-applied 2026-04-29 10:43:30) and the bash-tools preflight patch (principal-engineer-applied 11:53:30) are both **active and verified**. Both are noted as fragile against `npm i -g openclaw` reinstalls — backups at `*.bak.preflight-fix` and `*.bak.deepseek-thinking-fix`.

## What still must be validated by the proof mission

- A sub-agent that ALSO does tool work (file write + memory write + score event) without provoking a replay storm.
- A multi-spawn from NEXUS (FORGE + BRIDGE + SENTINEL in parallel) within the `subagents.maxConcurrent: 7` envelope.
- That sub-agent crashes correctly trigger the fallback ladder (artifact 07) instead of silently collapsing to NEXUS direct execution.

## Conclusion

**DeepSeek + sub-agent runtime status: WORKING.**
The historical "LLM request failed: provider rejected the request schema or tool payload" error is no longer reproducible on any model × thinking-level combination tested. The autonomy collapse the operator experienced was caused by **policy + delegation framework gaps**, not by the language model layer. Subsequent artifacts (03–11) close those gaps; artifact 12 proves the closure end-to-end.
