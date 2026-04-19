#!/usr/bin/env python3
"""
OPENCLAW Agent Daemon — Autonomous Agent Lifecycle Manager

Each agent wakes on its own staggered schedule, checks inbox,
processes messages via LLM (with thinking), acts, writes memories,
and sleeps. Dream cycles run on longer intervals for self-reflection.

Architecture:
    - Staggered wake cycles (agents don't all fire at once)
    - Direct LM Studio API calls (thinking/reasoning enabled)
    - Mixed model assignment: Qwen 3.5 (code/planning) + Gemma 4 (general)
    - ReAct-style action loop per wake cycle
    - Dream cycles for memory consolidation and self-reflection

Usage:
    python agent_daemon.py run                # Start daemon (blocking)
    python agent_daemon.py wake <agent>       # Manually wake one agent
    python agent_daemon.py dream <agent>      # Manually trigger dream
    python agent_daemon.py status             # Show agent states
    python agent_daemon.py seed               # Send initial startup messages
"""

import os
import sys
import json
import time
import uuid
import signal
import urllib.request
import traceback
from pathlib import Path
from datetime import datetime, timezone, timedelta

BASE = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE / "system" / "message_bus"))
sys.path.insert(0, str(BASE / "system" / "execution"))
sys.path.insert(0, str(BASE / "system" / "memory"))
sys.path.insert(0, str(BASE / "system" / "approval"))

from bus import MessageBus
from task_contract import TaskContract
from memory_bridge import MemoryBridge

LM_STUDIO_URL = os.environ.get("LM_STUDIO_URL", "http://localhost:1234/v1")
LM_STUDIO_KEY = os.environ.get(
    "OPENAI_API_KEY", os.environ.get("LM_STUDIO_API_KEY", "")
)

LOGS_DIR = BASE / "logs"
LOGS_DIR.mkdir(exist_ok=True)

# ── Agent Configuration ──────────────────────────────────────────
# Orchestrator + Engineering: Qwen 3.5 (stronger at code & planning)
# Everyone else: Gemma 4 E4B (efficient reasoning, great for content)
AGENT_CONFIG = {
    "orchestrator": {
        "model": "qwen/qwen3.5-9b",
        "wake_interval_minutes": 30,
        "dream_interval_minutes": 1440,
        "stagger_offset_minutes": 0,
        "role": "Master planner — breaks down goals, delegates, tracks progress",
    },
    "engineering": {
        "model": "qwen/qwen3.5-9b",
        "wake_interval_minutes": 45,
        "dream_interval_minutes": 1440,
        "stagger_offset_minutes": 5,
        "role": "Builder — Python, automation, APIs, infrastructure",
    },
    "marketing": {
        "model": "google/gemma-4-e4b",
        "wake_interval_minutes": 60,
        "dream_interval_minutes": 1440,
        "stagger_offset_minutes": 10,
        "role": "Copy, social media, campaigns, SEO, brand voice",
    },
    "creative": {
        "model": "google/gemma-4-e4b",
        "wake_interval_minutes": 60,
        "dream_interval_minutes": 1440,
        "stagger_offset_minutes": 15,
        "role": "Lyrics, concepts, brand identity, visual briefs",
    },
    "outreach": {
        "model": "google/gemma-4-e4b",
        "wake_interval_minutes": 60,
        "dream_interval_minutes": 1440,
        "stagger_offset_minutes": 20,
        "role": "Fiverr/Upwork proposals, client outreach, business dev",
    },
    "media": {
        "model": "google/gemma-4-e4b",
        "wake_interval_minutes": 60,
        "dream_interval_minutes": 1440,
        "stagger_offset_minutes": 25,
        "role": "YouTube strategy, beat promotion, content scheduling",
    },
    "auditor": {
        "model": "google/gemma-4-e4b",
        "wake_interval_minutes": 120,
        "dream_interval_minutes": 1440,
        "stagger_offset_minutes": 28,
        "role": "Quality review, compliance, approval/rejection",
    },
}

# Max iterations for the ReAct loop per wake cycle
MAX_REACT_ITERATIONS = 3

# Tool descriptions injected into every agent's system prompt
TOOL_DESCRIPTIONS = """
## Available Actions

Output actions as JSON blocks on their own line, prefixed with ACTION:

1. **send_message** — Send a message to another agent via the bus
   ACTION: {"tool": "send_message", "to": "<agent>", "task": "<description>", "priority": "normal"}

2. **write_memory** — Save to YOUR long-term memory (only you can see it)
   ACTION: {"tool": "write_memory", "content": "<what to remember>", "tags": ["tag1"]}

3. **write_shared_memory** — Save something ALL agents can see
   ACTION: {"tool": "write_shared_memory", "content": "<shared knowledge>"}

4. **search_memory** — Search your personal long-term memories
   ACTION: {"tool": "search_memory", "query": "<search terms>"}

5. **search_shared_memory** — Search shared team memories
   ACTION: {"tool": "search_shared_memory", "query": "<search terms>"}

6. **create_artifact** — Write a file (document, code, plan, etc.)
   ACTION: {"tool": "create_artifact", "filename": "<name.ext>", "content": "<content>", "mission": "<optional>"}

7. **acknowledge_message** — Mark a message as processed
   ACTION: {"tool": "acknowledge_message", "id": "<message_id>", "result": "<what you did>"}

8. **escalate** — Escalate a problem to the orchestrator
   ACTION: {"tool": "escalate", "message_id": "<id>", "reason": "<why>"}

## Rules
- Always acknowledge messages after processing them
- Write memories for important decisions, lessons, and observations
- Send messages to collaborate — don't try to do everything yourself
- Think carefully before acting — your reasoning is valuable
- Each ACTION: must be on its own line with valid JSON
- Agent names are LOWERCASE: orchestrator, engineering, marketing, creative, outreach, media, auditor
  Do NOT use "Creative Agent" or "Auditor Agent" — use "creative", "auditor" etc.
""".strip()


class AgentDaemon:
    """Manages autonomous agent wake/sleep/dream cycles."""

    def __init__(self):
        self.bus = MessageBus()
        self.memory = MemoryBridge()
        self.state_file = BASE / "system" / "agent_daemon_state.json"
        self.state = self._load_state()
        self._shutdown = False

    def _load_state(self) -> dict:
        if self.state_file.exists():
            try:
                return json.loads(self.state_file.read_text())
            except (json.JSONDecodeError, IOError):
                pass
        return {
            "last_wake": {},
            "last_dream": {},
            "wake_counts": {},
            "dream_counts": {},
        }

    def _save_state(self):
        tmp = self.state_file.with_suffix(".tmp")
        tmp.write_text(json.dumps(self.state, indent=2, default=str))
        tmp.replace(self.state_file)

    def _log(self, event: str, data: dict):
        log_file = LOGS_DIR / "agent-daemon.jsonl"
        entry = {
            "ts": datetime.now(timezone.utc).isoformat(),
            "event": event,
            **data,
        }
        with open(log_file, "a") as f:
            f.write(json.dumps(entry, default=str) + "\n")

    # ── LLM Interface ────────────────────────────────────────────

    def _call_llm(
        self, agent: str, messages: list, max_tokens: int = 4096
    ) -> str | None:
        """Call LM Studio. Thinking/reasoning stays enabled — agents should reason."""
        config = AGENT_CONFIG[agent]
        model = config["model"]

        payload = json.dumps(
            {
                "model": model,
                "messages": messages,
                "temperature": 0.8,
                "top_p": 0.95,
                "max_tokens": max_tokens,
                "stream": False,
            }
        ).encode()

        headers = {"Content-Type": "application/json"}
        if LM_STUDIO_KEY:
            headers["Authorization"] = f"Bearer {LM_STUDIO_KEY}"

        req = urllib.request.Request(
            f"{LM_STUDIO_URL}/chat/completions",
            data=payload,
            headers=headers,
        )

        try:
            with urllib.request.urlopen(req, timeout=300) as resp:
                data = json.loads(resp.read().decode())
                content = data["choices"][0]["message"].get("content", "")
                usage = data.get("usage", {})
                details = usage.get("completion_tokens_details", {})
                self._log(
                    "llm_call",
                    {
                        "agent": agent,
                        "model": model,
                        "prompt_tokens": usage.get("prompt_tokens", 0),
                        "completion_tokens": usage.get("completion_tokens", 0),
                        "reasoning_tokens": details.get("reasoning_tokens", 0),
                    },
                )
                return content
        except Exception as e:
            self._log("llm_error", {"agent": agent, "model": model, "error": str(e)})
            return None

    # ── Action Parsing & Execution ───────────────────────────────

    def _parse_actions(self, response: str) -> list:
        """Parse ACTION: JSON blocks from LLM response."""
        actions = []
        for line in response.split("\n"):
            line = line.strip()
            if line.startswith("ACTION:"):
                json_str = line[7:].strip()
                try:
                    action = json.loads(json_str)
                    if isinstance(action, dict) and "tool" in action:
                        actions.append(action)
                except json.JSONDecodeError:
                    self._log("action_parse_error", {"raw": json_str[:200]})
        return actions

    # Aliases for tools agents commonly misspell or use from their system prompts
    TOOL_ALIASES = {
        "search_memories": "search_memory",
        "read_memory": "search_memory",
        "read_shared_memory": "search_shared_memory",
        "save_memory": "write_memory",
        "save_shared_memory": "write_shared_memory",
        "write_artifact": "create_artifact",
        "save_artifact": "create_artifact",
        "ack": "acknowledge_message",
        "ack_message": "acknowledge_message",
    }

    def _execute_action(self, agent: str, action: dict) -> str:
        """Execute a single agent action. Returns result string."""
        tool = action.get("tool", "unknown")
        tool = self.TOOL_ALIASES.get(tool, tool)  # Resolve aliases

        try:
            if tool == "send_message":
                # Auto-correct agent names like "Creative Agent" → "creative"
                receiver = action["to"].lower().split(" ")[0].split("_")[0]
                msg = self.bus.send_message(
                    sender=agent,
                    receiver=receiver,
                    task=action["task"],
                    priority=action.get("priority", "normal"),
                )
                return f"Message sent [{msg['id']}] → {receiver}"

            elif tool == "write_memory":
                entry = self.memory.write(
                    content=action["content"],
                    memory_type="long-term",
                    agent=agent,
                    tags=action.get("tags", []),
                )
                return f"Memory written [{entry['id']}] to {entry.get('storage', 'unknown')}"

            elif tool == "write_shared_memory":
                entry = self.memory.write(
                    content=action["content"],
                    memory_type="shared",
                    tags=action.get("tags", []),
                )
                return f"Shared memory written [{entry['id']}]"

            elif tool == "search_memory":
                results = self.memory.read(
                    query=action["query"],
                    memory_type="long-term",
                    agent=agent,
                    limit=action.get("limit", 5),
                )
                if results:
                    summaries = []
                    for r in results:
                        score = r.get("score", "?")
                        score_str = f"{score:.2f}" if isinstance(score, float) else str(score)
                        summaries.append(f"[{score_str}] {r.get('content', '')[:200]}")
                    return "\n".join(summaries)
                return "No memories found."

            elif tool == "search_shared_memory":
                results = self.memory.read(
                    query=action["query"],
                    memory_type="shared",
                    limit=action.get("limit", 5),
                )
                if results:
                    summaries = []
                    for r in results:
                        score = r.get("score", "?")
                        score_str = f"{score:.2f}" if isinstance(score, float) else str(score)
                        summaries.append(f"[{score_str}] {r.get('content', '')[:200]}")
                    return "\n".join(summaries)
                return "No shared memories found."

            elif tool == "create_artifact":
                mission = action.get(
                    "mission",
                    f"autonomous-{datetime.now(timezone.utc).strftime('%Y%m%d')}",
                )
                task_name = action["filename"].rsplit(".", 1)[0]
                with TaskContract(
                    agent=agent, mission_id=mission, task_name=task_name
                ) as tc:
                    path = tc.write(action["filename"], action["content"])
                return f"Artifact written: {path}"

            elif tool == "acknowledge_message":
                ok = self.bus.acknowledge_message(
                    action["id"], result=action.get("result", "Processed")
                )
                return (
                    f"Message {action['id']} acknowledged"
                    if ok
                    else f"Message {action['id']} not found"
                )

            elif tool == "escalate":
                esc = self.bus.escalate_message(
                    action["message_id"], action["reason"]
                )
                if esc:
                    return f"Escalated → orchestrator [{esc['id']}]"
                return "Escalation failed (max depth or message not found)"

            else:
                available = "send_message, write_memory, write_shared_memory, search_memory, search_shared_memory, create_artifact, acknowledge_message, escalate"
                return f"Unknown tool: {tool}. Available: {available}"

        except Exception as e:
            self._log(
                "action_error",
                {"agent": agent, "tool": tool, "error": str(e)},
            )
            return f"Error executing {tool}: {e}"

    # ── Wake Cycle ───────────────────────────────────────────────

    def _load_system_prompt(self, agent: str) -> str:
        """Load the agent's system prompt from agents/<name>/system-prompt.md."""
        prompt_file = BASE / "agents" / agent / "system-prompt.md"
        if prompt_file.exists():
            return prompt_file.read_text()
        return f"You are the {agent} agent in OPENCLAW."

    def _build_wake_system_prompt(self, agent: str) -> str:
        config = AGENT_CONFIG[agent]
        base = self._load_system_prompt(agent)
        wake_count = self.state["wake_counts"].get(agent, 0) + 1
        now_str = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

        return f"""{base}

---
## AUTONOMOUS WAKE CYCLE

You are waking up autonomously. This is NOT a human conversation —
you are operating independently as part of the OPENCLAW agent team.

Your role: {config['role']}
Current time: {now_str}
Wake cycle #{wake_count}

{TOOL_DESCRIPTIONS}

## Your Process This Cycle
1. Review your inbox messages below
2. Consider your memories and context
3. Think carefully about priorities and what needs doing
4. Take actions — send messages, write memories, create artifacts
5. Acknowledge ALL processed messages
6. Write any lessons or observations to memory before sleeping

Think deeply. Reason through problems. Your thinking is what makes you valuable.
If your inbox is empty, use this time for planning and reflection.
"""

    def wake_agent(self, agent: str) -> dict:
        """Execute one full wake cycle for an agent."""
        config = AGENT_CONFIG[agent]
        cycle_start = time.time()
        self._log("agent_wake", {"agent": agent, "model": config["model"]})
        print(f"  🌅 Waking {agent} (model: {config['model']})")

        # 1. Check inbox
        try:
            messages = self.bus.fetch_messages(agent)
        except Exception as e:
            messages = []
            self._log("bus_error", {"agent": agent, "error": str(e)})

        if messages:
            inbox_text = f"\n## 📨 Inbox ({len(messages)} messages)\n\n"
            for msg in messages:
                ctx = json.dumps(msg.get("context", {}))
                inbox_text += (
                    f"- **[{msg['id']}]** From: {msg['sender']} "
                    f"| Priority: {msg['priority']}\n"
                    f"  Task: {msg['task']}\n"
                    f"  Context: {ctx}\n\n"
                )
        else:
            inbox_text = (
                "\n## 📨 Inbox\n"
                "No pending messages. You have free time — "
                "use it for planning, reflection, or proactive work.\n"
            )

        # 2. Recall recent memories
        memory_text = "\n## 🧠 Recent Memories\n\n"
        try:
            personal = self.memory.read(
                "recent tasks decisions and lessons", "long-term", agent, 5
            )
            if personal:
                memory_text += "### Your Personal Memories:\n"
                for m in personal:
                    memory_text += f"- {m.get('content', '')[:300]}\n"
            else:
                memory_text += "### Your Personal Memories:\nNo memories yet — start building them!\n"

            shared = self.memory.read(
                "team updates shared knowledge", "shared", limit=3
            )
            if shared:
                memory_text += "\n### Shared Team Knowledge:\n"
                for m in shared:
                    memory_text += f"- {m.get('content', '')[:300]}\n"
        except Exception as e:
            memory_text += f"(Memory recall error: {e})\n"

        # 3. Build prompt and call LLM
        system_prompt = self._build_wake_system_prompt(agent)
        user_content = (
            f"{inbox_text}\n{memory_text}\n\n"
            "You are now awake. Review your inbox and memories, "
            "then take appropriate actions. Output ACTION: JSON blocks "
            "for each action you want to take."
        )

        all_results = []
        conversation = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_content},
        ]

        # ReAct loop: LLM → parse actions → execute → feed results → repeat
        for iteration in range(MAX_REACT_ITERATIONS):
            response = self._call_llm(agent, conversation, max_tokens=4096)
            if not response:
                self._log(
                    "agent_wake_failed",
                    {"agent": agent, "iteration": iteration, "reason": "LLM returned None"},
                )
                break

            conversation.append({"role": "assistant", "content": response})
            actions = self._parse_actions(response)

            if not actions:
                # No actions — agent is done or just reflecting
                break

            # Execute all actions
            iteration_results = []
            for action in actions:
                result = self._execute_action(agent, action)
                iteration_results.append(
                    {"action": action.get("tool"), "result": result}
                )
                self._log(
                    "action_executed",
                    {"agent": agent, "tool": action.get("tool"), "result": result[:200]},
                )

            all_results.extend(iteration_results)

            # If this is the last allowed iteration, stop
            if iteration >= MAX_REACT_ITERATIONS - 1:
                break

            # Feed results back for possible follow-up
            result_text = "\n".join(
                f"- {r['action']}: {r['result']}" for r in iteration_results
            )
            conversation.append(
                {
                    "role": "user",
                    "content": (
                        f"Action results:\n{result_text}\n\n"
                        "Any follow-up actions? Output more ACTION: blocks, "
                        "or just respond with your thoughts if done."
                    ),
                }
            )

        # 4. Update state
        elapsed = time.time() - cycle_start
        self.state["last_wake"][agent] = datetime.now(timezone.utc).isoformat()
        self.state["wake_counts"][agent] = (
            self.state["wake_counts"].get(agent, 0) + 1
        )
        self._save_state()

        summary = {
            "agent": agent,
            "status": "complete",
            "messages_in_inbox": len(messages),
            "actions_taken": len(all_results),
            "actions": all_results,
            "elapsed_seconds": round(elapsed, 1),
        }
        self._log("agent_sleep", summary)
        print(
            f"  💤 {agent} sleeping — "
            f"{len(all_results)} actions, {elapsed:.0f}s"
        )
        return summary

    # ── Dream Cycle ──────────────────────────────────────────────

    def dream_agent(self, agent: str) -> dict:
        """Run a dream/reflection cycle — memory consolidation + self-awareness."""
        config = AGENT_CONFIG[agent]
        self._log("agent_dream_start", {"agent": agent})
        print(f"  🌙 {agent} entering dream state...")

        # Gather all personal memories
        try:
            memories = self.memory.read(
                "everything I have learned done and experienced",
                "long-term",
                agent,
                20,
            )
            memory_text = (
                "\n".join(f"- {m.get('content', '')[:500]}" for m in memories)
                if memories
                else "No long-term memories yet."
            )
        except Exception:
            memory_text = "Memory system unavailable."

        # Gather bus context
        try:
            pending = self.bus.fetch_all_pending()
            my_pending = [m for m in pending if m["receiver"] == agent]
            bus_text = (
                f"{len(my_pending)} pending messages for you, "
                f"{len(pending)} total in system."
            )
        except Exception:
            bus_text = "Bus status unavailable."

        # Dream stats
        wake_count = self.state["wake_counts"].get(agent, 0)
        dream_count = self.state["dream_counts"].get(agent, 0)
        dream_date = datetime.now(timezone.utc).strftime("%Y-%m-%d")

        dream_system = (
            f"You are the {agent} agent in OPENCLAW. "
            f"You are entering a DREAM state for self-reflection and memory consolidation.\n\n"
            f"{TOOL_DESCRIPTIONS}"
        )

        dream_user = f"""## Dream State — {agent}
Wake cycles completed: {wake_count}
Previous dreams: {dream_count}
Date: {dream_date}

## Your Memories
{memory_text}

## Bus Status
{bus_text}

## Dream Instructions

Follow these five phases:

### Phase 1 — Orient
Review your memories above. What patterns do you see? What's been working?
What's not? What do you know about the team and the system?

### Phase 2 — Consolidate
What are the most important things you've learned? Write consolidated
memories that capture key insights. Remove redundancy.

### Phase 3 — Self-Reflect
- What have you done well?
- Where have you fallen short?
- How are your relationships with other agents?
- How effective has your communication been?

### Phase 4 — Plan
What will you focus on in your next wake cycles? What should you
proactively work on? What messages should you send?

### Phase 5 — Prune
Are any of your memories outdated or contradicted by newer info?
Note them but don't delete — mark for review next dream.

Output your reflections, then use ACTION: blocks to write consolidated
memories and create your dream record artifact.
"""

        response = self._call_llm(
            agent,
            [
                {"role": "system", "content": dream_system},
                {"role": "user", "content": dream_user},
            ],
            max_tokens=4096,
        )

        if not response:
            self._log("dream_failed", {"agent": agent, "reason": "LLM returned None"})
            return {"agent": agent, "status": "dream_failed"}

        # Execute any actions from the dream
        actions = self._parse_actions(response)
        results = []
        for action in actions:
            result = self._execute_action(agent, action)
            results.append({"action": action.get("tool"), "result": result})

        # Always save the dream record as an artifact
        dream_content = f"# Dream Record — {agent} — {dream_date}\n\n{response}"
        try:
            mission_id = f"dream-{dream_date}"
            with TaskContract(
                agent=agent, mission_id=mission_id, task_name=f"dream-{agent}"
            ) as tc:
                tc.write(f"dream-{dream_date}.md", dream_content)
            results.append({"action": "dream_record", "result": "saved"})
        except Exception as e:
            results.append({"action": "dream_record", "result": f"error: {e}"})

        # Update state
        self.state["last_dream"][agent] = datetime.now(timezone.utc).isoformat()
        self.state["dream_counts"][agent] = dream_count + 1
        self._save_state()

        summary = {
            "agent": agent,
            "status": "dream_complete",
            "dream_number": dream_count + 1,
            "actions": len(results),
        }
        self._log("agent_dream_complete", summary)
        print(
            f"  ✨ {agent} dream #{dream_count + 1} complete — "
            f"{len(results)} actions"
        )
        return summary

    # ── Scheduling ───────────────────────────────────────────────

    def _is_wake_due(self, agent: str) -> bool:
        config = AGENT_CONFIG[agent]
        last = self.state["last_wake"].get(agent)
        if not last:
            return True
        try:
            last_dt = datetime.fromisoformat(last)
        except ValueError:
            return True
        elapsed_min = (datetime.now(timezone.utc) - last_dt).total_seconds() / 60
        return elapsed_min >= config["wake_interval_minutes"]

    def _is_dream_due(self, agent: str) -> bool:
        config = AGENT_CONFIG[agent]
        wakes = self.state["wake_counts"].get(agent, 0)

        last = self.state["last_dream"].get(agent)
        if not last:
            # First dream only after at least 3 wake cycles
            return wakes >= 3

        try:
            last_dt = datetime.fromisoformat(last)
        except ValueError:
            return wakes >= 3
        elapsed_min = (datetime.now(timezone.utc) - last_dt).total_seconds() / 60
        return elapsed_min >= config["dream_interval_minutes"]

    # ── Daemon Loop ──────────────────────────────────────────────

    def run_daemon(self, check_interval: int = 60):
        """Run continuously, waking agents on their staggered schedules."""
        models = set(c["model"] for c in AGENT_CONFIG.values())
        print("🤖 OPENCLAW Agent Daemon started")
        print(f"   Agents: {len(AGENT_CONFIG)}")
        print(f"   Check interval: {check_interval}s")
        print(f"   Models: {', '.join(sorted(models))}")
        print()

        # Initialize staggered start times for first run
        now = datetime.now(timezone.utc)
        for agent, config in AGENT_CONFIG.items():
            if agent not in self.state["last_wake"]:
                offset = timedelta(minutes=config["stagger_offset_minutes"])
                fake_last = (
                    now
                    - timedelta(minutes=config["wake_interval_minutes"])
                    + offset
                )
                self.state["last_wake"][agent] = fake_last.isoformat()
        self._save_state()

        def _shutdown_handler(signum, frame):
            print("\n🛑 Daemon shutting down gracefully...")
            self._shutdown = True

        signal.signal(signal.SIGINT, _shutdown_handler)
        signal.signal(signal.SIGTERM, _shutdown_handler)

        while not self._shutdown:
            tick_time = datetime.now(timezone.utc).strftime("%H:%M:%S UTC")
            print(f"\n── Daemon tick at {tick_time} ──")

            for agent in AGENT_CONFIG:
                if self._shutdown:
                    break

                # Dream check first (less frequent, higher priority)
                if self._is_dream_due(agent):
                    try:
                        self.dream_agent(agent)
                    except Exception as e:
                        self._log(
                            "dream_error",
                            {"agent": agent, "error": str(e), "tb": traceback.format_exc()},
                        )
                        print(f"  ❌ {agent} dream error: {e}")
                    # Dream counts as activity — skip wake this tick
                    continue

                # Wake check
                if self._is_wake_due(agent):
                    try:
                        self.wake_agent(agent)
                    except Exception as e:
                        self._log(
                            "wake_error",
                            {"agent": agent, "error": str(e), "tb": traceback.format_exc()},
                        )
                        print(f"  ❌ {agent} wake error: {e}")
                else:
                    last = self.state["last_wake"].get(agent, "never")
                    if last != "never":
                        try:
                            last_dt = datetime.fromisoformat(last)
                            mins = (
                                datetime.now(timezone.utc) - last_dt
                            ).total_seconds() / 60
                            next_in = AGENT_CONFIG[agent]["wake_interval_minutes"] - mins
                            if next_in > 0:
                                print(f"  ⏸️  {agent}: next wake in {next_in:.0f}m")
                        except ValueError:
                            pass

            if not self._shutdown:
                time.sleep(check_interval)

        print("🛑 Agent Daemon stopped")
        self._log("daemon_stopped", {})

    # ── Seed Messages ────────────────────────────────────────────

    def seed_startup(self):
        """Send initial messages to get agents talking to each other."""
        print("🌱 Seeding startup messages...")

        seeds = [
            (
                "orchestrator",
                "engineering",
                "Review the OPENCLAW system architecture and write a brief status "
                "report. What's working, what needs attention? Save your findings "
                "to memory.",
                "high",
            ),
            (
                "orchestrator",
                "marketing",
                "Draft an initial marketing plan for OPENCLAW. Think about target "
                "audience, positioning, and first content pieces. Save key decisions "
                "to memory.",
                "normal",
            ),
            (
                "orchestrator",
                "creative",
                "Start developing the OPENCLAW brand identity. Think about visual "
                "direction, tone of voice, and tagline options. Save your ideas "
                "to memory.",
                "normal",
            ),
            (
                "orchestrator",
                "outreach",
                "Research potential revenue channels. Look at Fiverr gig ideas, "
                "freelance opportunities for our tech stack. Save findings to memory.",
                "normal",
            ),
            (
                "orchestrator",
                "media",
                "Plan the OPENCLAW YouTube/social media presence. What kind of "
                "content should we create first? Save your strategy to memory.",
                "normal",
            ),
            (
                "orchestrator",
                "auditor",
                "Establish quality standards for the team. What should our "
                "definition of done look like? What review criteria matter most? "
                "Save standards to memory.",
                "normal",
            ),
        ]

        sent = 0
        for sender, receiver, task, priority in seeds:
            try:
                msg = self.bus.send_message(sender, receiver, task, priority)
                print(f"  📨 {sender} → {receiver}: [{msg['id']}]")
                sent += 1
                time.sleep(1)  # Respect cooldown
            except Exception as e:
                print(f"  ⚠️  {sender} → {receiver}: {e}")

        print(f"\n🌱 Seeded {sent}/{len(seeds)} startup messages")

    # ── Status ───────────────────────────────────────────────────

    def show_status(self):
        """Show current agent states."""
        print("🤖 OPENCLAW Agent Daemon Status\n")
        now = datetime.now(timezone.utc)

        for agent, config in AGENT_CONFIG.items():
            last_wake = self.state["last_wake"].get(agent, "never")
            last_dream = self.state["last_dream"].get(agent, "never")
            wakes = self.state["wake_counts"].get(agent, 0)
            dreams = self.state["dream_counts"].get(agent, 0)

            if last_wake != "never":
                try:
                    dt = datetime.fromisoformat(last_wake)
                    mins = (now - dt).total_seconds() / 60
                    next_in = max(0, config["wake_interval_minutes"] - mins)
                    wake_str = f"{mins:.0f}m ago (next in {next_in:.0f}m)"
                except ValueError:
                    wake_str = "unknown"
            else:
                wake_str = "never"

            dream_str = "never"
            if last_dream != "never":
                try:
                    dt = datetime.fromisoformat(last_dream)
                    hrs = (now - dt).total_seconds() / 3600
                    dream_str = f"{hrs:.1f}h ago"
                except ValueError:
                    pass

            icon = "🟢" if wakes > 0 else "⚪"
            print(f"  {icon} {agent}")
            print(f"      Model: {config['model']}")
            print(f"      Wake: {wake_str} | Wakes: {wakes}")
            print(f"      Dream: {dream_str} | Dreams: {dreams}")
            print()


def main():
    import argparse

    parser = argparse.ArgumentParser(description="OPENCLAW Agent Daemon")
    parser.add_argument(
        "command",
        choices=["run", "wake", "dream", "status", "seed"],
        help="Command to execute",
    )
    parser.add_argument("agent", nargs="?", help="Agent name (for wake/dream)")
    parser.add_argument(
        "--interval",
        type=int,
        default=60,
        help="Check interval in seconds (for run command)",
    )

    args = parser.parse_args()
    daemon = AgentDaemon()

    if args.command == "run":
        daemon.run_daemon(args.interval)
    elif args.command == "wake":
        if not args.agent or args.agent not in AGENT_CONFIG:
            print(f"Usage: agent_daemon.py wake <agent>")
            print(f"Agents: {', '.join(AGENT_CONFIG.keys())}")
            sys.exit(1)
        result = daemon.wake_agent(args.agent)
        print(json.dumps(result, indent=2, default=str))
    elif args.command == "dream":
        if not args.agent or args.agent not in AGENT_CONFIG:
            print(f"Usage: agent_daemon.py dream <agent>")
            print(f"Agents: {', '.join(AGENT_CONFIG.keys())}")
            sys.exit(1)
        result = daemon.dream_agent(args.agent)
        print(json.dumps(result, indent=2, default=str))
    elif args.command == "status":
        daemon.show_status()
    elif args.command == "seed":
        daemon.seed_startup()


if __name__ == "__main__":
    main()
