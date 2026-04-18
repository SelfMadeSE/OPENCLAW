#!/usr/bin/env bash
# OPENCLAW Day-Zero Preflight Checklist
# Run this before every production session.
set -uo pipefail  # no -e: we handle errors via check()

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[0;33m'; NC='\033[0m'
PASS=0; FAIL=0; WARN=0

check() {
  local label="$1" result="$2"
  if [ "$result" = "PASS" ]; then
    echo -e "  ${GREEN}✅ PASS${NC}  $label"
    ((PASS++))
  elif [ "$result" = "WARN" ]; then
    echo -e "  ${YELLOW}⚠️  WARN${NC}  $label"
    ((WARN++))
  else
    echo -e "  ${RED}❌ FAIL${NC}  $label"
    ((FAIL++))
  fi
}

echo "╔══════════════════════════════════════════════════╗"
echo "║     OPENCLAW PREFLIGHT CHECKLIST                ║"
echo "║     $(date '+%Y-%m-%d %H:%M %Z')                      ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""

# 1. LM Studio
echo "▸ Model Layer"
source "$(dirname "$0")/../.env" 2>/dev/null || true
# Extract first key from semicolon-separated OPENAI_API_KEYS
LMS_KEY=$(echo "${OPENAI_API_KEYS:-${OPENAI_API_KEY:-}}" | cut -d';' -f1)
LMS=$(curl -sf -H "Authorization: Bearer ${LMS_KEY}" http://localhost:1234/v1/models 2>/dev/null | python3 -c "import sys,json; print(len(json.load(sys.stdin).get('data',[])))" 2>/dev/null || echo "0")
if [ "$LMS" -gt 0 ] 2>/dev/null; then check "LM Studio: $LMS models loaded" "PASS"; else check "LM Studio: not reachable or 0 models" "FAIL"; fi

# 2. Gateway
echo "▸ Gateway"
GW_RPC=$(openclaw gateway status --json 2>/dev/null | python3 -c "import sys,json; print(json.load(sys.stdin).get('rpc',{}).get('ok',False))" 2>/dev/null || echo "False")
[ "$GW_RPC" = "True" ] && check "Gateway RPC healthy" "PASS" || check "Gateway RPC" "FAIL"

# 3. Agents
AGENT_CT=$(openclaw agents list 2>/dev/null | grep -c "^-" || echo "0")
[ "$AGENT_CT" -ge 7 ] && check "Agent roster: $AGENT_CT agents" "PASS" || check "Agent roster: only $AGENT_CT agents" "FAIL"

# 4. Gateway /v1/models
echo "▸ API Surface"
source "$(dirname "$0")/../.env" 2>/dev/null || true
GW_MODELS=$(curl -sf -H "Authorization: Bearer ${OPENCLAW_GATEWAY_TOKEN:-none}" http://127.0.0.1:18789/v1/models 2>/dev/null | python3 -c "import sys,json; print(len(json.load(sys.stdin).get('data',[])))" 2>/dev/null || echo "0")
[ "$GW_MODELS" -ge 7 ] && check "Gateway API: $GW_MODELS models" "PASS" || check "Gateway API: only $GW_MODELS models" "FAIL"

# 5. Docker services
echo "▸ Docker Services"
for svc in openclaw-webui openclaw-pipelines openclaw-qdrant openclaw-n8n openclaw-postgres; do
  STATUS=$(docker inspect --format='{{.State.Status}}' "$svc" 2>/dev/null || echo "missing")
  [ "$STATUS" = "running" ] && check "$svc" "PASS" || check "$svc ($STATUS)" "FAIL"
done

# 6. Qdrant memory
echo "▸ Memory"
QD_PTS=$(curl -sf http://localhost:6333/collections/openclaw_core 2>/dev/null | python3 -c "import sys,json; print(json.load(sys.stdin).get('result',{}).get('points_count',0))" 2>/dev/null || echo "0")
[ "$QD_PTS" -gt 0 ] && check "Qdrant openclaw_core: $QD_PTS points" "PASS" || check "Qdrant openclaw_core: empty" "WARN"

# 7. WebUI
echo "▸ WebUI"
WEBUI=$(curl -sf -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null || echo "000")
[ "$WEBUI" = "200" ] && check "WebUI reachable (port 3000)" "PASS" || check "WebUI unreachable ($WEBUI)" "FAIL"

# 8. Hooks
echo "▸ Hooks"
HOOKS_READY=$(openclaw hooks check 2>/dev/null | grep -o 'Ready: [0-9]*' | grep -o '[0-9]*' || echo "0")
[ "$HOOKS_READY" -ge 3 ] && check "Hooks: $HOOKS_READY ready" "PASS" || check "Hooks: only $HOOKS_READY ready" "WARN"

# 9. Logs writable
echo "▸ Filesystem"
LOGS_DIR="$(cd "$(dirname "$0")/.." && pwd)/logs"
ARTS_DIR="$(cd "$(dirname "$0")/.." && pwd)/artifacts/runs"
mkdir -p "$LOGS_DIR" "$ARTS_DIR"
[ -w "$LOGS_DIR" ] && check "Logs directory writable" "PASS" || check "Logs directory" "FAIL"
[ -w "$ARTS_DIR" ] && check "Artifacts directory writable" "PASS" || check "Artifacts directory" "FAIL"

# 10. n8n
echo "▸ n8n"
N8N_WF=$(docker exec openclaw-n8n n8n list:workflow 2>/dev/null | wc -l | tr -d ' ')
[ "$N8N_WF" -ge 3 ] && check "n8n: $N8N_WF workflows" "PASS" || check "n8n: only $N8N_WF workflows" "WARN"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  PASS: $PASS  |  WARN: $WARN  |  FAIL: $FAIL"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ "$FAIL" -gt 0 ]; then
  echo -e "  ${RED}⛔ NOT READY — fix failures before proceeding${NC}"
  exit 1
elif [ "$WARN" -gt 0 ]; then
  echo -e "  ${YELLOW}⚠️  READY WITH WARNINGS — proceed with caution${NC}"
  exit 0
else
  echo -e "  ${GREEN}🟢 ALL CLEAR — ready for production run${NC}"
  exit 0
fi
