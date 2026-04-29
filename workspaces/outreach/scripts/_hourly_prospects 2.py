#!/usr/bin/env python3
"""Hourly prospect research: add 5 prospects to CRM with evidence."""

import json
import sys
sys.path.insert(0, '/Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/scripts')

from crm import CRMManager

crm = CRMManager()

# ====== 1. Denver Concrete Pros ======
p1 = {
    "businessName": "Denver Concrete Pros",
    "website": "https://www.denverconcretepros.com",
    "phone": "720-677-8930",
    "email": "Denverconcretepros974@gmail.com",
    "niche": "Concrete Services",
    "source": "Website research - direct browsing",
    "description": "Concrete flatwork contractor. Site issues: entire page text duplicated, placeholder phone 1-800-555-555, wrong city 'San Antonio' on Denver site, all social links go to generic base URLs, 404 error on /about, AI-generated copy. No booking, live chat, portfolio or pricing. Uses Gmail for business contact.",
    "serviceArea": "Denver Metro / Boulder",
    "opportunityScore": 87,
    "contact": {
        "email_verified": True,
        "phone_verified": True,
        "email_notes": "Found on contact page (Denverconcretepros974@gmail.com)",
        "phone_notes": "Listed on homepage header and contact page"
    }
}
pid1 = crm.add_prospect(p1)
crm.mark_contact_verified(pid1, "email", True)
crm.mark_contact_verified(pid1, "phone", True)
crm.save_evidence(pid1, {
    "url": "https://www.denverconcretepros.com",
    "contactPage": "https://www.denverconcretepros.com/contact",
    "issues": [
        "Duplicate content - entire page text repeated twice",
        "Placeholder phone number 1-800-555-555 visible on contact page",
        "Wrong city - references San Antonio on Denver-local site",
        "All social media links (Facebook, Twitter, Insta, YouTube, LinkedIn, Snap, Pinterest) point to generic base URLs",
        "/about page returns 404",
        "Gmail address for business (unprofessional)",
        "No online booking, live chat, or instant quote tools",
        "Generic AI-generated content with no differentiation"
    ],
    "findings": "Heavy template site built on multiscreensite.com platform by Kate Marketing LLC. Multiple critical quality issues visible on homepage and contact page.",
    "discoveredAt": "2026-04-29T00:05 MDT"
}, "website_audit_research")
print(f"✓ Added {p1['businessName']} (ID: {pid1})")

# ====== 2. Rocky Mountain Appliance Repair ======
p2 = {
    "businessName": "Rocky Mountain Appliance Repair",
    "website": "https://rockymountainappliancerepair.com",
    "phone": "303-529-4322",
    "email": "info@rockymountainappliancerepair.com",
    "niche": "Appliance Repair Services",
    "source": "Website research - direct browsing",
    "description": "Family-owned appliance repair serving Thornton/North Denver Metro since 2021. Site issues: no online booking or scheduling, no live chat, no transparent pricing or estimates online, template design with generic feel, no blog or SEO content strategy, serves 6+ suburbs without dedicated city landing pages, testimonial section lacks schema markup for rich results, no service-area differentiation.",
    "serviceArea": "Thornton / Westminster / Northglenn / Brighton / Broomfield / Erie / North Denver Metro",
    "opportunityScore": 72,
    "contact": {
        "email_verified": True,
        "phone_verified": True,
        "email_notes": "Found on homepage (info@rockymountainappliancerepair.com)",
        "phone_notes": "Listed on homepage footer"
    }
}
pid2 = crm.add_prospect(p2)
crm.mark_contact_verified(pid2, "email", True)
crm.mark_contact_verified(pid2, "phone", True)
crm.save_evidence(pid2, {
    "url": "https://rockymountainappliancerepair.com",
    "issues": [
        "No online booking or appointment scheduling",
        "No live chat for instant inquiries",
        "No pricing transparency - requires phone call for estimate",
        "Template-based design with generic stock feel",
        "No blog or SEO content strategy",
        "Serves 6+ suburbs without dedicated landing pages per city",
        "Testimonials present but no review schema markup",
        "No email capture popup for lead gen",
        "Founded 2021 - relatively new, likely open to improvement"
    ],
    "findings": "Solid local business with decent content but missing key conversion tools. Good candidate for adding online booking, live chat, pricing pages, and city-specific SEO landing pages.",
    "discoveredAt": "2026-04-29T00:05 MDT"
}, "website_audit_research")
print(f"✓ Added {p2['businessName']} (ID: {pid2})")

# ====== 3. Junk Genius (Denver Junk Removal) ======
p3 = {
    "businessName": "Junk Genius (Denver Junk Removal)",
    "website": "https://denverjunkremoval.com",
    "phone": "303-388-7780",
    "email": "denver@junkgenius.com",
    "niche": "Junk Removal Services",
    "source": "Website research - direct browsing",
    "description": "Locally-owned junk removal company with eco-friendly/recycling focus, serving Denver metro. Site issues: no live chat, no instant online quoting (requires form submission), generic template feel with limited branding differentiation, thin service-area pages, no pricing transparency, no before/after photos or video content, no email capture for ongoing lead nurturing, volume-based pricing mentioned but no estimate calculator.",
    "serviceArea": "Denver Metro / Englewood",
    "opportunityScore": 68,
    "contact": {
        "email_verified": True,
        "phone_verified": True,
        "email_notes": "Found on contact page (denver@junkgenius.com)",
        "phone_notes": "Listed on homepage and contact page"
    }
}
pid3 = crm.add_prospect(p3)
crm.mark_contact_verified(pid3, "email", True)
crm.mark_contact_verified(pid3, "phone", True)
crm.save_evidence(pid3, {
    "url": "https://denverjunkremoval.com",
    "contactPage": "https://denverjunkremoval.com/contact-us/",
    "issues": [
        "No live chat for instant lead capture",
        "No instant online quoting tool - requires manual form",
        "Generic template feel without unique brand personality",
        "No pricing transparency or range estimates",
        "No before/after photos or video content (visual proof)",
        "No email capture popup or newsletter opt-in",
        "Thin service-area pages on locations page",
        "Contact form uses basic CAPTCHA - potential friction"
    ],
    "findings": "Decent local junk removal business with good eco-friendly positioning. Missing conversion rate optimization elements that could double lead capture. Professional email (denver@junkgenius.com) is a plus.",
    "discoveredAt": "2026-04-29T00:05 MDT"
}, "website_audit_research")
print(f"✓ Added {p3['businessName']} (ID: {pid3})")

# ====== 4. Denver Legal Marketing ======
p4 = {
    "businessName": "Denver Legal Marketing",
    "website": "https://denverlegalmarketing.com",
    "phone": "303-557-6999",
    "email": "meranda@denverlegalmarketing.com",
    "niche": "Digital Marketing Agency",
    "source": "Website research - direct browsing",
    "description": "Legal marketing agency ironically running a dated, under-optimized website. Owned by Meranda Vieyra, 20+ year Colorado legal professional. Sells SEO, PPC, web design, email campaigns, podcasting to law firms - yet her own site has: copyright stuck at 2020, bare-minimum about page, zero portfolio/case studies, no client testimonials, no blog content, basic contact form only, no live chat, text-heavy layout with poor visual hierarchy. HIGH irony factor - ideal outbound autonomy prospect.",
    "serviceArea": "Denver / Colorado",
    "opportunityScore": 93,
    "contact": {
        "email_verified": True,
        "phone_verified": True,
        "email_notes": "Found on contact page (meranda@denverlegalmarketing.com)",
        "phone_notes": "Listed on homepage and contact page"
    }
}
pid4 = crm.add_prospect(p4)
crm.mark_contact_verified(pid4, "email", True)
crm.mark_contact_verified(pid4, "phone", True)
crm.save_evidence(pid4, {
    "url": "https://denverlegalmarketing.com",
    "contactPage": "https://denverlegalmarketing.com/contact/",
    "issues": [
        "Copyright stuck at 2020 - site not maintained for 5+ years",
        "Bare-minimum about page with almost no content",
        "Zero portfolio or case studies",
        "No client testimonials or social proof",
        "No blog content despite selling SEO services",
        "Basic contact form - name, email, message only",
        "No live chat despite selling digital marketing",
        "Text-heavy layout with poor visual hierarchy",
        "No team page - only Meranda listed",
        "IRONY: A marketing agency selling web design/SEO with a dated, neglected website"
    ],
    "findings": "Highest priority prospect. Marketing agency selling website services with their own site in disrepair. Perfect outbound autonomy pitch: 'Let us show you what you'd show your clients.'",
    "discoveredAt": "2026-04-29T00:05 MDT"
}, "website_audit_research")
print(f"✓ Added {p4['businessName']} (ID: {pid4})")

# ====== 5. Denver Handyman Pros ======
p5 = {
    "businessName": "Denver Handyman Pros",
    "website": "https://denverhandymanpro.com",
    "phone": "720-987-5219",
    "niche": "Handyman Services",
    "source": "Website research - direct browsing",
    "description": "Denver handyman (owner Jim, 35+ years experience) serving 20+ metro suburbs. Site issues: no email address anywhere on the site (critical lead capture gap), no live chat, 'Book your project Online' text links to city pages not actual booking, city landing pages appear templated (same structure/content with city swapped), no pricing or rate info, no portfolio/gallery of work despite 35 years, no real about page or owner branding, no blog content. Only contact method is phone call or contact form.",
    "serviceArea": "Denver Metro (Lakewood, Arvada, Aurora, Broomfield, Centennial, Englewood, Golden, Littleton, Thornton, Parker, Highlands Ranch + 10 more)",
    "opportunityScore": 82,
    "contact": {
        "email_verified": False,
        "phone_verified": True,
        "email_notes": "No email found anywhere on site - unverified",
        "phone_notes": "Found on city landing page (720-987-5219)"
    }
}
pid5 = crm.add_prospect(p5)
crm.mark_contact_verified(pid5, "phone", True)
crm.mark_contact_verified(pid5, "email", False)
crm.save_evidence(pid5, {
    "url": "https://denverhandymanpro.com",
    "cityPageSample": "https://denverhandymanpro.com/lakewood-handyman-services/",
    "issues": [
        "No email address visible anywhere on site",
        "No live chat",
        "Book Online buttons link to city pages, not actual booking widget",
        "City landing pages appear templated - same structure with city swapped",
        "No pricing or rate transparency",
        "No portfolio/gallery despite 35 years of work",
        "No real about page or owner story/branding",
        "No blog or SEO content",
        "Only contact methods: phone or contact form (high friction)",
        "20+ city pages but likely duplicate content issues"
    ],
    "findings": "Strong local business with lots of city pages (good SEO intent) but templated content creates thin/duplicate page risk. No email is a serious lead capture gap - only phone and contact form available. Contact discovery needed for email.",
    "discoveredAt": "2026-04-29T00:05 MDT"
}, "website_audit_research")
print(f"✓ Added {p5['businessName']} (ID: {pid5})")

print("\n=== ALL 5 PROSPECTS ADDED SUCCESSFULLY ===")
print(f"Contact statuses:")
print(f"  Denver Concrete Pros - Phone: verified, Email: verified")
print(f"  Rocky Mountain Appliance Repair - Phone: verified, Email: verified")
print(f"  Junk Genius (Denver Junk Removal) - Phone: verified, Email: verified")
print(f"  Denver Legal Marketing - Phone: verified, Email: verified")
print(f"  Denver Handyman Pros - Phone: verified, Email: unverified (not found on site)")
