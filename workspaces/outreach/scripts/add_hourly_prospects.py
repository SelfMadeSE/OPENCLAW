#!/usr/bin/env python3
"""Batch add 5 prospects to CRM for hourly research cycle."""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from crm import CRMManager

crm = CRMManager()

prospects = [
    {
        "businessName": "A-Affordable Transmissions Center",
        "niche": "Auto Repair / Transmission Services",
        "website": "https://www.a-affordabletransmissions.com",
        "source": "Google Search / Website Audit",
        "description": "Denver auto repair shop since 1979 handling transmission rebuilds. Site pushes to 3rd party booking (shopgenie.io), creating disjointed UX. Text-link CTAs instead of buttons. No lead capture above fold. Two locations lacking dedicated landing pages. Content-heavy but conversion weak.",
        "contact": {"phone": "unverified", "email": "unverified"},
        "contact_verification_status": "unverified",
        "status": "new"
    },
    {
        "businessName": "Denver Auto Detail Specialist",
        "niche": "Auto Detailing",
        "website": "https://www.mydenverdetails.com",
        "source": "Google Search (Local Results) / Website Audit",
        "description": "Squarespace template site with dead button links (href='#'), generic template copy, no scheduling integration despite high Google ratings (309 reviews, 5-star). No native booking or review display on site. Great reputation wasted by weak website.",
        "contact": {"phone": "720-807-3428 (unverified)", "email": "unverified", "instagram": "@dads_2012"},
        "contact_verification_status": "unverified",
        "status": "new"
    },
    {
        "businessName": "Spectrum Auto Studio",
        "niche": "Luxury Auto Detailing / Ceramic Coating",
        "website": "http://www.spectrumautostudio.com",
        "source": "Google Search (Local Maps Results) / Website Audit",
        "description": "Extremely minimal website with 4-5 bullet points only. No contact info whatsoever - no phone, email, or contact form. No trust signals, reviews, or testimonials. Loads over HTTP (security risk + SEO penalty). No CTAs, booking, or lead capture. Claims 10+ years experience but site looks abandoned.",
        "contact": {"phone": "unverified", "email": "unverified"},
        "contact_verification_status": "unverified",
        "status": "new"
    },
    {
        "businessName": "Phoenix Auto Detailing",
        "niche": "Mobile Auto Detailing",
        "website": "https://phoenixautodetailing.co",
        "source": "Google Search (Local Results) / Website Audit",
        "description": "Denver/Aurora mobile detailing service. Website has wall-of-text content blocks, no native scheduling/booking, poor mobile optimization, reviews displayed as plain text without schema markup. No live chat or instant lead capture. Brochure-style site from 2010s.",
        "contact": {"phone": "unverified", "email": "unverified"},
        "contact_verification_status": "unverified",
        "status": "new"
    },
    {
        "businessName": "Love My Ride Mobile Detailing",
        "niche": "Mobile Car Detailing",
        "website": "https://lovemyride.shop",
        "source": "Google Search / Website Audit",
        "description": "Denver mobile detailing using .shop domain (low authority for local SEO). All booking/pricing flows through app.urable.com causing disjointed UX. No about/contact/FAQ pages, no trust signals or reviews, no location-specific content or schema markup. Product-listing style site lacking SEO fundamentals.",
        "contact": {"phone": "unverified", "email": "unverified"},
        "contact_verification_status": "unverified",
        "status": "new"
    }
]

for p in prospects:
    try:
        pid = crm.add_prospect(p)
        print(f"✅ Added: {p['businessName']} -> {pid}")
    except ValueError as e:
        print(f"❌ Error adding {p['businessName']}: {e}")
    except Exception as e:
        print(f"❌ Unexpected error for {p['businessName']}: {e}")
