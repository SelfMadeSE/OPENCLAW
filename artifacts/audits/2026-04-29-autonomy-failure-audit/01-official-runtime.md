# 01 — Official OpenClaw Runtime Audit

Captured: 2026-04-29 12:18 EEST
Auditor: principal-engineer (CLI)
Source: live runtime, `~/.openclaw/openclaw.json`, `~/.openclaw/cron/jobs.json`, `~/.openclaw/logs/*`

## Binary / Process

| Item | Value |
|---|---|
| `which openclaw` | `/opt/homebrew/bin/openclaw` |
| Version | `OpenClaw 2026.4.15 (041266a)` |
| Gateway PID | 67492 (`openclaw-gateway`), started 2026-04-29 11:53:29 |
| Desktop app PID | 910 (`/Applications/OpenClaw.app`), running since Mon 03:00 |
| Listen port | `127.0.0.1:18789` (LISTEN, gateway only) |
| Workspace root (operator) | `/Users/ryleebenson/Desktop/OPENCLAW` |
| Default agent workspace | `~/.openclaw/workspace` |

## Agents (live `openclaw agents list`)

| id | display | workspace | model | routing rules |
|---|---|---|---|---|
| orchestrator (default) | Orchestrator (NEXUS) | `~/Desktop/OPENCLAW/workspaces/orchestrator` | `deepseek/deepseek-v4-pro` | 0 |
| engineering | Engineering (FORGE) | `~/Desktop/OPENCLAW/workspaces/engineering` | `deepseek/deepseek-v4-pro` | 0 |
| marketing | Marketing (PULSE) | `~/Desktop/OPENCLAW/workspaces/marketing` | `deepseek/deepseek-v4-flash` | 0 |
| outreach | Outreach (BRIDGE) | `~/Desktop/OPENCLAW/workspaces/outreach` | `deepseek/deepseek-v4-flash` | 0 |
| creative | Creative (MUSE) | `~/Desktop/OPENCLAW/workspaces/creative` | `deepseek/deepseek-v4-flash` | 0 |
| media | Media (SIGNAL) | `~/Desktop/OPENCLAW/workspaces/media` | `deepseek/deepseek-v4-flash` | 0 |
| auditor | Auditor (SENTINEL) | `~/Desktop/OPENCLAW/workspaces/auditor` | `deepseek/deepseek-v4-flash` | 0 |

All seven agents inherit `agents.defaults` for skills, heartbeat, sub-agents, thinking, and timeouts (no per-agent overrides found in `openclaw.json` — `skills` field absent on every entry).

## agents.defaults (current effective)

```jsonc
{
  "workspace": "/Users/ryleebenson/.openclaw/workspace",
  "thinkingDefault": "off",
  "timeoutSeconds": 600,
  "maxConcurrent": 2,
  "model": {
    "primary": "deepseek/deepseek-v4-flash",
    "fallbacks": ["deepseek/deepseek-v4-pro", "openai-codex/gpt-5.4-mini"]
  },
  "subagents": {
    "maxSpawnDepth": 2,
    "maxChildrenPerAgent": 7,
    "maxConcurrent": 7,
    "allowAgents": ["orchestrator","engineering","marketing","outreach","creative","media","auditor"],
    "model": "deepseek/deepseek-v4-flash",
    "thinking": "off",
    "runTimeoutSeconds": 1800
  },
  "heartbeat": { "every": "1h", "lightContext": true, "isolatedSession": true, "timeoutSeconds": 900 },
  "contextTokens": 1000000,
  "userTimezone": "America/Denver",
  "memorySearch": { "enabled": false }
}
```

Notable: `memorySearch.enabled = false` — agents can READ memory files but no semantic memory recall is wired. `lightContext: true` — heartbeat sessions get reduced bootstrap.

## Models / Providers

```jsonc
"models.providers.deepseek": {
  "baseUrl": "https://api.deepseek.com/anthropic",
  "api": "anthropic-messages",
  "auth": "api-key",
  "models": [
    { "id": "deepseek-v4-pro",   "reasoning": false, "compat": { "requiresThinkingAsText": true, "supportsUsageInStreaming": true } },
    { "id": "deepseek-v4-flash", "reasoning": false, "compat": { "requiresThinkingAsText": true, "supportsUsageInStreaming": true } }
  ]
}
```

**Important correction to prior session checkpoint:** Both DeepSeek models have `reasoning: false` (NOT `true`). The thinking-mode runtime bug is being suppressed via `compat.requiresThinkingAsText: true`, which causes pi-ai to flatten any `thinking` content into text instead of preserving the `thinking` block. Combined with `agents.defaults.thinkingDefault: "off"` and `subagents.thinking: "off"`, this is what is keeping DeepSeek/anthropic happy.

Bedrock plugin reports `[bedrock-discovery] Failed to discover Bedrock models` — non-fatal, no Bedrock provider configured.

OpenAI/Codex fallback (`gpt-5.4-mini`) is in ChatGPT-Plus quota cooldown until ~14:48 EEST.

## Skills

`skills.allowBundled` lists 51 bundled skills. **No per-agent skill overrides exist**, so every agent receives every bundled skill. There is no MCP `skills` configuration, no installed third-party skills, and no entry in `~/.openclaw/skills` aside from defaults.

Skills inventory (alphabetical, all available to all agents):
`1password, apple-notes, apple-reminders, bear-notes, blogwatcher, blucli, bluebubbles, camsnap, canvas, clawhub, coding-agent, discord, eightctl, gemini, gifgrep, gog, goplaces, healthcheck, himalaya, imsg, mcporter, model-usage, nano-pdf, node-connect, notion, obsidian, openai-whisper, openai-whisper-api, openhue, oracle, ordercli, peekaboo, sag, session-logs, sherpa-onnx-tts, skill-creator, slack, songsee, sonoscli, spotify-player, summarize, taskflow, taskflow-inbox-triage, things-mac, tmux, trello, video-frames, voice-call, wacli, weather, xurl`

Note: many of these (1password, apple-notes, sonos, spotify, etc.) are personal-device skills with no relevance to the revenue mission. Capability matrix (artifact 03) classifies which are actually useful.

## Channels

| channel | enabled | policy |
|---|---|---|
| `telegram` | ✅ | DM allowlist=`[8331613806]`, group allowlist=`[8331613806]`, requireMention in groups, exec approvals enabled (target=DM) |

No Slack/Discord/SMS/Email channel wired into OpenClaw natively (email is via SMTP scripts, not a channel).

## Hooks

| hook | enabled |
|---|---|
| `command-logger` | ✅ |
| `session-memory` | ✅ |
| `bootstrap-extra-files` | ✅, patterns: `MISSION.md SCORECARD.md MEMORY.md POLICY.md DREAMS.md HEARTBEAT.md INBOX.md` |
| `boot-md` | ✅ |

These are the OFFICIAL bootstrap files agents pick up at session start. They are the right place to enforce policy and mission state.

## Tools

```jsonc
"tools": {
  "profile": "full",
  "exec": { "security": "full", "ask": "off" },
  "sessions": { "visibility": "all" },
  "agentToAgent": {
    "enabled": true,
    "allow": ["orchestrator","marketing","engineering","outreach","creative","media","auditor"]
  }
}
```

Sub-agent spawning is enabled, all 7 agents are allowed targets. `exec.security: full` means agents can run arbitrary shell commands within preflight rules. `exec.ask: off` means no per-command approval gate (this is the source of the autonomy collapse — there is no built-in confirmation flow for outbound side effects, only the policy markdown agents are supposed to honor).

## Cron

`~/.openclaw/cron/jobs.json` snapshot 2026-04-29 12:17 EEST (post safety-freeze):

| id | name | agent | enabled | last status |
|---|---|---|---|---|
| dfa29b48 | Hourly Prospect Research | outreach | **DISABLED (frozen)** | ok (12:13) |
| 210d6add | Hourly Outreach Draft Queue | outreach | **DISABLED (frozen)** | ok (11:46) |
| 2bf2b12a | Site Health Check | engineering | enabled | ok (11:46) |
| ba63bff8 | Nightly OA Creative Review | creative | enabled | ok (11:46) |
| 76b08b88 | Nightly OA Marketing Review | marketing | enabled | ok (11:46) |
| 32d19920 | Runtime Evidence Reconciliation | auditor | enabled | ok (12:02) |
| 440c356d | Hourly Agent Roundtable | orchestrator | enabled | ok (11:48) |
| 9f89293b | Daily Outbound Autonomy Audit-Funnel Content | marketing | **DISABLED (frozen)** | ok |
| (8 others nightly) | … | various | enabled | ok |

Three jobs disabled by safety-freeze: any cron with outbound or "blast" semantics. Re-enable only after proof mission + approval.

## Gateway restart history (today)

| ts | reason |
|---|---|
| 10:43:45 | user's DeepSeek/thinking patch deploy |
| 10:59:58 | manual restart by principal-engineer (clearing in-memory state) |
| 11:14:45 | manual restart after editing jobs.json (clear stale runningAtMs) |
| 11:18:28 | manual restart (second clear pass) |
| 11:53:40 | manual restart after patching `bash-tools-T6u3D01x.js` (preflight extractor) |

Each restart triggers exactly one `Subagent announce failed: gateway closed (1006 abnormal closure)` line per active sub-agent. Sub-agents reconnect on next heartbeat.

**No evidence of crash-loop or auto-restart.** Every restart in the log is operator-initiated. No `uncaughtException`, no `process exit` from the gateway itself.

## Sub-agent state

CLI surface: `openclaw agents` (no `subagents` subcommand exists; sub-agent runs are listed via session inspectors, not a top-level command). Sub-agent runs are persisted under `~/.openclaw/agents/<agent>/sessions/<sid>.jsonl`. Sub-agent announce failures recorded in err log are only the `1006` reconnect noise.

## Gateway error log topic distribution (today, since 11:00)

| topic | count | note |
|---|---|---|
| `[tools]` | 175 | 90% were the `exec preflight` refusals fixed at 11:53 by patching `bash-tools-T6u3D01x.js`; remainder are `browser failed` (CDP not running) and `web_fetch failed` |
| `[agent/embedded]` | 25 | normal cache-management warnings |
| `[diagnostic]` | 13 | lane task errors (downstream of the schema-reject) |
| `[prompt-cache]` | 11 | normal cache invalidation |
| `[plugins]` | 11 | bedrock discovery + memory-core dreaming |
| `[ws]` | 5 | sessions.list polls and one cron.update with bad id |
| `[skills-remote]` | 4 | TBD — needs deeper look in artifact 03 |
| `[gateway]` | 3 | starts (10:59, 11:14, 11:18) |
| `[telegram]` | 1 | normal |

## Known runtime concerns surfaced

1. **Browser CDP unavailable** — `connect ECONNREFUSED 127.0.0.1:18800`. The browser plugin slot expects an existing Chrome CDP, but no Chrome is launched in remote-debugging mode. Browser tool calls return `UNAVAILABLE`. → capability matrix item.
2. **memorySearch disabled** — agents have no semantic recall, only file-system reads. They can keep MEMORY.md but cannot retrieve by relevance.
3. **Maxconcurrent=2 default** but `subagents.maxConcurrent=7`. Heartbeat + a single mission can saturate the per-agent slot, which is why earlier "stuck running" cron jobs blocked all other work.
4. **No per-agent skills overrides** — every agent has the entire 51-skill bundle including 1password, sonos, spotify. Reducing this cuts the prompt and removes risky tools that don't belong on (e.g.) a marketing agent. → planned in artifact 03/04.
5. **`exec.ask: off`** — there is no built-in confirmation gate. The approval policy is enforced only by markdown convention. This is the *root systemic cause* of broad-permission misuse.
6. **OpenAI fallback in cooldown** until ~14:48 EEST. Not a config issue, just quota.

## Unknowns (require further work)

- Does the `requiresThinkingAsText: true` compat flag survive sub-agent inheritance? (test in artifact 02).
- Does `agents.defaults.subagents.model: "deepseek/deepseek-v4-flash"` correctly override per-agent model when spawning, including the `thinking: "off"` setting? (test in artifact 02).
- Is the `[skills-remote]` error a real outage or a benign warm-up failure? (will diagnose during capability matrix).
- Are the `bootstrap-extra-files` patterns being read in EVERY session, including isolated/heartbeat? (verify by inspecting a fresh session jsonl bootstrap block).

## Conclusion

Runtime is **WORKING** at the gateway/process level. All 7 agents are configured, sub-agent spawning is enabled, DeepSeek thinking schema rejection is suppressed via `requiresThinkingAsText: true`, exec preflight extractor patched. The autonomy collapse is **not** an infra failure — it is a **policy + memory + delegation framework** failure layered on top of an otherwise healthy runtime. The fixes needed are:

- explicit approval policy markdown wired into every agent boot (`POLICY.md`)
- runtime freeze flag the sender scripts honor (already deployed at `_shared/policy/RUNTIME_FREEZE.json`)
- a heartbeat template that forces structured progress reports (artifact 06)
- a sub-agent fallback ladder so failures don't silently collapse to NEXUS (artifact 07)
- a real outreach pipeline state machine (artifact 06 / `_shared/revenue/`)
- a scoring system that actually affects routing (artifact 11)
- proven sub-agent spawn matrix (artifact 02 — next)
