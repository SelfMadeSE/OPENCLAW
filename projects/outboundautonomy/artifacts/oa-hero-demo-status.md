# OA Hero Demo Status

## Proposed Scope

- Add `/demo/hero` as a lean premium website and automation walkthrough.
- Show a landing/home section, lead capture form, qualification/routing result, handoff output, operator workflow trace, and reusable narration steps.
- Avoid receptionist positioning and telephony dependencies.

## Technical Stack

- Next.js App Router page: `app/demo/hero/page.tsx`
- API route with in-memory sandbox data: `app/api/demo/hero/route.ts`
- Shared mock qualification logic: `lib/demo/hero-flow.ts`
- Existing Tailwind dark/operator styling and shared UI primitives.

## Real vs Mocked

- Real: page UI, form submission, POST request to `/api/demo/hero`, validation, rule-based scoring, route generation, trace rendering.
- Mocked: sample lead profiles, enrichment, booking hold, follow-up copy, and downstream workflow delivery.
- External services: none. No CRM, calendar, email, telephony, or enrichment APIs are called.

## Blockers

- None for local demo use.
- Production integration would require real service selection for calendar, CRM, email, analytics, and durable storage.

## ETA / Use-Now Instructions

- Ready to use after build passes.
- Visit `/demo/hero`.
- Submit the prefilled sandbox form or edit the values.
- Narrate the page from top to bottom: website promise, intake, qualification, handoff, backend trace, walkthrough.
