"""
title: Long Term Memory Filter (LM Studio)
author: Anton Nilsson (adapted for LM Studio by OpenClaw)
date: 2024-08-23
version: 1.1
license: MIT
description: A filter that stores long-term memory using mem0 + Qdrant + LM Studio (OpenAI-compatible)
"""

import os
from typing import List, Optional
from pydantic import BaseModel
import json
from mem0 import Memory
import threading

class Pipeline:
    class Valves(BaseModel):
        pipelines: List[str] = []
        priority: int = 0

        store_cycles: int = 5
        mem_zero_user: str = "user"

        # Qdrant vector store
        vector_store_qdrant_name: str = "memory"
        vector_store_qdrant_url: str = "openclaw-qdrant"
        vector_store_qdrant_port: int = 6333
        vector_store_qdrant_dims: int = 768

        # LM Studio LLM config
        lmstudio_llm_model: str = "qwen/qwen3.5-9b"
        lmstudio_llm_temperature: float = 0.1
        lmstudio_llm_tokens: int = 4096
        lmstudio_base_url: str = "http://host.docker.internal:1234/v1"
        lmstudio_api_key: str = os.environ.get("LM_STUDIO_API_KEY", "")

        # LM Studio embedding model
        lmstudio_embedder_model: str = "text-embedding-nomic-embed-text-v1.5"

    def __init__(self):
        self.type = "filter"
        self.name = "Memory Filter"
        self.user_messages = []
        self.thread = None
        self.m = None
        self.valves = self.Valves(
            **{
                "pipelines": ["*"],
            }
        )
        try:
            self.m = self.init_mem_zero()
        except Exception as e:
            print(f"Memory init deferred (will retry on first message): {e}")

    async def on_startup(self):
        print(f"on_startup:{__name__}")
        if self.m is None:
            try:
                self.m = self.init_mem_zero()
                print("Memory initialized on startup")
            except Exception as e:
                print(f"Memory startup init failed: {e}")

    async def on_shutdown(self):
        print(f"on_shutdown:{__name__}")

    async def inlet(self, body: dict, user: Optional[dict] = None) -> dict:
        print(f"pipe:{__name__}")

        # Lazy init if not ready
        if self.m is None:
            try:
                self.m = self.init_mem_zero()
            except Exception as e:
                print(f"Memory not available: {e}")
                return body

        mem_user = self.valves.mem_zero_user
        store_cycles = self.valves.store_cycles

        if isinstance(body, str):
            body = json.loads(body)

        all_messages = body["messages"]
        last_message = all_messages[-1]["content"]

        self.user_messages.append(last_message)

        if len(self.user_messages) >= store_cycles:
            message_text = " ".join(self.user_messages)

            if self.thread and self.thread.is_alive():
                self.thread.join()

            self.thread = threading.Thread(
                target=self.m.add,
                kwargs={"data": message_text, "user_id": mem_user}
            )
            self.thread.start()
            self.user_messages.clear()

        try:
            memories = self.m.search(last_message, user_id=mem_user)
            if memories:
                fetched_memory = memories[0]["memory"]
                all_messages.insert(0, {
                    "role": "system",
                    "content": f"Memory context: {fetched_memory}"
                })
        except Exception as e:
            print(f"Memory search failed: {e}")

        return body

    def init_mem_zero(self):
        config = {
            "vector_store": {
                "provider": "qdrant",
                "config": {
                    "collection_name": self.valves.vector_store_qdrant_name,
                    "host": self.valves.vector_store_qdrant_url,
                    "port": self.valves.vector_store_qdrant_port,
                    "embedding_model_dims": self.valves.vector_store_qdrant_dims,
                },
            },
            "llm": {
                "provider": "openai",
                "config": {
                    "model": self.valves.lmstudio_llm_model,
                    "temperature": self.valves.lmstudio_llm_temperature,
                    "max_tokens": self.valves.lmstudio_llm_tokens,
                    "openai_base_url": self.valves.lmstudio_base_url,
                    "api_key": self.valves.lmstudio_api_key,
                },
            },
            "embedder": {
                "provider": "openai",
                "config": {
                    "model": self.valves.lmstudio_embedder_model,
                    "openai_base_url": self.valves.lmstudio_base_url,
                    "api_key": self.valves.lmstudio_api_key,
                },
            },
        }
        return Memory.from_config(config)
