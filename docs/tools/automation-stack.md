# Automation Stack Research

## Tier 1 — MUST HAVE
| Tool | Type | URL | Purpose |
|------|------|-----|---------|
| n8n | Docker | localhost:5678 | Main workflow orchestration (400+ integrations) |
| Open WebUI | Docker | localhost:3000 | Chat UI + agent interface |
| Nanobrowser | Chrome Extension | chrome store | Web scraping / browser automation with LLM |
| Agent! | macOS Native | github.com/macOS26/Agent | Controls ANY macOS app (Logic Pro, Blender!) |

## Tier 2 — HIGH VALUE
| Tool | Type | URL | Purpose |
|------|------|-----|---------|
| Flowise | Docker | localhost:3001 | Visual LLM app/agent builder |
| Qdrant | Docker | localhost:6333 | Vector DB for memory + RAG |
| ComfyUI | macOS Native | localhost:8188 | Image gen (M4 = 2-4s per image!) |
| Pipelines | Docker | localhost:9099 | Open WebUI middleware / custom tools |

## Tier 3 — OPTIONAL
| Tool | Purpose |
|------|---------|
| LangGraph | Python framework for complex agent logic |
| Browser Use | Python library for browser automation |
| Activepieces | Zapier-like (less mature than n8n) |

## KEY DISCOVERY: Agent! (macOS26/Agent)
**GAME CHANGER** — Native macOS app, controls:
- Logic Pro (automate beat export!)
- Blender (automate renders!)
- Final Cut Pro
- Finder, Safari, Chrome
- iMessage, Calendar, Spotify
- 17 LLM providers including Ollama/local

Install: https://github.com/macOS26/Agent/releases
Configure: Settings → Ollama → http://localhost:11434

## n8n + LM Studio Connection
In n8n, add OpenAI credential:
- Base URL: http://host.docker.internal:1234/v1
- API Key: sk-lm-lTx6H171:rNxT8R8M7ptHEyiQUU47

## Example Daily Automation Flow
1. Agent! exports beat from Logic Pro
2. ComfyUI generates album art + thumbnails  
3. n8n finds music blogs + extracts contacts
4. n8n sends personalized pitch emails
5. Flowise monitors replies, drafts responses
6. n8n posts to YouTube/Instagram with metadata
