#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
STACK_DIR="$(dirname "$SCRIPT_DIR")"

echo "📊 OpenClaw Stack Status"
echo ""
docker compose --env-file "$STACK_DIR/.env" \
  -f "$STACK_DIR/docker/docker-compose.yml" ps
echo ""
LM_KEY=$(grep OPENAI_API_KEY "$STACK_DIR/.env" | cut -d= -f2)
echo "🧠 LM Studio Models:"
curl -s http://localhost:1234/v1/models \
  -H "Authorization: Bearer $LM_KEY" \
  | python3 -c "import sys,json; d=json.load(sys.stdin); [print(' •',m['id']) for m in d.get('data',[])]" 2>/dev/null \
  || echo "  LM Studio not running"
