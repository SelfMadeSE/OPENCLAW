#!/bin/bash
# Start ComfyUI — AI image generation (M4 = 2-4s/image)
COMFYUI_DIR="$HOME/Desktop/OPENCLAW/tools/comfyui/ComfyUI"
cd "$COMFYUI_DIR"
source venv/bin/activate
echo "🎨 Starting ComfyUI at http://localhost:8188"
echo "   Docker containers access it via: http://host.docker.internal:8188"
python main.py --listen 0.0.0.0 --port 8188
