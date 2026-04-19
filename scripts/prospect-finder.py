#!/usr/bin/env python3
"""
OPENCLAW Prospect Research Tool
Finds local businesses that need website help using SearXNG.

Usage:
    python3 scripts/prospect-finder.py --niche "restaurant" --location "denver"
    python3 scripts/prospect-finder.py --niche "plumber" --location "colorado springs"
    python3 scripts/prospect-finder.py --reddit  # Find people asking for websites
"""

import argparse
import json
import urllib.request
import urllib.parse
import os
import datetime

SEARXNG_URL = "http://localhost:8080/search"
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "revenue", "prospects")

def search(query, num_results=20):
    params = urllib.parse.urlencode({
        "q": query,
        "format": "json",
        "categories": "general",
    })
    url = f"{SEARXNG_URL}?{params}"
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req, timeout=15) as resp:
        data = json.loads(resp.read())
    return data.get("results", [])[:num_results]

def find_businesses(niche, location):
    queries = [
        f'"{niche}" "{location}" -site:yelp.com -site:facebook.com',
        f'"{niche}" near "{location}" website',
        f'"{niche}" "{location}" "contact us"',
    ]
    all_results = []
    seen_urls = set()
    for q in queries:
        results = search(q)
        for r in results:
            url = r.get("url", "")
            domain = url.split("/")[2] if len(url.split("/")) > 2 else url
            if domain not in seen_urls and not any(x in domain for x in ["yelp.com", "facebook.com", "yellowpages", "bbb.org", "mapquest", "google.com"]):
                seen_urls.add(domain)
                all_results.append({
                    "title": r.get("title", ""),
                    "url": url,
                    "domain": domain,
                    "snippet": r.get("content", "")[:300],
                    "niche": niche,
                    "location": location,
                })
    return all_results

def find_reddit_leads():
    queries = [
        '"need a website" OR "looking for web designer" site:reddit.com',
        '"need a website built" OR "who can build my website" site:reddit.com',
        '"looking for someone to build" website site:reddit.com 2025 OR 2026',
    ]
    all_results = []
    seen = set()
    for q in queries:
        results = search(q, 15)
        for r in results:
            url = r.get("url", "")
            if url not in seen:
                seen.add(url)
                all_results.append({
                    "title": r.get("title", ""),
                    "url": url,
                    "snippet": r.get("content", "")[:300],
                    "source": "reddit",
                })
    return all_results

def save_prospects(prospects, filename):
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    filepath = os.path.join(OUTPUT_DIR, filename)
    with open(filepath, "w") as f:
        json.dump({
            "generated": datetime.datetime.now().isoformat(),
            "count": len(prospects),
            "prospects": prospects,
        }, f, indent=2)
    print(f"Saved {len(prospects)} prospects to {filepath}")
    return filepath

def print_prospects(prospects, label="Prospects"):
    print(f"\n{'='*60}")
    print(f" {label}: {len(prospects)} found")
    print(f"{'='*60}")
    for i, p in enumerate(prospects, 1):
        print(f"\n[{i}] {p.get('title', 'Unknown')}")
        print(f"    URL: {p.get('url', '?')}")
        print(f"    {p.get('snippet', '')[:150]}")

def main():
    parser = argparse.ArgumentParser(description="OPENCLAW Prospect Research Tool")
    parser.add_argument("--niche", help="Business niche (e.g., restaurant, plumber, dentist)")
    parser.add_argument("--location", help="Location (e.g., denver, colorado springs)")
    parser.add_argument("--reddit", action="store_true", help="Find Reddit leads looking for websites")
    parser.add_argument("--save", action="store_true", help="Save results to file")
    args = parser.parse_args()

    if args.reddit:
        leads = find_reddit_leads()
        print_prospects(leads, "Reddit Leads")
        if args.save:
            save_prospects(leads, f"reddit-leads-{datetime.date.today()}.json")
    elif args.niche and args.location:
        prospects = find_businesses(args.niche, args.location)
        print_prospects(prospects, f"{args.niche} in {args.location}")
        if args.save:
            save_prospects(prospects, f"{args.niche}-{args.location}-{datetime.date.today()}.json")
    else:
        print("Usage:")
        print("  python3 scripts/prospect-finder.py --niche restaurant --location denver --save")
        print("  python3 scripts/prospect-finder.py --reddit --save")

if __name__ == "__main__":
    main()
