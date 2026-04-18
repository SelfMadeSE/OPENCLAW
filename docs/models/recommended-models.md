# Recommended Models for Apple M4 16GB

## Current Models in LM Studio (Already Loaded)
- qwen3.5-27b-claude-4.6-opus-reasoning-distilled → PRIMARY ORCHESTRATOR
- qwen/qwen3.5-9b → FAST WORKHORSE  
- google/gemma-4-e4b → MULTIMODAL/VISION
- text-embedding-nomic-embed-text-v1.5→ EMBEDDINGS (RAG)

## Download Next (LM Studio > Search Models)
| Model | Format | Size | Role | Search Term |
|-------|--------|------|------|-------------|
| Qwen2.5-9B-Instruct | MLX | ~7GB | Tool Use / Orchestrator | mlx-community/Qwen2.5-9B-Instruct |
| Phi-4 | MLX/GGUF | ~4GB | Coding Agent | mlx-community/phi-4 |
| Qwen2.5-3B | MLX | ~3GB | Fast Utility/Router | mlx-community/Qwen2.5-3B-Instruct |
| Mistral-7B-v0.3 | MLX | ~5GB | Marketing/Creative | mlx-community/Mistral-7B-Instruct-v0.3 |
| Llama-3.2-11B-Vision | MLX | ~8GB | Image/Design Analysis | mlx-community/Llama-3.2-11B-Vision |

## Memory Budget (16GB)
- qwen3.5-27b (reasoning) = ~14GB → load alone for complex planning
- qwen3.5-9b + gemma-4 + nomic-embed = ~10GB → everyday stack
- Phi-4 + Qwen2.5-3B + nomic-embed = ~9GB → fast coding stack

## Key Rules
- Always use MLX format on Apple Silicon (20-30% faster)
- Keep context window 2K-4K (not 8K+) to save RAM
- Reserve 2-3GB for macOS
- Best for tool/function calling: Qwen2.5-9B
