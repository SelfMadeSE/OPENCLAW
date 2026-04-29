#!/usr/bin/env python3
"""Add 5 new prospects from this hour's research cycle to CRM and save evidence."""
import json, os, sys
sys.path.insert(0, os.path.dirname(__file__))
from crm import CRMManager

crm = CRMManager()

prospects = [
    {
        "businessName": "Oak & Canyon Landscape",
        "niche": "Landscaping",
        "website": "https://oakandcanyon.com",
        "source": "DuckDuckGo search - Denver landscaping companies",
        "description": "Owner-operated Denver landscape company (Jason Bonser). Minimal website with bare-bones contact page. No online booking, no instant quote tool, no service area pages beyond basic description. No email visible on site. Phone visible. Small operator-led SMB with clear lead capture gaps.",
        "service_area": "Denver Metro (historic neighborhoods)",
        "phone": "(720) 878-5435",
        "email": None,
        "opportunity_score": 82,
        "contact": {
            "phone_verified": True,
            "email_verified": False,
            "verification_status": {
                "phone": {"verified": True, "verified_at": "2026-04-28T12:44:00Z"},
                "email": {"verified": False, "verified_at": None}
            }
        }
    },
    {
        "businessName": "Harris Family Chiropractic and Massage",
        "niche": "Chiropractic",
        "website": "https://hfcmdenver.com",
        "source": "DuckDuckGo search - Denver chiropractors",
        "description": "Small chiropractic practice in Denver (303) 691-2225. Very basic WordPress site with minimal content. Contact page only shows business hours. No embedded contact form extracted, no online booking, no service descriptions visible. No email visible on site (CleanTalk email encoder obscures it). No patient portal links.",
        "service_area": "Denver, CO (Bellaire St)",
        "phone": "(303) 691-2225",
        "email": None,
        "opportunity_score": 86,
        "contact": {
            "phone_verified": True,
            "email_verified": False,
            "verification_status": {
                "phone": {"verified": True, "verified_at": "2026-04-28T12:44:00Z"},
                "email": {"verified": False, "verified_at": None}
            }
        }
    },
    {
        "businessName": "Cherry Medical Aesthetics",
        "niche": "Med Spa",
        "website": "https://cherrymedispa.com",
        "source": "DuckDuckGo search - Denver med spa website",
        "description": "Upscale med spa in LoHi Denver. Elementor-built site with contact form embedded via external Growth99 iframe. Contact page has very thin content (Have A Question? Let us get in touch! SEE YOU SOON XOXO). Phone and email found in HTML header. No visible online booking system on contact page.",
        "service_area": "Denver, CO (LoHi - 2200 W 29th Ave)",
        "phone": "(720) 479-8793",
        "email": "reception@cherrymedispa.com",
        "opportunity_score": 74,
        "contact": {
            "phone_verified": True,
            "email_verified": True,
            "verification_status": {
                "phone": {"verified": True, "verified_at": "2026-04-28T12:44:00Z"},
                "email": {"verified": True, "verified_at": "2026-04-28T12:44:00Z"}
            }
        }
    },
    {
        "businessName": "B&E Services Inc.",
        "niche": "Landscaping",
        "website": "https://www.beservicesdenver.com",
        "source": "DuckDuckGo search - Denver landscaping companies",
        "description": "Denver landscaping company serving since 1981. Basic template site with phone visible (303-452-0289) but no email. No online booking, no instant quote tool, no project gallery or portfolio pages. Minimal conversion elements - just a phone CTA. Established business (40+ years) with outdated web presence.",
        "service_area": "Denver, CO (City Park, Capitol Hill, Hilltop, Washington Park, Cherry Creek, Stapleton, Aurora)",
        "phone": "(303) 452-0289",
        "email": None,
        "opportunity_score": 80,
        "contact": {
            "phone_verified": True,
            "email_verified": False,
            "verification_status": {
                "phone": {"verified": True, "verified_at": "2026-04-28T12:44:00Z"},
                "email": {"verified": False, "verified_at": None}
            }
        }
    },
    {
        "businessName": "Little Foot Landscaping",
        "niche": "Landscaping",
        "website": "https://littlefootlandscaping.com",
        "source": "DuckDuckGo search - Denver landscaping companies",
        "description": "Family-owned landscaping company since 1979 in Lakewood/Denver. Owner Tim Jukola. Site has blog and testimonials but no online booking, no instant quote form, no online payment. Phone not easily discoverable from page content. Free consultation link exists but no streamlined booking flow. Named Best Denver Landscaper in 2024.",
        "service_area": "Denver Metro / Lakewood, CO",
        "phone": None,
        "email": None,
        "opportunity_score": 77,
        "contact": {
            "phone_verified": False,
            "email_verified": False,
            "verification_status": {
                "phone": {"verified": False, "verified_at": None},
                "email": {"verified": False, "verified_at": None}
            }
        }
    }
]

ids = []
for p in prospects:
    pid = crm.add_prospect(p)
    ids.append(pid)
    # Save evidence
    evidence = {
        "findings": {
            "website_issues": [],
            "contact_info_found": [],
            "missing_elements": []
        },
        "research_urls": [p["website"]],
        "prospect_summary": p["description"]
    }
    crm.save_evidence(pid, evidence, "website_audit_research")
    print(f"  Evidence saved for {p['businessName']}")

print(f"\n=== Added {len(ids)} prospects ===")
for pid in ids:
    pr = crm.get_prospect(pid)
    print(f"  {pr['businessName']} - ID: {pid}")
