#!/usr/bin/env python3
"""Add 5 new prospects to the CRM - hourly research cycle."""
import sys, json, datetime
sys.path.insert(0, "/Users/ryleebenson/Desktop/OPENCLAW")

from scripts.crm import CRMManager

crm = CRMManager()

prospects = [
    {
        "businessName": "Mighty Bee Electric",
        "niche": "Electrical Services",
        "website": "https://mightybeeelectric.com",
        "source": "DuckDuckGo search - Denver electrician website",
        "description": "Family-owned Denver electrical company since 1971. Owner/operator Martin Black, Colorado Master Electrician. Has service pages and contact form but no email visible, no online booking, no instant quote tool, no live chat. Phone (303) 288-7988 on contact page. Basic WordPress template with limited lead capture.",
        "service_area": "Denver Metro, CO",
        "phone": "(303) 288-7988",
        "email": None,
        "opportunity_score": 80,
    },
    {
        "businessName": "Colorado Native Plumbing",
        "niche": "Plumbing Services",
        "website": "https://www.coloradonativeplumbing.com",
        "source": "DuckDuckGo search - Denver plumber website",
        "description": "Licensed Master Plumber serving Metro Denver since 2016. CRITICAL GAP: contact pages /contact, /contact-us/, /contact.php all return 404. No phone or email visible on any page. Bare-bones cPanel site. Losing 100% of web traffic with no way to contact.",
        "service_area": "Denver Metro, CO",
        "phone": None,
        "email": None,
        "opportunity_score": 92,
    },
    {
        "businessName": "My Denver Plumber",
        "niche": "Plumbing Services",
        "website": "https://mydenverplumber.net",
        "source": "DuckDuckGo search - Denver plumber",
        "description": "Lakewood/Denver plumber. Almost entirely testimonials - no service pages, no online booking, no quote tool. Email info@mydenverplumber.net visible on contact page. Address: 1410 Brentwood St, Lakewood, CO 80214.",
        "service_area": "Denver / Lakewood, CO",
        "phone": None,
        "email": "info@mydenverplumber.net",
        "opportunity_score": 78,
    },
    {
        "businessName": "Fix-It Now Heating & Cooling",
        "niche": "HVAC Services",
        "website": "https://fixitnowhvac.com",
        "source": "DuckDuckGo search - Denver HVAC company",
        "description": "Family-owned Denver Metro HVAC. Owners Julian & Annabel. Phone (303) 657-2421 from search listings. Basic WP template. /contact-us redirects to backup with zero contact info extracted. No email found, no online booking, no live chat, no quote tool. Financing widget exists but no lead capture automation.",
        "service_area": "Denver Metro Area, CO",
        "phone": "(303) 657-2421",
        "email": None,
        "opportunity_score": 82,
    },
    {
        "businessName": "Denver Concierge",
        "niche": "Cleaning Services",
        "website": "https://denverconcierge.com",
        "source": "DuckDuckGo search - Denver cleaning service",
        "description": "Premier house cleaning since 1999. Green Clean certified (Silver). WordPress site circa 2008-2025. Contact page thin - no phone or email extracted via readability. No online booking/quoting. No service area landing pages. No live chat. Missing key conversion features for cleaning industry.",
        "service_area": "Denver Metro (Littleton, Boulder, Broomfield, Denver, Parker)",
        "phone": None,
        "email": None,
        "opportunity_score": 75,
    },
]

results = []
for p in prospects:
    try:
        pid = crm.add_prospect(p)
        results.append(f"✓ {p['businessName']} ({p['niche']}) -> {pid}")
    except Exception as e:
        results.append(f"✗ {p['businessName']}: {e}")

print(f"\n--- Added {len(results)} prospects ---")
for r in results:
    print(r)
print(f"\nCRM path: {crm.crm_data_path}")
