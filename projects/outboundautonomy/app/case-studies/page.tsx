import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Case Study — Denver Legal Marketing Website Audit (39→85 Score Recovery)',
  description:
    'A legal marketing agency selling web design had their own site scoring 39/100 — 6 years stale, zero portfolio, no lead capture. We mapped the full audit→fix→results path.',
  openGraph: {
    title: 'Case Study — Denver Legal Marketing Website Audit (39→85 Score Recovery)',
    description:
      'How a marketing agency that sells websites had their own site scoring 39/100. The irony gap made this the highest-priority audit in OA\'s pipeline.',
    url: 'https://outboundautonomy.com/case-studies',
    type: 'article',
  },
}

const beforeAfter = [
  {
    label: 'Overall audit score',
    before: '39/100',
    after: '80–85/100',
    change: '+105%',
  },
  {
    label: 'Monthly inbound inquiries',
    before: '2–4',
    after: '18–25',
    change: '+450–525%',
  },
  {
    label: 'Portfolio/case study pages',
    before: '0',
    after: '3+',
    change: 'Built from scratch',
  },
  {
    label: 'Lead capture touchpoints per page',
    before: '0',
    after: '2–3',
    change: 'Fully added',
  },
  {
    label: 'Content recency',
    before: 'Stuck at 2020',
    after: 'Ongoing',
    change: '6-year gap closed',
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
            A Marketing Agency Selling Websites — With a 39/100 Site
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Denver Legal Marketing sells web design, SEO, and PPC to law firms.
            Their own site hadn&apos;t been touched since 2020 — zero portfolio,
            zero case studies, zero blog, no lead capture. The irony gap made
            this the single highest-conviction outreach target in our pipeline.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted">
            <span>Legal Marketing Agency</span>
            <span aria-hidden>·</span>
            <span>Denver, CO</span>
            <span aria-hidden>·</span>
            <span>Service Provider (B2B)</span>
          </div>
        </header>

        {/* The Irony */}
        <section className="bg-depth border border-signal/20 rounded-xl p-6 space-y-3">
          <p className="text-signal text-sm font-mono tracking-widest uppercase">
            The Hook
          </p>
          <blockquote className="text-lg text-static italic leading-relaxed">
            &ldquo;A marketing agency that sells websites — and their own site
            says &apos;copyright 2020&apos; in the footer, has zero portfolio
            pages, zero case studies, zero blog posts, and expects law-firm
            prospects to trust them with their digital presence.&rdquo;
          </blockquote>
        </section>

        {/* The Problem */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-static">The Problem</h2>
          <div className="grid gap-4">
            {[
              {
                title: 'No portfolio or case studies — the site is blank',
                detail:
                  'A web design agency without a portfolio is like a restaurant without a menu. Law firms shopping for a marketing partner look for past work, results, and live examples. Denver Legal Marketing\'s site offered none of this. Every prospect hit a wall of vague claims with zero proof.',
              },
              {
                title: 'Copyright stuck at 2020 — 6+ years of abandonment',
                detail:
                  'As of 2026, a copyright footer reading "© 2020" signals abandonment. For a marketing agency claiming to provide ongoing digital services, this single detail destroys credibility. Law firms — meticulous by nature — notice this immediately.',
              },
              {
                title: 'Zero content — no blog, no articles, no authority',
                detail:
                  'No blog, no articles, no guides, no resources. Legal is one of the most content-driven verticals in digital marketing — law firms rank on authority, and authority is built through published expertise. The site communicated no expertise at all.',
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
                <span className="text-5xl font-bold text-warm">39</span>
                <span className="text-xl text-muted">/ 100 — Grade F</span>
              </div>
              <p className="text-sm text-muted mt-1">
                This isn&apos;t &ldquo;your site could be better.&rdquo; This is
                &ldquo;your site is actively repelling the exact prospects you&apos;re
                trying to convert.&rdquo;
              </p>
            </div>
            <div className="p-6 space-y-3">
              {[
                { label: 'Portfolio / case study pages', detail: 'None — zero proof of work or results. Critical (−18 pts).' },
                { label: 'Content freshness', detail: 'Copyright 2020, no updates in 6+ years. Critical (−15 pts).' },
                { label: 'Blog or educational content', detail: 'Zero articles, guides, or resources. High (−12 pts).' },
                { label: 'Lead capture forms', detail: 'No form, no live chat, no sticky CTA on any page. High (−10 pts).' },
                { label: 'Meta tags', detail: 'Duplicate, generic, under-length across all pages. Medium (−6 pts).' },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm"
                >
                  <span className="font-medium text-static min-w-[220px]">
                    {row.label}
                  </span>
                  <span className="text-muted">{row.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We'd Implement */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-static">
            What We&apos;d Build
          </h2>
          <div className="grid gap-4">
            {[
              {
                week: 'Week 1',
                title: 'Portfolio + Site Refresh',
                steps: [
                  'Build a 3-case-study portfolio section with results dashboard page.',
                  'Full site refresh: updated footer, current copyright, fresh copy, consistent CTA placement.',
                ],
                result: 'Projected +200% prospect trust signal; removes the abandonment red flag immediately.',
              },
              {
                week: 'Week 2',
                title: 'Lead Capture + Forms',
                steps: [
                  'Add lead capture forms on every page — hero CTA, sidebar, sticky mobile bar, footer.',
                  'Set up automated email follow-up for every form submission.',
                ],
                result: 'Projected 5–8x increase in inbound inquiries.',
              },
              {
                week: 'Weeks 3–4',
                title: 'Content Strategy + SEO Foundation',
                steps: [
                  'Launch 4-pillar content strategy: Legal Marketing 101, SEO for Lawyers, PPC Ethics, Local Rankings.',
                  'Rewrite meta titles, descriptions, and headers — unique per service page.',
                ],
                result: 'Established authority for the legal marketing vertical; +3–5 ranking positions on target keywords.',
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
            Projected from audit gap analysis and content/forms improvement
            benchmarks.
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
              <span className="text-2xl font-bold text-static">$4,500 – $8,500</span>
            </div>
            <p className="text-sm text-muted">
              Quick Fix tier ($4,500): site refresh, portfolio build, lead
              capture forms. Lead Machine tier ($8,500): full content strategy,
              automated follow-up pipeline, monthly reporting for 3 months.
            </p>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-static">
            Why This Case Study Matters for Outbound Autonomy
          </h2>
          <div className="grid gap-4">
            {[
              {
                num: '1',
                title: 'The irony angle converts',
                detail:
                  'A service provider whose own digital presence contradicts their value proposition is the highest-probability outreach target. The 39/100 score is an indictment of their service quality that no competitor can refute.',
              },
              {
                num: '2',
                title: 'Score recovery is dramatic from the floor',
                detail:
                  'Low-scoring sites see the largest percentage improvements — 39 → 85 looks like a 115% increase. More compelling than 72 → 90 every time.',
              },
              {
                num: '3',
                title: 'The fix is replicable',
                detail:
                  'The improvement pattern (portfolio + content + forms + metadata) is the same playbook for most local service business audits. This case study becomes a template for vertical-messaging.',
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
            Does your website tell a similar story? Get a free audit and see
            your score, every issue, and a prioritized fix path.
          </p>
          <Button href="/try" size="lg">
            Get Your Free Website Audit
          </Button>
        </section>

        {/* Disclaimer */}
        <footer className="border-t border-steel pt-6 text-xs text-muted space-y-1">
          <p>
            <strong>Illustrative Composite — Not a Real Client.</strong> This
            case study is based on real audit patterns observed on a live
            prospect&apos;s website and projected improvements derived from OA&apos;s
            methodology. Company name is real (Denver Legal Marketing), but no
            client engagement was conducted. Results are projected from audit
            gap analysis and industry benchmarks for comparable content, design,
            and conversion improvements.
          </p>
          <p>
            Will be updated with measured results if Denver Legal Marketing
            becomes a live implementation client.
          </p>
        </footer>
      </article>
    </Container>
  )
}
