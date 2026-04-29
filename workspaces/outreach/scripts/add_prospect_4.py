#!/usr/bin/env python3
"""Add Atlantic Dental to CRM"""
import sys
sys.path.insert(0, '/Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/scripts')
from crm import CRMManager

crm = CRMManager()
data = {
  "businessName": "Atlantic Dental",
  "niche": "Dental Services",
  "website": "https://myatlanticdental.com",
  "source": "DuckDuckGo search for Denver dental clinic websites (2026-04-26)",
  "description": "Denver-based dental practice serving adults and children. Locally owned. Offers general dentistry, cleanings, wisdom teeth extraction. Does not offer orthodontics.",
  "contact": {
    "phone": None,
    "email": None,
    "address": "Denver, Colorado",
    "verification_status": {
      "phone": {"verified": False, "verified_at": None},
      "email": {"verified": False, "verified_at": None}
    }
  },
  "status": "researched",
  "tags": ["dental", "denver", "local-service", "website-audit-opportunity"],
  "websiteIssues": [
    "Very basic, content-thin website that appears outdated",
    "No online appointment booking or scheduling system",
    "No patient portal integration for forms or records",
    "No new patient specials or promotional offers on site",
    "No insurance-accepted list or insurance verification tool",
    "No dentist/staff profiles to build trust",
    "No blog, educational content, or SEO strategy",
    "Missing prominent phone number and contact CTA on homepage",
    "Contact page has no form - just generic text about dental visits",
    "Site uses no conversion optimization - no lead magnets, no reviews, no service booking"
  ],
  "opportunityScore": 92,
  "researchDate": "2026-04-26",
  "auditFunnelStage": "prospect_identified"
}
pid = crm.add_prospect(data)
print(f"Prospect ID: {pid}")
crm.save_evidence(pid, {
  "websiteUrl": "https://myatlanticdental.com",
  "accessDate": "2026-04-26",
  "phoneFoundOnSite": None,
  "emailFoundOnSite": None,
  "addressFoundOnSite": "Denver, Colorado",
  "siteTechObservations": "Very basic site with minimal content. Appears to be an older template or DIY build. No modern dental website features.",
  "designAssessment": "Poor - outdated design, no visual appeal, content is wall-of-text",
  "conversionGaps": ["No booking CTA", "No new patient offers", "No service pages", "No reviews"],
  "leadCaptureGaps": ["No contact form on contact page", "No phone prominently displayed", "No patient intake"],
  "technicalGaps": ["Thin content throughout", "No blog", "Likely poor mobile experience", "No schema markup"],
  "competitorNote": "Dental competitors (Vero Dental, etc.) have booking, patient portals, insurance checkers, and modern designs"
}, "website_audit")
