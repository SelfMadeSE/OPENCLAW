# OPENCLAW — FULL SYSTEM INTROSPECTION
## Verified State — 2026-04-18T12:27 MDT
## ZERO ASSUMPTIONS — ALL RUNTIME-VERIFIED

---

# SECTION 1 — AGENT SYSTEM TRUTH

## Open WebUI Agents (6)

| Name | Model (actual) | Tools Available | Memory Access | Can Call Other Agents? | Can Execute Code? | Can Access Filesystem? |
|------|---------------|-----------------|---------------|----------------------|-------------------|----------------------|
| 🦅 Orchestrator | `qwen/qwen3.5-9b` | **NONE** — tool_ids=[], function_ids=[], capabilities={} | **NONE** — no knowledge, no memory system attached | **NO** — no mechanism exists | **NO** — code_execution=false in capabilities | **NO** |
| 💻 Coder | `qwen/qwen3.5-9b` | **NONE** — tool_ids=[], function_ids=[], capabilities={} | **NONE** | **NO** | **NO** — code_execution=false | **NO** |
| 📢 Marketer | `qwen/qwen3.5-9b` | **NONE** — tool_ids=[], function_ids=[], capabilities={} | **NONE** | **NO** | **NO** — code_execution=false | **NO** |
| 🤝 Outreach | `qwen/qwen3.5-9b` | **NONE** — tool_ids=[], function_ids=[], capabilities={} | **NONE** | **NO** | **NO** — code_execution=false | **NO** |
| 🎨 Creative | `qwen/qwen3.5-9b` | **NONE** — tool_ids=[], function_ids=[], capabilities={} | **NONE** | **NO** | **NO** — code_execution=false | **NO** |
| 📺 Media | `qwen/qwen3.5-9b` | **NONE** — tool_ids=[], function_ids=[], capabilities={} | **NONE** | **NO** | **NO** — code_execution=false | **NO** |

**CRITICAL FINDING**: All 6 Open WebUI agents have:
- `capabilities: {}` — web_search=false, code_execution=false, vision=false
- `tool_ids: []` — zero tools attached
- `function_ids: []` — zero functions attached
- `knowledge: []` — zero knowledge bases attached

**Their system prompts reference `search_web()`, `search_memories()`, `add_memory()`, `execute_code()`, `generate_image()` — NONE of these are actually wired. The prompts are fiction.**

## OpenClaw Gateway Agents (5)

| Name | Model (actual) | Skills | Memory Access | Can Call Other Agents? | Can Execute Code? | Can Access Filesystem? |
|------|---------------|--------|---------------|----------------------|-------------------|----------------------|
| (main/default) | `lmstudio/qwen/qwen3.5-9b` (fallback: `google/gemma-4-e4b`) | Default (coding-agent from acpx) | memory-core plugin (SQLite, **0 data**) | **NO** | **YES** — via acpx/coding-agent, with exec-approval | **YES** — workspace at `~/.openclaw/workspace/` |
| Engineering | `lmstudio/qwen/qwen3.5-9b` | coding-agent, github, taskflow | memory-core plugin (shared) | **NO** | **YES** — coding-agent | **YES** — `~/.openclaw/workspaces/engineering/` |
| Release | `lmstudio/qwen/qwen3.5-9b` | github, healthcheck, taskflow, coding-agent | memory-core plugin (shared) | **NO** | **YES** — coding-agent | **YES** — `~/.openclaw/workspaces/release/` |
| Networking | `lmstudio/qwen/qwen3.5-9b` | xurl, apple-notes, github, taskflow | memory-core plugin (shared) | **NO** | **NO** — no coding-agent skill | **NO** |
| Marketing | `lmstudio/qwen/qwen3.5-9b` | xurl, video-frames, apple-notes, taskflow | memory-core plugin (shared) | **NO** | **NO** — no coding-agent skill | **NO** |

**Gateway errors found in logs**:
- `No API key found for provider "openai"` — main agent tried openai/gpt-5.4 and FAILED (no auth configured)
- `tailscale serve failed` — Tailscale integration broken
- `remote bin probe timed out` — remote skill execution non-functional
- `token_mismatch` — native macOS OpenClaw app rejected by gateway
- `Unrecognized key: "reasoningDefault"` — config validation error

**Gateway REAL capabilities** (6 plugins confirmed loaded at startup):
- `acpx` — Agent Client Protocol eXtension, coding agent runtime (workspace: `~/.openclaw/workspace/`)
- `browser` — Browser control listening on `http://127.0.0.1:18791/` (auth=token)
- `device-pair` — Device pairing via Bonjour
- `memory-core` — SQLite memory with dreaming (empty, 0 chunks)
- `phone-control` — Phone control capability
- `talk-voice` — Voice interaction

---

# SECTION 2 — MEMORY SYSTEM (REAL STATE)

## Qdrant Collections (all 768-dim Cosine, all green)

| Collection | Points | Written By | Read By |
|-----------|--------|------------|---------|
| `shared` | **200** | `notes-import-v2.py` (one-time script) | **NOTHING** — no agent has knowledge[] wired to it |
| `memory` | **0** | mem0 pipeline (NEVER triggered) | mem0 pipeline (nothing to read) |
| `beats` | **0** | Nothing | Nothing |
| `web-clients` | **0** | Nothing | Nothing |
| `outreach` | **0** | Nothing | Nothing |
| `spector` | **0** | Nothing | Nothing |
| `3d-animation` | **0** | Nothing | Nothing |

## mem0 Pipeline Status

- **Loaded**: YES (confirmed in pipeline container logs: `Loaded module: mem0_memory_filter`)
- **Is it writing**: **NO** — 0 points in `memory` collection
- **Last successful write**: **NEVER**
- **Trigger condition**: Stores after every 5th user message via inlet() method
- **Has inlet() EVER been called**: **NO** — 0 inlet calls in entire container log history
- **Root cause**: The pipeline is loaded but no chat traffic is routed through it. Open WebUI agents have `function_ids: []` — the mem0 pipeline is not assigned to any agent. It exists as a loaded module but is never invoked.

## Gateway Memory

| Table | Row Count |
|-------|-----------|
| `chunks` | **0** |
| `files` | **0** |
| `meta` | **0** |
| `embedding_cache` | **0** |
| `chunks_fts` (full-text search) | **0** (implied) |

**Gateway memory-core plugin** is enabled with dreaming=true. The cron job "Memory Dreaming Promotion" runs daily at 3AM. But there is nothing to dream about — the memory store has never been written to.

**Gateway task_runs**: **0 rows**. No tasks have ever been executed.

## Open WebUI Built-in Memory

- **API endpoint `/api/v1/memories`**: Returns HTTP 200 but content is the SPA HTML page (not JSON). This means:
  - Either the endpoint requires a different auth pattern
  - Or the memories feature returns empty
- **Verified via agent config**: All agents have `knowledge: []` — no knowledge bases are connected
- **WebUI built-in `add_memory()` tool**: **UNKNOWN** — cannot confirm via API. The tool endpoints return HTML, suggesting they may be web-UI-only features not exposed via REST.

## IS ANY AGENT SUCCESSFULLY PERSISTING MEMORY RIGHT NOW?

# **NO.**

**Exact failure points**:
1. **mem0 pipeline**: Loaded but never invoked (function_ids=[] on all agents)
2. **Qdrant `memory` collection**: 0 points — nothing has ever been written
3. **Qdrant `shared` collection**: 200 Apple Notes exist but NO agent is configured to read them
4. **Gateway memory SQLite**: 0 chunks, 0 files — never written to
5. **Gateway task_runs**: 0 rows — no tasks ever executed

---

# SECTION 3 — INTER-AGENT COMMUNICATION

### Can any agent invoke another agent programmatically?
## **NO.**

### Is there ANY message bus, queue, or routing layer?
## **NO.**

- Open WebUI: Agents are independent model configs. No API for agent-to-agent invocation exists.
- Gateway: Agents are separate session contexts. No cross-agent messaging protocol exists.
- n8n: Could theoretically connect agents via webhooks, but n8n has **0 workflows imported** (verified via API).

### Is "Orchestrator" actually orchestrating anything beyond prompting?
## **NO.**

The Orchestrator agent:
- Has `capabilities: {}` (no web search, no code execution, no vision)
- Has `tool_ids: []` (no tools)
- Has `function_ids: []` (no functions)
- Has a system prompt that says "You delegate tasks to specialist agents" — **this is text-only fiction**
- Has no mechanism to invoke Coder, Marketer, Outreach, Creative, or Media
- Is indistinguishable from a basic chatbot with a system prompt

### Confirmed: ALL delegation is simulated only via prompt text.

---

# SECTION 4 — AUTOMATION / EXECUTION

## n8n

### Are workflows executable?
## **NO.**

**n8n API returns WORKFLOW_COUNT=0**. The 3 workflow JSON files exist on disk but have **NEVER been successfully imported into n8n**.

The logs show import/activation failures:

| Workflow File | Broken Nodes | Required Replacement |
|--------------|-------------|---------------------|
| `n8n-beat-promotion-workflow.json` | `n8n-nodes-base.executeCommand` (Find Latest Beat), `n8n-nodes-base.writeFile` (Save Promo Content) | `Execute Command` → use `n8n-nodes-base.executeWorkflowTrigger` or `Code` node; `Write File` → use `n8n-nodes-base.writeBinaryFile` or `Code` node |
| `n8n-youtube-metadata-workflow.json` | `n8n-nodes-base.writeFile` (Save Metadata) | Same — replace `writeFile` with `Code` or `Write Binary File` node |
| `n8n-outreach-workflow.json` | `n8n-nodes-base.writeFile` (Save Proposal) + Missing `Respond to Webhook` node | Same + add Respond to Webhook node after the Save node |

## Gateway — Real Actions

| Action | Capable? | Method | Requires Approval? |
|--------|----------|--------|-------------------|
| Filesystem write | **YES** | acpx/coding-agent in workspace dirs | YES — exec-approval system (security=allowlist, ask=on-miss) |
| Filesystem read | **YES** | acpx/coding-agent | YES — same approval |
| Browser control | **YES** | browser plugin on port 18791 | NO — direct plugin access |
| API calls (HTTP) | **YES** | xurl skill (Networking, Marketing agents) | UNKNOWN — not in exec-approval scope |
| Code execution | **YES** | acpx/coding-agent (main, engineering, release agents) | YES — exec-approval |
| Shell commands | **YES** | acpx/coding-agent | YES — exec-approval (allowlist with ask-on-miss) |

**Exec-approval config**:
```json
{
  "security": "allowlist",
  "ask": "on-miss",
  "agents": {}  // no per-agent overrides — global policy
}
```
- `allowlist` = only pre-approved commands run automatically
- `ask: on-miss` = if command not on allowlist, ASK the user via socket
- Allowlist count: **0 commands** (empty allowlist — ALL commands require approval)

## WebUI — Sandboxed Actions

| Action | Available? | Method |
|--------|-----------|--------|
| Code execution | **NO** — `code_execution: false` on all agents | Would be Pyodide sandbox if enabled |
| Web search | **NO** — `web_search: false` on all agents | Would use SearXNG if enabled |
| File access | **NO** | Not possible from WebUI agents |
| Memory write | **NO** | mem0 pipeline loaded but never invoked |
| Image generation | **NO** | No tools, no ComfyUI integration |

**All 6 WebUI agents are currently equivalent to plain chat with a system prompt. They cannot perform ANY actions.**

---

# SECTION 5 — MODEL LAYER

## All Loaded Models (LM Studio, verified via API)

| Model ID | Type | Loaded | Used By |
|----------|------|--------|---------|
| `qwen3.5-27b-claude-4.6-opus-reasoning-distilled` | Chat/Reasoning | ✅ YES | **NOTHING** — no agent uses it. Available in WebUI model list but not assigned to any agent. |
| `qwen/qwen3.5-9b` | Chat | ✅ YES | ALL 6 WebUI agents, ALL 5 Gateway agents (primary) |
| `google/gemma-4-e4b` | Multimodal/Vision | ✅ YES | Gateway fallback only. Vision=false on all WebUI agents. |
| `text-embedding-nomic-embed-text-v1.5` | Embedding | ✅ YES | notes-import-v2.py script, mem0 pipeline config. **Neither currently active.** |

### Is there ANY routing logic?
## **NO.**

- All 11 agents (6 WebUI + 5 Gateway) use `qwen/qwen3.5-9b`
- The 27b model is loaded in LM Studio consuming RAM but UNUSED
- Gateway has a `fallbacks` config: falls back to `google/gemma-4-e4b` if primary fails
- No cost/performance routing. No task-based routing. No model selection logic.

---

# SECTION 6 — FILESYSTEM + OUTPUT FLOW

## Directories Actively Written To

| Directory | Files Found | By What |
|-----------|-------------|---------|
| `/Users/ryleebenson/Desktop/OPENCLAW/outputs/beats/` | **0 files** | Nothing |
| `/Users/ryleebenson/Desktop/OPENCLAW/outputs/videos/` | **0 files** | Nothing |
| `/Users/ryleebenson/Desktop/OPENCLAW/outputs/designs/` | **0 files** | Nothing |
| `/Users/ryleebenson/Desktop/OPENCLAW/outputs/content/` | **0 files** | Nothing |
| `/Users/ryleebenson/Desktop/OPENCLAW/outputs/proposals/` | **0 files** | Nothing |
| `/Users/ryleebenson/Desktop/OPENCLAW/memory/per-agent/` | **0 files** | Nothing |
| `/Users/ryleebenson/Desktop/OPENCLAW/memory/shared/` | **0 files** | Nothing |
| `~/.openclaw/workspace/` | **6 files** | Gateway bootstrap (IDENTITY.md, HEARTBEAT.md, BOOTSTRAP.md, USER.md, SOUL.md, AGENTS.md) — ALL are unfilled templates |
| `~/.openclaw/workspaces/networking/` | **6 files** | Same template files, unfilled |
| `~/.openclaw/logs/` | **8 files** | Gateway logging (gateway.log, gateway.err.log, config-audit.jsonl, etc.) |
| `/tmp/openclaw/` | **1 file** | Gateway daily log |

### Does ANY pipeline currently produce real outputs?
## **NO.**

- n8n: 0 workflows imported, 0 executions
- mem0: 0 inlet calls, 0 memories stored
- Gateway: 0 task runs, 0 memory chunks
- Agents: All outputs are chat-only, no file writes, no API calls

---

# SECTION 7 — CRITICAL FAILURES

## TOP 10 BLOCKERS

### Preventing Agent Autonomy

| # | Blocker | Impact | Fix Complexity |
|---|---------|--------|----------------|
| 1 | **All 6 WebUI agents have ZERO capabilities enabled** — capabilities={}, tool_ids=[], function_ids=[], knowledge=[] | Agents are plain chatbots. Cannot search web, execute code, access memory, or use any tools. | LOW — re-run setup-webui.py with correct capability flags, or enable manually in WebUI admin |
| 2 | **mem0 pipeline loaded but never invoked** — not assigned to any agent via function_ids | No agent can persist or recall memory | LOW — assign mem0 pipeline to agents via WebUI admin or API |
| 3 | **200 Apple Notes in Qdrant but no agent can access them** — knowledge=[] on all agents | RAG/knowledge base is disconnected | LOW — create knowledge base in WebUI pointing to Qdrant `shared` collection |
| 4 | **27b reasoning model loaded but unused** — all agents on 9b | Orchestrator/Creative lack the stronger model they need | LOW — update agent model assignments |

### Preventing Monetization Workflows

| # | Blocker | Impact | Fix Complexity |
|---|---------|--------|----------------|
| 5 | **n8n has 0 workflows imported** — JSON files on disk were never loaded, contain deprecated node types | Beat promotion, YouTube metadata, freelance outreach pipelines DON'T EXIST in n8n | MEDIUM — rewrite 3 workflows for current n8n node types, then import |
| 6 | **No API keys for external services** — YouTube, Fiverr, Upwork, Anthropic, SMTP all show placeholder values in .env | Cannot automate any external platform | LOW-MEDIUM — obtain and configure API keys |
| 7 | **ComfyUI has no model checkpoint** — installed but cannot generate images | Image/visual content pipeline is dead | LOW — download an SD model to checkpoints/ |

### Preventing Multi-Agent Coordination

| # | Blocker | Impact | Fix Complexity |
|---|---------|--------|----------------|
| 8 | **No inter-agent communication mechanism** — agents are isolated chat instances | Orchestrator cannot delegate, agents cannot collaborate | HIGH — requires building routing/messaging layer |
| 9 | **No task queue or workflow orchestration** — n8n broken, no alternative exists | No way to chain agent actions or trigger automated sequences | HIGH — requires either fixing n8n or building custom orchestration |
| 10 | **Gateway model fallback fails** — tried openai/gpt-5.4, failed (no API key), no further fallback to LM Studio | Gateway `main` agent may fail on certain tasks entirely | MEDIUM — configure auth-profiles.json or change default model to lmstudio/ |

---

# SECTION 8 — UNKNOWN VARIABLES

| # | Unknown | Why It Can't Be Verified | How To Verify |
|---|---------|------------------------|---------------|
| 1 | Whether Open WebUI's built-in `add_memory()` works | API returns HTML, not JSON, for tool/memory endpoints | Test manually in WebUI chat: enable memory feature, say "remember X", check if it persists |
| 2 | Whether LM Studio auto-starts on reboot | No evidence of LaunchAgent or Login Item | Reboot Mac and check, or inspect System Settings > General > Login Items |
| 3 | Whether the gateway's phone-control plugin is functional | No test performed, no logs about it | Send a test command via gateway chat |
| 4 | Whether the browser plugin at :18791 can actually control a browser | Listening confirmed, functionality not tested | Open http://127.0.0.1:18791/ with the auth token |
| 5 | What the gateway `canvas` feature does | Serves HTML at `/__openclaw__/canvas/` — purpose unknown | Open http://localhost:18789/__openclaw__/canvas/ in browser |
| 6 | Whether native macOS OpenClaw app is installed | `token_mismatch` errors in gateway logs suggest a native app tried to connect but was rejected | Check /Applications/ for OpenClaw.app or check App Store |
| 7 | Whether the `gmail-watcher` feature works | Log shows "gmail watcher stopped" at shutdown. No startup entry. | Check gateway config for gmail settings |
| 8 | Whether gateway voice (talk-voice) plugin is functional | Plugin loaded, not tested | Test via gateway web UI |
| 9 | What's in the Postgres `openclaw` database | Only confirmed n8n and postgres databases have tables | `docker exec openclaw-postgres psql -U openclaw -d openclaw -c "\dt"` |
| 10 | Whether the Docker-internal network allows containers to reach each other | Compose defines `openclaw` bridge network, but inter-container communication not tested | `docker exec openclaw-n8n curl http://openclaw-webui:8080/` |
| 11 | Full contents of Open WebUI's named volume (chat history, settings) | Data in Docker volume, not bind-mounted | `docker exec openclaw-webui ls /app/backend/data/` |
| 12 | Whether gateway `hooks` (4 internal hook handlers loaded) do anything useful | Mentioned in startup log, no detail | Check gateway source or documentation |
