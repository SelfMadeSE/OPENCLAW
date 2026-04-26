'use client'

import Image from 'next/image'
import { FormEvent, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

interface ScoreItem {
  label: string
  score: number
  evidence: string
}

interface Issue {
  severity: 'high' | 'medium' | 'low'
  title: string
  evidence: string
  recommendation: string
}

interface Recommendation {
  id: number
  title: string
  description: string
  pricing: string
  priority: 'first' | 'second' | 'third'
}

interface ReferenceExample {
  name: string
  pattern: string
  whyItWorks: string
}

interface CrawledPage {
  url: string
  status: number
  responseMs: number
  title: string | null
  h1Count: number
  formCount: number
  linkCount: number
  imageCount: number
}

interface LighthouseSummary {
  available: boolean
  source: string
  strategy: 'mobile'
  performance: number | null
  accessibility: number | null
  bestPractices: number | null
  seo: number | null
  screenshotDataUrl: string | null
  audits: string[]
  error?: string
}

interface AuditData {
  sourceUrl: string
  finalUrl: string
  fetchedAt: string
  responseMs: number
  designScore: number
  conversionScore: number
  technicalScore: number
  overallScore: number
  grade: string
  scorecard: ScoreItem[]
  observedSignals: string[]
  issues: Issue[]
  recommendations: Recommendation[]
  referenceExamples: ReferenceExample[]
  crawlSummary: {
    pagesScanned: number
    pages: CrawledPage[]
    notes: string[]
  }
  lighthouse: LighthouseSummary
  screenshot: {
    available: boolean
    source: string
    imageDataUrl: string | null
    note: string
  }
  accessReview: {
    gatedAccessLikely: boolean
    flags: string[]
    note: string
  }
  inputContext: {
    siteType?: string
    businessDescription?: string
  }
  implementationEstimate: {
    range: string
    basis: string
  }
  disclaimer: string
}

const severityStyles = {
  high: 'border-red-500/40 bg-red-500/10 text-red-200',
  medium: 'border-yellow-500/40 bg-yellow-500/10 text-yellow-100',
  low: 'border-blue-500/40 bg-blue-500/10 text-blue-100',
}

function getGradeColor(grade: string) {
  switch (grade) {
    case 'A':
      return 'text-green-400'
    case 'B':
      return 'text-blue-300'
    case 'C':
      return 'text-yellow-300'
    case 'D':
      return 'text-orange-300'
    default:
      return 'text-red-300'
  }
}

function getScoreColor(score: number) {
  if (score >= 90) return 'bg-green-400'
  if (score >= 80) return 'bg-blue-400'
  if (score >= 70) return 'bg-yellow-300'
  if (score >= 60) return 'bg-orange-300'
  return 'bg-red-400'
}

function ScoreCard({ item }: { item: ScoreItem }) {
  return (
    <div className="rounded-2xl border border-steel bg-depth p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-muted">{item.label}</p>
          <p className="mt-2 text-sm text-muted">{item.evidence}</p>
        </div>
        <p className="text-3xl font-bold text-static">{item.score}</p>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-steel/30">
        <div className={`h-full ${getScoreColor(item.score)}`} style={{ width: `${item.score}%` }} />
      </div>
    </div>
  )
}

function MetricCard({ label, value }: { label: string; value: number | null }) {
  return (
    <div className="rounded-2xl border border-steel bg-void/70 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">{label}</p>
      <p className="mt-2 text-3xl font-bold text-static">{value === null ? 'N/A' : value}</p>
    </div>
  )
}

function FullPlanGate({ report }: { report: AuditData }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [error, setError] = useState('')

  async function saveLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name || 'Website audit lead',
          email,
          company: new URL(report.sourceUrl).hostname,
          service_interest: 'web_design',
          budget_range: 'not_sure',
          message: [
            `Website audit request for ${report.sourceUrl}.`,
            `Score: ${report.overallScore}/100 (${report.grade}).`,
            `Estimated implementation range: ${report.implementationEstimate.range}.`,
            report.inputContext.siteType ? `Site type: ${report.inputContext.siteType}.` : '',
            report.inputContext.businessDescription ? `Business context: ${report.inputContext.businessDescription}.` : '',
            report.accessReview.gatedAccessLikely ? `Gated/account access context was provided; coordinate secure test access before implementation review.` : '',
          ]
            .filter(Boolean)
            .join(' '),
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Could not save report request')
      }

      setUnlocked(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save report request')
    } finally {
      setSubmitting(false)
    }
  }

  if (unlocked) {
    return (
      <div className="rounded-3xl border border-signal/40 bg-signal/10 p-6">
        <p className="text-sm uppercase tracking-[0.25em] text-signal">Full plan unlocked</p>
        <h3 className="mt-3 text-2xl font-bold text-static">Recommended implementation sequence</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {report.recommendations.map((item) => (
            <div key={item.id} className="rounded-2xl border border-steel bg-void/70 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">{item.priority}</p>
              <h4 className="mt-2 text-lg font-semibold text-static">{item.title}</h4>
              <p className="mt-3 text-sm text-muted">{item.description}</p>
              <p className="mt-4 text-lg font-bold text-signal">{item.pricing}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-2xl border border-steel bg-void/70 p-5">
          <p className="text-sm text-muted">Estimated build range</p>
          <p className="mt-1 text-3xl font-bold text-static">{report.implementationEstimate.range}</p>
          <p className="mt-2 text-sm text-muted">{report.implementationEstimate.basis}</p>
        </div>
        <Button variant="primary" size="lg" href={`/contact?intent=audit&url=${encodeURIComponent(report.sourceUrl)}`} className="mt-6">
          Request proposal and implementation plan
        </Button>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-signal/30 bg-depth p-6">
      <p className="text-sm uppercase tracking-[0.25em] text-signal">Save the audit</p>
      <h3 className="mt-3 text-2xl font-bold text-static">Enter your email to unlock the full implementation plan.</h3>
      <p className="mt-2 text-muted">
        The preview stays readable. The saved version adds sequencing, estimated budget range, and a proposal request path.
      </p>
      <form onSubmit={saveLead} className="mt-6 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
          className="rounded-lg border border-steel bg-void px-4 py-3 text-static outline-none focus:border-signal"
        />
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          className="rounded-lg border border-steel bg-void px-4 py-3 text-static outline-none focus:border-signal"
          required
        />
        <Button type="submit" variant="primary" size="lg" disabled={submitting}>
          {submitting ? 'Saving...' : 'Unlock plan'}
        </Button>
      </form>
      {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
    </div>
  )
}

function AuditReport({ report, onReset }: { report: AuditData; onReset: () => void }) {
  return (
    <Section className="py-20">
      <Container>
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="rounded-[2rem] border border-steel bg-depth p-6 md:p-10">
            <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
              <div className="text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-muted">Read-only demo audit</p>
                <p className={`mt-4 text-8xl font-black ${getGradeColor(report.grade)}`}>{report.grade}</p>
                <p className="mt-2 text-2xl font-semibold text-static">{report.overallScore}/100</p>
                <p className="mt-2 text-sm text-muted">Scanned {new URL(report.finalUrl).hostname}</p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-static md:text-5xl">
                  This site has a clear implementation path.
                </h2>
                <p className="mt-4 text-lg text-muted">
                  We checked observable page signals, conversion friction, technical basics, and what should be fixed first.
                </p>
                <div className="mt-5 grid gap-3 text-sm text-muted md:grid-cols-2">
                  <p>Final URL: {report.finalUrl}</p>
                  <p>Response time: {report.responseMs}ms</p>
                  <p>Generated: {new Date(report.fetchedAt).toLocaleString()}</p>
                  <p>Estimate: {report.implementationEstimate.range}</p>
                </div>
                <button type="button" onClick={onReset} className="mt-6 text-sm font-semibold text-signal hover:text-signal/80">
                  Run another audit
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {report.scorecard.map((item) => (
              <ScoreCard key={item.label} item={item} />
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-steel bg-depth p-6">
              <h3 className="text-2xl font-bold text-static">Problems hurting conversion</h3>
              <div className="mt-6 space-y-4">
                {report.issues.length ? (
                  report.issues.map((issue) => (
                    <div key={issue.title} className={`rounded-2xl border p-4 ${severityStyles[issue.severity]}`}>
                      <p className="text-xs uppercase tracking-[0.2em]">{issue.severity} priority</p>
                      <h4 className="mt-2 text-lg font-semibold text-static">{issue.title}</h4>
                      <p className="mt-2 text-sm text-muted">{issue.evidence}</p>
                      <p className="mt-3 text-sm text-static">{issue.recommendation}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No major issues were detected in the lightweight scan. A full review should still check analytics, search visibility, and real competitor positioning.</p>
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-steel bg-depth p-6">
              <h3 className="text-2xl font-bold text-static">Observed signals</h3>
              <ul className="mt-6 space-y-3 text-sm text-muted">
                {report.observedSignals.map((signal) => (
                  <li key={signal} className="rounded-xl border border-steel bg-void/60 p-3">{signal}</li>
                ))}
              </ul>
              <p className="mt-5 rounded-xl border border-steel bg-void/60 p-3 text-xs text-muted">{report.disclaimer}</p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-3xl border border-steel bg-depth p-6">
              <h3 className="text-2xl font-bold text-static">Crawl map</h3>
              <p className="mt-2 text-sm text-muted">
                Preview crawl scanned {report.crawlSummary.pagesScanned} same-origin page{report.crawlSummary.pagesScanned === 1 ? '' : 's'}.
              </p>
              <div className="mt-5 space-y-3">
                {report.crawlSummary.pages.map((page) => (
                  <div key={page.url} className="rounded-2xl border border-steel bg-void/70 p-4">
                    <p className="truncate text-sm font-semibold text-static">{page.title || page.url}</p>
                    <p className="mt-1 truncate text-xs text-muted">{page.url}</p>
                    <div className="mt-3 grid grid-cols-4 gap-2 text-xs text-muted">
                      <span>Status {page.status || 'N/A'}</span>
                      <span>{page.responseMs || 'N/A'}ms</span>
                      <span>{page.formCount} forms</span>
                      <span>{page.linkCount} links</span>
                    </div>
                  </div>
                ))}
              </div>
              <ul className="mt-5 space-y-2 text-xs text-muted">
                {report.crawlSummary.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-steel bg-depth p-6">
              <h3 className="text-2xl font-bold text-static">Lighthouse + screenshot</h3>
              <p className="mt-2 text-sm text-muted">
                Source: {report.lighthouse.source} ({report.lighthouse.strategy}). {report.lighthouse.available ? 'Live metrics returned.' : 'Metrics unavailable for this run.'}
              </p>
              <div className="mt-5 grid gap-3 md:grid-cols-4">
                <MetricCard label="Performance" value={report.lighthouse.performance} />
                <MetricCard label="Accessibility" value={report.lighthouse.accessibility} />
                <MetricCard label="Best practices" value={report.lighthouse.bestPractices} />
                <MetricCard label="SEO" value={report.lighthouse.seo} />
              </div>
              {report.screenshot.imageDataUrl ? (
                <div className="mt-5 overflow-hidden rounded-2xl border border-steel bg-void">
                  <Image
                    src={report.screenshot.imageDataUrl}
                    alt={`Mobile screenshot of ${report.finalUrl}`}
                    width={900}
                    height={1600}
                    unoptimized
                    className="h-auto w-full"
                  />
                </div>
              ) : (
                <div className="mt-5 rounded-2xl border border-steel bg-void/70 p-5 text-sm text-muted">
                  {report.screenshot.note}
                </div>
              )}
              {report.lighthouse.audits.length > 0 && (
                <ul className="mt-5 space-y-2 text-sm text-muted">
                  {report.lighthouse.audits.map((audit) => (
                    <li key={audit} className="rounded-xl border border-steel bg-void/60 p-3">{audit}</li>
                  ))}
                </ul>
              )}
              {report.lighthouse.error && <p className="mt-4 text-xs text-yellow-200">{report.lighthouse.error}</p>}
            </div>
          </div>

          <div className="rounded-3xl border border-steel bg-depth p-6">
            <h3 className="text-2xl font-bold text-static">Account and protected-page review</h3>
            {report.accessReview.flags.length > 0 ? (
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {report.accessReview.flags.map((flag) => (
                  <p key={flag} className="rounded-xl border border-steel bg-void/70 p-4 text-sm text-muted">{flag}</p>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-muted">{report.accessReview.note}</p>
            )}
            <p className="mt-4 text-xs text-muted">
              Use temporary test accounts only. For real admin access, coordinate secure handoff during the implementation review.
            </p>
          </div>

          <div className="rounded-3xl border border-steel bg-depth p-6">
            <h3 className="text-2xl font-bold text-static">Reference implementation examples</h3>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {report.referenceExamples.map((example) => (
                <div key={example.name} className="rounded-2xl border border-steel bg-void/70 p-5">
                  <h4 className="text-lg font-semibold text-static">{example.name}</h4>
                  <p className="mt-3 text-sm text-muted">{example.pattern}</p>
                  <p className="mt-4 text-sm text-signal">{example.whyItWorks}</p>
                </div>
              ))}
            </div>
          </div>

          <FullPlanGate report={report} />
        </div>
      </Container>
    </Section>
  )
}

export default function SiteAuditTool() {
  const [url, setUrl] = useState('')
  const [siteType, setSiteType] = useState('service-business')
  const [businessDescription, setBusinessDescription] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [hasAccountArea, setHasAccountArea] = useState(false)
  const [hasCaptcha, setHasCaptcha] = useState(false)
  const [hasTwoFactor, setHasTwoFactor] = useState(false)
  const [hasPasswordProtection, setHasPasswordProtection] = useState(false)
  const [loginUrl, setLoginUrl] = useState('')
  const [accessInstructions, setAccessInstructions] = useState('')
  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState<AuditData | null>(null)
  const [error, setError] = useState('')

  async function generateAudit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          siteType,
          businessDescription,
          crawlLimit: 5,
          access: {
            hasAccountArea,
            hasCaptcha,
            hasTwoFactor,
            hasPasswordProtection,
            loginUrl,
            accessInstructions,
          },
        }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate audit')
      }

      setReport(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (report) {
    return <AuditReport report={report} onReset={() => setReport(null)} />
  }

  return (
    <Section id="audit" className="py-24">
      <Container>
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-steel bg-depth p-6 text-center md:p-12">
          <p className="text-sm uppercase tracking-[0.35em] text-signal">Free URL analysis</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-static md:text-6xl">
            Enter your URL. Get a website audit with targeted fixes.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            We scan the page, score conversion signals, surface obvious issues, show implementation patterns, and map the first fixes to a proposal path.
          </p>

          <form onSubmit={generateAudit} className="mx-auto mt-10 grid max-w-2xl gap-3 md:grid-cols-[1fr_auto]">
            <input
              type="text"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="example.com"
              className="rounded-xl border border-steel bg-void px-5 py-4 text-static outline-none focus:border-signal"
              required
            />
            <Button type="submit" variant="primary" size="lg" disabled={loading}>
              {loading ? 'Scanning...' : 'Generate Free Audit'}
            </Button>
          </form>

          <div className="mx-auto mt-5 max-w-2xl text-left">
            <button type="button" onClick={() => setShowAdvanced((value) => !value)} className="text-sm font-semibold text-signal hover:text-signal/80">
              {showAdvanced ? 'Hide audit details' : 'Add business/access details'}
            </button>
            {showAdvanced && (
              <div className="mt-4 space-y-4 rounded-2xl border border-steel bg-void/60 p-5">
                <div className="grid gap-3 md:grid-cols-2">
                  <label className="text-sm text-muted">
                    Site type
                    <select
                      value={siteType}
                      onChange={(event) => setSiteType(event.target.value)}
                      className="mt-2 w-full rounded-lg border border-steel bg-void px-4 py-3 text-static outline-none focus:border-signal"
                    >
                      <option value="service-business">Service business</option>
                      <option value="portfolio">Portfolio</option>
                      <option value="saas">SaaS/app</option>
                      <option value="ecommerce">Ecommerce</option>
                      <option value="local-business">Local business</option>
                      <option value="other">Other</option>
                    </select>
                  </label>
                  <label className="text-sm text-muted">
                    Login or gated-page URL
                    <input
                      type="text"
                      value={loginUrl}
                      onChange={(event) => setLoginUrl(event.target.value)}
                      placeholder="app.example.com/login"
                      className="mt-2 w-full rounded-lg border border-steel bg-void px-4 py-3 text-static outline-none focus:border-signal"
                    />
                  </label>
                </div>
                <label className="block text-sm text-muted">
                  Business/context description
                  <textarea
                    value={businessDescription}
                    onChange={(event) => setBusinessDescription(event.target.value)}
                    placeholder="What does the business sell, who is the audience, and what should the site make visitors do?"
                    minLength={25}
                    className="mt-2 min-h-24 w-full rounded-lg border border-steel bg-void px-4 py-3 text-static outline-none focus:border-signal"
                  />
                  <span className="mt-1 block text-xs text-muted">Optional, but if provided it must be at least 25 characters.</span>
                </label>
                <div className="grid gap-3 text-sm text-muted md:grid-cols-2">
                  {[
                    ['Account/login area', hasAccountArea, setHasAccountArea],
                    ['CAPTCHA/bot check', hasCaptcha, setHasCaptcha],
                    ['2FA required', hasTwoFactor, setHasTwoFactor],
                    ['Password-protected pages', hasPasswordProtection, setHasPasswordProtection],
                  ].map(([label, value, setter]) => (
                    <label key={label as string} className="flex items-center gap-3 rounded-xl border border-steel bg-depth p-3">
                      <input
                        type="checkbox"
                        checked={value as boolean}
                        onChange={(event) => (setter as (next: boolean) => void)(event.target.checked)}
                        className="h-4 w-4"
                      />
                      {label as string}
                    </label>
                  ))}
                </div>
                <label className="block text-sm text-muted">
                  Test-access instructions
                  <textarea
                    value={accessInstructions}
                    onChange={(event) => setAccessInstructions(event.target.value)}
                    placeholder="Example: Create a free account, use the demo workspace, test booking flow only. Do not paste real admin passwords here."
                    className="mt-2 min-h-24 w-full rounded-lg border border-steel bg-void px-4 py-3 text-static outline-none focus:border-signal"
                  />
                  <span className="mt-1 block text-xs text-yellow-200">Use temporary test accounts only. Real credentials should be coordinated securely later.</span>
                </label>
              </div>
            )}
          </div>

          {error && <p className="mt-4 text-sm text-red-300">{error}</p>}

          <div className="mt-8 grid gap-3 text-left text-sm text-muted md:grid-cols-3">
            <p className="rounded-xl border border-steel bg-void/60 p-4">Design, conversion, technical, and Lighthouse scoring.</p>
            <p className="rounded-xl border border-steel bg-void/60 p-4">Same-origin crawl map plus screenshot when available.</p>
            <p className="rounded-xl border border-steel bg-void/60 p-4">Optional gated-page context for deeper implementation review.</p>
          </div>
        </div>
      </Container>
    </Section>
  )
}
