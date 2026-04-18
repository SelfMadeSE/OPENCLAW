# OPENCLAW — Full Systems Audit Report
Generated: 2026-04-18T12:08 MDT

---

# SECTION 1 — EXECUTIVE STATE SNAPSHOT

## 1. Project Root Paths

| Path | Role |
|------|------|
| `/Users/ryleebenson/Desktop/OPENCLAW/` | **CANONICAL** — Main project root. Docker stack, agents, scripts, docs, workflows |
| `/Users/ryleebenson/openclaw-lm-stack/` | **STALE** — Older/alternative compose. Contains a 2-service compose (webui + searxng only). Container names `local-*` don't match running `openclaw-*` containers. NOT actively used. |
| `/Users/ryleebenson/.openclaw/` | **OPENCLAW GATEWAY** — Config/state for the `openclaw` npm gateway service (v2026.4.15). Agents, memory, sessions, tasks, cron, plugins. |
| `/opt/homebrew/lib/node_modules/openclaw/` | Gateway package installation |
| `/Users/ryleebenson/Desktop/OPENCLAW/tools/comfyui/ComfyUI/` | ComfyUI git clone (partially installed) |
| `/Users/ryleebenson/Desktop/Instrumentals/` | Referenced by beat promotion workflow — **NEEDS VERIFICATION** whether it exists/has content |

## 2. High-Level Purpose

**What OPENCLAW currently is**: A local-first AI agent ecosystem running on Apple M4 / macOS. It combines:
- A Docker-based stack (Open WebUI + 6 support services) for chat-based agent interaction
- An `openclaw` npm gateway (v2026.4.15) running as a macOS LaunchAgent providing multi-channel AI access with plugins, browser control, phone control, voice, and a coding agent runtime
- LM Studio running natively for local LLM inference
- 6 specialized agents in Open WebUI (Orchestrator, Coder, Marketer, Outreach, Creative, Media)
- 4+ agents in the openclaw gateway (main, engineering, release, networking, marketing)
- n8n for workflow automation
- Qdrant for vector memory
- SearXNG for private web search

**Current working capabilities** (verified):
- Chat with agents via Open WebUI at localhost:3000
- Chat via openclaw gateway web UI at localhost:18789
- Private web search via SearXNG
- Code execution in Open WebUI (Pyodide sandbox)
- 200 Apple Notes imported into Qdrant `shared` collection
- All 7 Docker services running and healthy
- Gateway running with browser control, memory-core, phone-control, talk-voice, acpx plugins

**Intended end-state** (based on docs, prompts, workflows):
An autonomous "AI society" that can run creative/business tasks: music production automation, YouTube channel management, freelance outreach (Fiverr/Upwork), image generation, client proposal writing, content scheduling, and macOS app automation — all orchestrated by agents working together with persistent memory.

## 3. Current Stack Status

### Open WebUI
- **Installed**: Yes, Docker container `openclaw-webui`
- **Running**: Yes, healthy
- **Started via**: `docker compose` from `/Users/ryleebenson/Desktop/OPENCLAW/docker/`
- **Port**: http://localhost:3000 (maps 3000→8080)
- **Role**: Primary chat interface + agent configuration
- **Depends on**: LM Studio (model inference), SearXNG (web search), Pipelines (middleware)
- **Issues**: `ENABLE_PERSISTENT_CONFIG=False` — settings reset on container recreation. All 6 agents configured and working with system prompts. **NOTE**: All agents use `qwen/qwen3.5-9b` as base model (even Orchestrator and Creative which should use 27b per docs).

### Pipelines Service
- **Installed**: Yes, Docker container `openclaw-pipelines`
- **Running**: Yes
- **Port**: http://localhost:9099
- **Role**: WebUI middleware — custom filters and tools
- **Currently loaded pipelines**:
  - `function_calling_filter` — Stock function calling (weather, calculator, time). Loaded OK.
  - `function_calling_filter_custom` — Symlink to custom/function_calling_filter.py. Loaded OK.
  - `mem0_memory_filter` — **NOW LOADED** (was failing earlier, now connected to Qdrant). Uses `memory` collection.
- **Issues**: Initial startup showed `FieldValidatorDecoratorInfo` error for mem0 (pydantic version mismatch). After valve update/reload, it loaded successfully. Fragile — may break on restart. `PIPELINES_REQUIREMENTS_PATH` env var doesn't point to the requirements.txt correctly (logs say "not specified").

### mem0 Memory Pipeline
- **Installed**: Yes, at `/Users/ryleebenson/Desktop/OPENCLAW/data/pipelines/mem0_memory_filter.py`
- **Running**: Loaded in pipelines container (latest logs confirm)
- **Config**: Uses Qdrant collection `memory`, LM Studio qwen3.5-9b for LLM, nomic-embed for embeddings
- **Issues**: The `memory` Qdrant collection has **0 points** — mem0 has NOT yet successfully written any memories. Store cycle = 5 messages (stores after every 5th user message). Either it hasn't received 5 messages yet, or writing is silently failing. **API key is hardcoded** in the Python file.

### function_calling_filter
- **Installed**: Yes, stock example from Open WebUI pipelines
- **Status**: Loaded. Contains weather (requires OpenWeatherMap key — NOT set), calculator (`eval()` — SECURITY RISK), and time tools.
- **Issues**: Weather tool non-functional without API key. Calculator uses `eval()`.

### function_calling_filter_custom
- **Status**: Symlink to the same file. Essentially a duplicate.

### n8n
- **Installed**: Yes, Docker container `openclaw-n8n`
- **Running**: Yes
- **Port**: http://localhost:5678
- **Role**: Workflow automation — beat promotion, YouTube metadata, freelance outreach
- **Depends on**: Postgres (database backend)
- **Issues**: **CRITICAL** — n8n logs show `Unrecognized node type: n8n-nodes-base.executeCommand` and `n8n-nodes-base.writeFile`. These node types have been removed/renamed in recent n8n versions. All 3 workflows use these nodes. `Workflow activation failed validation` and `No Respond to Webhook node found in the workflow`. Workflows are imported but **BROKEN** and cannot execute.

### Qdrant
- **Installed**: Yes, Docker container `openclaw-qdrant`
- **Running**: Yes, healthy (green status)
- **Port**: http://localhost:6333 (HTTP), 6334 (gRPC)
- **Role**: Vector database for memory + RAG
- **Collections** (7 total):

| Collection | Points | Status | Description |
|-----------|--------|--------|-------------|
| `shared` | 200 | green | Apple Notes — the ONLY collection with data |
| `memory` | 0 | green | Agent persistent memory (mem0 target) — EMPTY |
| `beats` | 0 | green | Beat metadata — EMPTY |
| `web-clients` | 0 | green | Web design client data — EMPTY |
| `outreach` | 0 | green | Proposal history — EMPTY |
| `spector` | 0 | green | SPECTOR music project — EMPTY |
| `3d-animation` | 0 | green | 3D animation projects — EMPTY |

All collections use 768-dimension Cosine vectors (matching nomic-embed-text output).

### LM Studio
- **Installed**: Yes, native macOS app
- **Running**: Yes (confirmed via process list and API)
- **Port**: http://localhost:1234
- **Auth**: Required (`Bearer` token: `sk-lm-lTx6H171:rNxT8R8M7ptHEyiQUU47`)
- **Models loaded** (4):

| Model ID | Role per docs |
|----------|--------------|
| `qwen3.5-27b-claude-4.6-opus-reasoning-distilled` | Orchestrator / complex planning |
| `qwen/qwen3.5-9b` | Workhorse / everyday tasks |
| `google/gemma-4-e4b` | Vision / multimodal |
| `text-embedding-nomic-embed-text-v1.5` | Embeddings for RAG |

### SearXNG
- **Installed**: Yes, Docker container `openclaw-searxng`
- **Running**: Yes, **FUNCTIONAL** (verified: returns 21 results for test query)
- **Port**: http://localhost:8080
- **Config**: Google, DuckDuckGo, Brave, GitHub, StackOverflow, YouTube, Wikipedia, arXiv, npm, PyPI, DockerHub engines enabled
- **Issues**: None detected

### Flowise
- **Installed**: Yes, Docker container `openclaw-flowise`
- **Running**: Yes, web UI accessible
- **Port**: http://localhost:3001
- **Role**: Visual LLM agent builder (Zapier-like)
- **Issues**: Appears to be **just installed, not configured**. No evidence of any flows created. Data volume is empty from host perspective. Login uses same admin credentials.

### Postgres
- **Installed**: Yes, Docker container `openclaw-postgres`
- **Running**: Yes, healthy
- **Port**: http://localhost:5432
- **Databases**: `openclaw` (default), `n8n` (n8n backend), `postgres`, `template0`, `template1`
- **Note**: `flowise` database was in the init SQL but does NOT exist in the running DB — init script at `data/postgres-init/01-create-dbs.sql` was not mounted to the container. Flowise uses its own internal storage.

### ComfyUI
- **Installed**: PARTIALLY — Git repo cloned to `/Users/ryleebenson/Desktop/OPENCLAW/tools/comfyui/ComfyUI/`
- **Running**: NO
- **Issues**: Python venv exists (`bin/` directory present) but `checkpoints/` directory has only a placeholder file `put_checkpoints_here`. **No Stable Diffusion model downloaded**. Cannot generate images without a model. Start script exists at `scripts/start-comfyui.sh`.

### Tailscale
- **Installed**: Yes, system extension running
- **Running**: Yes
- **Status**: Connected as `rylees-macbook-air` at `100.72.237.32`, user `SelfMadeSE@`
- **Role**: Secure networking. Gateway config has `allowTailscale: true` but `tailscale.mode: "off"`.

### Docker / Docker Compose
- **Installed**: Yes, Docker Desktop running
- **Compose file**: `/Users/ryleebenson/Desktop/OPENCLAW/docker/docker-compose.yml` (CANONICAL)
- **Start command**: `cd ~/Desktop/OPENCLAW/docker && docker compose --env-file ../.env up -d`
- **Network**: Custom bridge network `openclaw`
- **Issues**: Also running Kubernetes (kind) — `desktop-control-plane`, `kind-registry-mirror`, `kind-cloud-provider`. These are unrelated to OPENCLAW.

### OpenClaw Gateway (npm package)
- **Installed**: Yes, globally via npm at `/opt/homebrew/lib/node_modules/openclaw/` v2026.4.15
- **Running**: Yes, as LaunchAgent `ai.openclaw.gateway`
- **Port**: http://localhost:18789 (web UI), http://127.0.0.1:18791 (browser control)
- **Role**: Multi-channel AI gateway with coding agent, browser control, phone control, voice, memory, device pairing, task scheduling
- **Plugins loaded**: acpx, browser, device-pair, memory-core, phone-control, talk-voice
- **Skills**: coding-agent, github, healthcheck, taskflow, apple-notes, xurl, video-frames
- **Agents configured**: main, engineering, release, networking, marketing
- **Memory**: SQLite-based at `~/.openclaw/memory/main.sqlite` (schema exists, **0 chunks stored**)
- **Cron**: 1 job — "Memory Dreaming Promotion" runs daily at 3 AM
- **Issues**: `remote bin probe timed out` warning in logs (device pairing issue). Memory DB is empty.

### Browser Automation
- **Nanobrowser**: Referenced in docs, playbook written (`agents/outreach/nanobrowser-playbook.md`), **NOT installed** — Chrome extension. Manual process.
- **OpenClaw Browser Plugin**: Gateway has browser control on port 18791. Active.

### macOS Native Integrations
- **Agent! app**: Referenced in docs/guides. **NOT installed** — no process running, no evidence of installation.
- **AppleScript (Apple Notes)**: Used via `osascript` in notes import scripts. **Requires Terminal Full Disk Access**.
- **LaunchAgent**: `ai.openclaw.gateway` — auto-starts gateway on boot. Persistent.

---

# SECTION 2 — RUNNING SERVICES / CONTAINERS / PROCESSES

## 4. All Running Services

| Container | Image | Status | Restart | Port(s) | Volume Type | Purpose | Health |
|-----------|-------|--------|---------|---------|-------------|---------|--------|
| `openclaw-webui` | `ghcr.io/open-webui/open-webui:main` | Up (healthy) | unless-stopped | 3000→8080 | Named: `docker_open-webui-data` | Chat + Agents | ✅ Healthy |
| `openclaw-pipelines` | `ghcr.io/open-webui/pipelines:main` | Up | unless-stopped | 9099→9099 | Named: `docker_pipelines-data` + Bind: `OPENCLAW/data/pipelines→/app/pipelines/custom` | Middleware | ⚠️ (mem0 fragile) |
| `openclaw-n8n` | `docker.n8n.io/n8nio/n8n:latest` | Up | unless-stopped | 5678→5678 | Named: `docker_n8n-data` + Bind: `outputs→/outputs`, `projects→/projects` | Workflows | ❌ Workflows broken |
| `openclaw-postgres` | `postgres:16-alpine` | Up (healthy) | unless-stopped | 5432→5432 | Named: `docker_postgres-data` | Database | ✅ Healthy |
| `openclaw-qdrant` | `qdrant/qdrant:latest` | Up | unless-stopped | 6333→6333, 6334→6334 | Named: `docker_qdrant-data` | Vector DB | ✅ Green |
| `openclaw-flowise` | `flowiseai/flowise:latest` | Up | unless-stopped | 3001→3000 | Named: `docker_flowise-data` | Visual Agent Builder | ⚠️ Unconfigured |
| `openclaw-searxng` | `searxng/searxng:latest` | Up | unless-stopped | 8080→8080 | Named: `docker_searxng-cache` + Bind: `settings.yml` | Private Search | ✅ Working |

**Non-Docker services**:

| Service | Type | Port | Status | Auto-start |
|---------|------|------|--------|------------|
| LM Studio | Native macOS app | 1234 | Running | Manual |
| OpenClaw Gateway | Node.js LaunchAgent | 18789, 18791 | Running | Yes (LaunchAgent) |
| Tailscale | System Extension | N/A | Connected | Yes (system) |

## 5. Docker / Compose Architecture

**Canonical compose file**: `/Users/ryleebenson/Desktop/OPENCLAW/docker/docker-compose.yml`  
**Env file**: `/Users/ryleebenson/Desktop/OPENCLAW/.env`  
**Working directory**: `/Users/ryleebenson/Desktop/OPENCLAW/docker/`  
**Stale compose**: `/Users/ryleebenson/openclaw-lm-stack/docker-compose.yml` (NOT used)

### Volume Mappings

| Volume | Type | Container | Mount Point |
|--------|------|-----------|-------------|
| `docker_open-webui-data` | Named | webui | `/app/backend/data` |
| `docker_pipelines-data` | Named | pipelines | `/app/pipelines` |
| `OPENCLAW/data/pipelines` | Bind | pipelines | `/app/pipelines/custom` |
| `docker_n8n-data` | Named | n8n | `/home/node/.n8n` |
| `OPENCLAW/outputs` | Bind | n8n | `/outputs` |
| `OPENCLAW/projects` | Bind | n8n | `/projects` |
| `docker_postgres-data` | Named | postgres | `/var/lib/postgresql/data` |
| `docker_qdrant-data` | Named | qdrant | `/qdrant/storage` |
| `docker_flowise-data` | Named | flowise | `/root/.flowise` |
| `docker_searxng-cache` | Named | searxng | `/var/cache/searxng` |
| `OPENCLAW/data/searxng/settings.yml` | Bind (ro) | searxng | `/etc/searxng/settings.yml` |

**Fragility notes**:
- Named volumes persist across `docker compose down` / `up` but NOT across `docker volume rm` or `docker system prune --volumes`
- Bind mounts are safe (backed by host filesystem)
- Open WebUI's data (chats, configs, agent definitions) is in a **named volume only** — not backed up to host. Losing this volume loses all agent configurations.
- `data/postgres-init/01-create-dbs.sql` exists but is NOT mounted in compose — init script never runs. n8n database was created some other way.

## 6. Startup / Shutdown Procedures

**Start everything**:
```bash
cd ~/Desktop/OPENCLAW && bash scripts/start.sh
```
This script:
1. Checks LM Studio is running (with auth)
2. Runs `docker compose --env-file ../.env up -d` from `docker/`
3. Waits 8 seconds
4. Prints service URLs

**Stop everything**:
```bash
bash scripts/stop.sh
```
Runs `docker compose down`.

**Manual sequencing required**:
- LM Studio must be started FIRST (manually, open the app)
- OpenClaw Gateway auto-starts via LaunchAgent
- Docker services auto-start via `unless-stopped` restart policy after Docker Desktop starts
- ComfyUI requires manual start: `bash scripts/start-comfyui.sh`

**Persistent across reboot**:
- Docker containers: Yes (if Docker Desktop auto-starts, which it does)
- OpenClaw Gateway: Yes (LaunchAgent with KeepAlive)
- LM Studio: UNKNOWN — needs manual verification if it auto-starts
- Tailscale: Yes (system extension)

---

# SECTION 3 — REPOSITORY / FILESYSTEM INVENTORY

## 7. Full Project File Organization

```
/Users/ryleebenson/Desktop/OPENCLAW/           ← CANONICAL ROOT
├── README.md                                    ← Main docs (7.2KB)
├── CHEATSHEET.md                                ← Quick reference (2.8KB)
├── .env                                         ← Secrets (API keys, passwords)
│
├── docker/
│   └── docker-compose.yml                       ← Full stack definition (7 services)
│
├── scripts/
│   ├── start.sh                                 ← Start Docker stack
│   ├── stop.sh                                  ← Stop Docker stack
│   ├── status.sh                                ← Check status
│   ├── setup-all.sh                             ← Master setup (agents + notes + n8n)
│   ├── setup-webui.py                           ← Auto-configure Open WebUI agents (Python)
│   ├── setup-n8n.sh                             ← n8n setup instructions (prints manual steps)
│   ├── import-notes.py                          ← Apple Notes → Qdrant (v1, single-note)
│   ├── notes-import-v2.py                       ← Apple Notes → Qdrant (v2, batch, USED)
│   ├── read-notes.sh                            ← Raw Apple Notes dump (AppleScript)
│   ├── install-comfyui.sh                       ← ComfyUI installation script
│   └── start-comfyui.sh                         ← Start ComfyUI
│
├── agents/
│   ├── orchestrator/system-prompt.md            ← 1.4KB
│   ├── coder/system-prompt.md                   ← 894B
│   ├── marketer/system-prompt.md                ← 1.1KB
│   ├── outreach/
│   │   ├── system-prompt.md                     ← 1.3KB
│   │   └── nanobrowser-playbook.md              ← 1.3KB
│   ├── creative/system-prompt.md                ← 1.1KB
│   └── media/system-prompt.md                   ← 1.1KB
│
├── data/
│   ├── open-webui/                              ← EMPTY (data in Docker named volume)
│   ├── searxng/
│   │   ├── settings.yml                         ← SearXNG config (1.1KB)
│   │   └── cache/                               ← Empty
│   ├── n8n/                                     ← EMPTY (data in Docker named volume)
│   ├── qdrant/                                  ← EMPTY (data in Docker named volume)
│   ├── flowise/                                 ← EMPTY (data in Docker named volume)
│   ├── pipelines/
│   │   ├── function_calling_filter.py           ← Stock function calling tools
│   │   ├── mem0_memory_filter.py                ← mem0 + Qdrant + LM Studio memory filter
│   │   ├── requirements.txt                     ← "mem0ai==0.1.49"
│   │   └── __pycache__/
│   └── postgres-init/
│       └── 01-create-dbs.sql                    ← NOT mounted — unused
│
├── memory/
│   ├── per-agent/                               ← EMPTY directory
│   └── shared/                                  ← EMPTY directory
│
├── outputs/
│   ├── beats/                                   ← EMPTY
│   ├── videos/                                  ← EMPTY
│   ├── designs/                                 ← EMPTY
│   ├── content/                                 ← EMPTY
│   └── proposals/                               ← EMPTY
│
├── projects/
│   ├── spector/                                 ← EMPTY
│   ├── beats/
│   │   ├── n8n-beat-promotion-workflow.json      ← 2.8KB (BROKEN — uses removed nodes)
│   │   └── n8n-youtube-metadata-workflow.json    ← 2.2KB (BROKEN — uses removed nodes)
│   ├── web-clients/
│   │   └── n8n-outreach-workflow.json            ← 2.4KB (BROKEN — uses removed nodes)
│   └── 3d-animation/                            ← EMPTY
│
├── prompts/                                     ← EMPTY directory
│
├── tools/
│   └── comfyui/
│       └── ComfyUI/                             ← Git clone, venv created, NO SD model
│
├── docs/
│   ├── open-webui/capabilities.md               ← 960B
│   ├── models/recommended-models.md             ← 1.3KB
│   ├── memory-and-sandboxing.md                 ← 905B
│   ├── automation-tools.md                      ← 49B (redirect)
│   ├── pipelines/                               ← EMPTY
│   └── tools/
│       ├── automation-stack.md                  ← 1.9KB
│       ├── agent-install-guide.md               ← 1.7KB
│       └── nanobrowser-guide.md                 ← 1.5KB
```

```
/Users/ryleebenson/.openclaw/                   ← GATEWAY STATE DIR
├── openclaw.json                                ← Main gateway config
├── settings                                     ← Empty file
├── exec-approvals.json                          ← Execution approval config
├── exec-approvals.sock                          ← Unix socket for approvals
├── update-check.json
├── agents/
│   ├── main/
│   │   ├── agent/
│   │   │   ├── models.json                      ← Model provider configs
│   │   │   └── auth-profiles.json
│   │   └── sessions/
│   │       ├── sessions.json
│   │       └── af8ea672-*.jsonl                  ← 8 lines of session data
│   ├── engineering/sessions/                     ← Empty
│   ├── marketing/sessions/                       ← INFERENCE: Empty
│   ├── networking/sessions/                      ← INFERENCE: Empty
│   └── release/sessions/                         ← INFERENCE: Empty
├── memory/
│   └── main.sqlite                              ← 68KB, schema exists, 0 chunks, 0 files
├── tasks/
│   └── runs.sqlite                              ← Task run tracking
├── nodes/
│   ├── paired.json                              ← Device pairing state
│   └── pending.json                             ← Empty array
├── cron/
│   └── jobs.json                                ← 1 job: Memory Dreaming (daily 3AM)
├── canvas/                                      ← Web canvas app
├── identity/
├── logs/
│   ├── gateway.log
│   └── gateway.err.log
├── workspace/                                   ← Default agent workspace
└── workspaces/
    ├── engineering/
    ├── marketing/
    ├── networking/
    └── release/
```

**IMPORTANT**: The project at `/Users/ryleebenson/Desktop/OPENCLAW/` is NOT a git repository. No version control.

## 8. Critical Files

| File | Purpose | Status |
|------|---------|--------|
| `/Users/ryleebenson/Desktop/OPENCLAW/docker/docker-compose.yml` | Canonical stack definition | ✅ Active, correct |
| `/Users/ryleebenson/Desktop/OPENCLAW/.env` | All secrets/credentials | ⚠️ Contains plaintext passwords, API keys |
| `/Users/ryleebenson/Desktop/OPENCLAW/README.md` | Main documentation | ✅ Comprehensive but partially stale |
| `/Users/ryleebenson/Desktop/OPENCLAW/CHEATSHEET.md` | Quick reference | ⚠️ Login creds differ from .env |
| `/Users/ryleebenson/Desktop/OPENCLAW/data/pipelines/mem0_memory_filter.py` | Memory pipeline | ⚠️ Loaded but 0 memories stored, API key hardcoded |
| `/Users/ryleebenson/Desktop/OPENCLAW/data/pipelines/function_calling_filter.py` | Function calling | ⚠️ eval() security risk, weather key missing |
| `/Users/ryleebenson/Desktop/OPENCLAW/scripts/notes-import-v2.py` | Apple Notes import | ✅ Used, imported 200 notes |
| `/Users/ryleebenson/Desktop/OPENCLAW/scripts/setup-webui.py` | Agent auto-config | ✅ Run, all 6 agents created |
| `/Users/ryleebenson/Desktop/OPENCLAW/projects/beats/n8n-beat-promotion-workflow.json` | n8n workflow | ❌ Uses removed node types |
| `/Users/ryleebenson/Desktop/OPENCLAW/projects/beats/n8n-youtube-metadata-workflow.json` | n8n workflow | ❌ Uses removed node types |
| `/Users/ryleebenson/Desktop/OPENCLAW/projects/web-clients/n8n-outreach-workflow.json` | n8n workflow | ❌ Uses removed node types |
| `/Users/ryleebenson/Desktop/OPENCLAW/agents/*/system-prompt.md` | Agent system prompts | ✅ All present, deployed to Open WebUI |
| `/Users/ryleebenson/Desktop/OPENCLAW/data/searxng/settings.yml` | Search engine config | ✅ Working |
| `/Users/ryleebenson/.openclaw/openclaw.json` | Gateway main config | ✅ Active |
| `/Users/ryleebenson/.openclaw/exec-approvals.json` | Execution approval policy | ✅ Active (security=allowlist, ask=on-miss) |
| `~/Library/LaunchAgents/ai.openclaw.gateway.plist` | Gateway auto-start | ✅ Active, KeepAlive |

---

# SECTION 4 — AGENT LAYER: WHAT EXISTS RIGHT NOW

## 9. Existing Agents

### Open WebUI Agents (6 total)

| ID | Name | Base Model (actual) | Base Model (docs say) | System Prompt | Web Search | Code Exec | Status |
|----|------|---------------------|----------------------|---------------|------------|-----------|--------|
| `openclaw-orchestrator` | 🦅 Orchestrator | qwen/qwen3.5-9b | qwen3.5-27b | ✅ 1152 chars | ✅ | ✅ | Active, **WRONG MODEL** |
| `openclaw-coder` | 💻 Coder | qwen/qwen3.5-9b | phi-4 / qwen3.5-9b | ✅ 746 chars | ✅ | ✅ | Active |
| `openclaw-marketer` | 📢 Marketer | qwen/qwen3.5-9b | Mistral-7B | ✅ (present) | ✅ | ✅ | Active |
| `openclaw-outreach` | 🤝 Outreach | qwen/qwen3.5-9b | qwen3.5-9b | ✅ 1140 chars | ✅ | ✅ | Active |
| `openclaw-creative` | 🎨 Creative | qwen/qwen3.5-9b | Mistral-7B / 27b | ✅ (present) | ✅ | ✅ | Active, **WRONG MODEL** |
| `openclaw-media` | 📺 Media | qwen/qwen3.5-9b | qwen3.5-9b | ✅ (present) | ✅ | ✅ | Active |

**Note**: The `setup-webui.py` script defines Orchestrator and Creative with `qwen3.5-27b-claude-4.6-opus-reasoning-distilled`, but the running configs show `qwen/qwen3.5-9b`. INFERENCE: The script's create call succeeded initially, but a subsequent update (last WebUI log shows updates at 17:23:53) may have overwritten the model assignments, or the API endpoint set them to fallback.

System prompts define tools like `search_web()`, `search_memories()`, `add_memory()`, `execute_code()`, `fetch_url()`, `generate_image()`. These map to Open WebUI built-in tool functions (web_search, code execution enabled). **Memory tools depend on mem0 pipeline working** — currently not storing.

### OpenClaw Gateway Agents (5 total)

| ID | Name | Model | Skills | Sessions | Purpose |
|----|------|-------|--------|----------|---------|
| `main` | (default) | lmstudio/qwen/qwen3.5-9b | (default) | 1 session (8 lines) | General purpose |
| `engineering` | Engineering | lmstudio/qwen/qwen3.5-9b | coding-agent, github, taskflow | 0 sessions | Code/engineering tasks |
| `release` | Release | lmstudio/qwen/qwen3.5-9b | github, healthcheck, taskflow, coding-agent | 0 sessions | Release management |
| `networking` | Networking | lmstudio/qwen/qwen3.5-9b | xurl, apple-notes, github, taskflow | 0 sessions | Networking/outreach |
| `marketing` | Marketing | lmstudio/qwen/qwen3.5-9b | xurl, video-frames, apple-notes, taskflow | 0 sessions | Marketing tasks |

## 10. Agent Communication Model

- **Can agents talk to each other directly?** NO — not in either system.
- **Open WebUI**: Agents are independent chat models. No inter-agent routing exists. A user must manually switch between agents.
- **OpenClaw Gateway**: Agents are separate session contexts. No built-in inter-agent messaging. The `main` agent could theoretically delegate via the coding-agent skill, but there's no orchestration protocol.
- **Closest mechanism**: The Orchestrator's system prompt describes delegating to other agents, but this is **prompt-level fiction only** — there is no actual mechanism to invoke one agent from another.
- **Task queue**: Gateway has `tasks/runs.sqlite` but it tracks individual task runs, not inter-agent routing.
- **Shared memory**: mem0 targets a single `memory` Qdrant collection (global, not per-agent). Gateway has its own SQLite memory (also empty). No shared memory between the two systems.
- **Messaging layer**: None exists between agents.

## 11. Agent Execution Model

- **Trigger types**: All agents are triggered **manually** by typing in chat (Open WebUI or Gateway web UI).
- **n8n webhooks**: 3 workflow webhooks defined but **BROKEN** (see Section 6).
- **Gateway cron**: 1 automated cron job (memory dreaming, daily 3AM) — system-internal only.
- **Actions with actual side effects**:
  - Code execution via Pyodide in Open WebUI (sandboxed, limited)
  - Gateway `coding-agent` skill can execute code and file operations in workspace
  - Gateway `browser` plugin can control browser (port 18791)
  - n8n workflows (when working) can write files, make HTTP requests, execute commands
  - Notes import scripts interact with Apple Notes via AppleScript
- **Simulated only**: The Orchestrator's "delegation" to other agents. The system prompts reference tools like `add_memory()` — mem0 is loaded but storing nothing.

---

# SECTION 5 — MEMORY / RAG / KNOWLEDGE LAYER

## 12. Memory Architecture

### What exists right now:

| System | Storage | Status | What it stores | Read by | Written by |
|--------|---------|--------|----------------|---------|------------|
| Qdrant `shared` collection | Docker volume | ✅ 200 points | Apple Notes (title + body[:400] + source + index) | Open WebUI RAG (if configured) | `notes-import-v2.py` script |
| Qdrant `memory` collection | Docker volume | ❌ 0 points | Intended: mem0 agent memory | mem0 pipeline | mem0 pipeline (NOT writing) |
| Qdrant 5 other collections | Docker volume | ❌ All empty | Placeholder collections | Nothing | Nothing |
| mem0 pipeline filter | Pipelines container | ⚠️ Loaded | In-memory message buffer | Injects into chat context | Supposed to write to Qdrant every 5 msgs |
| OpenClaw Gateway memory | `~/.openclaw/memory/main.sqlite` | ❌ 0 chunks, 0 files | Intended: gateway agent memory | Gateway agents | memory-core plugin |
| Open WebUI built-in memory | webui-data volume | UNKNOWN | Per-user memory in WebUI's DB | WebUI agents | WebUI `add_memory()` tool |

### Embedding model: `text-embedding-nomic-embed-text-v1.5` (768 dimensions, via LM Studio)

### Apple Notes data structure in Qdrant:
```json
{
  "id": 60403422,  // MD5-derived integer
  "vector": [768-dim float array],
  "payload": {
    "title": "note title",
    "body": "first 400 chars of note body",
    "source": "apple_notes",
    "index": 80  // position in notes list
  }
}
```

### How memories are retrieved:
- mem0 pipeline: `self.m.search(last_message, user_id=mem_user)` → returns top match → injects as system message "Memory context: {fetched_memory}"
- **But**: The `memory` collection has 0 points, so search returns nothing.

### What is automatic vs manual:
- Apple Notes import: **Manual** (run `notes-import-v2.py`)
- mem0 memory storage: **Automatic** (every 5th message) — but NOT working
- Gateway memory dreaming: **Automatic** (cron, daily 3AM) — but memory is empty
- Everything else: **Manual**

## 13. Apple Notes Import Status

- **Notes imported**: 200 of ~2937 total
- **Script used**: `notes-import-v2.py` (batch mode, v2)
- **What is imported**: Title, body (truncated to 400 chars in payload, 1000 chars for embedding text), source tag, index number
- **What is NOT imported**: Creation date, modification date, folder/account info, attachments, formatting, tags
- **Collection**: `shared`
- **Incremental import**: NOT supported — script re-imports from position 0 each time, with MD5-based IDs (same note = same ID = upsert, so it's safe to re-run but not incremental)
- **Permissions required**: Terminal must have Full Disk Access for AppleScript to read Notes
- **What is pending**: 2737 notes not yet imported (change `MAX_NOTES` in script)
- **Verification query**:
  ```bash
  curl -s "http://localhost:6333/collections/shared/points/scroll" \
    -H "Content-Type: application/json" \
    -d '{"limit": 2, "with_payload": true, "with_vector": false}'
  ```

## 14. Missing Memory Pieces

| Feature | Status |
|---------|--------|
| Dedicated agent memory store | ❌ Missing — mem0 targets one shared collection, not per-agent |
| Per-agent memory | ❌ Missing — mem0 uses single `user_id=user` for all |
| Shared memory across agents | ❌ Missing — no mechanism for one agent to read another's context |
| Episodic memory (conversation history) | ⚠️ Partial — Open WebUI stores chat history, Gateway stores sessions as JSONL |
| Action history / audit trail | ❌ Missing entirely |
| Social memory (agent reputation/trust) | ❌ Missing entirely |
| Event log memory | ❌ Missing — no structured event logging |
| Gateway memory | ❌ Schema exists but 0 data (chunks table empty) |

**Implementation-level gaps**:
- mem0 pipeline uses global `user_id="user"` — needs per-agent user IDs
- No memory consolidation/summarization across agents
- No mechanism to promote short-term memory to long-term
- Gateway's memory-core plugin has "dreaming" enabled but nothing to dream about (0 chunks)

---

# SECTION 6 — WORKFLOWS / AUTOMATIONS / SIDE EFFECTS

## 15. n8n Workflows

### Beat Promotion Pipeline
- **File**: `/Users/ryleebenson/Desktop/OPENCLAW/projects/beats/n8n-beat-promotion-workflow.json`
- **Status**: ❌ BROKEN
- **Trigger**: Schedule (every 24 hours)
- **Nodes**: Schedule → `executeCommand` (ls beats) → OpenAI (promo copy) → `writeFile` (save content) → HTTP (search blogs) → NoOp
- **Credentials**: `LM Studio Local` OpenAI credential (must be created manually)
- **Broken because**: `n8n-nodes-base.executeCommand` and `n8n-nodes-base.writeFile` are unrecognized in current n8n version
- **Side effects (when working)**: Reads filesystem, generates text, writes files, makes HTTP requests

### YouTube Metadata Generator
- **File**: `/Users/ryleebenson/Desktop/OPENCLAW/projects/beats/n8n-youtube-metadata-workflow.json`
- **Status**: ❌ BROKEN
- **Trigger**: Manual
- **Nodes**: Manual → Set (beat info) → OpenAI (generate metadata) → `writeFile` (save JSON)
- **Broken because**: Same `writeFile` node issue

### Freelance Outreach Pipeline
- **File**: `/Users/ryleebenson/Desktop/OPENCLAW/projects/web-clients/n8n-outreach-workflow.json`
- **Status**: ❌ BROKEN
- **Trigger**: Manual (also has webhook at `/webhook/outreach` — confirmed broken in logs: "No Respond to Webhook node found")
- **Nodes**: Manual → Set (job details) → OpenAI (generate proposal) → `writeFile` (save proposal)
- **Broken because**: Same `writeFile` node issue + missing Respond to Webhook node

### All 3 workflows need to be rewritten for current n8n version. The `executeCommand` → `Execute Command` and `writeFile` → `Write Binary File` or `Code` node changes are required.

## 16. Other Automation Systems

| System | Status | Details |
|--------|--------|---------|
| **Flowise** | Installed, NOT configured | Web UI reachable at localhost:3001. No flows created. |
| **Shell scripts** | 11 scripts in `/scripts/` | start/stop/status/setup/import. All functional except n8n setup (prints instructions only). |
| **Cron jobs (system)** | None | No crontab entries |
| **LaunchAgents** | 1 | `ai.openclaw.gateway` — auto-starts gateway on boot |
| **Gateway cron** | 1 job | Memory Dreaming Promotion — daily 3AM. Promotes short-term memories. Currently no-op (empty memory). |
| **Browser automation** | Gateway browser plugin on port 18791 | Active, authenticated. Nanobrowser Chrome extension NOT installed. |
| **Vision tooling** | Gateway has `video-frames` skill | Available to marketing agent. Not tested. |
| **Local app control** | Agent! app NOT installed | Referenced in docs but not present on system |
| **Webhook listeners** | n8n webhook at `/webhook/outreach` | BROKEN (see above) |
| **APIs exposed** | Gateway at 18789 (loopback), all Docker services on various ports | All bound to 0.0.0.0 — accessible on local network |

---

# SECTION 7 — MODEL LAYER

## 17. Available Models

| Model ID | Type | Size (est.) | Local/Remote | Loaded | Context Length | Current Use | Strengths | Weaknesses |
|----------|------|-------------|-------------|--------|----------------|-------------|-----------|------------|
| `qwen3.5-27b-claude-4.6-opus-reasoning-distilled` | Chat/Reasoning | ~14GB | Local (LM Studio) | ✅ Loaded | UNKNOWN (docs say keep 2-4K) | Intended: Orchestrator, Creative | Strong reasoning, planning | Large, uses most of 16GB RAM |
| `qwen/qwen3.5-9b` | Chat | ~6GB | Local (LM Studio) | ✅ Loaded | 262144 (gateway config) | Primary workhorse, ALL agents currently | Good balance speed/quality | Not specialized for tool use |
| `google/gemma-4-e4b` | Multimodal | ~4GB | Local (LM Studio) | ✅ Loaded | 131072 (gateway config) | Vision, fallback | Image understanding | Newer, less tested |
| `text-embedding-nomic-embed-text-v1.5` | Embedding | ~300MB | Local (LM Studio) | ✅ Loaded | N/A | RAG, memory embeddings | Fast, 768-dim output | Embedding-only |

**Models recommended in docs but NOT installed**: phi-4 (coding), Qwen2.5-9B-Instruct (tool use), Qwen2.5-3B (router), Mistral-7B (creative/marketing), Llama-3.2-11B-Vision.

**Remote models available to Gateway**: The `models.json` in main agent dir lists GPT-5.4, GPT-5.4-mini, GPT-5.2-Codex as providers via "codex" provider. INFERENCE: These are accessible through the Copilot/Codex integration but are not the primary models used.

## 18. Model Routing

- **Router model**: None. No model routing logic exists.
- **Cost/performance logic**: Gateway config sets `cost: {input: 0, output: 0}` for all LM Studio models (free/local).
- **Task-to-model routing**: The system prompts and README describe routing (Orchestrator=27b, Coder=phi-4, etc.) but in practice ALL Open WebUI agents use qwen3.5-9b. Gateway agents also all use qwen3.5-9b with gemma-4 as fallback.
- **Fallback behavior**: Gateway has `fallbacks: ["lmstudio/google/gemma-4-e4b"]` configured.
- **Local/remote hybrid**: Gateway has remote Codex models configured, but primary use is local LM Studio.

---

# SECTION 8 — SECURITY / ACCESS / APPROVALS / CONTROL

## 19. Credentials / Secrets / Auth

| Secret | Location | Risk |
|--------|----------|------|
| `WEBUI_ADMIN_PASSWORD=HtKc0jmGdOk0cmEE6mCR1UJ` | `.env`, `docker-compose.yml` (defaults), `README.md`, `CHEATSHEET.md`, `start.sh`, multiple docs | ⚠️ HIGH — plaintext in multiple files, in README |
| `OPENAI_API_KEY=sk-lm-lTx6H171:rNxT8R8M7ptHEyiQUU47` | `.env`, mem0 pipeline Python file, docs, scripts, gateway plist | ⚠️ HIGH — hardcoded in Python, plist, docs |
| `POSTGRES_PASSWORD=openclaw2024secure` | `.env` | ⚠️ Default in compose is `openclaw2024` (different!) |
| `N8N_ENCRYPTION_KEY=openclaw_n8n_32char_secret_key!!` | `.env` | Low risk if local-only |
| `PIPELINES_API_KEY=0p3n-w3bu!` | `docker-compose.yml`, `CHEATSHEET.md` | Low risk (local) |
| `SearXNG secret_key` | `data/searxng/settings.yml` | Low risk (local) |
| Gateway token: `01eaa9b1a782d647798b295d6d654c1a6408ae4b02188bf0` | `openclaw.json` | Medium — gateway auth token |
| Exec approvals socket token | `exec-approvals.json` | Low (local socket) |

**Hardcoded credentials**: LM Studio API key is hardcoded in `mem0_memory_filter.py` line 35. Same key is in the gateway LaunchAgent plist.

**What should be rotated**: All passwords if this system ever becomes network-accessible beyond localhost/Tailscale.

**What should be moved to env vars**: The API key in `mem0_memory_filter.py` should read from environment.

## 20. Human Approval / Intervention Mechanisms

- **Gateway exec-approvals**: YES — `~/.openclaw/exec-approvals.json` defines `security: "allowlist"` with `ask: "on-miss"`. This means the gateway coding-agent will ASK for approval for commands not on an allowlist. This is the ONLY approval mechanism.
- **Red-priority / escalation**: None exists.
- **Risk classes**: None defined.
- **Open WebUI**: No approval layer. Agents can execute code in Pyodide sandbox without approval.
- **n8n**: No approval gates in workflows. When working, they execute fully automatically.

## 21. Dangerous Permissions

| Component | Write Files | Shell Exec | Network | External APIs | Money/Real-World | Delete/Overwrite |
|-----------|-------------|------------|---------|---------------|-----------------|------------------|
| Open WebUI agents | ❌ (Pyodide sandbox) | ❌ (sandboxed) | ✅ (web search) | ✅ (via SearXNG) | ❌ | ❌ |
| Gateway coding-agent | ✅ (workspace) | ✅ (with approval) | ✅ | ✅ | ❌ | ✅ |
| Gateway browser plugin | ❌ | ❌ | ✅ (controls browser) | ✅ | ⚠️ (could click things) | ❌ |
| n8n workflows | ✅ (`/outputs`, `/projects`) | ✅ (executeCommand) | ✅ | ✅ | ⚠️ (could send emails) | ✅ |
| Notes import scripts | ❌ | ✅ (osascript) | ✅ (Qdrant, LM Studio) | ❌ | ❌ | ✅ (upsert overwrites) |
| Pipelines | ❌ | ❌ | ✅ (Qdrant, LM Studio) | ❌ | ❌ | ❌ |

---

# SECTION 9 — OBSERVABILITY / LOGGING / REVIEW

## 22. Logging and Traceability

| Log Source | Location | Content |
|-----------|----------|---------|
| Docker container logs | `docker logs <container>` | Runtime output, errors, HTTP requests |
| Gateway logs | `~/.openclaw/logs/gateway.log`, `~/.openclaw/logs/gateway.err.log` | Structured JSON logs, startup, connections |
| Gateway detailed logs | `/tmp/openclaw/openclaw-2026-04-18.log` | Full JSON structured logs |
| Open WebUI | Container stdout | Auth events, API calls, model requests |
| Pipelines | Container stdout | Pipeline load/unload, valve updates, HTTP requests |
| n8n | Container stdout | Workflow activations, errors, webhook events |
| Gateway sessions | `~/.openclaw/agents/main/sessions/*.jsonl` | Conversation turns (8 lines in 1 session) |

**What is NOT logged**:
- Agent actions are NOT logged in a structured/queryable way
- Memory reads/writes are NOT logged (beyond pipeline stdout)
- Prompts/responses are NOT systematically stored for review
- No screenshots or recordings
- No audit trail for what actions agents took or why
- Workflow execution history is in n8n's Postgres DB but no external export

## 23. Failure Detection

- **How failures surface**: Container logs (must manually check), n8n UI shows workflow failures, Gateway logs show errors
- **Silent agent failure**: There is NO mechanism to detect if an agent produces bad output, hallucinates, or goes off-rails. No output validation, no guardrails, no content filters.
- **Alerting**: None. No email, no Slack, no push notification on failure.
- **Retry logic**: Docker containers have `unless-stopped` restart. Gateway has `KeepAlive`. No application-level retry.
- **Health checking**: Docker compose has health check for Postgres only. Gateway has health-monitor (300s interval). No custom health checks for business logic.

---

# SECTION 10 — PRODUCT INTENT / FUTURE DIRECTION (EVIDENCE-BASED)

## 24. Product Direction Assessment

### Definitely Implemented
- Docker-based service stack (7 containers) — running and healthy
- OpenClaw gateway with multi-agent configuration — running
- Open WebUI with 6 specialized agents — configured with system prompts
- SearXNG private search — working
- LM Studio with 4 local models — running
- Apple Notes import (200 of 2937) — working
- Qdrant with 7 collections — running (6 empty)
- Basic scripts for start/stop/status — working
- Tailscale networking — connected

### Partially Implemented
- mem0 memory pipeline — loaded but NOT storing memories (0 points in collection)
- ComfyUI image generation — cloned, venv created, NO model downloaded, NOT running
- Gateway memory system — schema exists, 0 data, dreaming cron configured
- Agent specialization — prompts written, all using same model (not differentiated)
- Function calling — stock pipeline loaded, weather API key missing, calculator uses eval()

### Implied But Not Yet Built
- Inter-agent communication / orchestration (prompts describe delegation but no mechanism exists)
- Per-agent memory (mem0 uses single global user ID)
- n8n workflow automation (3 workflows written but broken on current n8n version)
- Beat export → art generation → promotion pipeline (described in docs)
- Client outreach automation (Fiverr/Upwork/Facebook)
- YouTube channel management
- Email campaign automation
- Model routing (different models for different agents)
- Approval system for agent actions (gateway has exec-approval but no business-logic approvals)

### Speculative Only
- "AI society / agent ecosystem / documentary" concept (mentioned in request, not in any project file)
- Money-making automation (infrastructure exists but no functioning pipeline)
- macOS app control via Agent! (documented but not installed)
- Browser automation via Nanobrowser (playbook written, not installed)

## 25. Support for "AI Society / Agent Ecosystem / Money-Making" Concept

**Supports it**:
- 6 specialized agents with defined roles and system prompts
- Gateway with 5 agents and coding/browser/voice capabilities
- n8n workflow infrastructure (when fixed)
- Qdrant for knowledge/memory persistence
- SearXNG for research
- Exec-approval system for safety

**Does NOT yet support it**:
- No inter-agent communication protocol
- No task routing or orchestration mechanism
- No shared memory between agents
- No action logging or audit trail
- No approval system for business-critical actions
- No actual money-making pipeline is functional
- No content generation pipeline is functional
- No outreach pipeline is functional
- Memory system is non-functional

---

# SECTION 11 — GAPS TO CLOSE BEFORE PRD

## 26. Missing Information After Audit

| Unknown | How to Verify |
|---------|---------------|
| Does LM Studio auto-start on reboot? | Reboot and check, or look in System Settings > Login Items |
| Is Open WebUI's built-in memory (`add_memory()` tool) functional? | Test in chat: ask agent to remember something, restart, ask if it remembers |
| How many notes exist in ~/Desktop/Instrumentals/? | `ls ~/Desktop/Instrumentals/ \| wc -l` |
| What's in the gateway `workspace` and `workspaces/` directories? | `ls -laR ~/.openclaw/workspace/ ~/.openclaw/workspaces/` |
| Is the Codex/GPT-5.4 provider in gateway actually usable? | Test via gateway chat |
| Has Flowise ever been configured? | Open localhost:3001 and check for flows |
| Are the CHEATSHEET login creds (`admin@openclaw.local / OpenClaw2024!`) valid or stale? | Test login at localhost:3000 |
| Which n8n workflows are actually imported vs just JSON files? | Check n8n UI at localhost:5678 |
| Does the gateway phone-control plugin work? | Check gateway docs/config for phone setup |
| What is the `canvas` feature in gateway? | Visit http://localhost:18789/__openclaw__/canvas/ |

## 27. Verification Checklist

```bash
# 1. Verify LM Studio auto-start
# → Check System Settings > General > Login Items

# 2. Test Open WebUI built-in memory
# → Chat with any agent, say "Remember that my project is called SPECTOR"
# → Start new chat, ask "What is my project called?"

# 3. Check ~/Desktop/Instrumentals/
ls -la ~/Desktop/Instrumentals/ 2>/dev/null | head -20

# 4. Check n8n workflows in UI
open http://localhost:5678

# 5. Check Flowise for any configured flows
open http://localhost:3001

# 6. Test mem0 is actually storing (after 5+ messages)
curl -s "http://localhost:6333/collections/memory/points/scroll" \
  -H "Content-Type: application/json" \
  -d '{"limit": 5, "with_payload": true, "with_vector": false}'

# 7. Verify CHEATSHEET credentials
curl -s http://localhost:3000/api/v1/auths/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@openclaw.local","password":"OpenClaw2024!"}'

# 8. Check gateway canvas
open http://localhost:18789/__openclaw__/canvas/

# 9. Check gateway workspaces
ls -laR ~/.openclaw/workspace/ ~/.openclaw/workspaces/

# 10. Verify Qdrant search works on Apple Notes
curl -s "http://localhost:6333/collections/shared/points/search" \
  -H "Content-Type: application/json" \
  -d '{"vector": [0.1, 0.2, ...], "limit": 3}' # needs real embedding vector
```

---

# SECTION 12 — FINAL SUMMARIES

## A. WHAT EXISTS NOW (Working)

1. ✅ 7 Docker containers running: webui, pipelines, n8n, postgres, qdrant, flowise, searxng
2. ✅ OpenClaw Gateway (npm v2026.4.15) running as LaunchAgent on port 18789 with browser control, memory-core, phone-control, talk-voice, acpx plugins
3. ✅ LM Studio with 4 models loaded (27b reasoning, 9b workhorse, gemma-4 vision, nomic-embed)
4. ✅ 6 agents in Open WebUI with system prompts deployed
5. ✅ 5 agents in Gateway (main, engineering, release, networking, marketing)
6. ✅ SearXNG private search working (21 results for test query, 11 engines)
7. ✅ Qdrant with 7 collections, `shared` has 200 Apple Notes
8. ✅ Postgres with n8n database
9. ✅ Tailscale connected
10. ✅ Startup/stop/status scripts working
11. ✅ ComfyUI git repo cloned + venv created
12. ✅ Gateway exec-approval system (allowlist + ask-on-miss)
13. ✅ Gateway cron (memory dreaming, daily 3AM)
14. ✅ Agent system prompts written and stored in `agents/*/system-prompt.md`
15. ✅ Documentation: README, CHEATSHEET, 6 doc files
16. ✅ Open WebUI code execution (Pyodide sandbox)
17. ✅ Bonjour service discovery (`openclaw.local`)

## B. WHAT IS PARTIALLY WORKING

1. ⚠️ mem0 memory filter — loaded in pipelines but **0 memories stored** in Qdrant. May be silently failing on write.
2. ⚠️ Agent model assignments — all 6 Open WebUI agents on qwen3.5-9b instead of differentiated models per docs
3. ⚠️ Apple Notes import — 200 of 2937 imported, no incremental support, body truncated to 400 chars
4. ⚠️ ComfyUI — installed but no Stable Diffusion model downloaded, cannot generate images
5. ⚠️ n8n — running but 3 workflows use removed node types (`executeCommand`, `writeFile`), all broken
6. ⚠️ function_calling_filter — loaded but weather tool has no API key, calculator uses `eval()`
7. ⚠️ Gateway memory — schema/tables exist, dreaming cron set, but 0 chunks/files stored
8. ⚠️ CHEATSHEET.md has different login credentials than .env (possible stale creds)
9. ⚠️ `data/postgres-init/01-create-dbs.sql` exists but is NOT mounted — never runs

## C. WHAT IS MISSING ENTIRELY

1. ❌ **Inter-agent communication** — no mechanism for agents to delegate, message, or invoke each other
2. ❌ **Task orchestration** — Orchestrator agent is prompt-only, no actual routing/delegation
3. ❌ **Per-agent memory** — mem0 uses single user ID, no memory isolation
4. ❌ **Action logging / audit trail** — no structured record of what agents did
5. ❌ **Approval system for business actions** — gateway has exec-approval for code but no business-logic approvals
6. ❌ **Working automation pipelines** — all 3 n8n workflows are broken
7. ❌ **Model routing** — no logic to assign different models to different tasks
8. ❌ **Content output pipeline** — `outputs/` directories are all empty
9. ❌ **Version control** — project is NOT a git repo
10. ❌ **Alerting / monitoring** — no failure notifications
11. ❌ **Agent guardrails / output validation** — no content filtering or quality checks
12. ❌ **Email automation** — no SMTP configured, no email sending capability
13. ❌ **Social media integration** — no API keys for YouTube, Facebook, etc.
14. ❌ **macOS app automation** — Agent! app not installed
15. ❌ **Browser automation** — Nanobrowser not installed (gateway browser plugin exists but limited)
16. ❌ **Real-time collaboration** — no mechanism for multiple system components to coordinate
17. ❌ **Backup strategy** — Docker named volumes have no backup; losing them loses all state
18. ❌ **Unified memory** — two separate memory systems (Qdrant via mem0, Gateway SQLite) with no bridge

## D. WHAT MUST BE DECIDED BEFORE IMPLEMENTATION

1. **Which system is primary?** Open WebUI agents vs. OpenClaw Gateway agents — there are TWO parallel agent systems. Which one should be the canonical agent runtime?
2. **Memory architecture**: Should agents share memory, have isolated memory, or both? Which backend — Qdrant, Gateway SQLite, or something else?
3. **Orchestration model**: How should agents delegate work? Direct invocation, message queue, shared task board, or n8n workflows?
4. **Approval policy**: What actions require human approval? What risk classes exist? What happens when an agent wants to spend money, contact a client, or post publicly?
5. **Model strategy**: Should each agent have a dedicated model, or should there be a router? RAM is limited to 16GB — can't run all models simultaneously.
6. **n8n workflow approach**: Fix existing workflows for current n8n version, or redesign from scratch with better patterns?
7. **Priority of automation**: Which pipeline should be built first — beat promotion, outreach, YouTube, or something else?
8. **Backup / recovery**: How should state be preserved? Git for config, volume backups for data?
9. **Network exposure**: Should services be accessible via Tailscale to other devices? Security implications?
10. **ComfyUI commitment**: Is image generation a priority? If so, which SD model to download?
11. **Gateway vs. Docker split**: Should the gateway agents align with the Open WebUI agents, or serve different purposes?
12. **Credential management**: Move all secrets to a proper secret store, or accept .env for local-only operation?
