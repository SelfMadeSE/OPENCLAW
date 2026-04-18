#!/bin/bash
# ============================================================
# n8n Setup Script — Configure LM Studio + Import Workflows
# Run AFTER stack is started
# ============================================================
set -e

N8N_URL="http://localhost:5678"
echo "⏳ Waiting for n8n to be ready..."
for i in $(seq 1 20); do
  if curl -s "$N8N_URL/healthz" | grep -q "ok"; then
    echo "✅ n8n ready"
    break
  fi
  sleep 3
done

echo ""
echo "📋 MANUAL SETUP STEPS FOR n8n:"
echo "──────────────────────────────────────────────────────"
echo "1. Open: http://localhost:5678"
echo "2. Create account (first-time setup)"
echo ""
echo "3. Add LM Studio Credential:"
echo "   Settings > Credentials > Add Credential > OpenAI"
echo "   Name: LM Studio Local"
echo "   API Key: sk-lm-lTx6H171:rNxT8R8M7ptHEyiQUU47"
echo "   Base URL: http://host.docker.internal:1234/v1"
echo ""
echo "4. Import Workflows:"
echo "   Workflows > Import from File"
echo "   Import these files:"
echo "   • ~/Desktop/OPENCLAW/projects/beats/n8n-beat-promotion-workflow.json"
echo "   • ~/Desktop/OPENCLAW/projects/beats/n8n-youtube-metadata-workflow.json"
echo "   • ~/Desktop/OPENCLAW/projects/web-clients/n8n-outreach-workflow.json"
echo ""
echo "5. In each workflow, update the OpenAI node credentials to 'LM Studio Local'"
echo "──────────────────────────────────────────────────────"
echo ""
echo "Opening n8n in browser..."
open "http://localhost:5678"
