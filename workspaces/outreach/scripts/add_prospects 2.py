"""Add 5 prospects to CRM using CLI."""

args_batches = [
    ["add-lead", "--name", "Mighty Bee Electric", "--type", "electrical", "--source", "duckduckgo", "--tags", "local,denver,no-booking,family-owned", "--url", "https://mightybeeelectric.com", "--phone", "(303) 288-7988", "--notes", "Family-owned since 1971. Master Electrician. No email visible, no online booking, no quote tool. Phone verified on contact page."],
    ["add-lead", "--name", "Colorado Native Plumbing", "--type", "plumbing", "--source", "duckduckgo", "--tags", "local,denver,broken-contact,plumbing", "--url", "https://www.coloradonativeplumbing.com", "--notes", "Licensed Master Plumber since 2016. CRITICAL: contact pages /contact, /contact-us/, /contact.php all 404. No phone/email on site. Losing 100% of web traffic - no contact possible."],
    ["add-lead", "--name", "My Denver Plumber", "--type", "plumbing", "--source", "duckduckgo", "--tags", "local,lakewood,thin-content,plumbing", "--url", "https://mydenverplumber.net", "--email", "info@mydenverplumber.net", "--notes", "Lakewood/Denver plumber. Site almost entirely testimonials - no service pages, no booking, no quote. Email visible on contact page: info@mydenverplumber.net"],
    ["add-lead", "--name", "Fix-It Now Heating & Cooling", "--type", "hvac", "--source", "duckduckgo", "--tags", "local,denver,family-owned,hvac,no-booking", "--url", "https://fixitnowhvac.com", "--phone", "(303) 657-2421", "--notes", "Family-owned Denver HVAC. Phone from search listings. Basic WP template. Contact page redirects, no email found, no booking, no chat, no quote tool."],
    ["add-lead", "--name", "Denver Concierge", "--type", "cleaning", "--source", "duckduckgo", "--tags", "local,denver,cleaning,no-booking,wordpress", "--url", "https://denverconcierge.com", "--notes", "House cleaning since 1999. Green Clean certified. Old WordPress site. Contact page thin - no phone/email extracted. No online booking/quoting. No service area landing pages."],
]

import subprocess
import sys

script = "/Users/ryleebenson/Desktop/OPENCLAW/scripts/crm.py"

for i, args in enumerate(args_batches, 1):
    cmd = [sys.executable, script] + args
    result = subprocess.run(cmd, capture_output=True, text=True)
    out = result.stdout.strip()[:200] if result.stdout else ""
    err = result.stderr.strip()[:200] if result.stderr else ""
    name = args[args.index("--name") + 1] if "--name" in args else f"prospect_{i}"
    if result.returncode == 0:
        print(f"[{i}] ✓ {name}: {out}")
    else:
        print(f"[{i}] ✗ {name}: {err or out}")
