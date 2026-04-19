#!/bin/bash
set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
STACK_DIR="$(dirname "$SCRIPT_DIR")"

echo "🦅 Starting OpenClaw Stack..."
echo ""
echo "⚡ Checking LM Studio..."
LM_KEY=$(grep OPENAI_API_KEY "$STACK_DIR/.env" | cut -d= -f2)
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:1234/v1/models \
  -H "Authorization: Bearer $LM_KEY" 2>/dev/null || echo "000")

if [ "$HTTP_CODE" = "200" ]; then
  echo "  ✅ LM Studio running"
  curl -s http://localhost:1234/v1/models -H "Authorization: Bearer $LM_KEY" \
    | python3 -c "import sys,json; [print('    •', m['id']) for m in json.load(sys.stdin)['data']]" 2>/dev/null
else
  echo "  ⚠️  LM Studio not detected — open LM Studio and load a model first"
fi

echo ""
echo "🐳 Starting Docker services..."
cd "$STACK_DIR/docker"
docker compose --env-file "$STACK_DIR/.env" up -d

echo ""
echo "🔌 Starting OPENCLAW API server..."
if command -v uvicorn &>/dev/null; then
  # Source API token from .env
  export $(grep -E '^OPENCLAW_API_TOKEN=' "$STACK_DIR/.env" | xargs)
  cd "$STACK_DIR"
  uvicorn api.server:app --host 127.0.0.1 --port 18800 --log-level warning &
  API_PID=$!
  echo "  ✅ API server started (PID $API_PID) → http://localhost:18800"
  echo "$API_PID" > "$STACK_DIR/run/api.pid"
  mkdir -p "$STACK_DIR/run"
  echo "$API_PID" > "$STACK_DIR/run/api.pid"
else
  echo "  ⚠️  uvicorn not found — install with: pip install uvicorn fastapi"
  echo "     API server not started. Agents will not have system access."
fi

echo ""
echo "⏳ Waiting for services to be healthy..."
sleep 8

echo ""
echo "═══════════════════════════════════════════"
echo "  🟢 OpenClaw Stack Running!"
echo "═══════════════════════════════════════════"
echo "  Open WebUI  → http://localhost:3000"
echo "  OPENCLAW API→ http://localhost:18800"
echo "  n8n         → http://localhost:5678"
echo "  Flowise     → http://localhost:3001"
echo "  SearXNG     → http://localhost:8080"
echo "  Qdrant      → http://localhost:6333"
echo "  Pipelines   → http://localhost:9099"
echo "  LM Studio   → http://localhost:1234 (native)"
echo "═══════════════════════════════════════════"
echo "  Login: admin@local / ${WEBUI_ADMIN_PASSWORD}"
echo "═══════════════════════════════════════════"
