# DNS Migration Plan: Squarespace to Vercel
## Outbound Autonomy Website

### Current Status
✅ **Website deployed successfully** to Vercel
- Production URL: https://outboundautonomy-4om6w2uao-owner-3355s-projects.vercel.app
- Custom Domain: https://outboundautonomy.com (aliased in Vercel)
- SSL Certificate: Being provisioned for www.outboundautonomy.com

### Verified Endpoints
✅ **Health Check**: `/api/health` - Working
- Twilio: Configured (+15709894873)
- Owner contact: Configured
- Active sessions: 0

✅ **Main Site**: `https://outboundautonomy.com` - Working
- Title: "Outbound Autonomy — AI Receptionist, Web Design & Automation"

### DNS Migration Requirements

#### Current Setup (Squarespace)
```dns
# Records to identify and migrate:
A Records:
- @ (root) → Squarespace IP (e.g., 198.49.23.144)
- www → Squarespace IP (e.g., 198.49.23.145)

MX Records (Google Workspace):
- @ → ASPMX.L.GOOGLE.com (priority 1)
- @ → ALT1.ASPMX.L.GOOGLE.com (priority 5)
- @ → ALT2.ASPMX.L.GOOGLE.com (priority 5)
- @ → ALT3.ASPMX.L.GOOGLE.com (priority 10)
- @ → ALT4.ASPMX.L.GOOGLE.com (priority 10)

TXT Records:
- Google Workspace verification
- SPF records for email
- DKIM/DMARC records (if configured)

CNAME Records:
- www → squarespace.com (or similar)
- mail → ghs.googlehosted.com (if Google Apps used)
```

#### Target Setup (Vercel)
```dns
# Vercel Required Records:
A Records:
- @ → 76.76.21.21 (Vercel's Anycast IP)
- @ → 13.248.155.104 (Vercel's Anycast IP) 
- @ → 76.223.126.88 (Vercel's Anycast IP)

CNAME Records:
- www → cname.vercel-dns.com

MX Records: (PRESERVE EXISTING GOOGLE WORKSPACE)
- @ → ASPMX.L.GOOGLE.com (priority 1)
- @ → ALT1.ASPMX.L.GOOGLE.com (priority 5)
- @ → ALT2.ASPMX.L.GOOGLE.com (priority 5)
- @ → ALT3.ASPMX.L.GOOGLE.com (priority 10)
- @ → ALT4.ASPMX.L.GOOGLE.com (priority 10)

TXT Records: (PRESERVE ALL EXISTING)
- Google Workspace verification records
- SPF: "v=spf1 include:_spf.google.com ~all" (or existing)
- DKIM/DMARC records (if configured)

Other Records (PRESERVE):
- Any existing subdomains (e.g., app.*, api.*)
- Email-related records
- Verification records
```

### Migration Steps

#### 1. Preparation (NOW)
- [ ] Document current DNS records at Squarespace
- [ ] Confirm Google Workspace email functionality
- [ ] Backup existing DNS configuration
- [ ] Set TTL to low values (5 minutes) for easier rollback

#### 2. Verification Phase
- [ ] Test all website functionality on Vercel URL
- [ ] Verify all API endpoints work:
  - `/api/health` ✅
  - `/api/contact`
  - `/api/demo` 
  - `/api/waitlist`
  - `/api/webhook/stripe`
  - `/api/twilio/*` endpoints

#### 3. DNS Migration (EXECUTION)
- [ ] **Step A**: Add Vercel DNS records (do NOT remove Squarespace yet)
  - Add Vercel A records for root domain
  - Add Vercel CNAME for www
  - Keep all MX/TXT records unchanged

- [ ] **Step B**: Wait for DNS propagation (15-30 minutes)
  - Test site functionality on custom domain
  - Verify email still works

- [ ] **Step C**: Remove Squarespace DNS records
  - Remove old Squarespace A records
  - Remove old Squarespace CNAME for www
  - Ensure only Vercel + Google records remain

#### 4. Post-Migration
- [ ] Verify all functionality:
  - Website loads correctly
  - All forms work (contact, demo, waitlist)
  - Stripe integration functions
  - Twilio endpoints work
  - Google Workspace email works
  - SSL certificate is active

- [ ] Monitor for 24-48 hours
- [ ] Restore TTL to normal values
- [ ] Remove Squarespace hosting (after confirming everything works)

### Risk Mitigation

#### Email Protection (CRITICAL)
1. **NEVER** delete MX records
2. **NEVER** modify MX records 
3. **ALWAYS** preserve all Google Workspace verification records
4. Document exact MX records before any changes

#### Rollback Plan
If issues occur:
1. Immediately restore original Squarespace DNS records
2. Verify email functionality
3. Investigate Vercel configuration issues
4. Retry migration after fixing problems

### Timeline Estimate
- **Preparation**: 30 minutes
- **DNS Changes**: 15 minutes
- **Propagation/Testing**: 30-60 minutes  
- **Total**: 1.5-2 hours

### Next Actions
1. **Immediate**: Document current Squarespace DNS records
2. **Ready**: Execute DNS migration when convenient
3. **Monitor**: 48-hour post-migration observation

---
**Status**: Ready for migration execution  
**Risk**: Low (email preserved)  
**Priority**: Enables revenue generation