#!/usr/bin/env python3
"""Add prospects to CRM for Outbound Autonomy."""

import sys
sys.path.append('/Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach/scripts')
from crm import CRMManager

def main():
    """Add prospects to CRM."""
    crm = CRMManager()
    
    prospects = [
        {
            "businessName": "Skyline Heating",
            "niche": "HVAC Services",
            "website": "https://www.skylineheating.com/",
            "source": "Direct website analysis",
            "description": "UK-based HVAC company with functional but dated website showing conversion and design gaps. Specializes in boiler installations and heating services.",
            "contact": {
                "phone": "01249 822916",
                "email": "office@skylineheatingservices.co.uk",
                "verification_status": {
                    "phone": {"verified": False, "verified_at": None},
                    "email": {"verified": False, "verified_at": None}
                }
            },
            "website_issues": [
                "Dated visual design lacking modern appeal",
                "Poor mobile responsiveness suspected",
                "Weak call-to-action placement",
                "Limited trust signals beyond certifications",
                "No clear lead capture mechanism"
            ]
        },
        {
            "businessName": "Colorado's Best Roofing",
            "niche": "Roofing Services",
            "website": "https://www.roofingcolorado.com/",
            "source": "Direct website analysis",
            "description": "Colorado-based roofing company providing residential and commercial roofing services. Has good content but basic design with conversion optimization opportunities.",
            "contact": {
                "phone": "303-797-7663",
                "email": "stevew@roofingcolorado.com",
                "verification_status": {
                    "phone": {"verified": False, "verified_at": None},
                    "email": {"verified": False, "verified_at": None}
                }
            },
            "website_issues": [
                "Basic website design lacking visual appeal",
                "Contact form could be more prominent",
                "Limited trust signals beyond testimonials",
                "No obvious lead magnet or free offer",
                "Mobile responsiveness could be improved"
            ]
        },
        {
            "businessName": "Absolute Carpet Care",
            "niche": "Carpet Cleaning Services",
            "website": "https://www.absolutecarpetcare.com/",
            "source": "Direct website analysis",
            "description": "Virginia-based carpet cleaning company serving residential and commercial clients. Has multiple contact methods but dated design and confusing navigation.",
            "contact": {
                "phone": "703-291-8052",
                "email": "marcus@absolutecarpetcare.com",
                "verification_status": {
                    "phone": {"verified": False, "verified_at": None},
                    "email": {"verified": False, "verified_at": None}
                }
            },
            "website_issues": [
                "Dated website design with poor visual hierarchy",
                "Multiple phone numbers causing confusion",
                "Complex navigation menu structure",
                "Weak call-to-action buttons",
                "No clear lead capture or booking system"
            ]
        },
        {
            "businessName": "Denver Digital",
            "niche": "Digital Marketing Agency",
            "website": "https://denverdigital.com/",
            "source": "Direct website analysis",
            "description": "Denver-based digital marketing agency providing SEO, PPC, and web design services. As a marketing agency, their website should be better optimized but shows design gaps.",
            "contact": {
                "phone": "Not publicly visible",
                "email": "hello@denverdigital.com",
                "verification_status": {
                    "phone": {"verified": False, "verified_at": None},
                    "email": {"verified": False, "verified_at": None}
                }
            },
            "website_issues": [
                "Outdated website design for a marketing agency",
                "Inconsistent branding and visual elements",
                "Poor mobile optimization suspected",
                "Weak lead capture beyond newsletter signup",
                "No clear service showcase or portfolio"
            ]
        },
        {
            "businessName": "Rosen & Schneider",
            "niche": "Legal Services",
            "website": "https://www.rosenandschneider.com/",
            "source": "Direct website analysis",
            "description": "Colorado-based law firm specializing in aviation and product liability defense. Very basic website with limited content and outdated design.",
            "contact": {
                "phone": "Not clearly visible on homepage",
                "email": "Not publicly visible",
                "verification_status": {
                    "phone": {"verified": False, "verified_at": None},
                    "email": {"verified": False, "verified_at": None}
                }
            },
            "website_issues": [
                "Very basic website design lacking professionalism",
                "Limited content and service information",
                "Poor contact information visibility",
                "No clear practice area details",
                "Minimal trust signals or social proof"
            ]
        }
    ]
    
    print("Adding prospects to CRM...")
    
    for prospect_data in prospects:
        try:
            prospect_id = crm.add_prospect(prospect_data)
            print(f"✓ Added prospect: {prospect_data['businessName']} (ID: {prospect_id})")
            
            # Save evidence
            evidence_data = {
                "website_analysis": {
                    "url": prospect_data["website"],
                    "issues_identified": prospect_data["website_issues"],
                    "niche": prospect_data["niche"],
                    "contact_method": "browser_snapshot_analysis"
                },
                "notes": f"Prospect identified through direct website analysis. Visible conversion and design gaps that make them a good candidate for Outbound Autonomy services."
            }
            
            evidence_path = crm.save_evidence(prospect_id, evidence_data, "website_audit_research")
            print(f"  ✓ Evidence saved: {evidence_path}")
            
        except Exception as e:
            print(f"✗ Error adding prospect {prospect_data['businessName']}: {e}")
    
    print(f"\nTotal prospects added: {len(prospects)}")
    
    # List all prospects
    print("\nCurrent prospects in CRM:")
    all_prospects = crm.list_prospects()
    for prospect in all_prospects:
        print(f"  - {prospect.get('businessName')} ({prospect.get('niche')}) - {prospect.get('prospect_id')}")

if __name__ == "__main__":
    main()