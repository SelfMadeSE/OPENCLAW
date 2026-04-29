#!/usr/bin/env python3
"""Add 5 new prospects to the CRM for hourly prospect research run."""

import sys
sys.path.insert(0, "/Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/scripts")

from crm import CRMManager

crm = CRMManager()

# Prospect 1: Mighty Bee Electric
prospect1 = {
    "businessName": "Mighty Bee Electric",
    "niche": "Electrical Services",
    "website": "https://mightybeeelectric.com",
    "source": "DuckDuckGo search - Denver electrician website",
    "description": "Family-owned Denver electrical company since 1971. Owner/operator Martin Black, Colorado Master Electrician. Site has service pages and contact form but no email visible, no online booking, no instant quote tool, no live chat. Phone (303) 288-7988 found on contact page. Basic WordPress template with limited lead capture. No emergency service CTA above fold despite being a critical service business.",
    "service_area": "Denver Metro, CO",
    "phone": "(303) 288-7988",
    "email": None,
    "opportunity_score": 80,
    "contact": {
        "phone_verified": True,
        "email_verified": False,
        "verification_status": {
            "phone": {"verified": True, "verified_at": None},
            "email": {"verified": False, "verified_at": None}
        }
    }
}
pid1 = crm.add_prospect(prospect1)
crm.mark_contact_verified(pid1, "phone", True)
print(f"✓ Added: {prospect1['businessName']} (ID: {pid1})")

# Prospect 2: Colorado Native Plumbing
prospect2 = {
    "businessName": "Colorado Native Plumbing",
    "niche": "Plumbing Services",
    "website": "https://www.coloradonativeplumbing.com",
    "source": "DuckDuckGo search - Denver plumber website",
    "description": "Licensed Master Plumber serving Metro Denver since 2016. Critical lead capture failure: contact pages at /contact, /contact-us/, and /contact.php all return 404 errors. No phone number or email visible anywhere on the main site. Site is a basic cPanel-hosted page with minimal service listing. No online booking, no contact form, no quote tool. Owner likely losing significant business from web traffic.",
    "service_area": "Denver Metro and surrounding cities, CO",
    "phone": None,
    "email": None,
    "opportunity_score": 92,
    "contact": {
        "phone_verified": False,
        "email_verified": False,
        "verification_status": {
            "phone": {"verified": False, "verified_at": None},
            "email": {"verified": False, "verified_at": None}
        }
    }
}
pid2 = crm.add_prospect(prospect2)
print(f"✓ Added: {prospect2['businessName']} (ID: {pid2})")

# Prospect 3: My Denver Plumber
prospect3 = {
    "businessName": "My Denver Plumber",
    "niche": "Plumbing Services",
    "website": "https://mydenverplumber.net",
    "source": "DuckDuckGo search - Denver plumber website local service",
    "description": "Local Denver/Lakewood plumbing company run by Jason. Website is essentially a single-page testimonials site with very thin service information. Contact form exists but no online booking, no service area pages, no instant quote tool, no service category structure. Email info@mydenverplumber.net visible on contact page. Address: 1410 Brentwood St, Lakewood, CO 80214. Basic site losing booking opportunities.",
    "service_area": "Denver / Lakewood, CO",
    "phone": None,
    "email": "info@mydenverplumber.net",
    "opportunity_score": 78,
    "contact": {
        "phone_verified": False,
        "email_verified": True,
        "verification_status": {
            "phone": {"verified": False, "verified_at": None},
            "email": {"verified": True, "verified_at": None}
        }
    }
}
pid3 = crm.add_prospect(prospect3)
crm.mark_contact_verified(pid3, "email", True)
print(f"✓ Added: {prospect3['businessName']} (ID: {pid3})")

# Prospect 4: Fix-It Now Heating & Cooling
prospect4 = {
    "businessName": "Fix-It Now Heating & Cooling",
    "niche": "HVAC Services",
    "website": "https://fixitnowhvac.com",
    "source": "DuckDuckGo search - Denver HVAC company website",
    "description": "Family-owned and operated Denver Metro HVAC company. Owners Julian & Annabel. Basic WordPress template site. Contact page at /contact/ redirects to /contact-local-hvac-company/ with no contact info visible in content. No email found on site. No online booking, no live chat, no instant quote tool. Phone (303) 657-2421 from search listings (unverified on site). Financing link (Synchrony) exists but no lead capture automation.",
    "service_area": "Denver Metro (Arvada, Aurora, Boulder, Broomfield, Centennial, Denver, Highlands Ranch, Littleton, Parker, Thornton, Westminster, Wheat Ridge)",
    "phone": "(303) 657-2421",
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
}
pid4 = crm.add_prospect(prospect4)
print(f"✓ Added: {prospect4['businessName']} (ID: {pid4})")

# Prospect 5: Denver Concierge
prospect5 = {
    "businessName": "Denver Concierge",
    "niche": "Cleaning Services",
    "website": "https://denverconcierge.com",
    "source": "DuckDuckGo search - Denver cleaning service website",
    "description": "Premier house cleaning service in Denver since 1999. Green cleaning certified (Green Clean Institute Silver Status). Basic WordPress site with minimal conversion optimization. Contact page has no extracted phone or email. Site relies on a single contact form. No online booking/quoting system despite instant quote being a major conversion lever for cleaning services. No live chat. No service area pages or neighborhood targeting. Older site design (copyright 2008-2025).",
    "service_area": "Denver Metro (Littleton, Boulder, Broomfield, Denver, Parker, Lafayette, Louisville, Niwot)",
    "phone": None,
    "email": None,
    "opportunity_score": 75,
    "contact": {
        "phone_verified": False,
        "email_verified": False,
        "verification_status": {
            "phone": {"verified": False, "verified_at": None},
            "email": {"verified": False, "verified_at": None}
        }
    }
}
pid5 = crm.add_prospect(prospect5)
print(f"✓ Added: {prospect5['businessName']} (ID: {pid5})")

print("\n--- All 5 prospects added successfully ---")
print(f"Saved to: {crm.crm_data_path}")
