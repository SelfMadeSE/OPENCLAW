#!/usr/bin/env python3
"""Add DC Plumbing Colorado to CRM"""
import sys
sys.path.insert(0, '/Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/scripts')
from crm import CRMManager

crm = CRMManager()
data = {
  "businessName": "DC Plumbing Colorado",
  "niche": "Plumbing Services",
  "website": "https://www.dcplumbingcolorado.com",
  "source": "DuckDuckGo search for Denver plumbing company websites (2026-04-26)",
  "description": "Parker/Denver-based plumbing service with over 30 years experience. Offers new residential construction, commercial plumbing, and remodels. Family-run business.",
  "contact": {
    "phone": "720-810-7933",
    "email": None,
    "address": "11730 Greenlet Ct, Parker, CO 80134",
    "verification_status": {
      "phone": {"verified": True, "verified_at": None},
      "email": {"verified": False, "verified_at": None}
    }
  },
  "status": "researched",
  "tags": ["plumbing", "denver", "parker", "local-service", "website-audit-opportunity"],
  "websiteIssues": [
    "Extremely minimal single-page website with virtually no content depth",
    "No service area detail pages or city-specific landing pages",
    "No online booking or scheduling capability",
    "No blog, resources, or SEO content strategy",
    "Missing pricing information or service packages",
    "No customer reviews or testimonials on site despite claiming 30+ years in business",
    "No emergency plumbing callout despite emergencies being core to plumbing business",
    "No contact form - just phone number and address listed"
  ],
  "opportunityScore": 95,
  "researchDate": "2026-04-26",
  "auditFunnelStage": "prospect_identified"
}
pid = crm.add_prospect(data)
print(f"Prospect ID: {pid}")
crm.save_evidence(pid, {
  "websiteUrl": "https://www.dcplumbingcolorado.com",
  "accessDate": "2026-04-26",
  "phoneFoundOnSite": "720-810-7933 (footer)",
  "emailFoundOnSite": None,
  "addressFoundOnSite": "11730 Greenlet Ct, Parker, CO 80134",
  "siteTechObservations": "Extremely basic single-page site. No CMS depth. Likely a simple template. Virtually no content marketing or SEO investment.",
  "designAssessment": "Poor - very basic, no modern design elements, looks neglected",
  "conversionGaps": ["No contact form", "No online scheduling", "No service descriptions", "No pricing"],
  "leadCaptureGaps": ["Phone-only lead capture", "No email signup", "No estimate request"],
  "technicalGaps": ["Thin content - SEO penalty risk", "No blog", "No schema markup verified"],
  "competitorNote": "Nearly all plumbing competitors have multi-page sites with booking, service pages, and city landing pages"
}, "website_audit")
