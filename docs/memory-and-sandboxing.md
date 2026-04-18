# Memory, Sandboxing & Vector DB Research

## Key Findings

### Memory System
- **mem0** - Best for per-agent persistent memory (pip install mem0ai)
- **Qdrant** - Best vector DB for Apple Silicon (native arm64 Docker image)
- Open WebUI has built-in RAG but memory is per-knowledge-base, not per-agent

### Sandboxing on macOS
- **Best**: Docker container sandboxing (Python docker SDK)
- Firejail/nsjail = Linux only, won't work on macOS
- Use Docker socket mounted to agent container for spawning sandboxes

### Apple Notes Access
- Use AppleScript via `osascript` to read/write Notes
- Export to markdown → watch folder → auto-import to vector DB

### Recommended Stack
| Component | Tool |
|-----------|------|
| Vector DB | Qdrant (Docker, arm64) |
| Agent Memory | mem0 |
| Code Sandbox | Docker containers |
| Notes Access | AppleScript → Qdrant RAG |
| Document RAG | Open WebUI built-in |
