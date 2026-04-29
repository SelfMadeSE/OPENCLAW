#!/usr/bin/env python3
"""
Local Lighthouse service — runs on Rylee's machine, serves results via HTTP.
Run: python3 scripts/lighthouse-server.py
Then query: GET /audit?url=https://example.com
"""
import subprocess, json, sys, os
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import time

CACHE = {}
CACHE_TTL = 3600  # 1 hour

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/audit":
            params = parse_qs(parsed.query)
            url = params.get("url", [""])[0]
            if not url:
                self.respond(400, {"error": "Missing url param"})
                return
            
            # Check cache
            now = time.time()
            cached = CACHE.get(url)
            if cached and now - cached["ts"] < CACHE_TTL:
                self.respond(200, cached["data"])
                return
            
            # Run lighthouse
            try:
                result = subprocess.run(
                    ["lighthouse", url, "--output=json", "--output-path=stdout",
                     "--chrome-flags=--headless --no-sandbox --disable-gpu",
                     "--only-categories=performance,accessibility,best-practices,seo",
                     "--quiet"],
                    capture_output=True, text=True, timeout=60
                )
                if result.returncode != 0:
                    self.respond(500, {"error": "Lighthouse failed", "detail": result.stderr[:300]})
                    return
                
                data = self.format_results(json.loads(result.stdout), url)
                CACHE[url] = {"ts": now, "data": data}
                self.respond(200, data)
            except subprocess.TimeoutExpired:
                self.respond(500, {"error": "Lighthouse timed out"})
            except Exception as e:
                self.respond(500, {"error": str(e)})
        else:
            self.respond(200, {"status": "ok", "cached": len(CACHE)})
    
    def format_results(self, raw, url):
        categories = raw.get("categories", {})
        scores = {}
        for key in ["performance", "accessibility", "best-practices", "seo"]:
            cat = categories.get(key, {})
            scores[key] = round((cat.get("score") or 0) * 100)
        
        audits = raw.get("audits", {})
        issues = []
        for aid, a in audits.items():
            if a.get("score") is not None and a["score"] < 0.5 and a.get("scoreDisplayMode") != "notApplicable":
                issues.append({"id": aid, "title": a.get("title",""), "score": round(a["score"]*100)})
        
        screenshot = None
        full = raw.get("audits", {}).get("full-page-screenshot", {})
        if full.get("details", {}).get("data"):
            screenshot = "data:image/jpeg;base64," + full["details"]["data"]
        
        return {
            "url": url,
            "available": True,
            "source": "Lighthouse CLI (local)",
            "strategy": "mobile",
            "performance": scores.get("performance"),
            "accessibility": scores.get("accessibility"),
            "bestPractices": scores.get("best-practices", scores.get("best-practices")),
            "seo": scores.get("seo"),
            "screenshotDataUrl": screenshot,
            "rawScores": scores,
            "topIssues": sorted(issues, key=lambda x: x["score"])[:8],
            "fetchTime": raw.get("fetchTime")
        }
    
    def respond(self, code, data):
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())
    
    def log_message(self, format, *args):
        pass  # silence logs

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 18900))
    print(f"Lighthouse server on :{port}")
    HTTPServer(("127.0.0.1", port), Handler).serve_forever()
