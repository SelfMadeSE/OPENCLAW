#!/usr/bin/env python3
"""Add Denver Lawn & Landscape to CRM"""
import sys
sys.path.insert(0, '/Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/scripts')
from crm import CRMManager

crm = CRMManager()
data = {
  "businessName": "Denver Lawn & Landscape",
  "niche": "Landscaping Services",
  "website": "https://www.denverlawnlandscape.com",
  "source": "DuckDuckGo search for Denver landscaping company websites (2026-04-26)",
  "description": "Locally owned, family-run landscaping company serving Denver, Highlands Ranch, Parker, Castle Rock, Littleton, Castle Pines, Lone Tree, Centennial, Englewood, and Greenwood Village. Services include sod installation, mulch delivery, sprinkler systems, and yard transformations.",
  "contact": {
    "phone": None,
    "email": None,
    "address": "Denver Metro Area, Colorado",
    "verification_status": {
      "phone": {"verified": False, "verified_at": None},
      "email": {"verified": False, "verified_at": None}
    }
  },
  "status": "researched",
  "tags": ["landscaping", "denver", "local-service", "website-audit-opportunity"],
  "websiteIssues": [
    "Contact page returns 404 error - no way to reach the business online",
    "No online estimate or quote request system",
    "No service booking or scheduling capability",
    "No project portfolio or photo gallery of completed work",
    "No customer testimonials or reviews displayed",
    "Very limited content - no service detail pages or pricing info",
    "No service area pages despite serving 10+ cities",
    "No seasonal promotions or maintenance plan signup",
    "Missing critical lead capture forms on homepage"
  ],
  "opportunityScore": 97,
  "researchDate": "2026-04-26",
  "auditFunnelStage": "prospect_identified"
}
pid = crm.add_prospect(data)
print(f"Prospect ID: {pid}")
crm.save_evidence(pid, {
  "websiteUrl": "https://www.denverlawnlandscape.com",
  "accessDate": "2026-04-26",
  "phoneFoundOnSite": None,
  "emailFoundOnSite": None,
  "addressFoundOnSite": "Denver Metro Area",
  "siteTechObservations": "Very basic site with almost no functional pages. Large wasm/html bundle size (~750KB). A contact page URL returns a 404. Appears to be a minimal template with no real investment.",
  "designAssessment": "Poor - extremely basic, no portfolio, no contact info discoverable on homepage",
  "conversionGaps": ["No contact form", "No estimate request", "No booking", "No phone number on site"],
  "leadCaptureGaps": ["No lead capture mechanism at all", "No contact page", "No newsletter signup"],
  "technicalGaps": ["Contact page 404 - broken user journey", "No service pages", "No city pages", "Large page weight"],
  "competitorNote": "Landscaping competitors typically have portfolio galleries, instant estimate forms, and service booking"
}, "website_audit")
