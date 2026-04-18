# 🦅 OPENCLAW — Rylee's Local AI Agent Ecosystem

> **Status**: ✅ FULLY OPERATIONAL — 7 services · 6 agents · 3 pipelines · 3 n8n workflows active · 200 notes imported · ComfyUI ready
> **Hardware**: Apple M4 · 16GB RAM · 179GB free  
> **Philosophy**: 100% local, zero API costs, full privacy

---

## 🗺️ WHAT THIS IS

A complete local AI agent system that can:
- 🎵 Automate music production workflows (Logic Pro, beat export, promotion)
- 🎬 Generate visuals, thumbnails, album art (ComfyUI, M4 = 2-4s/image)
- 📢 Run outreach campaigns (Fiverr, Upwork, Facebook, email)
- 💻 Build and deploy websites, 3D animations for clients
- 📱 Manage YouTube channel, social media, content calendar
- 🤖 Spawn specialized agents for any creative/business task
- 📝 Read/write Apple Notes, control macOS apps via AI
- 🧠 Remember everything across sessions (Qdrant + mem0)

---

## 🚀 QUICK START

```bash
# 1. Make sure LM Studio is open with a model loaded
# 2. Start the stack:
./scripts/start.sh

# Check status:
./scripts/status.sh

# Stop everything:
./scripts/stop.sh
```

### Service URLs
| Service | URL | Purpose |
|---------|-----|---------|
| **Open WebUI** | http://localhost:3000 | Main chat + agents |
| **n8n** | http://localhost:5678 | Workflow automation |
| **Flowise** | http://localhost:3001 | Visual agent builder |
| **SearXNG** | http://localhost:8080 | Private search |
| **Qdrant** | http://localhost:6333 | Vector memory DB |
| **Pipelines** | http://localhost:9099 | WebUI middleware |
| **LM Studio** | http://localhost:1234 | Local models (native) |
| **ComfyUI** | http://localhost:8188 | Image gen (install separately) |

**Login**: admin@local / HtKc0jmGdOk0cmEE6mCR1UJ

---

## 🧠 MODELS IN LM STUDIO

| Model | Role | Use When |
|-------|------|----------|
| qwen3.5-27b-reasoning | **Orchestrator** | Complex planning, strategy |
| qwen3.5-9b | **Workhorse** | Most everyday tasks |
| gemma-4-e4b | **Vision** | Image analysis, design work |
| nomic-embed-text | **Embeddings** | RAG, memory, search |

### Download Next (in LM Studio)
- `mlx-community/Qwen2.5-9B-Instruct` — Best for tool use/function calling
- `mlx-community/phi-4` — Coding agent (fast, small)
- `mlx-community/Qwen2.5-3B-Instruct` — Ultra-fast router/utility

---

## 🤖 THE AGENT TEAM

| Agent | Model | Folder | Role |
|-------|-------|--------|------|
| **Orchestrator** | qwen3.5-27b | agents/orchestrator | Plans, delegates, tracks |
| **Coder** | phi-4 / qwen3.5-9b | agents/coder | Scripts, APIs, automation |
| **Marketer** | Mistral-7B | agents/marketer | Copy, social, SEO |
| **Outreach** | qwen3.5-9b | agents/outreach | Fiverr, Upwork, quotes |
| **Creative** | Mistral-7B | agents/creative | Lyrics, briefs, concepts |
| **Media** | qwen3.5-9b | agents/media | YouTube, scheduling, growth |

System prompts: `agents/<name>/system-prompt.md`

---

## 🔧 NATIVE macOS TOOLS (No Docker)

### Agent! — Controls ANY macOS App
- **Install**: https://github.com/macOS26/Agent/releases
- **Setup**: Settings → LM Studio → http://localhost:1234/v1
- **Can control**: Logic Pro, Blender, Final Cut Pro, Finder, Safari, iMessage
- **Example**: "Export the latest beat from Logic Pro as MP3"

### ComfyUI — Image Generation (M4 = 2-4s/image)
```bash
git clone https://github.com/comfyanonymous/ComfyUI
cd ComfyUI && python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
python main.py --listen 0.0.0.0
# Access: http://localhost:8188
```

### Nanobrowser — AI Browser Automation
- Install Chrome extension from: https://github.com/nanobrowser/nanobrowser
- Settings → API: http://localhost:1234/v1 → Key: your LM Studio key
- Use for: scraping Upwork jobs, researching leads, YouTube analytics

---

## 📁 FOLDER STRUCTURE

```
OPENCLAW/
├── README.md              ← YOU ARE HERE
├── .env                   ← Secrets (never share!)
├── docker/
│   └── docker-compose.yml ← Full stack definition
├── scripts/
│   ├── start.sh           ← Start everything
│   ├── stop.sh            ← Stop everything
│   ├── status.sh          ← Check status
│   └── read-notes.sh      ← Export Apple Notes
├── agents/
│   ├── orchestrator/      ← Master planner agent
│   ├── coder/             ← Code + automation agent
│   ├── marketer/          ← Marketing + copy agent
│   ├── outreach/          ← Fiverr/Upwork/client agent
│   ├── creative/          ← Creative writing + briefs
│   └── media/             ← YouTube + social agent
├── memory/
│   └── shared/            ← Shared knowledge base
├── docs/
│   ├── open-webui/        ← WebUI capabilities
│   ├── models/            ← Model recommendations
│   └── tools/             ← Automation stack research
├── outputs/
│   ├── beats/             ← Exported beats
│   ├── videos/            ← Generated video content
│   ├── designs/           ← Generated artwork
│   ├── content/           ← Written content
│   └── proposals/         ← Client proposals
├── projects/
│   ├── spector/           ← SPECTOR music project
│   ├── beats/             ← Beat catalog
│   ├── web-clients/       ← Web design clients
│   └── 3d-animation/      ← 3D animation projects
└── data/                  ← Docker volumes (auto-managed)
    ├── open-webui/
    ├── searxng/
    ├── n8n/
    ├── qdrant/
    ├── flowise/
    └── pipelines/
```

---

## 📋 PHASE ROADMAP

### Phase 1 — Foundation (NOW)
- [x] Docker stack configured
- [x] Agent system prompts written
- [x] Folder structure created
- [ ] `./scripts/start.sh` — boot the stack
- [ ] Open WebUI: add each agent as a custom model
- [ ] Test LM Studio ↔ Open WebUI connection

### Phase 2 — Memory + RAG
- [x] Install mem0 pipeline in Open WebUI Pipelines
- [ ] Create Qdrant knowledge base for each project
- [ ] Import Apple Notes into knowledge base
- [x] Set up per-agent memory via mem0 filter

### Phase 3 — Automation
- [ ] Install Agent! — configure for Logic Pro
- [ ] Install ComfyUI — test image gen
- [ ] Install Nanobrowser — test scraping
- [ ] Build first n8n workflow (beat export → art gen → post)

### Phase 4 — Outreach Machine
- [ ] n8n workflow: Upwork job scraper → proposal generator
- [ ] n8n workflow: Fiverr inquiry → quote builder → response
- [ ] n8n workflow: Facebook business page outreach
- [ ] Email campaign automation

### Phase 5 — Media Empire
- [ ] YouTube channel automation (metadata, thumbnails, scheduling)
- [ ] Beat promotion pipeline
- [ ] Content calendar agent
- [ ] Analytics monitoring + reporting

---

## 🔑 CREDENTIALS
See `.env` file — NEVER share or commit this file.

---

## 📚 KEY DOCS
- Open WebUI capabilities: `docs/open-webui/capabilities.md`
- Model recommendations: `docs/models/recommended-models.md`
- Automation stack: `docs/tools/automation-stack.md`
- Memory & sandboxing: `docs/memory-and-sandboxing.md`
