import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Case Study — Peak Roofing Website Audit (38→90 Score Recovery)',
  description:
    'A Denver roofing contractor had a 38/100 audit score — broken mobile form, 5-second load time, no schema. We mapped the full audit→fix→results path with projected 400% lead increase.',
  openGraph: {
    title: 'Case Study — Peak Roofing Website Audit (38→90 Score Recovery)',
    description:
      'How a Denver roofing company was losing 15-20 leads/month to a broken mobile form and 5-second load time. The audit found it. The fix paid for itself in weeks.',
    url: 'https://outboundautonomy.com/case-studies',
    type: 'article',
  },
}

const beforeAfter = [
  {
    label: 'Overall audit score',
    before: '38/100',
    after: '82–90/100',
    change: '+116–137%',
  },
  {
    label: 'Mobile load time (LCP)',
    before: '5.0s',
    after: '1.2s',
    change: '−76%',
  },
  {
    label: 'Mobile form completion rate',
    before: '~3% (broken)',
    after: '78%',
    change: '+2,500%',
  },
  {
    label: 'Monthly inbound leads',
    before: '8–12',
    after: '40–55',
    change: '+400%',
  },
  {
    label: 'Local search rank ("roof repair Denver")',
    before: '#7–9',
    after: '#3–5 (projected)',
    change: '+4 positions',
  },
]

export default function CaseStudyPage() {
  return (
    <Container>
      <article className="py-20 max-w-4xl mx-auto space-y-16">
        {/* Hero */}
        <header className="space-y-6 text-center">
          <p className="text-signal text-sm font-mono tracking-widest uppercase">
            Case Study — Illustrative Composite
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-static">
            A Denver Roofing Company Was Losing 17 Inspections a Month — and Didn&apos;t Know Why
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Twelve years in business. Strong word of mouth. Good crews. But the
            website had a broken mobile form, a 5-second load time, and zero
            schema markup — hemorrhaging 15–20 leads a month to faster competitors.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted">
            <span>Roofing &amp; Exteriors</span>
            <span aria-hidden>·</span>
            <span>Denver, CO</span>
            <span aria-hidden>·</span>
            <span>Residential &amp; Commercial</span>
          </div>
        </header>

        {/* Quote */}
        <section className="bg-depth border border-signal/20 rounded-xl p-6 space-y-3">
          <blockquote className="text-lg text-static italic leading-relaxed">
            &ldquo;I knew our site was outdated. I didn&apos;t know it was costing
            me seventeen roof inspections a month.&rdquo;
          </blockquote>
          <p className="text-sm text-muted">
            — Peak Roofing &amp; Exteriors (Illustrative composite)
          </p>
        </section>

        {/* The Problem */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-static">The Problem</h2>
          <div className="grid gap-4">
            {[
              {
                title: 'The form was broken — and nobody knew',
                detail:
                  'The "Request a Free Inspection" form looked fine on desktop. On mobile — where 73% of emergency roofing searches happen — the submit button was off-screen, the phone field rejected dashes, and the page never scrolled to show the error message. A JavaScript validation error had been silently failing for at least 14 months. Prospects filled out the form, believed they\'d submitted it, and moved on. No data was ever captured.',
              },
              {
                title: '5-second mobile load time killed emergency leads',
                detail:
                  'The hero image was an uncompressed 2.4MB photograph. Three render-blocking JavaScript files loaded before any content. Mobile users on LTE waited 5+ seconds to see anything useful. Google\'s Chrome UX Report showed 68% of mobile visitors abandoned before the page was fully interactive. In roofing — where an active leak means the homeowner needs help now — a 5-second load time means the competitor gets the call.',
              },
              {
                title: 'Zero schema markup — invisible to Google\'s local pack',
                detail:
                  'No LocalBusiness schema, no ServiceArea schema, no FAQ schema, no Review schema. Google\'s local search algorithm was serving competitors with properly structured data above Peak Roofing — even though Peak Roofing had higher authority and more reviews. Every "roof repair Denver" search was sending prospects to sites that looked more relevant because they spoke Google\'s language.',
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
                <span className="text-5xl font-bold text-warm">38</span>
                <span className="text-xl text-muted">/ 100 — Grade F</span>
              </div>
              <p className="text-sm text-muted mt-1">
                The numbers confirmed what the owner was feeling. 12 issues
                across all four dimensions.
              </p>
            </div>
            <div className="p-6 space-y-3">
              {[
                { label: 'Design & Trust', score: '45/100', detail: 'Outdated layout, trust signals buried below fold' },
                { label: 'Conversion', score: '28/100', detail: 'Form unusable on mobile, no sticky CTA, no emergency routing' },
                { label: 'Technical', score: '52/100', detail: '5s load time, missing schema, render-blocking resources' },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm"
                >
                  <span className="font-medium text-static min-w-[180px]">
                    {row.label} <span className="text-warm">{row.score}</span>
                  </span>
                  <span className="text-muted">{row.detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top 5 Issues */}
          <div className="bg-depth border border-steel rounded-xl overflow-hidden">
            <div className="p-4 border-b border-steel">
              <p className="text-sm font-medium text-static">Highest-Impact Issues</p>
            </div>
            <div className="p-4 space-y-3">
              {[
                { sev: 'Critical', impact: '−22 pts', title: 'Request Inspection form breaks on mobile — 100% drop-off for phone searchers' },
                { sev: 'Critical', impact: '−16 pts', title: '5.0s mobile LCP — 68% visitor abandonment before page is interactive' },
                { sev: 'High', impact: '−10 pts', title: 'No LocalBusiness or ServiceArea schema — invisible to local search' },
                { sev: 'High', impact: '−9 pts', title: 'No emergency-service CTA, no sticky mobile button, no click-to-call' },
                { sev: 'Medium', impact: '−5 pts', title: 'Hero image 2.4MB — alone responsible for 2+ seconds of load time' },
              ].map((issue) => (
                <div
                  key={issue.title}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm"
                >
                  <span className="min-w-[72px]">
                    <span className={issue.sev === 'Critical' ? 'text-warm font-semibold' : 'text-signal font-medium'}>
                      {issue.sev}
                    </span>
                  </span>
                  <span className="text-static font-mono text-xs min-w-[70px]">{issue.impact}</span>
                  <span className="text-muted flex-1">{issue.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Fixed */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-static">
            What We&apos;d Build
          </h2>
          <div className="grid gap-4">
            {[
              {
                week: 'Week 1',
                title: 'Form Rebuild + Load Fix',
                steps: [
                  'Rebuilt contact form with mobile-first validation, auto-detect phone errors, confirmation toast, and backend capture with email notification.',
                  'Compressed hero image to 180KB WebP, deferred render-blocking JS, and lazy-loaded below-fold content.',
                ],
                result: 'Mobile LCP projected: 5.0s → 1.2s. Form completion projected: ~3% → 78%.',
              },
              {
                week: 'Week 2',
                title: 'Schema + Mobile CTA Bar',
                steps: [
                  'Added LocalBusiness, ServiceArea, FAQ, and Review structured data — eligibility for featured snippets and local pack.',
                  'Installed sticky mobile "Call Now / Get Estimate" bar with tap-to-call and form shortcut on every page.',
                ],
                result: 'Qualified for voice search and local pack enhancements. Projected +60% click-to-call from mobile.',
              },
              {
                week: 'Week 3 (final)',
                title: 'Hero Redesign + Trust Stack',
                steps: [
                  'Replaced outdated hero with fast-loading CTA-oriented layout — "Emergency Roof Repair? We\'re Standing By" with phone + form.',
                  'Moved trust signals above the fold: review stars, license badges, insurance, years in business, manufacturer certifications.',
                ],
                result: 'Projected +25–35 point improvement in Design/Trust dimension.',
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
            Before vs. Projected After
          </h2>
          <p className="text-muted text-sm">
            Projected from industry benchmarks for comparable front-end fixes
            and conversion improvements verified by the audit pipeline.
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
              <span className="text-2xl font-bold text-static">$4,500 – $7,500</span>
            </div>
            <p className="text-sm text-muted">
              Quick Fix tier ($4,500): form rebuild, schema, hero redesign,
              mobile CTA bar. Lead Machine tier ($7,500): full form rebuild
              with automated SMS routing for emergency leads. Projected
              break-even: 1–2 months based on estimated lead value of
              $350/inspection.
            </p>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-static">
            Why This Pattern Applies to Most Service Businesses
          </h2>
          <div className="grid gap-4">
            {[
              {
                num: '1',
                title: 'The audit finds what the owner can\'t see',
                detail:
                  'Broken forms, hidden JavaScript errors, slow-loading hero images — these aren\'t visible to the person who visits their own site once a month from a desktop. The audit makes them visible.',
              },
              {
                num: '2',
                title: 'The fix pays for itself in weeks',
                detail:
                  'For a business closing $350–$1,200 per roof inspection, recovering 15–20 lost leads per month means the fix ROI is measured in days, not months.',
              },
              {
                num: '3',
                title: 'The result compounds',
                detail:
                  'Better load time → higher rankings → more traffic → more form fills → more inspections booked → more referrals. The whole funnel accelerates.',
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
            Your site might have problems you can&apos;t see. A broken form. A slow
            image. Missing schema sending your competitors the leads you earned.
            Get a free audit and find out.
          </p>
          <Button href="/try" size="lg">
            Get Your Free Website Audit
          </Button>
        </section>

        {/* Disclaimer */}
        <footer className="border-t border-steel pt-6 text-xs text-muted space-y-1">
          <p>
            <strong>Illustrative Composite — Not a Real Client.</strong> This
            case study is based on common audit findings observed across local
            roofing contractor websites. Company name is fictional. Scores
            (Design 45, Conversion 28, Technical 52) and projected results
            (load time 1.2s, form completions +2,500%, 400% lead increase)
            are illustrative — derived from OA&apos;s methodology applied to the
            described scenario, not verified by live client measurement.
          </p>
          <p>
            Will be updated with measured results when a real roofing
            implementation engagement completes.
          </p>
        </footer>
      </article>
    </Container>
  )
}
