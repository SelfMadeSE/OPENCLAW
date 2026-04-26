import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

const sampleScores = [
  { label: 'Design/UI', score: 61, color: 'text-warm' },
  { label: 'Conversion', score: 38, color: 'text-red-400' },
  { label: 'Technical', score: 74, color: 'text-signal' },
]

const overallScore = 58
const overallGrade = 'F'

const sampleIssues = [
  {
    severity: 'high' as const,
    title: 'No clear service CTA above the fold',
    evidence:
      'The hero rotates through generic photos with no persistent "Get a Quote" or "Schedule Service" button visible before scrolling.',
    recommendation:
      'Replace the slider with a single strong headline and a persistent CTA: "Book a Service" or "Get a Free Estimate."',
  },
  {
    severity: 'high' as const,
    title: 'No lead-capture form on the page',
    evidence:
      'No email, phone, or service-request form detected on the homepage or any primary page within 2 clicks.',
    recommendation:
      'Add a short service request form with fields for name, phone, service type, and urgency.',
  },
  {
    severity: 'medium' as const,
    title: 'No service area or location on homepage',
    evidence:
      'No city, county, or service radius mentioned in the page text or metadata.',
    recommendation:
      'Add a service area section and location markup to signal local intent.',
  },
  {
    severity: 'medium' as const,
    title: 'Trust signals are missing or understated',
    evidence:
      'No reviews, ratings, BBB/license badges, or guarantee language detected.',
    recommendation:
      'Add a testimonial strip, rating badge, and a short guarantee line near the CTA.',
  },
]

export const metadata = {
  title: 'Sample Website Audit — Outbound Autonomy',
  description:
    'Preview what our website audit looks like. Scores, issues, recommendations, and a proposal path for a local service business.',
}

function ScoreGauge({ label, score, color }: { label: string; score: number; color: string }) {
  const rotation = (score / 100) * 180
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative h-24 w-24 mb-2">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r="30" fill="none" stroke="currentColor" strokeWidth="4" className="text-steel/40" />
          <circle
            cx="36"
            cy="36"
            r="30"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray={`${rotation * (188.5 / 180)} 188.5`}
            className={color}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-static">
          {score}
        </span>
      </div>
      <p className="text-sm text-muted">{label}</p>
    </div>
  )
}

function OverallScoreCircle({ score, grade }: { score: number; grade: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-36 w-36 mb-3">
        <svg className="w-36 h-36 -rotate-90" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r="32" fill="none" stroke="currentColor" strokeWidth="4" className="text-steel/40" />
          <circle
            cx="36"
            cy="36"
            r="32"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray={`${(score / 100) * 201} 201`}
            className={score >= 80 ? 'text-signal' : score >= 60 ? 'text-warm' : 'text-red-400'}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-static">{score}</span>
          <span className="text-lg font-bold text-muted">/100</span>
        </span>
      </div>
      <span
        className={`text-2xl font-black px-4 py-1 rounded-full border-2 ${
          grade === 'A' || grade === 'B'
            ? 'border-signal/40 text-signal bg-signal/5'
            : grade === 'C'
              ? 'border-warm/40 text-warm bg-warm/5'
              : 'border-red-400/40 text-red-400 bg-red-400/5'
        }`}
      >
        Grade {grade}
      </span>
    </div>
  )
}

function IssueCard({
  severity,
  title,
  evidence,
  recommendation,
}: {
  severity: 'high' | 'medium' | 'low'
  title: string
  evidence: string
  recommendation: string
}) {
  return (
    <div className="border border-steel/30 rounded-lg bg-depth p-5 space-y-3">
      <div className="flex items-center gap-2">
        <span
          className={`inline-block w-2 h-2 rounded-full ${
            severity === 'high' ? 'bg-red-400' : severity === 'medium' ? 'bg-warm' : 'bg-signal'
          }`}
        />
        <span
          className={`text-xs font-semibold uppercase tracking-wider ${
            severity === 'high' ? 'text-red-400' : severity === 'medium' ? 'text-warm' : 'text-signal'
          }`}
        >
          {severity} priority
        </span>
      </div>
      <h3 className="text-static font-semibold">{title}</h3>
      <div className="space-y-2 text-sm">
        <div>
          <span className="text-muted font-medium">Evidence: </span>
          <span className="text-muted/80">{evidence}</span>
        </div>
        <div>
          <span className="text-signal font-medium">Fix: </span>
          <span className="text-muted/80">{recommendation}</span>
        </div>
      </div>
    </div>
  )
}

export default function SampleReportPage() {
  return (
    <main className="flex-1">
      {/* Header */}
      <section className="border-b border-steel/30 py-8 md:py-12">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Badge className="mb-4">Sample Audit Report</Badge>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-static mb-4">
              Example Website Audit
            </h1>
            <p className="text-lg text-muted">
              This is what you get when you enter a URL below. Scores, issues, targeted fixes, and
              a proposal path — read-only, no email required.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 items-center text-sm text-muted">
              <span>Audited URL:</span>
              <code className="bg-depth border border-steel/30 rounded px-2 py-0.5 text-signal text-xs font-mono">
                example-hvac-service.com
              </code>
              <span className="mx-1">·</span>
              <span>Generated for demo purposes</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Score Overview */}
      <section className="py-10 bg-depth/30">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold text-static mb-8 text-center">Score Overview</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 mb-8">
              <OverallScoreCircle score={overallScore} grade={overallGrade} />
              <div className="grid grid-cols-3 gap-6 md:gap-10">
                {sampleScores.map((s) => (
                  <ScoreGauge key={s.label} label={s.label} score={s.score} color={s.color} />
                ))}
              </div>
            </div>

            {/* Scorecard Details */}
            <div className="border border-steel/30 rounded-lg bg-depth p-5 space-y-3 text-sm">
              <h3 className="text-static font-semibold mb-2">Scorecard Breakdown</h3>
              {[
                { label: 'Design/UI', score: 61, evidence: 'Single H1, no visual service hierarchy, slider replaces CTA' },
                { label: 'Conversion', score: 38, evidence: 'No lead form, no quote CTA, no sticky action bar' },
                { label: 'Technical', score: 74, evidence: 'SSL OK, 200 response, but missing local schema markup' },
              ].map((row) => (
                <div key={row.label} className="flex items-start gap-4 pb-2 border-b border-steel/20 last:border-0">
                  <span className="font-medium text-static w-28 shrink-0">{row.label}</span>
                  <span
                    className={`font-bold w-8 text-right shrink-0 ${
                      row.score >= 80 ? 'text-signal' : row.score >= 60 ? 'text-warm' : 'text-red-400'
                    }`}
                  >
                    {row.score}
                  </span>
                  <span className="text-muted">{row.evidence}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Issues Found */}
      <section className="py-10">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold text-static mb-2">Issues Found</h2>
            <p className="text-sm text-muted mb-6">
              {sampleIssues.length} issues detected — prioritized by impact on conversion.
            </p>
            <div className="space-y-4">
              {sampleIssues.map((issue) => (
                <IssueCard key={issue.title} {...issue} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Recommendations */}
      <section className="py-10 bg-depth/30">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold text-static mb-2">Recommended Fixes</h2>
            <p className="text-sm text-muted mb-6">
              Implementation options scoped to the issues above. Pricing depends on site complexity.
            </p>
            <div className="space-y-4">
              {[
                {
                  step: 1,
                  title: 'Conversion-first homepage',
                  desc: 'Rewrite the hero, add a strong service CTA, move trust proof above the fold, and remove friction from the first click.',
                  range: '$1,500 – $3,500',
                },
                {
                  step: 2,
                  title: 'Lead capture + automated follow-up',
                  desc: 'Add a short request form with service-type routing, trigger owner notification, and auto-send a confirmation + quote template.',
                  range: '$2,500 – $6,500',
                },
                {
                  step: 3,
                  title: 'Local SEO + full site structure',
                  desc: 'Add service area pages, local business schema, city-targeted metadata, and a sitemap structured for local search intent.',
                  range: '$3,500 – $7,500',
                },
              ].map((rec) => (
                <div
                  key={rec.step}
                  className="border border-steel/30 rounded-lg bg-depth p-5 flex flex-col md:flex-row md:items-start gap-4"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-signal text-signal font-bold text-sm">
                    {rec.step}
                  </span>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-static font-semibold">{rec.title}</h3>
                    <p className="text-sm text-muted">{rec.desc}</p>
                  </div>
                  <span className="text-sm font-mono text-signal shrink-0 whitespace-nowrap">
                    {rec.range}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16">
        <Container>
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-static">
              Run a real audit on your site
            </h2>
            <p className="text-muted text-lg">
              Enter your URL below to get a read-only report with the same format — scores, issues,
              recommendations, and implementation pricing.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" href="/#audit">
                Run your free audit
              </Button>
              <Button variant="secondary" href="/contact?intent=discovery">
                Skip to a discovery call
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
