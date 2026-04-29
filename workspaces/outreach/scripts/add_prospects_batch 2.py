#!/usr/bin/env python3
"""Batch add prospects from a JSON file to the CRM."""
import json, sys, os
from pathlib import Path
from datetime import datetime

# Direct CRM operations since Xcode license blocks /usr/bin/python3
crm_path = Path("/Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/crm_data.json")
prospects_path = Path("/Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/artifacts/prospects")
prospects_path.mkdir(parents=True, exist_ok=True)

# Load existing CRM
if crm_path.exists():
    with open(crm_path) as f:
        crm = json.load(f)
else:
    crm = {"prospects": {}, "last_updated": "", "version": "1.0"}

def gen_id(name):
    clean = "".join(c for c in name.lower() if c.isalnum() or c in (' ', '-')).strip().replace(' ', '-')
    return f"{clean}-{datetime.now().strftime('%Y%m%d-%H%M%S')}"

def add_prospect(data, evidence_data, evidence_type="website_audit_research"):
    pid = gen_id(data["businessName"])
    data["prospect_id"] = pid
    data["created_at"] = datetime.now().isoformat()
    data["updated_at"] = datetime.now().isoformat()
    data["status"] = "new"
    crm["prospects"][pid] = data

    # Save evidence
    evidence = {
        "prospect_id": pid,
        "business_name": data["businessName"],
        "evidence_type": evidence_type,
        "timestamp": datetime.now().strftime("%Y-%m-%d_%H%M%S"),
        "data": evidence_data
    }
    ev_path = prospects_path / f"{pid}_{evidence_type}_{datetime.now().strftime('%Y-%m-%d_%H%M%S')}.json"
    with open(ev_path, 'w') as f:
        json.dump(evidence, f, indent=2)

    print(f"Added: {data['businessName']} (ID: {pid})")
    print(f"  Evidence: {ev_path}")
    return pid

# Prospect 1: Mile High Auto Glass
add_prospect({
    "businessName": "Mile High Auto Glass",
    "niche": "Auto Glass Repair / Windshield Replacement",
    "website": "https://www.milehighautoglass.com",
    "source": "web_research",
    "description": "Denver-based mobile auto glass repair and windshield replacement serving Front Range. Well-designed website with good content depth but CRITICAL conversion gaps: no email address visible on site (phone/text only at 303-241-8079), no online booking despite 'Schedule at Your Convenience' claim, no instant quote tool, no blog/SEO content, no before/after photos, no pricing info. All lead generation bottlenecks through phone call or text message only — no email capture for follow-up.",
    "serviceArea": "Denver Metro, Aurora, Lakewood, Boulder, Colorado Springs, Front Range, CO",
    "phone": "(303) 241-8079",
    "email": "unverified",
    "opportunityScore": 75,
    "funnelStage": "prospecting",
    "contact": {
        "phone_verified": True,
        "email_verified": False,
        "verification_status": {
            "phone": {"verified": True, "verified_at": "2026-04-29T01:23:00Z"},
            "email": {"verified": False, "verified_at": None}
        }
    }
}, {
    "summary": "Mobile auto glass company with good-looking site but phone/text-only contact. No email for lead capture.",
    "contact_gaps": ["No email address on site", "Phone/text-only contact method", "No lead capture form"],
    "conversion_gaps": ["No online booking/scheduling", "No instant quote tool", "No pricing info", "No before/after photos"],
    "seo_gaps": ["No blog or content strategy", "No city landing pages for metro area"],
    "phone_visible": True,
    "email_visible": False,
    "phone_number": "(303) 241-8079",
    "quote_method": "Phone call or text message only",
    "booking": "Call/text, no self-service booking",
    "has_live_chat": False
})

# Prospect 2: Denver Express Movers
add_prospect({
    "businessName": "Denver Express Movers",
    "niche": "Moving Services",
    "website": "https://www.denverexpressmovers.com",
    "source": "web_research",
    "description": "Denver full-service moving company (residential, commercial, labor-only, packing, junk removal). Template-driven site with thin content. Uses Gmail (Denverexpressmovers1@gmail.com) undermining credibility. Contact page shows phone/email but no quote form. No online booking, no live chat, no instant quote calculator. No pricing/rate info. 400+ reviews claimed but no embedded testimonials or schema.",
    "serviceArea": "Denver Metro, Aurora, Glendale, CO",
    "phone": "720-403-2633",
    "email": "Denverexpressmovers1@gmail.com",
    "opportunityScore": 78,
    "funnelStage": "prospecting",
    "contact": {
        "phone_verified": True,
        "email_verified": True,
        "verification_status": {
            "phone": {"verified": True, "verified_at": "2026-04-29T01:23:00Z"},
            "email": {"verified": True, "verified_at": "2026-04-29T01:23:00Z"}
        }
    }
}, {
    "summary": "Moving company with template site, Gmail contact, thin content. No online booking or quote tool.",
    "contact_gaps": ["Uses Gmail for business email", "No contact form on contact page", "Phone only visible on contact page"],
    "conversion_gaps": ["No online booking/scheduling", "No instant moving quote calculator", "No live chat", "No transparent pricing"],
    "professionalism_gaps": ["Business uses @gmail.com email address", "Template site with no customization"],
    "content_gaps": ["Identically structured service pages", "No blog/content marketing", "No portfolio of moves"],
    "phone_verified": "720-403-2633",
    "email_verified": "Denverexpressmovers1@gmail.com",
    "has_online_booking": False,
    "has_instant_quote": False,
    "has_live_chat": False,
    "site_type": "Template site"
})

# Prospect 3: Denver Landscaping Pros
add_prospect({
    "businessName": "Denver Landscaping Pros",
    "niche": "Landscaping / Lawn Care",
    "website": "https://www.denverlandscapingpros.com",
    "source": "web_research",
    "description": "Denver landscaping company offering residential and commercial services. WEBSITE IS EXTREMELY THIN — barely 900 chars extractable text total. No visible phone, email, or contact form on homepage. No about, contact, portfolio, or service detail pages. NO PORTFOLIO/GALLERY — critical gap for landscaping. No online booking, no instant quote. Apostrophe error in business name ('Pro\\'s'). Extremely high opportunity.",
    "serviceArea": "Denver Metro, CO",
    "phone": "unverified",
    "email": "unverified",
    "opportunityScore": 85,
    "funnelStage": "prospecting",
    "contact": {
        "phone_verified": False,
        "email_verified": False,
        "verification_status": {
            "phone": {"verified": False, "verified_at": None},
            "email": {"verified": False, "verified_at": None}
        }
    }
}, {
    "summary": "CRITICALLY THIN SITE — one of thinnest landscaping sites. Almost no content, no contact info, no portfolio.",
    "contact_gaps": ["No phone number visible", "No email visible", "No contact form", "No contact page"],
    "content_gaps": ["Extremely thin homepage (~919 chars)", "No service detail pages", "No about page", "No portfolio/gallery"],
    "conversion_gaps": ["No online booking", "No instant quote tool", "No live chat", "No pricing info"],
    "credibility_gaps": ["Apostrophe error in business name", "No contact info anywhere", "No testimonials"],
    "has_contact_page": False,
    "has_portfolio": False,
    "has_about_page": False
})

# Prospect 4: PeakView Dentistry
add_prospect({
    "businessName": "PeakView Dentistry",
    "niche": "Dentist / Dental Services",
    "website": "https://www.peakviewdentistry.com",
    "source": "web_research",
    "description": "Boulder, CO cosmetic and implant dentistry (Dr. Adam Kwiatkowski). Beautiful Elementor/WordPress site with extensive service pages. CRITICAL: /contact/ URL returns 404 error. No online appointment scheduling. Phone-only booking (303-417-1644). 4.9-star rated practice losing high-intent dental patients through broken contact path and no self-service booking.",
    "serviceArea": "Boulder, CO",
    "phone": "(303) 417-1644",
    "email": "unverified",
    "opportunityScore": 82,
    "funnelStage": "prospecting",
    "contact": {
        "phone_verified": True,
        "email_verified": False,
        "verification_status": {
            "phone": {"verified": True, "verified_at": "2026-04-29T01:23:00Z"},
            "email": {"verified": False, "verified_at": None}
        }
    }
}, {
    "summary": "Boulder dental practice with broken contact page (404) and no online booking.",
    "critical_issues": ["/contact/ URL returns 404", "Broken lead capture path for patients"],
    "conversion_gaps": ["No online appointment booking", "No patient portal link in main nav", "Phone-only booking"],
    "contact_gaps": ["Contact page 404", "No email visible on extracted content"],
    "phone_verified": "(303) 417-1644",
    "has_online_booking": False,
    "site_platform": "Elementor WordPress",
    "rating": "4.9 stars",
    "404_confirmed": True
})

# Prospect 5: Front Range Locksmith
add_prospect({
    "businessName": "Front Range Locksmith",
    "niche": "Locksmith Services",
    "website": "https://www.frontrangelocksmith.com",
    "source": "web_research",
    "description": "Denver-metro locksmith (residential, commercial, car lockout, rekey). 17-min avg arrival, 24/7. Dated HTML/PHP site (contact.php, about.php). Blog last updated April 2017 (9+ years stale). No email visible anywhere. Phone-only contact (720-439-4081). No online scheduling despite 24/7 claim. No live chat. No instant quote. No service area landing pages.",
    "serviceArea": "Denver Metro, Littleton, Lakewood, CO",
    "phone": "720-439-4081",
    "email": "unverified",
    "opportunityScore": 80,
    "funnelStage": "prospecting",
    "contact": {
        "phone_verified": True,
        "email_verified": False,
        "verification_status": {
            "phone": {"verified": True, "verified_at": "2026-04-29T01:23:00Z"},
            "email": {"verified": False, "verified_at": None}
        }
    }
}, {
    "summary": "Denver locksmith with dated HTML/PHP site, no email, blog from 2017, no online scheduling.",
    "critical_issues": ["No email on any page", "Blog last updated April 2017 (stale)", "contact.php/about.php dated tech"],
    "conversion_gaps": ["No online booking despite 24/7", "No live chat", "No instant quote", "No lead capture form"],
    "content_gaps": ["Blog from 2017 only", "No service area landing pages", "Thin service pages"],
    "technical_gaps": ["Basic PHP site with no modern framework"],
    "phone_verified": "720-439-4081",
    "blog_last_updated": "April 2017",
    "has_online_booking": False,
    "has_email": False
})

# Save CRM data
crm["last_updated"] = datetime.now().isoformat()
with open(crm_path, 'w') as f:
    json.dump(crm, f, indent=2)

print(f"\n=== BATCH ADD COMPLETE ===")
print(f"5 prospects added to CRM")
print(f"CRM saved to {crm_path}")
