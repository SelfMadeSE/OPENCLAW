#!/usr/bin/env python3
"""Add Denver Roofing Co. to CRM"""
import sys
sys.path.insert(0, '/Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/scripts')
from crm import CRMManager

crm = CRMManager()
data = {
  "businessName": "Denver Roofing Co.",
  "niche": "Roofing Services",
  "website": "https://denverroofingco.com",
  "source": "DuckDuckGo search for Denver roofing company websites (2026-04-26)",
  "description": "Denver metro roofing company offering asphalt shingles, metal roofing, tile roofing, hail damage repair, and insurance-claim-direct services. Licensed and insured.",
  "contact": {
    "phone": "720-547-9446",
    "email": "bids@denverroofingco.com",
    "address": "Highlands Ranch, Colorado",
    "verification_status": {
      "phone": {"verified": True, "verified_at": None},
      "email": {"verified": True, "verified_at": None}
    }
  },
  "status": "researched",
  "tags": ["roofing", "denver", "highlands-ranch", "local-service", "website-audit-opportunity"],
  "websiteIssues": [
    "No online scheduling for roof inspections - form-based estimate only",
    "No live chat or instant response tool (critical for insurance-claim leads)",
    "No project tracking portal for active roofing jobs",
    "No service area sub-pages for individual cities (generic Denver page)",
    "Referral/reseller partner program could improve lead generation pipeline",
    "No customer portal to track insurance claim progress"
  ],
  "opportunityScore": 75,
  "researchDate": "2026-04-26",
  "auditFunnelStage": "prospect_identified"
}
pid = crm.add_prospect(data)
print(f"Prospect ID: {pid}")
crm.save_evidence(pid, {
  "websiteUrl": "https://denverroofingco.com",
  "accessDate": "2026-04-26",
  "phoneFoundOnSite": "720-547-9446 (header and contact page)",
  "emailFoundOnSite": "bids@denverroofingco.com (contact page and footer)",
  "addressFoundOnSite": "Highlands Ranch, Colorado",
  "siteTechObservations": "Modern WordPress site with decent design. Has contact forms, service pages, testimonials. But missing online scheduling and live chat that insurance-direct roofing competitors often have.",
  "designAssessment": "Good - modern design, clean layout, good visual hierarchy",
  "conversionGaps": ["No online booking for inspections", "No live chat", "No instant quote tool"],
  "leadCaptureGaps": ["Standard contact form only", "No click-to-call tracking visible", "No multiple CTA variants"],
  "technicalGaps": ["No city landing pages despite serving multiple cities", "No speed test"],
  "competitorNote": "Insurance-direct roofing competitors often have instant quote tools and live chat for faster lead response"
}, "website_audit")
