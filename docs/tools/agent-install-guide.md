# Agent! — macOS App Automation with Local LLM

## What It Does
Controls ANY macOS app using natural language + your local LM Studio models.
- Logic Pro: "Export the latest beat as MP3 to ~/Desktop/OPENCLAW/outputs/beats/"
- Blender: "Render the current scene at 1920x1080"
- Finder: "Move all .wav files from Downloads to ~/Desktop/OPENCLAW/outputs/beats/"
- Safari: "Search for music blogs that accept beat submissions and save the list"
- iMessage: "Send a message to [contact] with the proposal text"
- Spotify: "Play my Focus playlist"

## Install
1. Go to: https://github.com/macOS26/Agent/releases
2. Download the latest .dmg or .zip
3. Drag to Applications
4. Open Agent!
5. Grant Accessibility permissions when prompted:
   System Settings > Privacy & Security > Accessibility > Agent!

## Configure LM Studio
In Agent! settings:
- Provider: LM Studio (or "OpenAI Compatible")
- Base URL: http://localhost:1234/v1
- API Key: sk-lm-lTx6H171:rNxT8R8M7ptHEyiQUU47
- Model: qwen3.5-27b-claude-4.6-opus-reasoning-distilled (for complex tasks)
  OR: qwen/qwen3.5-9b (for speed)

## Example Commands to Try
- "Open Logic Pro and show me the current project"
- "Export the last modified project in Logic Pro as MP3"
- "Open Blender and list the scenes in the current file"
- "Search the web for 'music producers wanted' and save results to ~/Desktop/OPENCLAW/outputs/content/leads.txt"
- "Open Notes app and show me notes about SPECTOR"
- "Batch rename all files in ~/Desktop/Instrumentals/ to include the date"

## Integration with OpenClaw
Agent! runs natively on macOS. It can be triggered:
- Manually (type a command)
- Via keyboard shortcut
- Via n8n HTTP node calling a local webhook (advanced)
