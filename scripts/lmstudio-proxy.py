#!/usr/bin/env python3
"""Robust reverse proxy that injects reasoning_effort=none for LM Studio.
Handles streaming SSE responses. Threaded for concurrency."""

import json
import socket
import sys
import threading
import traceback

LM_HOST = "127.0.0.1"
LM_PORT = 1234
PROXY_PORT = 1235
import os
API_KEY = os.environ.get("LM_STUDIO_API_KEY", os.environ.get("OPENAI_API_KEY", ""))

def forward_request(client_sock):
    """Read HTTP request from client, modify if needed, forward to LM Studio, stream back."""
    try:
        # Read full request
        raw = b""
        while True:
            chunk = client_sock.recv(65536)
            if not chunk:
                return
            raw += chunk
            # Check if we have full headers + body
            if b"\r\n\r\n" in raw:
                header_end = raw.index(b"\r\n\r\n") + 4
                headers_raw = raw[:header_end].decode("utf-8", errors="replace")
                # Get content-length
                cl = 0
                for line in headers_raw.split("\r\n"):
                    if line.lower().startswith("content-length:"):
                        cl = int(line.split(":", 1)[1].strip())
                body = raw[header_end:]
                if len(body) >= cl:
                    break
        
        headers_text = raw[:header_end].decode("utf-8", errors="replace")
        body = raw[header_end:header_end + cl] if cl > 0 else b""
        
        # Parse first line
        first_line = headers_text.split("\r\n")[0]
        method, path, _ = first_line.split(" ", 2)
        
        # Inject reasoning_effort for chat completions
        if method == "POST" and "/chat/completions" in path:
            try:
                data = json.loads(body)
                if "reasoning_effort" not in data:
                    data["reasoning_effort"] = "none"
                body = json.dumps(data).encode()
            except:
                pass
        
        # Build upstream request
        upstream_headers = f"{method} {path} HTTP/1.1\r\n"
        upstream_headers += f"Host: {LM_HOST}:{LM_PORT}\r\n"
        upstream_headers += f"Authorization: Bearer {API_KEY}\r\n"
        upstream_headers += f"Content-Type: application/json\r\n"
        upstream_headers += f"Content-Length: {len(body)}\r\n"
        upstream_headers += "Connection: close\r\n"
        upstream_headers += "\r\n"
        
        # Connect to LM Studio
        upstream = socket.create_connection((LM_HOST, LM_PORT), timeout=300)
        upstream.sendall(upstream_headers.encode() + body)
        
        # Stream response back to client
        while True:
            data = upstream.recv(65536)
            if not data:
                break
            client_sock.sendall(data)
        
        upstream.close()
    except Exception as e:
        try:
            err = f"HTTP/1.1 502 Bad Gateway\r\nContent-Type: application/json\r\nConnection: close\r\n\r\n"
            err += json.dumps({"error": str(e)})
            client_sock.sendall(err.encode())
        except:
            pass
    finally:
        try:
            client_sock.close()
        except:
            pass

def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else PROXY_PORT
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server.bind(("127.0.0.1", port))
    server.listen(32)
    print(f"LM Studio proxy :{port} → :{LM_PORT} [reasoning_effort=none]", flush=True)
    
    while True:
        try:
            client_sock, addr = server.accept()
            t = threading.Thread(target=forward_request, args=(client_sock,), daemon=True)
            t.start()
        except Exception as e:
            print(f"[proxy] accept error: {e}", file=sys.stderr, flush=True)

if __name__ == "__main__":
    main()
