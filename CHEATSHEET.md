# 🦅 OPENCLAW Quick Reference

## Service URLs
| Service | URL | Login |
|---------|-----|-------|
| Open WebUI (Chat) | http://localhost:3000 | See .env for credentials |
| n8n (Workflows) | http://localhost:5678 | See .env for credentials |
| Flowise (Flow Builder) | http://localhost:3001 | — |
| SearXNG (Search) | http://localhost:8080 | — |
| Qdrant (Vector DB) | http://localhost:6333 | — |
| Pipelines | http://localhost:9099 | Key: 0p3n-w3bu! |
| LM Studio | http://localhost:1234 | API Key: YOUR_LM_STUDIO_API_KEY |
| ComfyUI (when running) | http://localhost:8188 | — |

## Start / Stop
```bash
cd ~/Desktop/OPENCLAW && bash scripts/start.sh   # Start all Docker services
bash ~/Desktop/OPENCLAW/scripts/start-comfyui.sh  # Start ComfyUI (image gen)
```

## n8n Webhook URLs (trigger from terminal/code)
```bash
# Generate YouTube metadata for a beat
curl -X POST http://localhost:5678/webhook/youtube-metadata \
  -H "Content-Type: application/json" \
  -d '{"beatName": "My Beat", "genre": "trap", "vibe": "dark"}'

# Generate a freelance proposal
curl -X POST http://localhost:5678/webhook/outreach \
  -H "Content-Type: application/json" \
  -d '{"platform": "Upwork", "jobTitle": "Website for restaurant", "budget": "$500"}'
```

## Import More Apple Notes
```bash
python3 ~/Desktop/OPENCLAW/scripts/notes-import-v2.py
# Change MAX_NOTES in script to import more (currently 200 of 2937)
```

## What's Left (Manual)
1. **Agent! macOS app** → https://github.com/macOS26/Agent/releases (Logic Pro + Blender control)
2. **Nanobrowser** → Chrome extension from https://github.com/nanobrowser/nanobrowser (AI web browsing)
3. **Download models in LM Studio** → phi-4 (faster coding), Qwen2.5-3B (quick router)
4. **ComfyUI model** → Download a Stable Diffusion model to `tools/comfyui/ComfyUI/models/checkpoints/`
5. **Import all notes** → Increase MAX_NOTES in notes-import-v2.py to 2937

## Agents in Open WebUI (http://localhost:3000)
- **Orchestrator** — Plans and delegates tasks to other agents
- **Coder** — Writes and fixes code, scripts, automation
- **Marketer** — Social posts, promo copy, YouTube descriptions
- **Outreach** — Upwork/Fiverr proposals, client emails
- **Creative** — Blender prompts, album art ideas, visual concepts
- **Media** — Beat descriptions, YouTube SEO, music metadata

## Qdrant Collections
| Collection | Purpose |
|-----------|---------|
| shared | Apple Notes (200 imported) |
| beats | Beat metadata & promotion history |
| web-clients | Web design client briefs |
| 3d-animation | 3D/animation project notes |
| outreach | Proposal templates & history |
| spector | Personal/business notes |
| memory | mem0 agent memory store |
