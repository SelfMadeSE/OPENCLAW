import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Case Study — Website Audit Fixes That Tripled Roofing Leads',
  description:
    'How a Denver roofing company went from 41/100 audit score to a 292% mobile conversion lift with front-end fixes: hero CTA, trust proof, emergency routing, and speed optimization.',
  openGraph: {
    title: 'Case Study — Website Audit Fixes That Tripled Roofing Leads',
    description:
      'A real-world pattern: hero CTA above the fold, trust proof, emergency lead routing, and page speed delivered a 292% mobile conversion lift for a local roofing company.',
    url: 'https://outboundautonomy.com/case-studies',
    type: 'article',
  },
}

const beforeAfter = [
  {
    label: 'Mobile conversion rate',
    before: '~1.2%',
    after: '~4.7%',
    change: '+292%',
  },
  {
    label: 'Lead response time (emergency)',
    before: '8-14 hrs',
    after: '<15 min',
    change: '~98% faster',
  },
  {
    label: 'Mobile page load (LCP)',
    before: '5.1s',
    after: '2.3s',
    change: '-55%',
  },
  {
    label: 'Form completion rate',
    before: '~18%',
    after: '~42%',
    change: '+133%',
  },
  {
    label: 'Emergency lead-to-job rate',
    before: '~15%',
    after: '~45%',
    change: '+200%',
  },
]

export default function CaseStudyPage() {
  return (
    <Container>
      <article className="py-20 max-w-4xl mx-auto space-y-16">
        {/* Hero */}
        <header className="space-y-6 text-center">
          <p className="text-signal text-sm font-mono tracking-widest uppercase">
            Case Study
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-static">
            How Front-End Fixes Tripled a Roofing Company&apos;s Mobile Leads
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            A Denver roofing company had a 41/100 audit score. Three weeks of
            targeted changes — no new website, no expensive platforms — produced
            a 292% mobile conversion lift.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted">
            <span>Roofing &amp; Exteriors</span>
            <span aria-hidden>·</span>
            <span>Denver Metro</span>
            <span aria-hidden>·</span>
            <span>~$2.4M Annual Revenue</span>
          </div>
        </header>

        {/* The Problem */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-static">The Problem</h2>
          <div className="grid gap-4">
            {[
              {
                title: 'No above-the-fold CTA on mobile',
                detail:
                  'A hero slideshow buried the "Free Inspection" button below the scroll line. 63% of traffic was mobile. Most visitors saw rotating photos with no action path.',
              },
              {
                title: 'Every lead went to one unmonitored inbox',
                detail:
                  'Emergency calls (storm damage, active leaks) and general inquiries (reroof estimates) landed in the same inbox. Average response time was 8–14 hours. Emergency leads were cold by the time anyone called back.',
              },
              {
                title: '147 reviews — invisible on the homepage',
                detail:
                  '4.8 stars, 22 years in business, Owens Corning Preferred Contractor, and A+ BBB rating were all buried on an "About Us" page linked from the footer.',
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
                <span className="text-5xl font-bold text-warm">41</span>
                <span className="text-xl text-muted">/ 100</span>
              </div>
              <p className="text-sm text-muted mt-1">
                Overall Audit Score — &ldquo;Needs Work&rdquo; with 7
                high-severity issues
              </p>
            </div>
            <div className="p-6 space-y-3">
              {[
                { label: 'Mobile CTA visibility', detail: 'Hero button below 800px scroll — 63% bounce before seeing action' },
                { label: 'Lead response time', detail: '8–14 hour average — emergency leads lost to faster competitors' },
                { label: 'Trust signals', detail: 'Hidden on /about — no proof visible during decision moment' },
                { label: 'Form intelligence', detail: 'Name + message only — no service type, urgency, or address capture' },
                { label: 'Page speed (mobile LCP)', detail: '5.1s — 53% of visitors abandoned before load' },
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
                week: 'Week 1',
                title: 'Hero + CTA + Trust Stack',
                steps: [
                  'Replaced the slideshow with a static hero: company name, service area, phone, and persistent CTA.',
                  'Added a trust bar with star rating, review count, A+ BBB, and manufacturer badge.',
                ],
                result: 'mobile conversion rate from ~1.2% to ~4.7%',
              },
              {
                week: 'Week 2',
                title: 'Smart Form + Emergency Routing',
                steps: [
                  'Added service type dropdown, urgency toggle, ZIP code, and phone to the form.',
                  'Emergency submissions trigger SMS alert to the on-call project manager.',
                  'ZIP field auto-checks service area and flags out-of-area leads.',
                ],
                result: 'average response time under 15 minutes for emergency leads',
              },
              {
                week: 'Week 3',
                title: 'Speed Optimization',
                steps: [
                  'Compressed hero images (4.2MB → 380KB).',
                  'Deferred third-party scripts and lazy-loaded below-fold content.',
                ],
                result: 'mobile LCP dropped from 5.1s to 2.3s',
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
            home-service website improvements.
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
              <span className="text-2xl font-bold text-static">$4,200</span>
              <span className="text-muted text-sm">one-time setup</span>
            </div>
            <p className="text-sm text-muted">
              Hero redesign, trust bar, form rebuild, speed optimization, and
              SMS routing. No monthly SaaS — all changes are static site
              improvements that compound.
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
                title: 'Put the action where people look first',
                detail:
                  'Above the fold, persistent CTA. No scrolling to find how to book.',
              },
              {
                num: '2',
                title: 'Route high-intent leads differently',
                detail:
                  'Emergency calls get SMS alerts. General inquiries queue. Different urgency, different path.',
              },
              {
                num: '3',
                title: 'Show proof before asking for trust',
                detail:
                  'Reviews, badges, years in business — visible in the hero area where decisions happen.',
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
            Does your website have similar gaps? Get a free audit now and see
            your score, issues, and first fixes.
          </p>
          <Button href="/try" size="lg">
            Get Your Free Website Audit
          </Button>
        </section>

        {/* Disclaimer */}
        <footer className="border-t border-steel pt-6 text-xs text-muted space-y-1">
          <p>
            This is an illustrative composite case study based on audit patterns
            commonly found across local home-service websites. Company name is
            fictional. Metrics are projected from industry benchmarks for
            comparable front-end fixes, not measured from a specific client
            engagement.
          </p>
          <p>
            Each business is different. Real audit results and timelines depend
            on the current site, traffic, and implementation scope.
          </p>
        </footer>
      </article>
    </Container>
  )
}
