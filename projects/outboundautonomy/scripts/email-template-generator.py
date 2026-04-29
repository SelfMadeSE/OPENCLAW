#!/usr/bin/env python3
"""
Email Template Generator
Creates personalized outreach emails with audit findings

Usage:
    python3 scripts/email-template-generator.py \
        --input data/audit-results.json \
        --templates templates/outreach/ \
        --output data/email-templates.json
"""

import json
import argparse
import os
from datetime import datetime
from typing import List, Dict, Any
import sys

class EmailTemplateGenerator:
    def __init__(self, templates_dir: str = "templates/outreach/"):
        self.templates_dir = templates_dir
        self.ensure_templates_dir()
    
    def ensure_templates_dir(self):
        """Ensure templates directory exists"""
        os.makedirs(self.templates_dir, exist_ok=True)
        
        # Create default template if it doesn't exist
        template_path = os.path.join(self.templates_dir, "audit-outreach-template.txt")
        if not os.path.exists(template_path):
            default_template = self.get_default_template()
            with open(template_path, 'w', encoding='utf-8') as f:
                f.write(default_template)
            print(f"📝 Created default template: {template_path}")
    
    def get_default_template(self) -> str:
        """Get default email template"""
        return """Subject: {business_name} Website Audit - {issue_count} Issues Found

Hi {owner_name},

I found {issue_count} critical issues on {business_name}'s website that are likely costing you customers:

{top_issues}

Based on similar local businesses we've helped, these fixes typically cost {pricing_estimate} and can increase conversion by 25-45%.

The good news? These are fixable, and I've helped several {business_category} businesses in {location} turn their websites into customer-generating machines.

Would you like me to send you the complete audit report with detailed implementation steps?

Best regards,
Rylee Benson
Outbound Autonomy
(587) XXX-XXXX
owner@outboundautonomy.com

---
This is a one-time outreach based on your website's audit results. If you prefer not to receive such communications, please reply with "UNSUBSCRIBE".
"""
    
    def generate_email_templates(self, audit_results_file: str, output_file: str) -> List[Dict[str, Any]]:
        """Generate personalized email templates from audit results"""
        
        print("🚀 Starting email template generation...")
        print(f"📥 Input: {audit_results_file}")
        print(f"📤 Output: {output_file}")
        print(f"📝 Templates: {self.templates_dir}")
        print("-" * 50)
        
        # Load audit results
        audit_data = self.load_audit_results(audit_results_file)
        businesses = audit_data.get("results", [])
        
        successful_audits = [b for b in businesses if b.get("success") and b.get("audit")]
        print(f"📊 Processing {len(successful_audits)} successful audits")
        
        email_templates = []
        
        for i, result in enumerate(successful_audits, 1):
            business = result["business"]
            audit = result["audit"]
            
            print(f"📧 [{i}/{len(successful_audits)}] Generating email for {business['name']}")
            
            email_template = self.create_email_template(business, audit)
            email_templates.append(email_template)
        
        # Save templates
        self.save_templates(email_templates, output_file)
        
        # Print summary
        self.print_summary(email_templates)
        
        return email_templates
    
    def load_audit_results(self, audit_results_file: str) -> Dict[str, Any]:
        """Load audit results from JSON file"""
        try:
            with open(audit_results_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        except FileNotFoundError:
            print(f"❌ Error: Audit results file not found: {audit_results_file}")
            sys.exit(1)
        except json.JSONDecodeError as e:
            print(f"❌ Error: Invalid JSON in audit results file: {e}")
            sys.exit(1)
    
    def create_email_template(self, business: Dict[str, Any], audit: Dict[str, Any]) -> Dict[str, Any]:
        """Create personalized email template for a single business"""
        
        # Extract information
        business_name = business.get("name", "Business Name")
        owner_name = self.get_owner_name(business)
        business_category = business.get("category", "business")
        location = self.extract_location(business.get("address", ""))
        pricing_estimate = audit.get("implementationEstimate", {}).get("range", "$2,000-$5,000")
        issues = audit.get("issues", [])
        
        # Format issues for email
        top_issues = self.format_issues(issues[:3])  # Top 3 issues
        
        # Load email template
        template_path = os.path.join(self.templates_dir, "audit-outreach-template.txt")
        with open(template_path, 'r', encoding='utf-8') as f:
            template_content = f.read()
        
        # Personalize template
        email_body = template_content.format(
            business_name=business_name,
            owner_name=owner_name,
            issue_count=len(issues),
            top_issues=top_issues,
            pricing_estimate=pricing_estimate,
            business_category=business_category,
            location=location
        )
        
        # Create email template object
        email_template = {
            "business": business,
            "audit": audit,
            "email": {
                "to": self.guess_business_email(business),
                "subject": f"{business_name} Website Audit - {len(issues)} Issues Found",
                "body": email_body,
                "from_name": "Rylee Benson",
                "from_email": "owner@outboundautonomy.com",
                "reply_to": "owner@outboundautonomy.com"
            },
            "metadata": {
                "created_at": datetime.now().isoformat(),
                "audit_score": audit.get("overallScore", 0),
                "issue_count": len(issues),
                "high_priority_issues": len([i for i in issues if i.get("severity") == "high"]),
                "pricing_estimate": pricing_estimate,
                "category": business_category,
                "estimated_conversion_potential": self.estimate_conversion_potential(audit)
            }
        }
        
        return email_template
    
    def get_owner_name(self, business: Dict[str, Any]) -> str:
        """Extract or guess owner name from business info"""
        # In a real implementation, you might use an API to find owner info
        # For now, use a generic greeting
        business_name = business.get("name", "")
        
        # Remove common business suffixes for more personal greeting
        name_parts = business_name.replace("Ltd.", "").replace("Inc.", "").replace("Corp.", "").strip()
        
        return "there"  # Generic greeting that works well
    
    def extract_location(self, address: str) -> str:
        """Extract city from address"""
        if "Grande Prairie" in address:
            return "Grande Prairie"
        elif "Grand Prairie" in address:
            return "Grand Prairie"
        elif "Alberta" in address:
            return "Alberta"
        else:
            return "your area"
    
    def format_issues(self, issues: List[Dict[str, Any]]) -> str:
        """Format issues for email body"""
        if not issues:
            return "No critical issues found, but there are optimization opportunities."
        
        formatted_issues = []
        
        for i, issue in enumerate(issues, 1):
            severity_icon = {"high": "🚨", "medium": "⚠️", "low": "ℹ️"}.get(issue.get("severity", "medium"), "⚠️")
            
            issue_text = f"{severity_icon} {issue.get('title', 'Issue')}:\n"
            issue_text += f"   Impact: {self.format_impact(issue)}\n"
            issue_text += f"   Fix: {issue.get('recommendation', 'Contact for details')}\n"
            
            formatted_issues.append(issue_text)
        
        return "\n".join(formatted_issues)
    
    def format_impact(self, issue: Dict[str, Any]) -> str:
        """Format issue impact description"""
        evidence = issue.get("evidence", "")
        severity = issue.get("severity", "medium")
        
        if "conversion" in evidence.lower() or "cta" in evidence.lower():
            return "Lost customers and revenue"
        elif "mobile" in evidence.lower():
            return "Poor mobile user experience"
        elif "technical" in evidence.lower() or "speed" in evidence.lower():
            return "Slow loading and poor performance"
        elif "design" in evidence.lower():
            return "Unprofessional appearance and trust issues"
        else:
            return "Reduced website effectiveness"
    
    def guess_business_email(self, business: Dict[str, Any]) -> str:
        """Guess business email address"""
        # In a real implementation, you'd use an email finder API
        # For now, return a placeholder
        website = business.get("website", "")
        domain = website.replace("https://", "").replace("http://", "").replace("www.", "").split("/")[0]
        
        # Common email patterns
        return f"info@{domain}"
    
    def estimate_conversion_potential(self, audit: Dict[str, Any]) -> str:
        """Estimate conversion improvement potential based on audit"""
        score = audit.get("overallScore", 0)
        issues = audit.get("issues", [])
        high_issues = [i for i in issues if i.get("severity") == "high"]
        
        if score < 50:
            return "High (40-60% improvement possible)"
        elif score < 70:
            return "Medium-High (25-40% improvement possible)"
        elif score < 80:
            return "Medium (15-25% improvement possible)"
        else:
            return "Low-Moderate (5-15% improvement possible)"
    
    def save_templates(self, email_templates: List[Dict[str, Any]], output_file: str):
        """Save email templates to JSON file"""
        output_data = {
            "template_info": {
                "total_emails": len(email_templates),
                "created_at": datetime.now().isoformat(),
                "script_version": "1.0.0",
                "templates_dir": self.templates_dir
            },
            "emails": email_templates,
            "summary": {
                "by_category": self.categorize_emails(email_templates),
                "by_score_range": self.score_distribution(email_templates),
                "average_pricing_estimate": self.get_average_pricing(email_templates)
            }
        }
        
        # Create output directory if it doesn't exist
        os.makedirs(os.path.dirname(output_file), exist_ok=True)
        
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(output_data, f, indent=2, ensure_ascii=False)
        
        print(f"💾 Saved {len(email_templates)} email templates to {output_file}")
    
    def categorize_emails(self, email_templates: List[Dict[str, Any]]) -> Dict[str, int]:
        """Categorize emails by business type"""
        categories = {}
        for template in email_templates:
            category = template["business"].get("category", "unknown")
            categories[category] = categories.get(category, 0) + 1
        return categories
    
    def score_distribution(self, email_templates: List[Dict[str, Any]]) -> Dict[str, int]:
        """Get distribution of audit scores"""
        score_ranges = {
            "A (90-100)": 0,
            "B (80-89)": 0,
            "C (70-79)": 0,
            "D (60-69)": 0,
            "F (0-59)": 0
        }
        
        for template in email_templates:
            score = template["metadata"]["audit_score"]
            if score >= 90:
                score_ranges["A (90-100)"] += 1
            elif score >= 80:
                score_ranges["B (80-89)"] += 1
            elif score >= 70:
                score_ranges["C (70-79)"] += 1
            elif score >= 60:
                score_ranges["D (60-69)"] += 1
            else:
                score_ranges["F (0-59)"] += 1
        
        return score_ranges
    
    def get_average_pricing(self, email_templates: List[Dict[str, Any]]) -> str:
        """Calculate average pricing estimate"""
        if not email_templates:
            return "$0"
        
        # Extract pricing estimates and calculate average
        # This is simplified - in reality you'd parse the price ranges
        estimates = [
            template["metadata"]["pricing_estimate"] 
            for template in email_templates
        ]
        
        # For now, return a range based on common estimates
        high_count = len([t for t in email_templates if "7,500" in t["metadata"]["pricing_estimate"]])
        mid_count = len([t for t in email_templates if "4,500" in t["metadata"]["pricing_estimate"]])
        low_count = len(email_templates) - high_count - mid_count
        
        if high_count > mid_count and high_count > low_count:
            return "$5,000-$10,000 (average)"
        elif mid_count > low_count:
            return "$3,000-$6,000 (average)"
        else:
            return "$1,500-$4,000 (average)"
    
    def print_summary(self, email_templates: List[Dict[str, Any]]):
        """Print summary of generated email templates"""
        print("\n📊 EMAIL TEMPLATE SUMMARY")
        print("-" * 50)
        print(f"Total Emails Generated: {len(email_templates)}")
        
        if email_templates:
            categories = self.categorize_emails(email_templates)
            print("\n📂 By Business Category:")
            for category, count in sorted(categories.items()):
                print(f"   {category}: {count}")
            
            score_dist = self.score_distribution(email_templates)
            print("\n📈 By Audit Score:")
            for score_range, count in score_dist.items():
                if count > 0:
                    print(f"   {score_range}: {count}")
            
            avg_pricing = self.get_average_pricing(email_templates)
            print(f"\n💰 Average Pricing Estimate: {avg_pricing}")
            
            high_potential = len([t for t in email_templates if "High" in t["metadata"]["estimated_conversion_potential"]])
            print(f"🎯 High Conversion Potential: {high_potential} emails")
        
        print("-" * 50)

def main():
    parser = argparse.ArgumentParser(description="Generate personalized email templates from audit results")
    parser.add_argument("--input", default="data/audit-results.json",
                       help="Input JSON file with audit results")
    parser.add_argument("--output", default="data/email-templates.json",
                       help="Output JSON file for email templates")
    parser.add_argument("--templates", default="templates/outreach/",
                       help="Directory containing email templates")
    parser.add_argument("--script-help", action="store_true",
                       help="Show script-specific help message")
    
    args = parser.parse_args()
    
    if args.script_help:
        parser.print_help()
        return
    
    generator = EmailTemplateGenerator(args.templates)
    generator.generate_email_templates(args.input, args.output)

if __name__ == "__main__":
    sys.exit(main())