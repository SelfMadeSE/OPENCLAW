#!/usr/bin/env python3
"""
Run Lighthouse CLI and return scores as JSON.
Free, no API key needed, no quota limits.
Usage: python3 scripts/lighthouse-audit.py https://example.com
"""
import subprocess, sys, json

url = sys.argv[1] if len(sys.argv) > 1 else "https://example.com"

try:
    result = subprocess.run(
        ["lighthouse", url, "--output=json", "--output-path=stdout",
         "--chrome-flags=--headless --no-sandbox --disable-gpu",
         "--only-categories=performance,accessibility,best-practices,seo",
         "--quiet"],
        capture_output=True, text=True, timeout=60
    )
    if result.returncode != 0:
        print(json.dumps({"error": "Lighthouse failed", "stderr": result.stderr[:500]}))
        sys.exit(1)
    
    data = json.loads(result.stdout)
    categories = data.get("categories", {})
    
    scores = {}
    for key in ["performance", "accessibility", "best-practices", "seo"]:
        cat = categories.get(key, {})
        scores[key] = {
            "score": round((cat.get("score") or 0) * 100),
            "title": cat.get("title", key)
        }
    
    audits = data.get("audits", {})
    top_issues = []
    for audit_id, audit in audits.items():
        if audit.get("score") is not None and audit["score"] < 0.5 and audit.get("scoreDisplayMode") != "notApplicable":
            top_issues.append({
                "id": audit_id,
                "title": audit.get("title", ""),
                "description": audit.get("description", "")[:200],
                "score": round(audit["score"] * 100)
            })
    
    output = {
        "url": data.get("finalDisplayedUrl", url),
        "scores": scores,
        "topIssues": sorted(top_issues, key=lambda x: x["score"])[:8],
        "fetchTime": data.get("fetchTime")
    }
    
    print(json.dumps(output, indent=2))

except subprocess.TimeoutExpired:
    print(json.dumps({"error": "Lighthouse timed out after 60s"}))
    sys.exit(1)
except Exception as e:
    print(json.dumps({"error": str(e)}))
    sys.exit(1)
