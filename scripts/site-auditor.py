#!/usr/bin/env python3
"""
OPENCLAW Website Audit Tool
Quick-audit a prospect's website for outreach personalization.

Usage:
    python3 scripts/site-auditor.py https://example.com
    python3 scripts/site-auditor.py https://example.com --save
"""

import argparse
import json
import urllib.request
import urllib.parse
import ssl
import time
import re
import os
import datetime

OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "revenue", "reports")

def audit_site(url):
    results = {
        "url": url,
        "timestamp": datetime.datetime.now().isoformat(),
        "checks": {},
        "issues": [],
        "score": 0,
        "max_score": 100,
    }

    # Normalize URL
    if not url.startswith("http"):
        url = "https://" + url

    domain = url.split("/")[2]
    results["domain"] = domain

    # 1. Basic connectivity + load time
    try:
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        start = time.time()
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Macintosh)"})
        with urllib.request.urlopen(req, timeout=15, context=ctx) as resp:
            html = resp.read().decode("utf-8", errors="replace")
            load_time = time.time() - start
            status = resp.status
        results["checks"]["connectivity"] = {"status": status, "load_time_s": round(load_time, 2)}
        if load_time > 3:
            results["issues"].append(f"Slow load time: {load_time:.1f}s (should be under 3s)")
        else:
            results["score"] += 15
    except Exception as e:
        results["checks"]["connectivity"] = {"error": str(e)}
        results["issues"].append(f"Site unreachable: {e}")
        return results

    # 2. HTTPS check
    if url.startswith("https"):
        results["checks"]["https"] = True
        results["score"] += 10
    else:
        results["checks"]["https"] = False
        results["issues"].append("No HTTPS — site is insecure")

    # 3. Mobile viewport
    has_viewport = 'name="viewport"' in html or "name='viewport'" in html
    results["checks"]["mobile_viewport"] = has_viewport
    if has_viewport:
        results["score"] += 15
    else:
        results["issues"].append("No mobile viewport meta tag — likely not mobile-friendly")

    # 4. Title tag
    title_match = re.search(r"<title[^>]*>(.*?)</title>", html, re.IGNORECASE | re.DOTALL)
    title = title_match.group(1).strip() if title_match else None
    results["checks"]["title"] = title
    if title and len(title) > 10:
        results["score"] += 10
    else:
        results["issues"].append("Missing or weak page title (hurts SEO)")

    # 5. Meta description
    desc_match = re.search(r'<meta[^>]*name=["\']description["\'][^>]*content=["\']([^"\']*)["\']', html, re.IGNORECASE)
    if not desc_match:
        desc_match = re.search(r'<meta[^>]*content=["\']([^"\']*)["\'][^>]*name=["\']description["\']', html, re.IGNORECASE)
    desc = desc_match.group(1).strip() if desc_match else None
    results["checks"]["meta_description"] = desc
    if desc and len(desc) > 50:
        results["score"] += 10
    else:
        results["issues"].append("Missing or weak meta description (hurts search ranking)")

    # 6. H1 tag
    h1_match = re.search(r"<h1[^>]*>(.*?)</h1>", html, re.IGNORECASE | re.DOTALL)
    h1 = h1_match.group(1).strip()[:100] if h1_match else None
    results["checks"]["h1_tag"] = h1
    if h1:
        results["score"] += 10
    else:
        results["issues"].append("No H1 tag — search engines can't determine page topic")

    # 7. Images without alt text
    images = re.findall(r"<img[^>]*>", html, re.IGNORECASE)
    imgs_no_alt = [img for img in images if 'alt="' not in img.lower() and "alt='" not in img.lower()]
    results["checks"]["images_total"] = len(images)
    results["checks"]["images_no_alt"] = len(imgs_no_alt)
    if len(images) > 0 and len(imgs_no_alt) / len(images) < 0.3:
        results["score"] += 10
    elif len(imgs_no_alt) > 3:
        results["issues"].append(f"{len(imgs_no_alt)} images missing alt text (hurts SEO + accessibility)")

    # 8. Contact information visible
    has_phone = bool(re.search(r'\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}', html))
    has_email = bool(re.search(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', html))
    results["checks"]["has_phone"] = has_phone
    results["checks"]["has_email"] = has_email
    if has_phone or has_email:
        results["score"] += 10
    else:
        results["issues"].append("No visible phone/email — customers can't easily contact you")

    # 9. Social media links
    socials = []
    for platform in ["facebook", "instagram", "twitter", "linkedin", "youtube", "tiktok"]:
        if platform in html.lower():
            socials.append(platform)
    results["checks"]["social_links"] = socials
    if len(socials) >= 2:
        results["score"] += 5
    elif len(socials) == 0:
        results["issues"].append("No social media links found")

    # 10. Page size
    page_size_kb = len(html) / 1024
    results["checks"]["page_size_kb"] = round(page_size_kb, 1)
    if page_size_kb < 500:
        results["score"] += 5
    else:
        results["issues"].append(f"Large page size ({page_size_kb:.0f}KB) — may load slowly on mobile")

    # Generate grade
    score = results["score"]
    if score >= 85:
        results["grade"] = "A"
    elif score >= 70:
        results["grade"] = "B"
    elif score >= 55:
        results["grade"] = "C"
    elif score >= 40:
        results["grade"] = "D"
    else:
        results["grade"] = "F"

    return results

def print_audit(results):
    print(f"\n{'='*60}")
    print(f" WEBSITE AUDIT: {results['domain']}")
    print(f" Score: {results['score']}/{results['max_score']} (Grade: {results.get('grade', '?')})")
    print(f"{'='*60}")

    checks = results.get("checks", {})
    if "connectivity" in checks:
        c = checks["connectivity"]
        if "error" in c:
            print(f"\n ❌ Site unreachable: {c['error']}")
        else:
            emoji = "✅" if c["load_time_s"] < 3 else "⚠️"
            print(f"\n {emoji} Load time: {c['load_time_s']}s")

    for key, val in checks.items():
        if key in ("connectivity", "page_size_kb", "images_total", "images_no_alt"):
            continue
        if isinstance(val, bool):
            print(f" {'✅' if val else '❌'} {key.replace('_', ' ').title()}: {'Yes' if val else 'No'}")
        elif isinstance(val, list):
            print(f" {'✅' if val else '⚠️'} {key.replace('_', ' ').title()}: {', '.join(val) if val else 'None'}")
        elif val:
            print(f" ✅ {key.replace('_', ' ').title()}: {str(val)[:80]}")
        else:
            print(f" ❌ {key.replace('_', ' ').title()}: Missing")

    if results["issues"]:
        print(f"\n{'─'*60}")
        print(f" ISSUES FOUND ({len(results['issues'])}):")
        for issue in results["issues"]:
            print(f"  🔴 {issue}")

    print(f"\n{'─'*60}")
    print(f" OUTREACH ANGLE: Use {len(results['issues'])} issues as personalized audit points")
    print(f"{'='*60}\n")

def save_audit(results, filename=None):
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    if not filename:
        domain = results.get("domain", "unknown").replace(".", "-")
        filename = f"audit-{domain}-{datetime.date.today()}.json"
    filepath = os.path.join(OUTPUT_DIR, filename)
    with open(filepath, "w") as f:
        json.dump(results, f, indent=2)
    print(f"Audit saved to {filepath}")

def main():
    parser = argparse.ArgumentParser(description="OPENCLAW Website Audit Tool")
    parser.add_argument("url", help="Website URL to audit")
    parser.add_argument("--save", action="store_true", help="Save results to file")
    parser.add_argument("--json", action="store_true", help="Output raw JSON")
    args = parser.parse_args()

    results = audit_site(args.url)

    if args.json:
        print(json.dumps(results, indent=2))
    else:
        print_audit(results)

    if args.save:
        save_audit(results)

if __name__ == "__main__":
    main()
