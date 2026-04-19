# OPENCLAW Demo Guide

## Prerequisites
1. Docker Desktop running
2. LM Studio running with models loaded
3. Environment configured (`.env` file)

## Quick Demo: System Health Check
```bash
cd /path/to/OPENCLAW
python3 system/orchestrator.py health
```
Expected output: All services GREEN, Qdrant collections listed, log files active.

## Full Demo: Inaugural Mission
```bash
# 1. Run system validation
python3 system/orchestrator.py validate

# 2. Start scheduler (background)
python3 system/scheduler/scheduler.py daemon &

# 3. Check message bus
python3 -c "from system.message_bus.bus import MessageBus; print(MessageBus().stats())"

# 4. View revenue pipeline
python3 -c "from revenue.revenue_tracker import RevenueTracker; print(RevenueTracker().report())"
```

## What to Observe
- **Logs**: `tail -f logs/events.jsonl` — real-time event stream
- **Messages**: `cat system/message_bus/queue.json` — agent communication
- **Artifacts**: `ls workspaces/*/artifacts/` — produced deliverables
- **Memory**: Qdrant dashboard at http://localhost:6333/dashboard

## Expected Deliverables (Inaugural Mission)
1. System architecture document (engineering)
2. Marketing strategy brief (marketing)
3. Brand identity package (creative)
4. Outreach template set (outreach)
5. Content calendar (media)
6. Quality audit report (auditor)
