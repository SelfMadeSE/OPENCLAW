#!/usr/bin/env python3
"""Hourly prospect research - add 5 new prospects to CRM + save evidence."""

import json
import sys
sys.path.insert(0, '/Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/scripts')
from crm import CRMManager

crm = CRMManager()

# Prospect 1: Sunshine Lawn Care
p1_id = crm.add_prospect({
    "businessName": "Sunshine Lawn Care",
    "niche": "Lawn Care / Landscaping",
    "website": "https://sunshinelawn.care",
    "source": "Bing search - Denver lawn care services - direct website audit",
    "description": "Denver lawn care company offering weekly mowing, yard clean-ups, weed and feed programs, mulching, and shrub trimming. Very basic WordPress site with extremely thin content. Contact page returns 404 error. No email visible anywhere on the site. No online booking/scheduling, no instant quote tool, no live chat, no service area landing pages. Single service listing page with no pricing information. Phone-only lead capture with no digital follow-up mechanism. Newer business with minimal digital infrastructure.",
    "service_area": "Denver Metro, CO",
    "phone": "(720) 998-2351",
    "email": None,
    "opportunity_score": 78,
    "contact": {
        "phone_verified": True,
        "email_verified": False,
        "verification_status": {
            "phone": {"verified": True, "verified_at": "2026-04-29T01:08:00Z"},
            "email": {"verified": False, "verified_at": None}
        }
    }
})
print(f"Added: Sunshine Lawn Care -> {p1_id}")

crm.save_evidence(p1_id, {
    "fetch_url": "https://sunshinelawn.care",
    "audit_date": "2026-04-29",
    "phone_found": "(720) 998-2351 in body text and tel link",
    "email_found": False,
    "contact_page_status": "404",
    "online_booking": False,
    "instant_quote": False,
    "live_chat": False,
    "service_area_pages": False,
    "cms": "WordPress",
    "notes": "Very bare-bones. Contact 404. No email. No booking. Single page template feel."
}, "website_audit_research")

# Prospect 2: Tandem Lawn Care
p2_id = crm.add_prospect({
    "businessName": "Tandem Lawn Care",
    "niche": "Lawn Care / Fertilization",
    "website": "https://www.tandemlawncare.com",
    "source": "Bing search - Denver lawn care experts - direct website audit",
    "description": "Denver lawn fertilization and weed control company specializing in cool-season grass for Colorado's dry climate. Squarespace site with modern design but critical conversion gaps: contact page returns 404 error, no phone number visible on homepage or any extracted content, no email visible anywhere, no online booking/scheduling system, no instant quote tool, no live chat. Has FAQ section and education blog but zero lead capture infrastructure beyond an unloaded form. Missing trust signals, testimonials, and social proof near CTAs. Has Instagram and YouTube links that target generic Squarespace placeholder URLs instead of actual social accounts.",
    "service_area": "Denver Metro, CO",
    "phone": None,
    "email": None,
    "opportunity_score": 82,
    "contact": {
        "phone_verified": False,
        "email_verified": False,
        "verification_status": {
            "phone": {"verified": False, "verified_at": None},
            "email": {"verified": False, "verified_at": None}
        }
    }
})
print(f"Added: Tandem Lawn Care -> {p2_id}")

crm.save_evidence(p2_id, {
    "fetch_url": "https://www.tandemlawncare.com",
    "audit_date": "2026-04-29",
    "phone_found": False,
    "email_found": False,
    "contact_page_status": "404",
    "online_booking": False,
    "instant_quote": False,
    "live_chat": False,
    "service_area_pages": False,
    "cms": "Squarespace",
    "social_links_broken": True,
    "notes": "Beautiful template but empty shell. Contact 404. No contact info visible on homepage. Social links point to Squarespace placeholder URLs."
}, "website_audit_research")

# Prospect 3: Denver Lawn & Snow Care
p3_id = crm.add_prospect({
    "businessName": "Denver Lawn & Snow Care",
    "niche": "Landscaping / Snow Removal",
    "website": "https://denverlawnandsnow.com",
    "source": "Bing search - Denver lawn care snow removal - direct website audit",
    "description": "Denver metro landscaping and snow removal company serving residential and commercial properties. Phone (303) 656-1474 and email info@denverlawnandsnow.com verified on contact page. Contact form exists for free estimates but misses key conversion features: no online booking/scheduling system, no instant quote tool, no live chat, no dedicated service area landing pages (single page covers all services), no project portfolio or before/after gallery. Content is generic with little differentiation from competitors. Unique selling point: supports Denver Urban Gardens (DUG) through partnership - this community angle is not leveraged on CTAs or call-to-action buttons. Hours listed every day 9-5 (including Sunday).",
    "service_area": "Denver Metro, CO",
    "phone": "(303) 656-1474",
    "email": "info@denverlawnandsnow.com",
    "opportunity_score": 72,
    "contact": {
        "phone_verified": True,
        "email_verified": True,
        "verification_status": {
            "phone": {"verified": True, "verified_at": "2026-04-29T01:08:00Z"},
            "email": {"verified": True, "verified_at": "2026-04-29T01:08:00Z"}
        }
    }
})
print(f"Added: Denver Lawn & Snow Care -> {p3_id}")

crm.save_evidence(p3_id, {
    "fetch_url": "https://denverlawnandsnow.com",
    "audit_date": "2026-04-29",
    "phone_found": "(303) 656-1474 on contact page",
    "email_found": "info@denverlawnandsnow.com on contact page",
    "online_booking": False,
    "instant_quote": False,
    "live_chat": False,
    "service_area_pages": False,
    "contact_form": True,
    "social_proof": "DUG partnership mentioned",
    "notes": "Has contact info but no digital booking/quote/chat. DUG partnership underutilized."
}, "website_audit_research")

# Prospect 4: Denver Cleaning Pros
p4_id = crm.add_prospect({
    "businessName": "Denver Cleaning Pros",
    "niche": "Cleaning Services",
    "website": "https://denvercleaningpros.wixsite.com/denver-cleaning-pros",
    "source": "Direct URL fetch - Denver cleaning service Wix site search",
    "description": "Denver cleaning company offering STR turnover cleanings, commercial cleaning, and residential cleaning. Wix-hosted basic template site with minimal conversion infrastructure. No phone number visible on any page - only relies on a basic Wix contact form for lead capture. No online booking/scheduling system despite offering recurring weekly/bi-weekly services - huge friction for repeat customers. No pricing information or packages listed. No service area pages. No live chat. Contact form has no phone field - only name, email, subject, message. Subscribe form present but no targeted lead magnets. No social proof, testimonials, client logos, or reviews displayed. Claims 'open communication channels' but no actual contact methods shown beyond form.",
    "service_area": "Denver Metro, CO",
    "phone": None,
    "email": None,
    "opportunity_score": 80,
    "contact": {
        "phone_verified": False,
        "email_verified": False,
        "verification_status": {
            "phone": {"verified": False, "verified_at": None},
            "email": {"verified": False, "verified_at": None}
        }
    }
})
print(f"Added: Denver Cleaning Pros -> {p4_id}")

crm.save_evidence(p4_id, {
    "fetch_url": "https://denvercleaningpros.wixsite.com/denver-cleaning-pros",
    "audit_date": "2026-04-29",
    "phone_found": False,
    "email_found": False,
    "online_booking": False,
    "instant_quote": False,
    "live_chat": False,
    "service_area_pages": False,
    "cms": "Wix",
    "contact_form_only": True,
    "no_phone_on_site": True,
    "notes": "Wix template site. No phone, no email, no booking - form-only contact. Offers recurring services but no scheduling."
}, "website_audit_research")

# Prospect 5: Ellish Marketing Group (HIGH IRONY - marketing agency)
p5_id = crm.add_prospect({
    "businessName": "Ellish Marketing Group",
    "niche": "Marketing Agency - Restaurant & Franchise",
    "website": "https://ellishmarketing.com",
    "source": "Direct URL fetch - Denver restaurant marketing agency - irony audit",
    "description": "Denver-based restaurant marketing agency founded by Warren Ellish, operating since 2001 with major national brand clients (Denny's, Boston Market, Red Lobster, Burger King, Applejack Wine & Spirits, Pollo Campero, etc.). HIGH IRONY prospect - a marketing agency that sells web design, digital marketing, SEO, and brand positioning yet has a severely outdated own website. Key findings: copyright range 2001-2026 (no updates for 5+ years), multiple 404 errors on common URL paths (/contact/, /services/), navigation links create broken anchor jumps on homepage, no portfolio or case studies from 25+ years of work despite impressive client list, no blog content strategy, no live chat, no lead-nurturing email capture, text-heavy 3-column layout that is content-dense but conversion-poor. Client logos exist but are not hyperlinked to CTAs. Phone (303) 808-4680 and email warren.ellish@ellishmarketing.com verified on contact page. Excellent prospect for 'the plumber with a leaky pipe' pitch angle.",
    "service_area": "Denver, CO / National (US)",
    "phone": "(303) 808-4680",
    "email": "warren.ellish@ellishmarketing.com",
    "opportunity_score": 91,
    "contact": {
        "phone_verified": True,
        "email_verified": True,
        "verification_status": {
            "phone": {"verified": True, "verified_at": "2026-04-29T01:08:00Z"},
            "email": {"verified": True, "verified_at": "2026-04-29T01:08:00Z"}
        }
    }
})
print(f"Added: Ellish Marketing Group -> {p5_id}")

crm.save_evidence(p5_id, {
    "fetch_url": "https://ellishmarketing.com",
    "audit_date": "2026-04-29",
    "phone_found": "(303) 808-4680 on contact page",
    "email_found": "warren.ellish@ellishmarketing.com on contact page",
    "owner_contact": "Warren Ellish - President & CEO",
    "years_operating": "2001-2026 (25+ years)",
    "irony_score": "HIGH - marketing agency selling web design with own website issues",
    "broken_pages_found": ["/contact/ 404s", "/services/ paths broken", "anchor links broken"],
    "missing_portfolio": True,
    "no_blog": True,
    "no_live_chat": True,
    "copyright_old": "2001-2026 (footer not updated)",
    "cms": "WordPress",
    "client_highlights": ["Denny's", "Boston Market", "Red Lobster", "Burger King", "Pollo Campero"],
    "notes": "Highest priority. Agency selling web services with own website neglected for years. Copyright stuck at 2020 range. Multiple 404s. No portfolio. Perfect irony pitch."
}, "website_audit_research")

print("\n=== DONE ===")
print("5 new prospects added to CRM.")
print("Evidence artifacts saved for all 5 prospects.")
