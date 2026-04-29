# Outbound Autonomy Website Audit Funnel Mission Brief

**Date:** 2026-04-24  
**Mission owner:** OpenClaw orchestrator  
**Product:** Outbound Autonomy  
**Harness:** OpenClaw  
**Operating rule:** Outbound Autonomy is the customer-facing product. OpenClaw is only the internal agent harness used to coordinate work, generate artifacts, and execute checks. Agents must not describe OpenClaw as the product, offer, brand, or customer-facing value proposition.

## Mission Objective

Improve the Outbound Autonomy website audit funnel from "URL submitted" to "qualified lead follow-up ready." The funnel must make a business owner feel that Outbound Autonomy has inspected their actual website, found concrete opportunities, compared them against better examples, and can help implement improvements.

The work is not a generic website polish sprint. It is a conversion system for the audit product:

1. Visitor submits a website URL.
2. Outbound Autonomy captures enough context to run a credible audit.
3. The system gathers objective performance data, screenshots, crawler findings, and competitor examples.
4. The prospect receives a useful audit preview and a clear next step.
5. Internal follow-up receives the lead, audit evidence, recommended angle, and QA status.

## Non-Negotiable Product Framing

- Say **Outbound Autonomy** when referring to the product, service, website, audit offer, lead magnet, sales funnel, customer experience, email follow-up, or proposal path.
- Say **OpenClaw** only when referring to the internal harness, agent coordination, workspace artifacts, mission logs, runtime checks, or internal automation.
- Do not publish copy that implies customers buy OpenClaw.
- Do not expose internal agent names, harness mechanics, local file paths, mission logs, or implementation prompts to prospects.
- Do not touch app source files during this mission unless a later engineering mission explicitly grants source ownership.

## Roles

### NEXUS / Orchestrator

Owns mission coordination, sequencing, acceptance criteria, artifact hygiene, and conflict resolution. Keeps agents focused on the audit funnel rather than broad site redesign. Maintains the single source of truth for deliverables and heartbeat review.

### FORGE / Engineering Research

Owns technical feasibility research and implementation recommendations for audit instrumentation. Produces integration notes for Lighthouse/PageSpeed, screenshot capture, crawler behavior, auth details capture, storage, rate limits, and failure modes. Does not edit app source in this mission.

### PULSE / Conversion Strategy

Owns funnel narrative, audit report value proposition, CTA hierarchy, lead qualification questions, and follow-up angle. Converts raw audit findings into customer-facing language for Outbound Autonomy.

### MUSE / Creative and UX

Owns the audit funnel experience, report preview structure, screenshot annotation concepts, competitor example presentation, and trust-building UX. Keeps the experience concrete and evidence-led.

### BRIDGE / Outreach and Lead Follow-Up

Owns lead lifecycle, follow-up sequence requirements, CRM fields, handoff content, and outreach readiness. Cold first-touch email is GREEN when routed through `email_attempts` idempotency with complete evidence; replies to leads still require approval.

### SENTINEL / QA and Risk

Owns truthfulness, privacy, auth-safety, security risk review, funnel QA, and acceptance gate. Blocks vague claims, misleading scores, broken lead paths, unsafe credential capture, or unverified external send claims.

## Required Deliverables

Create or update mission artifacts only. Each agent must save findings under the OpenClaw artifact/workspace mission areas and include enough detail for the next agent to execute without guessing.

### 1. Lighthouse/PageSpeed Integration Research

Owner: FORGE  
Output: technical research artifact with recommended path.

Must answer:

- Whether to use Google PageSpeed Insights API, local Lighthouse CLI, hosted Chrome worker, or a hybrid.
- Required inputs, API keys, limits, costs, latency, and rate-limit risk.
- How to capture mobile and desktop scores.
- Which metrics matter in the sales report: performance score, LCP, CLS, INP/TBT, accessibility, SEO, best practices.
- How to degrade gracefully if analysis fails.
- How to map objective technical metrics into a customer-readable audit preview without overstating certainty.
- Recommended data schema for storing raw metrics and normalized score bands.

Acceptance bar:

- Clear recommendation with tradeoffs.
- No claim that placeholder/random scoring is acceptable for production.
- Explicit separation between objective PageSpeed data and heuristic UX/conversion scoring.

### 2. Screenshot Capture Research

Owner: FORGE with MUSE  
Output: screenshot capture plan and UX usage notes.

Must answer:

- Options for screenshots: Playwright/Chromium, ScreenshotOne/Urlbox-like APIs, hosted browser worker, or existing browser tooling.
- Desktop and mobile viewport requirements.
- Full-page vs above-the-fold capture.
- Timing strategy for cookie banners, lazy-loaded content, animations, and blocked pages.
- Storage format, naming, retention, and privacy considerations.
- How screenshots support report credibility, annotations, before/after examples, and follow-up.

Acceptance bar:

- Includes failure states: blocked by bot protection, login wall, cookie wall, heavy page timeout, mixed-content errors.
- Includes specific evidence naming conventions so lead follow-up can reference the exact screenshot.

### 3. Crawler and Auth-Details UX

Owner: MUSE with SENTINEL and FORGE  
Output: UX requirements artifact for crawler scope and optional auth details.

Must answer:

- What the first-page form asks for: URL, email, business name, role, industry, optional goals.
- Whether/when to ask for sitemap URL, top pages to audit, or competitor URLs.
- How to request login/auth details only when necessary and only after trust is established.
- Safer alternatives to collecting raw credentials: temporary guest account, staging link, screen recording, guided manual review, one-time secure upload, or booking call.
- Consent language for crawling and screenshot capture.
- Crawl boundaries: same-domain pages, page count cap, robots considerations, rate limits, and no destructive actions.
- UX copy that makes the added details feel useful rather than invasive.

Acceptance bar:

- Must not recommend collecting raw passwords in a plain form.
- Must include a "no-auth audit" path for most prospects.
- Must identify what internal fields BRIDGE needs for follow-up.

### 4. Competitor Examples

Owner: PULSE with MUSE  
Output: competitor example strategy and initial example set.

Must answer:

- How the funnel identifies relevant competitors: user-provided competitors, industry templates, search/manual research, or curated benchmark library.
- What makes a competitor example admissible in a report.
- How to show examples without implying endorsement, copying protected assets, or making unsupported claims.
- Minimum example format: company/site name, URL, screenshot/evidence reference, observed pattern, why it matters, adaptation idea for the prospect.
- Initial industries to support: local services, professional services, ecommerce, SaaS/agency, healthcare/wellness where legally safe.

Acceptance bar:

- At least 5 concrete competitor/example candidates or benchmark patterns.
- Examples must be framed as "patterns to learn from," not "copy this site."
- Includes disclaimer/wording for public website screenshots if needed.

### 5. Lead Follow-Up

Owner: BRIDGE with PULSE  
Output: lead handoff and follow-up playbook.

Must answer:

- What lead fields are captured and where they go.
- How audit evidence attaches to each lead: URL, screenshot refs, PageSpeed refs, crawler refs, score bands, recommended angle.
- Follow-up sequence for: audit requested but not viewed, audit viewed but no booking, high-fit low-score lead, replied lead, booked call, no-show.
- Email/SMS/channel constraints and approval requirements.
- Human review checkpoint before any live send.
- Recommended first follow-up copy structure using URL-specific observation, one concrete issue, one concrete upside, and a low-friction CTA.

Acceptance bar:

- No live outreach authorization in this mission.
- Includes CRM/status transitions and a 72-hour cool-down for repeat outreach.
- Includes clear handoff fields for sales/proposal preparation.

### 6. QA and Acceptance

Owner: SENTINEL  
Output: QA checklist and risk register.

Must cover:

- Form validation and consent.
- URL normalization and malicious URL handling.
- Screenshot capture success/failure.
- PageSpeed/Lighthouse success/failure.
- Report rendering with partial data.
- Mobile and desktop UX.
- Email/lead capture confirmation path.
- Tracking event names and payload sanity.
- Privacy/security review for any auth-related UX.
- Truthfulness review for scores, competitor claims, and recommendations.

Acceptance bar:

- Defines pass/fail criteria.
- Includes rollback/escalation triggers.
- Blocks release if customer-facing copy says OpenClaw is the product.

## Hourly Heartbeat Format

Every active agent must post an hourly heartbeat artifact or append to the mission heartbeat log using this exact format:

```md
## Heartbeat — 2026-04-24 HH:MM TZ — <AGENT>/<ROLE>

**Product framing check:** Outbound Autonomy named as product; OpenClaw only named as harness: YES/NO
**Current focus:** <one sentence>
**Completed this hour:** <specific artifacts, decisions, or evidence>
**Evidence links/paths:** <artifact paths, URLs researched, screenshots, logs>
**Decisions made:** <decision + reason, or "None">
**Blockers:** <blocker + requested owner/action, or "None">
**Risks found:** <risk + severity + mitigation, or "None">
**Next hour:** <specific next actions>
**Needs human approval:** <YES/NO + approval needed>
```

Heartbeat rules:

- A heartbeat that says only "working" is invalid.
- If no progress occurred, state why and name the blocker.
- Include concrete artifact paths.
- Call out product framing drift immediately.
- Do not claim external sends, production releases, or completed tests without evidence.

## Mission Sequencing

### Hour 0-1: Alignment and Research Split

- NEXUS creates the mission index and confirms ownership.
- FORGE starts Lighthouse/PageSpeed and screenshot capture research.
- MUSE maps current audit funnel UX requirements and auth-details questions.
- PULSE defines competitor example criteria and report narrative requirements.
- BRIDGE defines required lead handoff fields.
- SENTINEL drafts the initial risk list.

### Hour 1-2: Technical and UX Decisions

- FORGE recommends the PageSpeed/Lighthouse path and screenshot path.
- MUSE drafts the crawler/auth-details UX.
- PULSE drafts the competitor/example display format.
- BRIDGE drafts the first lead follow-up workflow.
- SENTINEL reviews for privacy, truthfulness, and product naming.

### Hour 2-3: Concrete Artifacts

- FORGE writes implementation-ready technical notes.
- MUSE writes UX copy/flow requirements.
- PULSE writes benchmark patterns and sample report sections.
- BRIDGE writes the lead handoff schema and sequence matrix.
- SENTINEL writes QA checklist with pass/fail gates.

### Hour 3-4: Consolidation

- NEXUS merges findings into a single implementation backlog.
- SENTINEL checks every deliverable for product framing and risk.
- Agents list unresolved decisions and which require human approval.
- No source edits happen unless a separate authorized engineering mission is issued.

## Backlog Output Required From NEXUS

NEXUS must end the mission with a backlog grouped by:

- P0: Required before any public audit funnel launch.
- P1: Required before paid traffic or scaled outreach.
- P2: Useful improvements after first qualified leads.

Each backlog item must include:

- Owner role.
- User-facing outcome.
- Technical dependency.
- Evidence artifact.
- QA gate.
- Open approval, if any.

## Quality Bar

This mission succeeds only if the team produces implementation-ready artifacts that make the Outbound Autonomy audit funnel more credible, measurable, and follow-up-ready.

The mission fails if agents:

- Treat OpenClaw as the product.
- Produce generic website advice instead of audit-funnel requirements.
- Recommend fake/random audit scores.
- Ignore screenshot, PageSpeed, crawler, auth, competitor, follow-up, or QA requirements.
- Skip heartbeat evidence paths.
- Touch project app source files without explicit authorization.
