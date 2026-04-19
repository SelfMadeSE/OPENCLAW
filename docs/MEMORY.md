# OPENCLAW Memory System

## Memory Types

### Short-Term Memory
- **Storage**: Filesystem (`system/memory/short_term/`)
- **TTL**: 24 hours (auto-cleaned by scheduler)
- **Scope**: Per-task context
- **Use**: Working data during active missions

### Long-Term Memory
- **Storage**: Qdrant vector database (`memory` collection)
- **TTL**: Permanent
- **Scope**: Per-agent learnings
- **Use**: Lessons, patterns, preferences accumulated over time

### Shared Memory
- **Storage**: Qdrant vector database (`shared` collection)
- **TTL**: Permanent
- **Scope**: Cross-agent knowledge
- **Use**: System-wide facts, imported knowledge (e.g., Apple Notes), collaborative insights

## Memory Operations

### Writing Memory
```python
from system.memory.memory_bridge import MemoryBridge

mb = MemoryBridge()
mb.write(
    agent="engineering",
    content="JSON parsing with streaming is 3x faster for files > 10MB",
    memory_type="long_term",
    metadata={"kind": "learning", "topic": "performance"}
)
```

### Reading Memory
```python
results = mb.search(
    query="JSON parsing performance",
    memory_type="shared",
    agent="engineering",
    limit=5
)
```

### Agent Memory Protocol
1. **Pre-task**: `search()` for relevant context before starting
2. **Post-task**: `write()` key decisions and lessons after completing
3. **Format**: Always include `kind` (decision/event/learning) and `scope` (personal/shared)

## Qdrant Collections
| Collection | Vectors | Purpose |
|-----------|---------|---------|
| memory | Dynamic | Agent long-term memories |
| shared | 200+ | Cross-agent knowledge base |
| escalations | Dynamic | Red-tier escalation records |

## Memory Consolidation
The scheduler runs daily memory consolidation:
- Clean expired short-term memories
- Identify high-value short-term memories for promotion to long-term
- Deduplicate shared memory entries
