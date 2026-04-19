# Archived Files

These files have been archived because they are superseded by canonical implementations.
They are kept for reference only and are NOT part of the active runtime.

## mem0_memory_filter.py
Superseded by: system/memory/memory_bridge.py
Reason: mem0 pipeline ran in Pipelines container as a separate memory path disconnected from the canonical memory bridge. memory_bridge.py handles filesystem + Qdrant with agent attribution.

## lmstudio-proxy.mjs
Superseded by: scripts/lmstudio-proxy.py
Reason: Node.js proxy had a hardcoded API key and duplicated the Python proxy's functionality. Python proxy reads key from env and is simpler.

## import-notes.py
Superseded by: scripts/notes-import-v2.py
Reason: v2 is the updated implementation.

