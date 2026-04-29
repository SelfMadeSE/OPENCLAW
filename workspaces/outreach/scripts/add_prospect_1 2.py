#!/usr/bin/env python3
"""Add The Weather Changers to CRM"""
import sys
sys.path.insert(0, '/Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/scripts')
from crm import CRMManager

crm = CRMManager()
data = {
  "businessName": "The Weather Changers",
  "niche": "HVAC Services",
  "website": "https://theweatherchangers.com",
  "source": "DuckDuckGo search for Denver HVAC company websites (2026-04-26)",
  "description": "Aurora/Denver-based HVAC service provider offering heating, cooling, air quality, and heat pump services. Bryant Factory Authorized Dealer serving Denver metro area.",
  "contact": {
    "phone": "303-340-0077",
    "email": None,
    "address": "Denver Metro Area (Aurora, CO)",
    "verification_status": {
      "phone": {"verified": True, "verified_at": None},
      "email": {"verified": False, "verified_at": None}
    }
  },
  "status": "researched",
  "tags": ["hvac", "denver", "local-service", "website-audit-opportunity"],
  "websiteIssues": [
    "No online booking or scheduling system for service calls",
    "Homepage prioritizes coupon display over immediate CTA for service",
    "No prominent emergency service callout despite HVAC emergencies being common",
    "Multiple coupon offerings suggest discount-based lead gen rather than value-based",
    "No service response time guarantees visible on landing pages"
  ],
  "opportunityScore": 85,
  "researchDate": "2026-04-26",
  "auditFunnelStage": "prospect_identified"
}
pid = crm.add_prospect(data)
print(f"Prospect ID: {pid}")
crm.save_evidence(pid, {
  "websiteUrl": "https://theweatherchangers.com",
  "accessDate": "2026-04-26",
  "phoneFoundOnSite": "303-340-0077 (visible on homepage and contact page)",
  "emailFoundOnSite": None,
  "siteTechObservations": "WordPress-based HVAC site with decent content depth but no booking widget or live chat. Heavy coupon/promotion focus. Good city landing pages strategy.",
  "designAssessment": "Average - functional but not modern. Standard HVAC template.",
  "conversionGaps": ["No online booking", "No emergency callout prominence", "Coupons as primary CTA", "No response time guarantee"],
  "leadCaptureGaps": ["Contact form only option", "No click-to-call tracking", "No chat widget", "No service-specific CTAs"],
  "technicalGaps": ["No speed test run", "No schema markup verified"],
  "competitorNote": "Many HVAC competitors now offer online booking and 24/7 chat"
}, "website_audit")
