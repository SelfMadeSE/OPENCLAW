#!/usr/bin/env python3
"""OPENCLAW Mission Runner — Autonomous mission orchestration."""
import os
import sys
import json
import time
import uuid
import urllib.request
from pathlib import Path
from datetime import datetime, timezone

BASE = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE))
sys.path.insert(0, str(BASE / "system" / "message_bus"))
sys.path.insert(0, str(BASE / "system" / "execution"))
sys.path.insert(0, str(BASE / "system" / "approval"))
sys.path.insert(0, str(BASE / "system" / "memory"))
sys.path.insert(0, str(BASE / "revenue"))

from bus import MessageBus
from task_contract import TaskContract
from approval import ApprovalSystem
from memory_bridge import MemoryBridge

LOGS_DIR = BASE / "logs"
LOGS_DIR.mkdir(exist_ok=True)

MISSION_TEMPLATES = {
    "document-the-machine": {
        "description": "Comprehensive documentation of the OPENCLAW system",
        "tasks": [
            {
                "agent": "engineering",
                "task": "technical-architecture",
                "filename": "architecture-document.md",
                "prompt": "Write a comprehensive technical architecture document for OPENCLAW. Cover: system components (7 Docker services + native services), agent system (7 agents with roles), execution layer (task contracts, quality gates), communication (message bus, rate limits, escalation), memory (short/long/shared, Qdrant), scheduler (6 tasks), approval system (4 tiers). Include data flow descriptions. Minimum 2000 characters.",
                "min_length": 2000,
            },
            {
                "agent": "marketing",
                "task": "strategy-brief",
                "filename": "marketing-strategy.md",
                "prompt": "Write a marketing strategy brief for OPENCLAW. Cover: target audience (indie devs, AI researchers, open source community), positioning ('The only local-first autonomous multi-agent system'), content pillars, growth channels (GitHub, HackerNews, Reddit, Twitter/X), key metrics, 30-60-90 day plan. Minimum 1500 characters.",
                "min_length": 1500,
            },
            {
                "agent": "creative",
                "task": "brand-identity",
                "filename": "brand-identity.md",
                "prompt": "Create a brand identity package for OPENCLAW. Include: 5 tagline options, visual direction (dark mode, terminal aesthetic, eagle/claw motif), color palette (#0D1117 black, #39D353 green, #F0883E amber), typography (monospace primary), tone of voice guide, logo concepts. Minimum 1500 characters.",
                "min_length": 1500,
            },
            {
                "agent": "outreach",
                "task": "template-set",
                "filename": "outreach-templates.md",
                "prompt": "Create an outreach template set: Fiverr gig description ('I will build you a local AI agent system'), cold email template for AI consultancy leads, LinkedIn message template, project proposal template, pricing tiers (Starter $500, Pro $2000, Enterprise $5000+). Minimum 2000 characters.",
                "min_length": 2000,
            },
            {
                "agent": "media",
                "task": "content-calendar",
                "filename": "content-calendar.md",
                "prompt": "Create a 30-day content calendar for OPENCLAW. Week 1-4 breakdown. Platforms: GitHub, Twitter/X, Reddit, YouTube. Post types: launch announcement, technical deep-dive, demo video, philosophy post. Specific topics per day, hashtags, communities. Minimum 1500 characters.",
                "min_length": 1500,
            },
            {
                "agent": "auditor",
                "task": "quality-audit",
                "filename": "audit-report.md",
                "prompt": "Write a quality audit report template. Include: review checklist (completeness, quality, accuracy, risk, format), scoring rubric (1-5), pass/revise/reject thresholds, feedback template, audit report format, review workflow. Minimum 1500 characters.",
                "min_length": 1500,
            },
        ],
    },
    "revenue-sprint": {
        "description": "Revenue generation sprint — create and deploy all outreach materials",
        "tasks": [
            {
                "agent": "outreach",
                "task": "fiverr-gig",
                "filename": "fiverr-gig.md",
                "prompt": "Write a complete Fiverr gig listing. Title, description, FAQ, pricing tiers, requirements, delivery timeline. Focus on: AI agent systems, web automation, local LLM setup.",
                "min_length": 1500,
            },
            {
                "agent": "marketing",
                "task": "email-campaign",
                "filename": "email-campaign.md",
                "prompt": "Write a 3-email cold outreach sequence targeting small business owners who need web development or AI automation. Include subject lines, body text, follow-up timing.",
                "min_length": 1500,
            },
            {
                "agent": "media",
                "task": "social-posts",
                "filename": "social-posts.md",
                "prompt": "Write 10 social media posts for Twitter/X and LinkedIn announcing OPENCLAW capabilities. Mix of technical, philosophical, and promotional.",
                "min_length": 1500,
            },
        ],
    },
}


def _log(event: str, data: dict):
    entry = {"ts": datetime.now(timezone.utc).isoformat(), "event": event, **data}
    with open(LOGS_DIR / "missions.jsonl", "a") as f:
        f.write(json.dumps(entry) + "\n")


class MissionRunner:
    def __init__(self):
        self.bus = MessageBus()
        self.approval = ApprovalSystem()
        self.memory = MemoryBridge()

    def run_mission(self, name: str, mission_id: str = None) -> dict:
        """Execute a named mission template."""
        if name not in MISSION_TEMPLATES:
            return {"error": f"Unknown mission: {name}. Available: {list(MISSION_TEMPLATES.keys())}"}

        template = MISSION_TEMPLATES[name]
        mission_id = mission_id or f"{name}-{uuid.uuid4().hex[:6]}"
        tasks = template["tasks"]

        _log("mission_start", {"mission_id": mission_id, "name": name, "tasks": len(tasks)})
        print(f"\n🚀 MISSION: {name} ({mission_id})")
        print(f"   {template['description']}")
        print(f"   {len(tasks)} tasks to execute\n")

        # Request approval
        req = self.approval.request_approval("orchestrator", "run_mission",
                                              {"mission": name, "mission_id": mission_id, "tasks": len(tasks)})
        _log("approval_requested", {"mission_id": mission_id, "result": req.get("status", "unknown")})

        # Write pre-mission memory
        self.memory.write(
            f"Starting mission '{name}' ({mission_id}): {template['description']}. {len(tasks)} tasks.",
            "short-term", agent="orchestrator", tags=["mission", "start"]
        )

        # Delegate via bus
        for t in tasks:
            msg = self.bus.send_message("orchestrator", t["agent"], t["prompt"], "high")
            if "error" in msg:
                print(f"   ⚠️  Bus send to {t['agent']}: {msg['error']}")
            else:
                print(f"   📨 → {t['agent']}: {t['task']}")

        # Execute each task
        results = []
        for t in tasks:
            print(f"\n   ⚙️  {t['agent']}/{t['task']}...", end=" ", flush=True)
            try:
                result = self._execute_task(mission_id, t)
                results.append(result)
                if result["success"]:
                    print(f"✅ ({result['size']} bytes)")
                else:
                    print(f"❌ {result.get('error', 'unknown')}")
            except Exception as e:
                results.append({"agent": t["agent"], "task": t["task"], "success": False, "error": str(e)})
                print(f"❌ {e}")

            # Acknowledge bus message
            msgs = self.bus.fetch_messages(t["agent"], status="pending")
            for m in msgs:
                if mission_id in m.get("task", "") or t["prompt"][:50] in m.get("task", ""):
                    self.bus.acknowledge_message(m["id"], result=f"Completed: {t['task']}")

        # Summary
        passed = sum(1 for r in results if r["success"])
        total = len(results)
        total_bytes = sum(r.get("size", 0) for r in results)

        _log("mission_complete", {
            "mission_id": mission_id, "passed": passed, "total": total, "bytes": total_bytes
        })

        # Post-mission memory
        self.memory.write(
            f"Mission '{name}' ({mission_id}) complete: {passed}/{total} tasks passed, {total_bytes} bytes produced.",
            "long-term", agent="orchestrator", tags=["mission", "complete"]
        )

        print(f"\n{'='*50}")
        print(f"MISSION RESULTS: {mission_id}")
        print(f"  {passed}/{total} tasks passed")
        print(f"  {total_bytes:,} bytes of artifacts")
        for r in results:
            status = "✅" if r["success"] else "❌"
            print(f"  {status} {r['agent']}/{r['task']}: {r.get('size', 0)} bytes")
        print(f"{'='*50}\n")

        return {
            "mission_id": mission_id,
            "name": name,
            "passed": passed,
            "total": total,
            "total_bytes": total_bytes,
            "results": results,
        }

    def _execute_task(self, mission_id: str, task_def: dict) -> dict:
        """Execute a single task using TaskContract."""
        agent = task_def["agent"]
        task_name = task_def["task"]
        filename = task_def["filename"]
        prompt = task_def["prompt"]
        min_length = task_def.get("min_length", 500)

        # Generate content using LM Studio
        content = self._generate_content(agent, prompt, min_length)
        if not content:
            return {"agent": agent, "task": task_name, "success": False, "error": "LLM generation failed"}

        # Write via task contract
        with TaskContract(agent=agent, mission=mission_id, task=task_name) as tc:
            artifact_path = tc.write(filename, content)

        return {
            "agent": agent,
            "task": task_name,
            "success": True,
            "path": str(artifact_path),
            "size": len(content.encode()),
        }

    def _generate_content(self, agent: str, prompt: str, min_length: int) -> str:
        """Generate content via LM Studio API."""
        system_prompt = f"You are the {agent} agent in the OPENCLAW autonomous multi-agent system. Produce detailed, high-quality output. No placeholders. No generic filler. Be specific and actionable."

        payload = json.dumps({
            "model": "qwen3.5-9b",
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt},
            ],
            "temperature": 0.7,
            "max_tokens": 4096,
            "stream": False,
        }).encode()

        try:
            req = urllib.request.Request(
                "http://localhost:1234/v1/chat/completions",
                data=payload,
                headers={"Content-Type": "application/json"},
            )
            with urllib.request.urlopen(req, timeout=120) as resp:
                data = json.loads(resp.read().decode())
                content = data["choices"][0]["message"]["content"]
                if len(content) < min_length:
                    # Retry with explicit length instruction
                    return self._generate_content(
                        agent,
                        f"{prompt}\n\nIMPORTANT: Your response MUST be at least {min_length} characters. Be thorough and detailed.",
                        min_length // 2  # Lower threshold on retry to avoid infinite loop
                    )
                return content
        except Exception as e:
            _log("llm_error", {"agent": agent, "error": str(e)})
            return None

    def list_missions(self) -> list:
        return [{"name": k, "description": v["description"], "tasks": len(v["tasks"])}
                for k, v in MISSION_TEMPLATES.items()]


def main():
    import argparse
    parser = argparse.ArgumentParser(description="OPENCLAW Mission Runner")
    sub = parser.add_subparsers(dest="command")

    run_p = sub.add_parser("run", help="Run a mission")
    run_p.add_argument("name", help="Mission template name")
    run_p.add_argument("--id", help="Custom mission ID")

    sub.add_parser("list", help="List available missions")

    args = parser.parse_args()
    runner = MissionRunner()

    if args.command == "list":
        for m in runner.list_missions():
            print(f"  📋 {m['name']}: {m['description']} ({m['tasks']} tasks)")
    elif args.command == "run":
        runner.run_mission(args.name, mission_id=args.id)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
