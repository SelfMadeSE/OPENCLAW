#!/bin/bash
# ============================================================
# OPENCLAW — Master Setup Script
# Runs after stack is started. Configures everything.
# ============================================================
set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
STACK_DIR="$(dirname "$SCRIPT_DIR")"

echo "🦅 OpenClaw Master Setup"
echo "========================"
echo ""

# 1. Configure Open WebUI agents
echo "Step 1/4: Configuring Open WebUI agents..."
python3 "$SCRIPT_DIR/setup-webui.py"
echo ""

# 2. Import Apple Notes
echo "Step 2/4: Importing Apple Notes to Qdrant..."
python3 "$SCRIPT_DIR/import-notes.py" || echo "  ⚠️  Notes import skipped (grant Terminal Full Disk Access in System Settings)"
echo ""

# 3. Setup n8n instructions
echo "Step 3/4: n8n setup instructions..."
"$SCRIPT_DIR/setup-n8n.sh"
echo ""

# 4. Final status
echo "Step 4/4: Final status check..."
"$SCRIPT_DIR/status.sh"
echo ""
echo "✅ Setup complete!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔜 NEXT: Install native macOS tools"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. AGENT! (Control Logic Pro, Blender, etc.):"
echo "   → Download: https://github.com/macOS26/Agent/releases"
echo "   → Guide: docs/tools/agent-install-guide.md"
echo ""
echo "2. COMFYUI (AI Image Generation - M4 fast!):"
echo "   → Run: ./scripts/install-comfyui.sh"
echo "   → Then: ./scripts/start-comfyui.sh"
echo ""
echo "3. NANOBROWSER (AI Web Scraping):"
echo "   → Install: https://github.com/nanobrowser/nanobrowser"
echo "   → Guide: docs/tools/nanobrowser-guide.md"
echo ""
echo "4. DOWNLOAD MORE MODELS in LM Studio:"
echo "   → mlx-community/Qwen2.5-9B-Instruct (best tool use)"
echo "   → mlx-community/phi-4 (fast coding)"
echo ""
