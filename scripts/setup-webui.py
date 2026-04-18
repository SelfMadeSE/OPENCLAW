#!/usr/bin/env python3
"""
Auto-configure Open WebUI — creates all 6 specialized agents
Run after Open WebUI is started: python3 scripts/setup-webui.py
"""
import urllib.request
import urllib.parse
import json
import time
import sys
import os

WEBUI_URL = "http://localhost:3000"
ADMIN_EMAIL = "admin@local"
ADMIN_PASSWORD = "HtKc0jmGdOk0cmEE6mCR1UJ"
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
AGENTS_DIR = os.path.join(os.path.dirname(SCRIPT_DIR), "agents")

def api(path, method="GET", data=None, token=None):
    url = f"{WEBUI_URL}{path}"
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    body = json.dumps(data).encode() if data else None
    req = urllib.request.Request(url, data=body, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=10) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        return {"error": e.read().decode()}

def wait_for_webui():
    print("⏳ Waiting for Open WebUI...", end="", flush=True)
    for _ in range(60):
        try:
            urllib.request.urlopen(f"{WEBUI_URL}/health", timeout=3)
            print(" ✅")
            return True
        except:
            print(".", end="", flush=True)
            time.sleep(3)
    print(" ❌ Timeout")
    return False

def get_token():
    result = api("/api/v1/auths/signin", "POST", {
        "email": ADMIN_EMAIL, "password": ADMIN_PASSWORD
    })
    if "token" in result:
        print(f"  ✅ Authenticated as {ADMIN_EMAIL}")
        return result["token"]
    # Try signup first (fresh install)
    result = api("/api/v1/auths/signup", "POST", {
        "name": "Rylee", "email": ADMIN_EMAIL, "password": ADMIN_PASSWORD
    })
    if "token" in result:
        print(f"  ✅ Created admin account + authenticated")
        return result["token"]
    print(f"  ❌ Auth failed: {result}")
    return None

def read_prompt(agent_name):
    path = os.path.join(AGENTS_DIR, agent_name, "system-prompt.md")
    if os.path.exists(path):
        with open(path) as f:
            content = f.read()
        # Extract system prompt section (after the header metadata)
        lines = content.split("\n")
        in_instructions = False
        prompt_lines = []
        for line in lines:
            if line.startswith("## Instructions"):
                in_instructions = True
                continue
            if in_instructions:
                prompt_lines.append(line)
        return "\n".join(prompt_lines).strip() if prompt_lines else content
    return ""

AGENTS = [
    {
        "id": "openclaw-orchestrator",
        "name": "🦅 Orchestrator",
        "base_model_id": "qwen3.5-27b-claude-4.6-opus-reasoning-distilled",
        "folder": "orchestrator",
        "description": "Master planner — breaks goals into tasks, delegates to specialized agents, tracks progress",
        "tags": ["orchestrator", "planner", "team-lead"],
        "profile_image_url": "/static/favicon.png",
    },
    {
        "id": "openclaw-coder",
        "name": "💻 Coder",
        "base_model_id": "qwen/qwen3.5-9b",
        "folder": "coder",
        "description": "Python automation, API integrations, macOS scripting, Docker, web scraping, Blender bpy",
        "tags": ["coding", "automation", "python"],
    },
    {
        "id": "openclaw-marketer",
        "name": "📢 Marketer",
        "base_model_id": "qwen/qwen3.5-9b",
        "folder": "marketer",
        "description": "Social media copy, email campaigns, YouTube metadata, SEO, brand voice",
        "tags": ["marketing", "copywriting", "social-media"],
    },
    {
        "id": "openclaw-outreach",
        "name": "🤝 Outreach",
        "base_model_id": "qwen/qwen3.5-9b",
        "folder": "outreach",
        "description": "Fiverr/Upwork proposals, client quotes, web design & 3D animation pricing, cold outreach",
        "tags": ["outreach", "proposals", "freelance", "sales"],
    },
    {
        "id": "openclaw-creative",
        "name": "🎨 Creative",
        "base_model_id": "qwen3.5-27b-claude-4.6-opus-reasoning-distilled",
        "folder": "creative",
        "description": "Lyrics, song concepts, visual briefs, brand storytelling, 3D scene descriptions, image prompts",
        "tags": ["creative", "lyrics", "visual", "art-direction"],
    },
    {
        "id": "openclaw-media",
        "name": "📺 Media",
        "base_model_id": "qwen/qwen3.5-9b",
        "folder": "media",
        "description": "YouTube strategy, beat promotion, content calendar, platform growth, analytics",
        "tags": ["youtube", "media", "promotion", "content"],
    },
]

def create_agents(token):
    print("\n🤖 Creating agents in Open WebUI...")
    for agent in AGENTS:
        system_prompt = read_prompt(agent["folder"])
        payload = {
            "id": agent["id"],
            "name": agent["name"],
            "base_model_id": agent["base_model_id"],
            "meta": {
                "description": agent["description"],
                "tags": [{"name": t} for t in agent.get("tags", [])],
                "profile_image_url": agent.get("profile_image_url", ""),
                "capabilities": {
                    "vision": agent["base_model_id"] == "google/gemma-4-e4b",
                    "web_search": True,
                    "code_execution": True,
                }
            },
            "params": {
                "system": system_prompt,
                "temperature": 0.7,
            },
            "is_active": True,
        }
        result = api("/api/v1/models/create", "POST", payload, token)
        if "id" in result or result.get("detail") == "Model already exists.":
            print(f"  ✅ {agent['name']}")
        else:
            print(f"  ⚠️  {agent['name']}: {result.get('detail', result)}")
            # Try update instead
            result2 = api(f"/api/v1/models/{agent['id']}", "POST", payload, token)
            if "id" in result2:
                print(f"     Updated existing model")

def configure_settings(token):
    print("\n⚙️  Configuring Open WebUI settings...")
    # Enable RAG web search
    settings = api("/api/v1/configs/export", "GET", token=token)
    print(f"  ✅ Settings accessible")

def main():
    print("🦅 OpenClaw — Open WebUI Auto-Configuration")
    print("=" * 50)

    if not wait_for_webui():
        print("Open WebUI not reachable. Start it first: ./scripts/start.sh")
        sys.exit(1)

    print("\n🔐 Authenticating...")
    token = get_token()
    if not token:
        print("Auth failed. Check admin credentials in .env")
        sys.exit(1)

    create_agents(token)

    print("\n" + "=" * 50)
    print("✅ Open WebUI configured!")
    print("\nNext steps:")
    print("  1. Open http://localhost:3000")
    print("  2. Each agent appears in the model selector")
    print("  3. Connect Pipelines: Settings > Connections")
    print("     URL: http://localhost:9099  Key: 0p3n-w3bu!")
    print("  4. Enable Web Search per model in model settings")
    print("=" * 50)

if __name__ == "__main__":
    main()
