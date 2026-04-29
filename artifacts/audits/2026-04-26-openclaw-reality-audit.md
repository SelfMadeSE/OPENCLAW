# Deliverable A — OpenClaw Reality Audit (Refresh)

_Snapshot: 2026-04-26, OpenClaw 2026.4.15 (041266a)_
_Predecessor: `docs/realignment/AUDIT.md` (2026-04-19)_

This refresh is required after the 2026-04-26 DeepSeek/thinking-replay fix and before the autonomy-realignment work in PRD `paste-1777228201791.txt`. Raw audit captures live in `~/.openclaw/workspace/artifacts/audits/raw-20260426/`.

---

## 1. Official CLI / runtime

| Item | Value | Status |
|---|---|---|
| Binary | `/opt/homebrew/bin/openclaw` | ✅ official |
| Version | `2026.4.15 (041266a)` | ⚠ update available `2026.4.24` |
| Runtime mode | LaunchAgent `ai.openclaw.gateway` (loaded, running) | ✅ |
| OS / Node | macOS 26.5 arm64 / Node 25.2.1 (NVM) | ⚠ NVM-pinned Node still flagged by `doctor` |

## 2. Gateway

| Item | Value |
|---|---|
| PID | `16706` (state active) |
| Bind | `ws://127.0.0.1:18789` (loopback only) |
| Auth | token (from `gateway.auth.token`) |
| Reachability | 46–69 ms |
| Crash loop | none (last restart 12:21 after DeepSeek fix) |
| Errors since fix | 0 `reasoning_content` / 0 `content[].thinking` regressions |

## 3. Config (`~/.openclaw/openclaw.json`)

| Key area | State |
|---|---|
| `agents.defaults` | workspace=`~/.openclaw/workspace` (override per-agent), `thinkingDefault=medium`, primary model `deepseek/deepseek-v4-flash`, fallback `deepseek-v4-pro`, subagents allowAgents=all-7, max children 7, depth 2 |
| `agents.list` | 7 agents (orchestrator, engineering, marketing, outreach, creative, media, auditor); each with explicit `workspace=~/Desktop/OPENCLAW/workspaces/<id>`, `thinkingDefault=medium`, `reasoningDefault=stream`, sub-agent model = `deepseek-v4-flash` |
| `models.providers.deepseek` | ✅ `baseUrl=https://api.deepseek.com/anthropic`, `api=anthropic-messages`, both v4 models tagged `reasoning=true` and `compat.requiresThinkingAsText=true` (resolves prior 400) |
| `models.providers` (other) | openrouter (5 free models), zai, openai, github-copilot, lmstudio (legacy local — config kept), all configured |
| `skills` | `allowBundled` whitelist (51 entries), `allow[]` empty, `install[]` empty |
| `agents.*.skills` & `agents.*.allowlist` | **all null** — inherit `agents.defaults.skills=null`. Only allowBundled gates skill exposure. ⚠ no per-agent skill scoping. |
| `hooks` | enabled; internal entries on: `command-logger`, `session-memory`, `bootstrap-extra-files`, `boot-md`. ⚠ **`bootstrap-extra-files` has no `patterns` configured** → bootstrap files in workspaces are not loaded into agent context |
| `channels.telegram` | enabled, allowlist DM+groups locked to id `8331613806`, polling, errorPolicy=once, execApprovals.enabled=**false** ⚠ |
| `tools.exec` | `security="full"` (`ask="off"`) for **all** agents — flagged by security audit ⚠ |
| `plugins.entries` | lmstudio, memory-core, zai, openai, browser, openrouter, github-copilot, deepseek |
| `plugins.entries.memory-core` | only dreaming config; no primary store wiring → status reports `Memory: enabled (plugin memory-core) · unavailable` ⚠ |
| `gateway.controlUi.allowInsecureAuth` | `true` ⚠ flagged |

## 4. Workspaces (`~/Desktop/OPENCLAW/workspaces/`)

**Canonical 7 (kept):** orchestrator, engineering, marketing, outreach, creative, media, auditor.
Each contains: AGENTS.md, BOOT.md, DREAMS.md, HEARTBEAT.md, IDENTITY.md, INBOX.md, MEMORY.md, MISSION.md, POLICY.md, SCORECARD.md, SOUL.md, TOOLS.md, USER.md, plus per-agent `artifacts/`, `notes/`, `skills/`, `legacy/`.

**Orphan workspaces (archive candidates):** `coder/`, `coder/` (dup), `marketer/`, `marketing/` (canonical), `test/` — none referenced by `agents.list[]`. Action: archive to `archive/2026-04-26/orphan-workspaces/`.

**`_shared/`:** `missions/`, `revenue/`, `scoring/`, `social_memory/`, `agents/` (added). Already populated with templates, schemas, history, trust matrix.

**`~/.openclaw/workspace/`:** template/legacy copies of AGENTS/SOUL/TOOLS/IDENTITY/USER/HEARTBEAT/BOOTSTRAP — used as fallback default; can be left as default until migration.

## 5. Channels

- Telegram: configured, running, polling, owner DM allowlist `[8331613806]`, no pending pairing requests, last inbound 12:33, last outbound 12:34.
- No other channel configured.

## 6. Skills

| Metric | Value |
|---|---|
| Total | 75 |
| Eligible (loadable now) | 39 |
| Disabled | 0 |
| Blocked | 2 (`gh-issues`, `github`) |
| Missing requirements | 34 (full list below in capability matrix Deliverable B) |

Per-agent `skills` is null for every agent → no agent-scoped restriction. All 39 eligible skills are visible to every agent. PRD Section 9 requires risk-class scoping; addressed in Deliverable B.

## 7. Hooks

| Hook | Eligible | Source | Notes |
|---|---|---|---|
| `boot-md` | ✅ | bundled | runs `BOOT.md` on `gateway:startup` — works |
| `bootstrap-extra-files` | ✅ | bundled | enabled but **no `patterns` configured** → no extra files injected into agent context. Status reports "no bootstrap files". Fix in §11. |
| `command-logger` | ✅ | bundled | on |
| `session-memory` | ✅ | bundled | on |
| `memory-core-short-term-dreaming-cron` | ✅ | bundled | dreaming cron active |

## 8. Sub-agents

`agents.defaults.subagents`: `maxSpawnDepth=2`, `maxChildrenPerAgent=7`, `maxConcurrent=7`, `allowAgents=[all 7]`, model `deepseek-v4-flash`, thinking medium.
Per-agent `subagents.allowAgents=[all 7]` (each agent can spawn any). Live spawn smoke test deferred to Deliverable G.

## 9. Memory

| System | State |
|---|---|
| `memory-core` plugin | enabled but **store unavailable** (no primary backend wired) ⚠ |
| Workspace `MEMORY.md` per agent | present (read by `bootstrap-extra-files` once configured) |
| `~/Desktop/OPENCLAW/memory/` | shared/, per-agent/, short-term/, daily 2026-04-26.md present |
| Qdrant / vector | container available (docker-compose) — not wired to agents |
| `_shared/social_memory/` | edges.jsonl + trust_matrix.json |
| `agent-dream` skill | eligible, dreaming cron writing to per-agent dirs |

PRD §10 requires one canonical memory architecture. Recommendation captured in Deliverable H.

## 10. Logs / evidence

- `~/.openclaw/logs/` — gateway.log, gateway.err.log, channels logs, doctor logs.
- `~/Desktop/OPENCLAW/artifacts/` — audit-reports, heartbeat-status, mission-runs, outreach-drafts, runs, runtime-reports, site-health.
- `~/Desktop/OPENCLAW/_shared/scoring/history.jsonl` — last entries dated 2026-04-20 mission-005 (auditor-written, multi-agent borda outcome).
- `~/Desktop/OPENCLAW/_shared/revenue/attempts.jsonl` — exists but empty (no attempts logged this cycle).

## 11. Blockers / open issues for next phase

| # | Issue | Severity | Fix path |
|---|---|---|---|
| 1 | `bootstrap-extra-files` has no `patterns` → workspace md (`MISSION.md`, `SCORECARD.md`, `MEMORY.md`, etc.) not injected into agents | High | Set `hooks.bundled.bootstrap-extra-files.patterns` to `["MISSION.md","SCORECARD.md","MEMORY.md","POLICY.md","DREAMS.md","HEARTBEAT.md","INBOX.md"]` |
| 2 | `memory-core` reports `unavailable` | Medium | Add a primary store entry under `plugins.entries.memory-core.config` (e.g. fs / sqlite). Out of scope for autonomous turn — proposed in Deliverable H |
| 3 | `tools.exec.security="full"` for all agents | Medium-Sec | Switch to `allowlist` per agent with `tools.exec.strictInlineEval=true`; covered in Deliverable B risk classes |
| 4 | `gateway.controlUi.allowInsecureAuth=true` | Sec warn | Disable when not actively debugging |
| 5 | Orphan workspaces (`coder`, `marketer`, `test`) | Low | Archive to `archive/2026-04-26/orphan-workspaces/` (deferred — destructive-ish) |
| 6 | `execApprovals.enabled=false` on Telegram | Med | Enable so Orange/Red routing has owner-approval surface |
| 7 | OpenClaw update available 2026.4.24 | Low | `openclaw update` (manual) |
| 8 | LaunchAgent points at NVM Node — breaks on upgrade | Low | `openclaw doctor --repair` |

## 12. Verification (since 2026-04-26 12:21 fix)

- ✅ `openclaw infer model run --model deepseek/deepseek-v4-flash --prompt "Reply with READY"` → `READY`.
- ✅ Gateway logs since fix: 0 `reasoning_content` / 0 `content[].thinking` errors.
- ✅ Telegram inbound/outbound flowing (last in 12:33, last out 12:34).
- ⏳ Multi-turn tool-loop (sub-agent spawn) — verified in Deliverable G.

---

**Verdict:** Runtime is **healthy**. Framework artifacts (souls, scorecards, schemas, mission/revenue/social-memory dirs) are **already in place** from the 2026-04-19 realignment and the PRD's near-complete scaffolding. The remaining work is largely **wiring** (bootstrap patterns, memory store, exec policy, execApprovals) and **document promotion** (formal MISSION_PROTOCOL.md, REVENUE_PROTOCOL.md, OPERATOR_RUNBOOK.md, capability matrix, soul-matrix rollup).
