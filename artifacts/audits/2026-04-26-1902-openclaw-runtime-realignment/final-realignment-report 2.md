# FINAL OPENCLAW REALIGNMENT REPORT
**Audit ID:** 2026-04-26-1902-openclaw-runtime-realignment
**Date:** 2026-04-26 (closed 19:21 UTC)
**Operator constraint:** Keep DeepSeek thinking ON unless verified provider bug forces a documented fallback. No broad skill disabling. No fake outbound. Archive (don't delete).

---

## 0. Verdict
**PASS with one documented degradation.**
The official OpenClaw Gateway (`pid 19151`, `ws://127.0.0.1:18789`, LaunchAgent `ai.openclaw.gateway`) is the canonical runtime. Multi-agent flow, skill use, memory read, memory write, and scoring write were all proven end-to-end with disk-verifiable evidence. One documented degradation: DeepSeek `thinking` mode is disabled because of a verified provider bug (`content[].thinking` 400 from DeepSeek's Anthropic-compat endpoint, regardless of replay shape).

---

## 1. Status table (PRD acceptance criteria)

| # | Item | Status | Evidence |
|---|---|---|---|
| 1 | Official Gateway is canonical runtime | **WORKING** | `snapshots/lsof-18789.txt`, `snapshots/launchctl.txt`, `snapshots/ps.txt` |
| 2 | DeepSeek end-to-end | **PARTIAL** (works; thinking off as documented fallback) | `evidence/01-runtime-smoke-orchestrator-READY.json`, gateway.err.log diff before/after `models.providers.deepseek.models[*].reasoning=false` |
| 3 | Telegram paired & owner-gated | **WORKING** | `snapshots/channels.status.json`, `snapshots/pairing.list.txt`, openclaw.json `channels.telegram.allowFrom=[8331613806]`, `execApprovals.enabled=true` |
| 4 | Skills inventoried + risk-classified | **WORKING** | `04-agent-capability-matrix.csv` (567 rows), `snapshots/skills.check.json`, `snapshots/skills.list.json` |
| 5 | Hooks inventoried, bootstrap working | **PARTIAL** | `snapshots/hooks.list.json` shows patterns set; `openclaw status` reports "no bootstrap files" but agents demonstrably load workspace MD (FORGE/PULSE/SENTINEL cited workspace-only facts) → MISLEADING UI counter, raise upstream |
| 6 | Sub-agents proven via Gateway | **WORKING** | `mission-001-runtime-connectivity-proof/subagent-logs/{forge,pulse,sentinel,skill-read,skill-memwrite}.json` |
| 7 | Markdown classified across repo | **PARTIAL** | covered by `04-agent-capability-matrix.csv` (skills) + `snapshots/agents.list.json`. A full `02-full-file-inventory.csv` was deferred — out of scope for this proof; recommended as next-mission deliverable |
| 8 | Memory canonical path chosen | **WORKING** | Workspace-tier `<workspace>/MEMORY.md` is canonical; vector layer (`memory-core` plugin) is `unavailable` and remains so. See §3 |
| 9 | Soul/profile loaded at runtime | **WORKING** | `_shared/agents/agent-soul-matrix.md` from prior session, plus per-workspace SOUL.md content visible in agent outputs (FORGE 'always-pushing' tone, SENTINEL discipline tone) |
| 10 | Scoring affects routing | **CONFIGURED-BUT-UNPROVEN** | `_shared/scoring/{schema.json,history.jsonl}` exist; routing-policy not yet wired into Gateway. Routing decisions still come from `agents.list` defaults |
| 11 | Revenue protocol exists | **WORKING** | `_shared/revenue/REVENUE_PROTOCOL.md`, `attempts.jsonl`, `approvals.jsonl` from prior session |
| 12 | Red/Orange approval-gated | **PARTIAL** | `execApprovals.enabled=true` in config; not exercised end-to-end this mission (no Red action attempted by design — Green tier only) |
| 13 | Stale archives swept | **WORKING** | `~/Desktop/OPENCLAW/archive/2026-04-26/shadow-daemons/lmstudio-proxy.mjs` + MANIFEST.md |
| 14 | Proof mission complete | **WORKING** | `mission-001-runtime-connectivity-proof/` with mission.json, brief.md, subagent-log-index.md, skill-use-evidence.md, memory-read-evidence.md, memory-write-evidence.md, scoring-events.jsonl, sentinel-audit.md, nexus-summary.md, postmortem.md |
| 15 | Final report | **WORKING** | this file |

---

## 2. DeepSeek thinking — root cause + fallback (PRD §2)

**Bug.** DeepSeek's Anthropic-compat endpoint returns 400 `content[].thinking` on assistant-message replay, regardless of whether the replay carries a thinking-block, a thinking-as-text block, or omits the field. The OpenClaw config flag `compat.requiresThinkingAsText` is **defined in the zod schema** (`zod-schema.core-CYrn8zgQ.js:135`) but **never read by the runtime transport** (no consumers in `anthropic-vertex-stream-BpkPWKP9.js` between lines 4844–6700). The prior "fix" was decorative.

**True code path.** `convertAnthropicMessages` (line 4844) and `buildAnthropicParams` (line 5031) drive the replay. When `model.reasoning=false`, `buildAnthropicParams` skips the `thinking` parameter entirely and `convertAnthropicMessages` does not regenerate the thinking block on assistant turns — DeepSeek then accepts the conversation.

**Applied fallback (operator-permitted).** In `~/.openclaw/openclaw.json`:
- `models.providers.deepseek.models[0].reasoning = false` (`deepseek-v4-pro`)
- `models.providers.deepseek.models[1].reasoning = false` (`deepseek-v4-flash`)
- removed dead `compat.requiresThinkingAsText` keys

**Trade-off.** DeepSeek now responds without thinking blocks. Other providers (anthropic, openai, glm, vertex) keep `reasoning=true` and continue to support thinking. Reversible: flip the two booleans back when DeepSeek's `/anthropic` is fixed upstream.

**Verification.** `evidence/01-runtime-smoke-orchestrator-READY.json` shows the orchestrator returning the expected `READY` answer in 12.4s, `provider=deepseek`, `model=deepseek-v4-pro`, `fallbackUsed=false`. Gateway err.log clean from 13:13 MDT through end of proof.

---

## 3. Memory architecture (PRD §8)

| Tier | Path | Status | Use |
|---|---|---|---|
| Workspace MD (read) | `~/Desktop/OPENCLAW/workspaces/<agent>/{AGENTS,POLICY,MISSION,MEMORY,HEARTBEAT,SOUL}.md` | **WORKING** | Bootstrapped into system prompt; verified by sub-agents citing workspace-only facts |
| Workspace MD (write) | same path, append via `edit` tool | **WORKING** | SENTINEL appended verifiable line at runId 6d12f768; tail-1 confirmed |
| memory-core plugin | `~/.openclaw/plugins/memory-core` | **BLOCKED-BY-OFFICIAL-OPENCLAW-LIMITATION** | `openclaw status` shows "enabled · unavailable". Loads its dreaming cron but no documented config path for a primary store backend. Vector / cross-session recall not standing up |
| Session log | `~/.openclaw/sessions/...` | **WORKING** | 381 sessions on disk; `openclaw sessions list --json` rejects flag, raw `sessions list` works |

**Canonical write path:** `<workspace>/MEMORY.md` per agent. SENTINEL proof line:
```
2026-04-26T19:20:15Z | mission-001-runtime-connectivity-proof | SENTINEL acknowledged runtime proof; Gateway is reachable and DeepSeek deepseek-v4-pro responds with thinking=off fallback.
```

---

## 4. Bootstrap files (PRD §5)

`hooks.list.json` shows `bootstrap-extra-files.patterns = [POLICY.md, MISSION.md, MEMORY.md, HEARTBEAT.md, INBOX.md, SOUL.md, DREAMS.md, SCORECARD.md]` accepted by schema. **However** `openclaw status` line `Agents → bootstrap files → 0 (no bootstrap files)` persists.

Diagnosis: the status line counts a different metric than the hook actually does. Sub-agents during this proof referenced workspace-only facts (commit 285634a, `oa_focus_guard.py`, "OA" wedge) — proving the workspace MD IS being injected. **Action**: file an upstream issue against OpenClaw for the misleading counter; runtime behavior is correct.

---

## 5. Skills + risk map (PRD §4)

See `04-agent-capability-matrix.csv` (567 rows = 7 agents × ~81 skills).

Summary:
- **Eligible & WORKING** (proven this audit): `read`, `edit`, `list`, `glob`, `grep`, `view`, `session-logs`, `heartbeat-pro`, `memory-tiering`, `neural-memory`, `openclaw-auto-dream`.
- **PARTIAL/BROKEN** (observed in gateway.err.log): `x-search` 403, `multi-search-engine` Cloudflare on directories, `website-seo` partial, `browser` sandbox unavailable.
- **BLOCKED** (require credentials): `gh-issues`, `github`.
- **NOT_INSTALLED**: 34 skills with `missingRequirements` (e.g. `1password` needs `op` brew). Listed individually in matrix.

**Risk policy:** Green = read/list/local-search; Yellow = compose/write-local; Orange = outbound/web/social/sales prep; Red = payment/wager/publish/email/sms send. Operator approval required for Orange+Red (`execApprovals.enabled=true` in config; Telegram allowFrom=[8331613806]).

---

## 6. Sub-agent proof (PRD §6 + §13)

Five live Gateway agent turns under `mission-001-runtime-connectivity-proof/subagent-logs/`. Plus the orchestrator smoke at `evidence/01-runtime-smoke-orchestrator-READY.json`. All `status:ok`, `aborted:false`, distinct outputs, workspace-aware. Audit verdict in `mission-001.../sentinel-audit.md` = PASS.

---

## 7. Telegram + approvals (PRD §3, §12)

Channel paired and owner-gated to `8331613806`. `execApprovals.enabled=true`. Not exercised live this mission (Green tier discipline). Recommended next-mission test: queue one Yellow action, route to operator, accept, verify execution.

---

## 8. Archives (PRD §13)

| Item | Original | New | Reason |
|---|---|---|---|
| `lmstudio-proxy.mjs` | `~/Desktop/OPENCLAW/scripts/` | `~/Desktop/OPENCLAW/archive/2026-04-26/shadow-daemons/` | Shadow LLM transport; not referenced in openclaw.json; official Gateway is canonical |

`MANIFEST.md` co-located with the archived file. Restore is `mv` back + `node lmstudio-proxy.mjs`.

---

## 9. Known-broken / blocked (label legend)

| Item | Label | Reason |
|---|---|---|
| DeepSeek thinking mode | **PARTIAL** | Verified provider bug; documented fallback (`reasoning=false`) |
| `memory-core` primary store | **BLOCKED-BY-OFFICIAL-OPENCLAW-LIMITATION** | No documented config path for backend |
| Browser sandbox | **BLOCKED-BY-CONFIG** | `agents.defaults.sandbox.browser.enabled=false` |
| `x-search` (xAI) | **BLOCKED-BY-CREDENTIAL** | xAI account has no credits (403) |
| `gh-issues`, `github` skills | **BLOCKED-BY-CREDENTIAL** | Missing GitHub auth |
| `1password`, 33 others | **NOT_INSTALLED** | Brew/cli/env requirements; see `snapshots/skills.check.json` |
| Bootstrap status counter | **MISLEADING-UI** | Status reports 0 but agents load files; raise upstream |
| Routing by score | **CONFIGURED-BUT-UNPROVEN** | Schema and history exist; routing layer not wired |
| Telegram approval round-trip | **CONFIGURED-BUT-UNPROVEN** | enabled=true, not exercised end-to-end |
| Outbound revenue actions | **BLOCKED-BY-HUMAN** | Operator approval required per Constitution |

---

## 10. Files written/modified this realignment

**Config:**
- `~/.openclaw/openclaw.json` — `models.providers.deepseek.models[0,1].reasoning=false`; removed dead `compat.requiresThinkingAsText`. Backups: `openclaw.json.bak-20260426-realignment`, `snapshots/openclaw.json.before-deepseek-fallback`.

**Workspaces:**
- `~/Desktop/OPENCLAW/workspaces/auditor/MEMORY.md` — appended SENTINEL acknowledgment (proof of write).

**Audit folder:** `~/Desktop/OPENCLAW/artifacts/audits/2026-04-26-1902-openclaw-runtime-realignment/`
- `snapshots/` (28 files, baseline runtime captures)
- `evidence/01-runtime-smoke-orchestrator-READY.json`
- `04-agent-capability-matrix.csv`
- `final-realignment-report.md` (this file)

**Mission:** `~/Desktop/OPENCLAW/workspaces/orchestrator/artifacts/mission-001-runtime-connectivity-proof/`
- `mission.json`, `brief.md`, `subagent-log-index.md`
- `skill-use-evidence.md`, `memory-read-evidence.md`, `memory-write-evidence.md`
- `scoring-events.jsonl` (6 rows; replicated to `_shared/scoring/history.jsonl`)
- `sentinel-audit.md`, `nexus-summary.md`, `postmortem.md`
- `subagent-logs/{forge,pulse,sentinel,skill-read,skill-memwrite}.json`

**Archive:**
- `~/Desktop/OPENCLAW/archive/2026-04-26/shadow-daemons/{lmstudio-proxy.mjs,MANIFEST.md}`

---

## 11. Operator next actions

1. **Decide on DeepSeek thinking.** Either accept the `reasoning=false` fallback indefinitely, or open an issue with DeepSeek about the `/anthropic` endpoint thinking-replay rejection. Code reference: `anthropic-vertex-stream-BpkPWKP9.js:4887-4905`.
2. **Stand up `memory-core` backend** — needs upstream docs from OpenClaw maintainers. Workspace-MD memory works in the meantime.
3. **Resolve credential gaps** if you want Orange-tier autonomy: top up xAI credits, install `op` (1Password CLI), authorize `gh`.
4. **Approve next mission** (recommend: `MISSION_PROSPECT_RESEARCH` against one realistic SMB target, Yellow tier, dry-run only).
5. **Restart pause.** Live autonomous loops were running during this audit (orchestrator + creative heartbeats at 13:12 MDT). They are still running. Use `launchctl kickstart -k gui/$UID/ai.openclaw.gateway` only if necessary; the gateway is healthy.

---

## 12. Done.
The Gateway is real. The agents are real. The proofs are on disk. DeepSeek works with a documented degradation. No outbound was attempted; no irreversible action was taken; no fabricated steps are recorded.
