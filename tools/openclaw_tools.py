"""
title: OPENCLAW System Tools
author: OPENCLAW
version: 0.3.0
description: Tools for OPENCLAW agents to interact with the system layer — message bus, memory, approval, tasks, revenue.
"""

import json
import urllib.request
from typing import Optional

API_BASE = "http://host.docker.internal:18800"


class Tools:
    def __init__(self):
        self.api_base = API_BASE

    def _api_call(self, method: str, path: str, data: dict = None) -> dict:
        """Make an API call to the OPENCLAW system."""
        url = f"{self.api_base}{path}"
        if method == "GET":
            if data:
                params = "&".join(
                    f"{k}={v}" for k, v in data.items() if v is not None
                )
                url = f"{url}?{params}"
            req = urllib.request.Request(url)
        else:
            req = urllib.request.Request(
                url, data=json.dumps(data or {}).encode(), method=method
            )
            req.add_header("Content-Type", "application/json")

        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                return json.loads(resp.read().decode())
        except Exception as e:
            return {"error": str(e)}

    def send_message_to_agent(
        self, sender: str, receiver: str, task: str, priority: str = "normal"
    ) -> str:
        """
        Send a message to another OPENCLAW agent via the message bus.
        Use this to delegate tasks, request collaboration, or share information.

        Args:
            sender: Your agent name (e.g., "orchestrator", "engineering")
            receiver: Target agent name
            task: Description of what you need them to do
            priority: "low", "normal", "high", or "critical"

        Returns: Message ID and status
        """
        result = self._api_call(
            "POST",
            "/bus/send",
            {
                "sender": sender,
                "receiver": receiver,
                "task": task,
                "priority": priority,
            },
        )
        return json.dumps(result, indent=2)

    def fetch_my_messages(self, agent: str, status: str = "pending") -> str:
        """
        Check your message inbox for tasks assigned to you.
        Call this at the start of work to see what's been delegated to you.

        Args:
            agent: Your agent name
            status: Filter by "pending", "acknowledged", or "all"

        Returns: List of messages with sender, task, priority
        """
        result = self._api_call("GET", f"/bus/fetch/{agent}", {"status": status})
        return json.dumps(result, indent=2)

    def acknowledge_message(self, message_id: str, result: str = "") -> str:
        """
        Acknowledge a message after completing the task.

        Args:
            message_id: ID of the message to acknowledge
            result: Summary of what you accomplished
        """
        result_data = self._api_call(
            "POST", f"/bus/ack/{message_id}", {"result": result}
        )
        return json.dumps(result_data, indent=2)

    def write_memory(
        self,
        content: str,
        memory_type: str = "long-term",
        agent: str = None,
        tags: str = "",
    ) -> str:
        """
        Write something to OPENCLAW memory for future reference.
        Use after completing tasks, learning lessons, or discovering insights.

        Args:
            content: What to remember
            memory_type: "short-term" (24h), "long-term" (permanent), or "shared" (all agents)
            agent: Your agent name (for attribution)
            tags: Comma-separated tags (e.g., "lesson,n8n,fix")
        """
        tag_list = [t.strip() for t in tags.split(",") if t.strip()] if tags else []
        result = self._api_call(
            "POST",
            "/memory/write",
            {
                "content": content,
                "memory_type": memory_type,
                "agent": agent,
                "tags": tag_list,
            },
        )
        return json.dumps(result, indent=2)

    def search_memory(
        self,
        query: str,
        memory_type: str = "long-term",
        agent: str = None,
        limit: int = 5,
    ) -> str:
        """
        Search OPENCLAW memory for relevant information before starting work.

        Args:
            query: What to search for
            memory_type: "short-term", "long-term", or "shared"
            agent: Filter by agent name (optional)
            limit: Max results to return
        """
        result = self._api_call(
            "GET",
            "/memory/read",
            {
                "query": query,
                "memory_type": memory_type,
                "agent": agent,
                "limit": limit,
            },
        )
        return json.dumps(result, indent=2)

    def request_approval(self, agent: str, action: str, context: str = "") -> str:
        """
        Request approval for a sensitive action before proceeding.
        GREEN actions auto-approve. YELLOW/ORANGE/RED require review.

        Args:
            agent: Your agent name
            action: What you want to do (e.g., "send_email", "post_social", "spend_money")
            context: Additional context about why
        """
        result = self._api_call(
            "POST",
            "/approval/request",
            {"agent": agent, "action": action, "context": {"reason": context}},
        )
        return json.dumps(result, indent=2)

    def complete_task(
        self,
        agent: str,
        mission: str,
        task_name: str,
        filename: str,
        content: str,
    ) -> str:
        """
        Complete a task by producing an artifact (file). Every task MUST produce output.

        Args:
            agent: Your agent name
            mission: Mission ID
            task_name: Name of this task
            filename: Output filename (e.g., "report.md")
            content: The actual content to write
        """
        start = self._api_call(
            "POST",
            "/task/start",
            {"agent": agent, "mission": mission, "task_name": task_name},
        )
        if "error" in start:
            return json.dumps(start, indent=2)

        task_id = start.get("task_id")
        write = self._api_call(
            "POST",
            "/task/write",
            {"task_id": task_id, "filename": filename, "content": content},
        )
        if "error" in write:
            return json.dumps(write, indent=2)

        complete = self._api_call("POST", f"/task/complete/{task_id}")
        return json.dumps(complete, indent=2)

    def log_revenue_attempt(
        self,
        attempt_type: str,
        agent: str,
        details: str,
        status: str = "attempted",
    ) -> str:
        """
        Log a revenue generation attempt for tracking.

        Args:
            attempt_type: Type (fiverr_gig, upwork_bid, cold_email, cold_dm, beat_sale, web_client, etc.)
            agent: Your agent name
            details: Description of the attempt
            status: Current status (attempted, sent, viewed, responded, negotiating, converted, lost)
        """
        result = self._api_call(
            "POST",
            "/revenue/log",
            {
                "type": attempt_type,
                "agent": agent,
                "details": details,
                "status": status,
            },
        )
        return json.dumps(result, indent=2)

    def get_system_health(self) -> str:
        """
        Check the health of the entire OPENCLAW system.
        Returns status of all subsystems: Docker, bus, memory, scheduler, etc.
        """
        result = self._api_call("GET", "/health")
        return json.dumps(result, indent=2)

    def get_bus_stats(self) -> str:
        """
        Get message bus statistics — how many messages pending, by agent, etc.
        """
        result = self._api_call("GET", "/bus/stats")
        return json.dumps(result, indent=2)
