#!/usr/bin/env python3
"""Batch add 5 new prospects to CRM and save evidence files."""
import json, sys, os
sys.path.insert(0, os.path.dirname(__file__))
from crm import CRMManager

crm = CRMManager()

prospects = [
    {
        "businessName": "Mountain Breeze Heating & Air",
        "niche": "HVAC Services",
        "website": "https://mountainbreezeheatingandair.com",
        "source": "DuckDuckGo search - Denver HVAC company",
        "description": "Family-owned Denver HVAC company since 2006. Owner James Morse. No visible email on site. Contact page uses only form + phone. No online booking/scheduling. No live chat. Coupon-heavy content dilutes primary CTAs. 24/7 emergency claim but no quick-booking mechanism.",
        "service_area": "Denver Metro, Front Range, CO",
        "phone": "(303) 288-2515",
        "email": None,
        "opportunity_score": 76
    },
    {
        "businessName": "Amazing Moves Moving & Storage",
        "niche": "Moving & Storage Services",
        "website": "https://www.amazingmoves.com",
        "source": "DuckDuckGo search - Denver moving company",
        "description": "Denver full-service moving/storage since 2003. Phone (303-668-7444) visible but NO email anywhere. Contact page = form only. Online estimate form but no live chat, no booking/scheduling, no pricing info. All CTAs route to fill-out-form or call.",
        "service_area": "Denver Metro, CO",
        "phone": "(303) 668-7444",
        "email": None,
        "opportunity_score": 72
    },
    {
        "businessName": "Local Moving LLC",
        "niche": "Moving Services",
        "website": "https://www.localmovingllc.com",
        "source": "DuckDuckGo search - Denver moving company",
        "description": "Denver moving co 10+ years. Title says '2023' - stale content. No email on contact page (form only). No live chat, no online booking. Template design with long content blocks. Gravity Forms + CAPTCHA. Address: 300 W 53rd Pl g, Denver, CO 80216.",
        "service_area": "Denver Metro, CO",
        "phone": "(303) 355-6683",
        "email": None,
        "opportunity_score": 78
    },
    {
        "businessName": "Royal Flush HVAC Solutions",
        "niche": "HVAC Services",
        "website": "https://rfhvac.com",
        "source": "DuckDuckGo search - Denver HVAC company",
        "description": "Denver HVAC co claiming 24/7 emergency. Phone (719-492-6209) is Colorado Springs area code serving Denver. No email on contact page. Only form-based contact. No online booking/scheduling. No live chat. Generic template content with no owner identity or local differentiation.",
        "service_area": "Denver Metro, CO",
        "phone": "(719) 492-6209",
        "email": None,
        "opportunity_score": 68
    },
    {
        "businessName": "The Other Side Moving & Storage",
        "niche": "Moving & Storage Services",
        "website": "https://www.theothersidemovers.com",
        "source": "DuckDuckGo search - Denver moving company",
        "description": "Denver/SLC moving & storage. Bare-bones Squarespace cover page: tagline only 'Rebuilding our lives by moving yours.' Zero contact info - no phone, email, address, or form. No service pages, no about, no booking, no pricing. Essentially a placeholder with zero lead capture.",
        "service_area": "Denver Metro, CO / Salt Lake City, UT",
        "phone": None,
        "email": None,
        "opportunity_score": 85
    }
]

for p in prospects:
    pid = crm.add_prospect(p)
    print(f"Added: {p['businessName']} -> {pid}")
    
    # Mark phone as verified if found
    if p["phone"]:
        crm.mark_contact_verified(pid, "phone", True)
        print(f"  Phone verified: {p['phone']}")
    
    # Email is unverified for all (none found on site)
    if p["email"]:
        crm.mark_contact_verified(pid, "email", True)
    else:
        crm.mark_contact_verified(pid, "email", False)
        print(f"  Email: unverified (not found on site)")
    
    # Save evidence
    evidence = {
        "url": p["website"],
        "findings": {
            "has_phone": bool(p["phone"]),
            "has_email": False,
            "has_live_chat": False,
            "has_online_booking": False,
            "has_contact_form": True,
            "gaps": []
        },
        "source": p["source"]
    }
    
    if p["businessName"] == "Mountain Breeze Heating & Air":
        evidence["findings"]["gaps"] = [
            "No email visible on entire site",
            "No online booking/scheduling",
            "No live chat",
            "Coupon-first CTAs dilute primary conversion",
            "Contact page is form + phone only",
            "Owner James Morse but no personal branding on site"
        ]
        evidence["findings"]["details"] = "Phone verified on homepage + contact page. Owner James Morse in video."
    elif p["businessName"] == "Amazing Moves Moving & Storage":
        evidence["findings"]["gaps"] = [
            "No email visible anywhere on site",
            "No live chat",
            "No online booking/scheduling",
            "No pricing information",
            "All CTAs route to form or phone call",
            "Established 2003 but zero self-service lead capture"
        ]
        evidence["findings"]["details"] = "Phone (303) 668-7444 verified on header. Online estimate survey exists but is lengthy."
    elif p["businessName"] == "Local Moving LLC":
        evidence["findings"]["gaps"] = [
            "Title tag says 'in 2023' - stale/outdated content",
            "No email on contact page (form only)",
            "No live chat",
            "No online booking/scheduling",
            "Gravity Forms with CAPTCHA adds friction",
            "Very long text blocks with poor scannability"
        ]
        evidence["findings"]["details"] = "Phone (303) 355-6683 verified on contact page. Address: 300 W 53rd Pl g, Denver, CO 80216."
    elif p["businessName"] == "Royal Flush HVAC Solutions":
        evidence["findings"]["gaps"] = [
            "Phone has Colorado Springs area code (719) for Denver service",
            "No email visible on site",
            "No online booking/scheduling",
            "No live chat",
            "Contact page is form only",
            "Generic template content with weak local differentiation"
        ]
        evidence["findings"]["details"] = "Phone (719) 492-6209 on homepage and contact page. NATE-certified owner mentioned but unnamed."
    elif p["businessName"] == "The Other Side Moving & Storage":
        evidence["findings"]["gaps"] = [
            "Zero contact info - no phone, email, address, or form",
            "Single-page Squarespace cover with no additional pages",
            "No service descriptions, about info, or pricing",
            "No booking/scheduling system",
            "No lead capture mechanism whatsoever",
            "Serves Denver AND SLC but neither location is SEO-optimized"
        ]
        evidence["findings"]["details"] = "Squarespace cover page only. Tagline: 'Rebuilding our lives by moving yours.' No footer, no nav, no contact methods."
    
    crm.save_evidence(pid, evidence, "website_audit_research")
    print(f"  Evidence saved")
    print()

print("Done. 5 prospects added to CRM.")
