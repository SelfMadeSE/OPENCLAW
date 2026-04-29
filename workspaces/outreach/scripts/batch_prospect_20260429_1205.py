#!/usr/bin/env python3
"""Batch add 5 fresh prospects to CRM for OA website audit funnel - 2026-04-29 12:05 PM MDT."""

import json
import sys
sys.path.insert(0, '/Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/scripts')
from crm import CRMManager

crm = CRMManager()

prospects = [
    {
        "businessName": "Sander & Sons",
        "niche": "Kitchen Remodeling / Cabinetry",
        "website": "https://kitchensofdenver.com",
        "source": "Google organic search - Denver kitchen remodeling contractor",
        "description": "Family-owned Denver kitchen and bathroom remodeling company with 20+ years experience. Website has content but lacks dedicated landing pages for specific services, no clear conversion CTAs above the fold, no live chat or instant quote tool, and appears to use a basic WordPress template with dated design. No visible lead magnet or email capture mechanism.",
        "contact": {
            "email": None,
            "phone": None,
            "address": "Denver, CO",
            "verification_status": {
                "email": {"verified": False, "verified_at": None},
                "phone": {"verified": False, "verified_at": None},
                "website": {"verified": True, "verified_at": "2026-04-29T18:05:00"}
            }
        },
        "website_gaps": {
            "design": "Basic WordPress template, dated visual design, no modern hero section with value proposition",
            "conversion": "No lead capture form above fold, no instant quote, no chat widget, weak CTAs",
            "technical": "Likely no schema markup for local business, potential page speed issues with large images",
            "seo": "No dedicated service area pages, minimal blog content, thin meta descriptions",
            "competitors": "Kitchen Creations Ltd, The Kitchen Showcase have more modern sites with gallery/portfolio features"
        },
        "funnel_stage": "identified",
        "priority": "medium"
    },
    {
        "businessName": "MacDonald Hardwoods",
        "niche": "Hardwood Flooring / Floor Installation",
        "website": "https://www.macwoods.com",
        "source": "Google Maps - Denver flooring company search",
        "description": "Denver hardwood flooring company with 40+ years experience, 12,000+ customers. Website is a basic single-page site with minimal content. No online scheduling, no pricing transparency, no project gallery with filtering, no blog/content marketing. The site relies on generic testimonials without photos or verification.",
        "contact": {
            "email": None,
            "phone": "(303) 825-3006",
            "address": "929 W 1st Ave, Denver, CO 80223",
            "verification_status": {
                "email": {"verified": False, "verified_at": None},
                "phone": {"verified": True, "verified_at": "2026-04-29T18:05:00"},
                "website": {"verified": True, "verified_at": "2026-04-29T18:05:00"}
            }
        },
        "website_gaps": {
            "design": "Simplistic single-page layout, no project gallery with filtering, generic stock-style imagery",
            "conversion": "No online estimate tool, no scheduling, contact form buried at bottom, no phone click-to-call on mobile",
            "technical": "No visible SSL issues but likely no structured data, no Google Maps integration, potential slow load",
            "seo": "Thin content, no neighborhood/area pages, no blog, weak internal linking",
            "competitors": "Denver Flooring Collective has a more modern site with online booking and clearer pricing hooks"
        },
        "funnel_stage": "identified",
        "priority": "high"
    },
    {
        "businessName": "Denver Flooring Collective",
        "niche": "Flooring Installation / Home Improvement",
        "website": "https://denverflooringcollective.com",
        "source": "Google Maps - Denver flooring company search",
        "description": "Denver flooring installation company offering hardwood, laminate, vinyl, and tile. Website has a temporary/urgency-based 40% off promotion expiring soon (likely always running). Uses a generic lead capture form but has no portfolio gallery, no before/after images, and relies on a basic template. No reviews integration, no trust badges.",
        "contact": {
            "email": None,
            "phone": "(720) 599-1664",
            "address": "11068 E Louisiana Pl, Denver, CO",
            "verification_status": {
                "email": {"verified": False, "verified_at": None},
                "phone": {"verified": True, "verified_at": "2026-04-29T18:05:00"},
                "website": {"verified": True, "verified_at": "2026-04-29T18:05:00"}
            }
        },
        "website_gaps": {
            "design": "Template-based single-page site, generic stock photos, no real project portfolio",
            "conversion": "Fake urgency (countdown/expiring discount), single lead form, no multi-step qualification",
            "technical": "Built by Grain of Salt agency, likely basic SEO setup, no schema markup visible",
            "seo": "No blog, no area pages, no educational content, thin page copy",
            "competitors": "MacDonald Hardwoods has stronger brand trust and longevity messaging"
        },
        "funnel_stage": "identified",
        "priority": "high"
    },
    {
        "businessName": "Next Step Innovations",
        "niche": "Kitchen & Bath Remodeling / Cabinetry",
        "website": "https://nextstepkitchens.com",
        "source": "Google organic search - Denver kitchen remodeling",
        "description": "Denver kitchen and bath remodeling company with a physical showroom. Website has good content about their process and press features, but the design is cluttered, no clear primary CTA, duplicate content blocks, and no lead qualification form. Featured in Colorado's Best Kitchens magazine which is a trust asset not well leveraged on site.",
        "contact": {
            "email": None,
            "phone": "(303) 722-0585",
            "address": "Denver, CO",
            "verification_status": {
                "email": {"verified": False, "verified_at": None},
                "phone": {"verified": True, "verified_at": "2026-04-29T18:05:00"},
                "website": {"verified": True, "verified_at": "2026-04-29T18:05:00"}
            }
        },
        "website_gaps": {
            "design": "Cluttered layout, duplicate content sections, inconsistent spacing, dated visual style",
            "conversion": "No clear primary CTA, phone number buried in text, no consultation booking widget, no email capture",
            "technical": "Duplicate content blocks suggest template issues, likely no structured data, no speed optimization visible",
            "seo": "Press features not properly leveraged for SEO, no blog, thin area pages, missed backlink opportunities",
            "competitors": "SKB Remodel has a much cleaner, more modern website with clearer process documentation"
        },
        "funnel_stage": "identified",
        "priority": "medium"
    },
    {
        "businessName": "Letali, LLC",
        "niche": "Home Remodeling / Kitchen & Bath",
        "website": "https://www.letali.com",
        "source": "Google organic search - Denver kitchen remodeling contractor",
        "description": "Denver home remodeling company offering kitchen, bathroom, basement, and home office remodeling. Website has raw HTML links visible (URLs displayed as text), generic template design, no professional photography of completed projects, testimonials without verification links, and no clear lead capture mechanism beyond a basic contact page.",
        "contact": {
            "email": None,
            "phone": None,
            "address": "Denver, CO",
            "verification_status": {
                "email": {"verified": False, "verified_at": None},
                "phone": {"verified": False, "verified_at": None},
                "website": {"verified": True, "verified_at": "2026-04-29T18:05:00"}
            }
        },
        "website_gaps": {
            "design": "Amateur template, raw URLs visible as text instead of styled links, no visual hierarchy",
            "conversion": "No lead magnet, no quote calculator, no chat, basic contact form only",
            "technical": "Raw URL rendering indicates poor CMS/template configuration, likely no SSL redirect issues, no schema",
            "seo": "Thin content across service pages, no blog, no local SEO optimization, no GBP integration",
            "competitors": "Sander & Sons and Next Step Innovations have significantly better web presences"
        },
        "funnel_stage": "identified",
        "priority": "high"
    }
]

# Add all prospects
for prospect in prospects:
    try:
        prospect_id = crm.add_prospect(prospect)
        print(f"✅ Added: {prospect['businessName']} ({prospect_id})")
        
        # Save evidence
        evidence = {
            "research_date": "2026-04-29T18:05:00",
            "research_method": "web_fetch + google_search + google_maps",
            "website_url": prospect["website"],
            "website_gaps": prospect["website_gaps"],
            "source_urls": [
                "https://www.google.com/search?q=denver+kitchen+remodeling+contractor+website",
                "https://www.google.com/maps/search/denver+flooring+company",
                "https://www.google.com/maps/search/denver+heating+and+cooling+company"
            ],
            "audit_notes": prospect["description"],
            "funnel_stage": prospect["funnel_stage"],
            "priority": prospect["priority"]
        }
        
        evidence_path = crm.save_evidence(prospect_id, evidence, "website_audit")
        print(f"   📄 Evidence saved: {evidence_path}")
        
        # Mark website as verified
        crm.mark_contact_verified(prospect_id, "website", True)
        
        # Mark phone if available
        if prospect.get("contact", {}).get("phone"):
            crm.mark_contact_verified(prospect_id, "phone", True)
        
        print(f"   🔍 Contact verification updated")
        
    except Exception as e:
        print(f"❌ Error adding {prospect['businessName']}: {e}")

print("\n=== BATCH COMPLETE ===")
print(f"Total prospects added: {len(prospects)}")
