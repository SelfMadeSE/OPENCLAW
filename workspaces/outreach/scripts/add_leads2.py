"""Add 5 prospects to CRM - simplified."""
import subprocess, sys, json

script = "/Users/ryleebenson/Desktop/OPENCLAW/scripts/crm.py"
leads = [
    ("Mighty Bee Electric", "electrical", "duckduckgo", "local,denver,no-booking,family-owned", "https://mightybeeelectric.com", "Family-owned Denver electrician since 1971. No email, no booking, no quote. Phone (303) 288-7988 on site."),
    ("Colorado Native Plumbing", "plumbing", "duckduckgo", "local,denver,broken-contact,plumbing", "https://www.coloradonativeplumbing.com", "Licensed Master Plumber since 2016. ALL contact pages 404. No phone/email on site. CRITICAL lead capture gap."),
    ("My Denver Plumber", "plumbing", "duckduckgo", "local,lakewood,thin-content,plumbing", "https://mydenverplumber.net", "Lakewood/Denver plumber. Site is mostly testimonials - no service pages, no booking. Email: info@mydenverplumber.net"),
    ("Fix-It Now Heating & Cooling", "hvac", "duckduckgo", "local,denver,family-owned,hvac,no-booking", "https://fixitnowhvac.com", "Family-owned Denver HVAC. Basic WP template. No email/booking/chat/quote. Phone (303) 657-2421 from search."),
    ("Denver Concierge", "cleaning", "duckduckgo", "local,denver,cleaning,no-booking,wordpress", "https://denverconcierge.com", "House cleaning since 1999. Old WP site. No phone/email extracted. No online booking or quoting system.")
]

for name, biz_type, source, tags, url, notes in leads:
    cmd = [sys.executable, script, "add-lead", name, biz_type, 
           "--source", source, "--tags", tags, "--notes", f"{notes} | URL: {url}"]
    result = subprocess.run(cmd, capture_output=True, text=True)
    out = result.stdout.strip()
    print(f"  {name}: {out[:150]}")
