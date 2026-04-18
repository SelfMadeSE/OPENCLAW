# Open WebUI Agent Capabilities

## Core Agent Powers
- search_web(), fetch_url() — web browsing
- execute_code() — sandboxed Python
- search_memories(), add_memory() — persistent per-user memory
- generate_image(), edit_image() — image creation
- MCP + OpenAPI tool servers — connect any external API

## Pipelines (Heavy Compute)
- Install via Docker: `ghcr.io/open-webui/pipelines:main` on port 9099
- Add in Settings > Connections > OpenAI > URL: http://localhost:9099
- Key examples: mem0 memory filter, function calling, rate limiting, RAG

## Built-in Tool Functions
search_web, fetch_url, execute_code, search_memories, add_memory,
generate_image, edit_image, list_knowledge_bases, query_knowledge_bases,
search_notes, write_note, search_chats

## Community Examples
https://github.com/open-webui/pipelines/tree/main/examples
- filters/ (16+ middleware)
- pipelines/rag/ (LlamaIndex, etc)
- pipelines/providers/ (model provider integrations)
