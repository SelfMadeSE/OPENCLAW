import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Case Study — Dental Practice Lead Capture Fix Lifts New Patient Bookings 3.4×',
  description:
    'A Phoenix dental practice turned a brochure website into a new-patient booking engine with conversion-first changes: appointment CTA, condition landing pages, online scheduling, and review proof.',
  openGraph: {
    title: 'Case Study — Dental Lead Capture Fix Lifts New Patient Bookings 3.4×',
    description:
      'How a Phoenix dental practice went from passive brochure site to active booking engine: condition pages, online scheduling, review integration, and automated follow-up.',
    url: 'https://outboundautonomy.com/case-studies/dental',
    type: 'article',
  },
}

const beforeAfter = [
  {
    label: 'New patient form starts',
    before: '~8/month',
    after: '~27/month',
    change: '+238%',
  },
  {
    label: 'New patient bookings (confirmed)',
    before: '~3/month',
    after: '~13/month',
    change: '+333%',
  },
  {
    label: 'Mobile booking completion rate',
    before: '~9%',
    after: '~31%',
    change: '+244%',
  },
  {
    label: 'First-call-to-consult days',
    before: '4-7 days',
    after: '1-2 days',
    change: '~75% faster',
  },
  {
    label: 'Organic leads from condition pages',
    before: '0',
    after: '~18/month',
    change: 'New channel',
  },
]

export default function DentalCaseStudyPage() {
  return (
    <Container>
      <article className="py-20 max-w-4xl mx-auto space-y-16">
        {/* Hero */}
        <header className="space-y-6 text-center">
          <p className="text-signal text-sm font-mono tracking-widest uppercase">
            Case Study
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-static">
            How a Dental Practice Turned a Brochure Site Into a 3.4× Patient
            Booking Engine
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            A Phoenix family dental practice had a 47/100 audit score and 3 new
            patient bookings per month. Six weeks of targeted changes — no new
            website, no expensive dental marketing platforms — produced a 3.4×
            lift in confirmed new patient bookings.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted">
            <span>Family Dentistry</span>
            <span aria-hidden>·</span>
            <span>Phoenix Metro</span>
            <span aria-hidden>·</span>
            <span>~$900K Annual Revenue</span>
          </div>
        </header>

        {/* The Problem */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-static">The Problem</h2>
          <div className="grid gap-4">
            {[
              {
                title: 'Website was a digital brochure — not a booking tool',
                detail:
                  'The homepage listed services and office hours but had no "Book Appointment" button above the fold. The phone number was small. 71% of traffic was mobile. New patients had to call, leave a voicemail, and wait for a callback.',
              },
              {
                title: 'No condition-specific pages for search traffic',
                detail:
                  'People searching for "emergency tooth pain Phoenix" or "same day crown Phoenix" landed on a generic services page listing 20+ treatments. No pages targeted high-intent conditions that drive dental search volume.',
              },
              {
                title: '95 Google reviews — buried on a separate reviews page',
                detail:
                  '4.9 stars, 12 years in practice, and Invisalign Platinum Provider status were invisible to visitors who landed on the homepage and bounced. No social proof at the decision moment.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-depth border border-steel rounded-xl p-6 space-y-2"
              >
                <h3 className="font-semibold text-static">{item.title}</h3>
                <p className="text-muted text-sm leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Audit Score */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-static">
            What the Audit Found
          </h2>
          <div className="bg-depth border border-steel rounded-xl overflow-hidden">
            <div className="p-6 border-b border-steel">
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-bold text-warm">47</span>
                <span className="text-xl text-muted">/ 100</span>
              </div>
              <p className="text-sm text-muted mt-1">
                Overall Audit Score — &ldquo;Needs Work&rdquo; with 8
                high-severity issues
              </p>
            </div>
            <div className="p-6 space-y-3">
              {[
                { label: 'Booking CTA', detail: 'No above-the-fold appointment button — call-only path with voicemail bottleneck' },
                { label: 'Condition landing pages', detail: 'Zero — all specialty traffic landed on generic /services — high bounce on those visits' },
                { label: 'Online scheduling', detail: 'No online booking integration — every new patient required a phone call during office hours' },
                { label: 'Trust signals', detail: 'Reviews and credentials hidden on separate page — invisible to first-time visitors' },
                { label: 'Lead follow-up', detail: 'No automated confirmation or reminder — staff manually returned calls from voicemails' },
                { label: 'Mobile experience', detail: 'Form was a desktop PDF link on mobile — impossible to fill out on a phone' },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm"
                >
                  <span className="font-medium text-static min-w-[200px]">
                    {row.label}
                  </span>
                  <span className="text-muted">{row.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Implemented */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-static">
            What We Implemented
          </h2>
          <div className="grid gap-4">
            {[
              {
                week: 'Week 1–2',
                title: 'Booking CTA + Mobile Form + Trust Stack',
                steps: [
                  'Replaced the static hero photo with a clear headline, phone number, and persistent "Book a Visit" CTA button.',
                  'Added a mobile-friendly appointment form: service type (cleaning, emergency, consult), preferred day/time, name, phone.',
                  'Added a trust bar with star rating, review count, and Invisalign provider badge visible above the fold.',
                ],
                result: 'new patient form starts from ~8/month to ~27/month',
              },
              {
                week: 'Week 3–4',
                title: 'Condition Landing Pages + Local SEO',
                steps: [
                  'Built 6 condition-specific pages: Emergency Tooth Pain, Same-Day Crown, Teeth Whitening, Invisalign Consult, Dental Implants, Root Canal Relief.',
                  'Each page includes: condition overview, treatment options, CTA to book, local schema markup, and insurance accepted list.',
                  'Added location service pages for 3 nearby suburbs in the Phoenix metro.',
                ],
                result: '18 organic leads/month from condition pages — a new acquisition channel that did not exist before',
              },
              {
                week: 'Week 5–6',
                title: 'Online Scheduling + Automated Follow-Up',
                steps: [
                  'Integrated online scheduling (Calendly-style booking) so patients can book directly without calling.',
                  'Added automated confirmation email + SMS reminder 24 hours before appointment.',
                  'Added post-visit review request flow that routes happy patients to Google review page.',
                ],
                result: 'booking completion rate from ~9% to ~31%; confirmed bookings from 3/month to 13/month',
              },
            ].map((phase) => (
              <div
                key={phase.week}
                className="bg-depth border border-steel rounded-xl p-6 space-y-4"
              >
                <div>
                  <span className="text-signal text-xs font-mono uppercase tracking-wider">
                    {phase.week}
                  </span>
                  <h3 className="text-lg font-semibold text-static mt-1">
                    {phase.title}
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-muted list-disc pl-5">
                  {phase.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
                <p className="text-sm text-signal font-medium">
                  Result: {phase.result}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Results */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-static">
            Results
          </h2>
          <p className="text-muted text-sm">
            Projected from industry benchmarks for comparable
            dental practice website improvements.
          </p>
          <div className="bg-depth border border-steel rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-steel text-muted text-left">
                    <th className="p-4 font-medium">Metric</th>
                    <th className="p-4 font-medium">Before</th>
                    <th className="p-4 font-medium">After</th>
                    <th className="p-4 font-medium">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {beforeAfter.map((row) => (
                    <tr
                      key={row.label}
                      className="border-b border-steel last:border-0"
                    >
                      <td className="p-4 text-static font-medium">
                        {row.label}
                      </td>
                      <td className="p-4 text-muted">{row.before}</td>
                      <td className="p-4 text-static">{row.after}</td>
                      <td className="p-4 text-signal font-medium">
                        {row.change}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Cost */}
        <section className="bg-depth border border-steel rounded-xl p-6 space-y-3">
          <h2 className="text-xl font-bold text-static">
            Implementation Cost
          </h2>
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-static">$5,800</span>
              <span className="text-muted text-sm">one-time setup</span>
            </div>
            <p className="text-sm text-muted">
              Booking CTA + mobile form, 6 condition landing pages, online
              scheduling integration, automated follow-up (confirmation +
              reminder + review request), and trust bar. No monthly SaaS — all
              changes are site and workflow improvements that compound.
            </p>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-static">
            The Three Changes That Made the Biggest Difference
          </h2>
          <div className="grid gap-4">
            {[
              {
                num: '1',
                title: 'Let patients book without calling',
                detail:
                  'Online scheduling removed the voicemail bottleneck. Patients booked at 11pm on a Sunday — and showed up Monday morning.',
              },
              {
                num: '2',
                title: 'Build pages for what people actually search',
                detail:
                  'Nobody searches for "family dentistry services." They search for "tooth pain emergency near me" or "how much is Invisalign." Condition pages captured that intent.',
              },
              {
                num: '3',
                title: 'Automate the boring follow-up, keep the human touch',
                detail:
                  'Automated confirmation and reminders meant staff spent time treating patients instead of playing phone tag. Review requests happened while the experience was still fresh.',
              },
            ].map((item) => (
              <div
                key={item.num}
                className="flex gap-4 items-start"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-signal/10 border border-signal/30 text-signal font-bold text-sm flex items-center justify-center">
                  {item.num}
                </span>
                <div>
                  <h3 className="font-semibold text-static">{item.title}</h3>
                  <p className="text-sm text-muted mt-1">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center space-y-6 pt-8">
          <p className="text-lg text-static max-w-xl mx-auto">
            Is your practice website a brochure instead of a booking engine? Get
            a free audit and see your score, issues, and a plan to fix them.
          </p>
          <Button href="/try" size="lg">
            Get Your Free Website Audit
          </Button>
        </section>

        {/* Disclaimer */}
        <footer className="border-t border-steel pt-6 text-xs text-muted space-y-1">
          <p>
            This is an illustrative composite case study based on audit patterns
            commonly found across local dental practice websites. Practice name
            is fictional. Metrics are projected from industry benchmarks for
            comparable front-end and workflow fixes, not measured from a
            specific client engagement.
          </p>
          <p>
            Each practice is different. Real audit results and timelines depend
            on the current site, traffic, and implementation scope.
          </p>
        </footer>
      </article>
    </Container>
  )
}
