#!/bin/bash
# ============================================================
# ComfyUI Install Script — Apple Silicon (M4)
# Run this once. M4 generates images in 2-4 seconds!
# ============================================================
set -e

INSTALL_DIR="$HOME/Desktop/OPENCLAW/tools/comfyui"
mkdir -p "$INSTALL_DIR"
cd "$INSTALL_DIR"

echo "📦 Installing ComfyUI for Apple Silicon..."

# Clone if not exists
if [ ! -d "ComfyUI" ]; then
  git clone https://github.com/comfyanonymous/ComfyUI.git
fi

cd ComfyUI

# Create venv
if [ ! -d "venv" ]; then
  python3 -m venv venv
fi
source venv/bin/activate

echo "📥 Installing dependencies (MPS = Metal Performance Shaders)..."
pip install --quiet --upgrade pip
pip install --quiet torch torchvision torchaudio
pip install --quiet -r requirements.txt

echo ""
echo "✅ ComfyUI installed!"
echo ""
echo "To start ComfyUI:"
echo "  cd ~/Desktop/OPENCLAW/tools/comfyui/ComfyUI"
echo "  source venv/bin/activate"
echo "  python main.py --listen 0.0.0.0"
echo "  → http://localhost:8188"
echo ""
echo "Download a model (Stable Diffusion):"
echo "  mkdir -p models/checkpoints"
echo "  # Download a .safetensors model to models/checkpoints/"
echo "  # Recommended: SDXL-Turbo or SD 1.5 for speed"
echo ""
echo "n8n integration URL: http://host.docker.internal:8188"
