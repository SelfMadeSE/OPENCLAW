#!/usr/bin/env python3
"""CRM system for managing prospect research and outreach."""

import json
import os
import sys
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Any, Optional


class CRMManager:
    """Manages prospect data in the CRM system."""
    
    def __init__(self, base_path: str = "/Users/ryleebenson/Desktop/OPENCLAW/workspaces/outreach"):
        self.base_path = Path(base_path)
        self.artifacts_path = self.base_path / "artifacts"
        self.prospects_path = self.artifacts_path / "prospects"
        self.crm_data_path = self.base_path / "crm_data.json"
        
        # Ensure directories exist
        self.prospects_path.mkdir(parents=True, exist_ok=True)
        
        # Load existing CRM data or create new
        self.crm_data = self._load_crm_data()
    
    def _load_crm_data(self) -> Dict[str, Any]:
        """Load existing CRM data from file or create new structure."""
        if self.crm_data_path.exists():
            try:
                with open(self.crm_data_path, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except (json.JSONDecodeError, IOError) as e:
                print(f"Warning: Could not load CRM data: {e}", file=sys.stderr)
        
        # Create new CRM structure
        return {
            "prospects": {},
            "last_updated": datetime.now().isoformat(),
            "version": "1.0"
        }
    
    def _save_crm_data(self) -> None:
        """Save CRM data to file."""
        try:
            self.crm_data["last_updated"] = datetime.now().isoformat()
            with open(self.crm_data_path, 'w', encoding='utf-8') as f:
                json.dump(self.crm_data, f, indent=2, ensure_ascii=False)
            print(f"CRM data saved to {self.crm_data_path}")
        except IOError as e:
            print(f"Error saving CRM data: {e}", file=sys.stderr)
    
    def _generate_prospect_id(self, prospect_data: Dict[str, Any]) -> str:
        """Generate a unique ID for a prospect."""
        # Use business name as base, clean it and make URL-friendly
        business_name = prospect_data.get("businessName", "").lower()
        clean_name = "".join(c for c in business_name if c.isalnum() or c in (' ', '-')).strip()
        clean_name = clean_name.replace(' ', '-')
        
        # Add timestamp for uniqueness
        timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
        return f"{clean_name}-{timestamp}"
    
    def add_prospect(self, prospect_data: Dict[str, Any]) -> str:
        """Add a new prospect to the CRM."""
        # Validate required fields
        required_fields = ["businessName", "niche", "website", "source", "description"]
        for field in required_fields:
            if field not in prospect_data or not prospect_data[field]:
                raise ValueError(f"Missing required field: {field}")
        
        # Generate prospect ID
        prospect_id = self._generate_prospect_id(prospect_data)
        
        # Add metadata
        prospect_data["prospect_id"] = prospect_id
        prospect_data["created_at"] = datetime.now().isoformat()
        prospect_data["updated_at"] = datetime.now().isoformat()
        prospect_data["status"] = "new"
        
        # Add to CRM
        self.crm_data["prospects"][prospect_id] = prospect_data
        
        # Save data
        self._save_crm_data()
        
        print(f"Added prospect: {prospect_data['businessName']} (ID: {prospect_id})")
        return prospect_id
    
    def update_prospect(self, prospect_id: str, updates: Dict[str, Any]) -> bool:
        """Update an existing prospect in the CRM."""
        if prospect_id not in self.crm_data["prospects"]:
            print(f"Prospect not found: {prospect_id}", file=sys.stderr)
            return False
        
        # Update the prospect data
        self.crm_data["prospects"][prospect_id].update(updates)
        self.crm_data["prospects"][prospect_id]["updated_at"] = datetime.now().isoformat()
        
        # Save data
        self._save_crm_data()
        
        print(f"Updated prospect: {prospect_id}")
        return True
    
    def get_prospect(self, prospect_id: str) -> Optional[Dict[str, Any]]:
        """Get a prospect by ID."""
        return self.crm_data["prospects"].get(prospect_id)
    
    def list_prospects(self, niche: str = None) -> List[Dict[str, Any]]:
        """List all prospects, optionally filtered by niche."""
        prospects = list(self.crm_data["prospects"].values())
        
        if niche:
            prospects = [p for p in prospects if niche.lower() in p.get("niche", "").lower()]
        
        return prospects
    
    def save_evidence(self, prospect_id: str, evidence_data: Dict[str, Any], evidence_type: str = "research") -> str:
        """Save evidence for a prospect to the artifacts directory."""
        prospect = self.get_prospect(prospect_id)
        if not prospect:
            raise ValueError(f"Prospect not found: {prospect_id}")
        
        # Create evidence filename
        timestamp = datetime.now().strftime("%Y-%m-%d_%H%M%S")
        filename = f"{prospect_id}_{evidence_type}_{timestamp}.json"
        evidence_path = self.prospects_path / filename
        
        # Prepare evidence data
        evidence = {
            "prospect_id": prospect_id,
            "business_name": prospect.get("businessName"),
            "evidence_type": evidence_type,
            "timestamp": timestamp,
            "data": evidence_data
        }
        
        # Save evidence
        try:
            with open(evidence_path, 'w', encoding='utf-8') as f:
                json.dump(evidence, f, indent=2, ensure_ascii=False)
            
            print(f"Evidence saved: {evidence_path}")
            return str(evidence_path)
        except IOError as e:
            print(f"Error saving evidence: {e}", file=sys.stderr)
            raise
    
    def mark_contact_verified(self, prospect_id: str, contact_method: str, verified: bool = True) -> bool:
        """Mark contact details as verified or unverified."""
        prospect = self.get_prospect(prospect_id)
        if not prospect:
            print(f"Prospect not found: {prospect_id}", file=sys.stderr)
            return False
        
        if "contact" not in prospect:
            prospect["contact"] = {}
        
        if "verification_status" not in prospect["contact"]:
            prospect["contact"]["verification_status"] = {}
        
        prospect["contact"]["verification_status"][contact_method] = {
            "verified": verified,
            "verified_at": datetime.now().isoformat() if verified else None
        }
        
        # Update the prospect
        return self.update_prospect(prospect_id, prospect)


def main():
    """Command-line interface for the CRM."""
    import argparse
    
    parser = argparse.ArgumentParser(description="CRM Management System")
    subparsers = parser.add_subparsers(dest="command", help="Available commands")
    
    # Add prospect command
    add_parser = subparsers.add_parser("add", help="Add a new prospect")
    add_parser.add_argument("--data", required=True, help="JSON data for the prospect")
    
    # List prospects command
    list_parser = subparsers.add_parser("list", help="List prospects")
    list_parser.add_argument("--niche", help="Filter by niche")
    
    # Update prospect command
    update_parser = subparsers.add_parser("update", help="Update a prospect")
    update_parser.add_argument("--id", required=True, help="Prospect ID")
    update_parser.add_argument("--data", required=True, help="JSON data for updates")
    
    # Save evidence command
    evidence_parser = subparsers.add_parser("evidence", help="Save evidence for a prospect")
    evidence_parser.add_argument("--id", required=True, help="Prospect ID")
    evidence_parser.add_argument("--data", required=True, help="JSON evidence data")
    evidence_parser.add_argument("--type", default="research", help="Evidence type")
    
    # Mark contact verified command
    verify_parser = subparsers.add_parser("verify", help="Mark contact as verified")
    verify_parser.add_argument("--id", required=True, help="Prospect ID")
    verify_parser.add_argument("--method", required=True, help="Contact method")
    verify_parser.add_argument("--verified", action="store_true", help="Mark as verified")
    verify_parser.add_argument("--unverified", action="store_true", help="Mark as unverified")
    
    args = parser.parse_args()
    
    if not args.command:
        parser.print_help()
        return
    
    crm = CRMManager()
    
    try:
        if args.command == "add":
            data = json.loads(args.data)
            prospect_id = crm.add_prospect(data)
            print(f"Successfully added prospect: {prospect_id}")
        
        elif args.command == "list":
            prospects = crm.list_prospects(args.niche)
            for prospect in prospects:
                print(f"{prospect.get('businessName')} ({prospect.get('prospect_id')}) - {prospect.get('niche')}")
        
        elif args.command == "update":
            data = json.loads(args.data)
            if crm.update_prospect(args.id, data):
                print(f"Successfully updated prospect: {args.id}")
        
        elif args.command == "evidence":
            data = json.loads(args.data)
            evidence_path = crm.save_evidence(args.id, data, args.type)
            print(f"Successfully saved evidence: {evidence_path}")
        
        elif args.command == "verify":
            verified = args.verified if not args.unverified else False
            if crm.mark_contact_verified(args.id, args.method, verified):
                print(f"Successfully marked {args.method} as {'verified' if verified else 'unverified'} for prospect: {args.id}")
    
    except json.JSONDecodeError as e:
        print(f"Invalid JSON data: {e}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()