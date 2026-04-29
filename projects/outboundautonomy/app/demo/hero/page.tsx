'use client'

import { FormEvent, useState } from 'react'
import { AlertTriangle, ArrowRight, BarChart3, CheckCircle2, Clock, Code2, ExternalLink, FileSearch, Gauge, Globe, Loader2, Paintbrush, Search, Shield, TrendingUp, Wrench, Zap } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Input } from '@/components/ui/Input'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

interface AuditIssue {
  severity: 'high' | 'medium' | 'low'
  title: string
  evidence: string
  recommendation: string
}

interface ReferenceExample {
  name: string
  pattern: string
  whyItWorks: string
}

interface Recommendation {
  id: number
  title: string
  description: string
  pricing: string
  priority: 'first' | 'second' | 'third'
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

interface CrawlSummary {
  pagesScanned: number
  pages: CrawledPage[]
  notes: string[]
}

interface ImplementationEstimate {
  range: string
  basis: string
}

interface AuditResult {
  sourceUrl: string
  finalUrl: string
  fetchedAt: string
  responseMs: number
  overallScore: number
  grade: string
  designScore: number
  conversionScore: number
  technicalScore: number
  issues: AuditIssue[]
  recommendations: Recommendation[]
  referenceExamples: ReferenceExample[]
  crawlSummary: CrawlSummary
  implementationEstimate: ImplementationEstimate
  observedSignals: string[]
  lighthouse: {
    available: boolean
    performance: number | null
    accessibility: number | null
    bestPractices: number | null
    seo: number | null
    audits: string[]
  }
  disclaimer: string
}

const severityColors: Record<string, string> = {
  high: 'border-red-500/40 bg-red-500/5',
  medium: 'border-warm/40 bg-warm/5',
  low: 'border-steel/40 bg-depth/70',
}

const severityDot: Record<string, string> = {
  high: 'bg-red-500',
  medium: 'bg-warm',
  low: 'bg-steel',
}

const priorityBadge: Record<string, string> = {
  first: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
  second: 'border-warm/40 bg-warm/10 text-warm',
  third: 'border-steel/40 bg-steel/10 text-steel',
}

export default function AuditDemoPage() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<AuditResult | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [error, setError] = useState('')

  async function runAudit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')
    setError('')

    const response = await fetch('/api/audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    })

    const payload = await response.json()
    if (!response.ok) {
      setStatus('error')
      setError(payload.error ?? 'Unable to run audit.')
      return
    }

    setResult(payload)
    setStatus('idle')
  }

  function scoreColor(score: number) {
    if (score >= 70) return 'text-emerald-400'
    if (score >= 45) return 'text-warm'
    return 'text-red-400'
  }

  function scoreBarColor(score: number) {
    if (score >= 70) return 'bg-emerald-500'
    if (score >= 45) return 'bg-warm'
    return 'bg-red-500'
  }

  function scoreLabel(score: number) {
    if (score >= 70) return 'Solid — targeted fixes will lift further'
    if (score >= 45) return 'Moderate — address critical items first'
    return 'Significant overhaul recommended'
  }

  function formatMs(ms: number) {
    if (ms < 1000) return `${ms}ms`
    return `${(ms / 1000).toFixed(1)}s`
  }

  const scores = result
    ? {
        overallScore: result.overallScore,
        designScore: result.designScore,
        conversionScore: result.conversionScore,
        technicalScore: result.technicalScore,
      }
    : null

  return (
    <div className="bg-void">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-steel/20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,229,255,0.12),transparent_42%)]" />
        <Container className="relative grid min-h-[calc(100vh-4rem)] items-center gap-10 py-16 lg:grid-cols-[1fr_420px]">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-signal/40 bg-signal/10 px-3 py-1 font-mono text-xs tracking-wider text-signal">
                <Search className="h-3.5 w-3.5" />
                Live Website Audit
              </span>
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-static md:text-6xl">
              Scan any website. See what&apos;s broken, what&apos;s missing, and what to fix.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted md:text-xl">
              A real-time URL audit engine that scans live websites: DNS resolution, HTML analysis,
              same-origin crawl, PageSpeed/Lighthouse data, and scored findings with an implementation estimate.
            </p>

            <form onSubmit={runAudit} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Globe className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-steel" />
                <Input
                  className="w-full pl-10"
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" disabled={status === 'loading'} size="lg">
                {status === 'loading' ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Search className="mr-2 h-4 w-4" />
                )}
                Run Audit
              </Button>
            </form>
            {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}

            <dl className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
              {[
                ['Live', 'DNS lookup + HTML fetch + PageSpeed'],
                ['Scored', 'Design, conversion, technical scores'],
                ['Crawled', 'Same-origin multi-page analysis'],
              ].map(([label, value]) => (
                <div key={label} className="border-l border-signal/40 pl-4">
                  <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{label}</dt>
                  <dd className="mt-1 text-sm text-static">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ── Sidebar card: what the audit checks ── */}
          <div className="rounded-lg border border-steel/30 bg-depth/70 p-5 shadow-card backdrop-blur">
            <div className="flex items-center justify-between border-b border-steel/30 pb-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">Audit Engine</p>
                <h2 className="mt-1 text-xl font-semibold text-static">What the scan examines</h2>
              </div>
              <BarChart3 className="h-6 w-6 text-signal" />
            </div>
            <div className="mt-5 space-y-3">
              {[
                { icon: <Paintbrush className="h-4 w-4" />, label: 'Design audit', desc: 'Layout, branding, visual hierarchy, mobile responsiveness' },
                { icon: <TrendingUp className="h-4 w-4" />, label: 'Conversion audit', desc: 'CTA placement, form UX, trust signals, funnel friction' },
                { icon: <Code2 className="h-4 w-4" />, label: 'Technical audit', desc: 'Page speed, metadata, accessibility, structured data' },
                { icon: <FileSearch className="h-4 w-4" />, label: 'Live crawl + Lighthouse', desc: 'Same-origin page crawl and Google PageSpeed Insights' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 rounded-md border border-steel/25 bg-void/60 p-3">
                  <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-signal/10 text-signal">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-static">{item.label}</p>
                    <p className="mt-0.5 text-xs text-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Results ── */}
      <Container className="py-16">
        {!result ? (
          /* ── Idle state ── */
          <AnimatedSection>
            <div className="mx-auto max-w-lg rounded-lg border border-steel/30 bg-depth p-10 text-center">
              <Search className="mx-auto h-12 w-12 text-steel/50" />
              <h2 className="mt-6 text-2xl font-semibold text-static">Enter a URL to begin</h2>
              <p className="mt-3 text-muted">
                Paste any live website URL above and click &ldquo;Run Audit&rdquo;. The engine will
                resolve DNS, fetch HTML, crawl same-origin pages, pull PageSpeed data, and score the site.
              </p>
            </div>
          </AnimatedSection>
        ) : (
          <>
            {/* ── Audit metadata ── */}
            <AnimatedSection className="mb-10 flex flex-wrap items-center gap-4 rounded-lg border border-steel/30 bg-depth p-4 font-mono text-xs text-muted">
              <span>Audited: <span className="text-static">{result.finalUrl}</span></span>
              <span className="text-steel">|</span>
              <span>Response: <span className="text-static">{formatMs(result.responseMs)}</span></span>
              <span className="text-steel">|</span>
              <span>Pages crawled: <span className="text-static">{result.crawlSummary.pagesScanned}</span></span>
              {result.grade && (
                <>
                  <span className="text-steel">|</span>
                  <span>Grade: <span className="text-signal">{result.grade}</span></span>
                </>
              )}
            </AnimatedSection>

            {/* ── Score Cards ── */}
            <AnimatedSection className="grid gap-6 md:grid-cols-4">
              {/* Overall */}
              <div className="rounded-lg border border-steel/30 bg-depth p-6 text-center">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Overall</p>
                <p className={`mt-3 text-5xl font-bold ${scoreColor(result.overallScore)}`}>{result.overallScore}</p>
                <p className="mt-1 text-xs text-muted">/ 100</p>
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-steel/20">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${scoreBarColor(scores!.overallScore)}`}
                    style={{ width: `${result.overallScore}%` }}
                  />
                </div>
                <p className="mt-4 text-xs text-muted">
                  {scoreLabel(result.overallScore)}
                </p>
              </div>

              {([
                { key: 'design' as const, label: 'Design', icon: <Paintbrush className="h-5 w-5" />, score: result.designScore },
                { key: 'conversion' as const, label: 'Conversion', icon: <TrendingUp className="h-5 w-5" />, score: result.conversionScore },
                { key: 'technical' as const, label: 'Technical', icon: <Code2 className="h-5 w-5" />, score: result.technicalScore },
              ]).map(({ key, label, icon, score }) => (
                <div key={key} className="rounded-lg border border-steel/30 bg-depth p-6">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{label}</p>
                    <span className="text-signal">{icon}</span>
                  </div>
                  <p className={`mt-3 text-5xl font-bold ${scoreColor(score)}`}>
                    {score}
                  </p>
                  <p className="mt-1 text-xs text-muted">/ 100</p>
                  <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-steel/20">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${scoreBarColor(score)}`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  <p className="mt-4 text-xs text-muted">
                    {score >= 70 ? 'Well-optimized' : score >= 45 ? 'Needs improvement' : 'Critical attention required'}
                  </p>
                </div>
              ))}
            </AnimatedSection>

            {/* ── Observed Signals ── */}
            {result.observedSignals.length > 0 && (
              <AnimatedSection className="mt-10 rounded-lg border border-steel/30 bg-depth p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Live Scan Signals</p>
                    <h2 className="mt-2 text-2xl font-semibold text-static">What the audit detected</h2>
                  </div>
                  <span className="rounded-md border border-steel/40 px-3 py-1 font-mono text-xs text-muted">
                    {result.observedSignals.length} signals
                  </span>
                </div>
                <div className="mt-6 grid gap-2 sm:grid-cols-2">
                  {result.observedSignals.map((signal, i) => (
                    <div key={i} className="flex items-start gap-2 rounded-md border border-steel/25 bg-void/60 p-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      <span className="text-sm text-muted">{signal}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            )}

            {/* ── Findings (Issues) ── */}
            <AnimatedSection className="mt-10">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Issues Found</p>
                  <h2 className="mt-2 text-2xl font-semibold text-static">
                    What the audit surfaced
                  </h2>
                </div>
                <span className="rounded-md border border-signal/30 px-3 py-1 font-mono text-xs text-signal">
                  {result.issues.length} issue{result.issues.length !== 1 ? 's' : ''} found
                </span>
              </div>
              <div className="mt-6 grid gap-3">
                {result.issues.map((issue, i) => (
                  <div
                    key={`${issue.title}-${i}`}
                    className={`rounded-md border p-4 ${severityColors[issue.severity]}`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${severityDot[issue.severity]}`}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-static">{issue.title}</h3>
                          <span className="rounded border border-steel/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                            {issue.severity}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-muted">{issue.evidence}</p>
                        <div className="mt-3 flex items-start gap-2 rounded-md bg-signal/5 border border-signal/10 p-3">
                          <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                          <p className="text-sm text-static">{issue.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* ── Lighthouse / PageSpeed ── */}
            {result.lighthouse.available && (
              <AnimatedSection className="mt-10 rounded-lg border border-steel/30 bg-depth p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">PageSpeed Insights</p>
                    <h2 className="mt-2 text-2xl font-semibold text-static">Lighthouse scores (mobile)</h2>
                  </div>
                  <span className="rounded-md border border-emerald-500/40 px-3 py-1 font-mono text-xs text-emerald-400">
                    Live data
                  </span>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-4">
                  {([
                    { label: 'Performance', score: result.lighthouse.performance },
                    { label: 'Accessibility', score: result.lighthouse.accessibility },
                    { label: 'Best Practices', score: result.lighthouse.bestPractices },
                    { label: 'SEO', score: result.lighthouse.seo },
                  ]).map(({ label, score }) => (
                    <div key={label} className="rounded-md border border-steel/25 bg-void/60 p-4 text-center">
                      <p className="font-mono text-[10px] uppercase tracking-wider text-muted">{label}</p>
                      <p className={`mt-2 text-3xl font-bold ${score !== null ? scoreColor(score) : 'text-steel'}`}>
                        {score !== null ? Math.round(score) : '—'}
                      </p>
                      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-steel/20">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${score !== null ? scoreBarColor(score) : 'bg-steel/40'}`}
                          style={{ width: `${score !== null ? Math.round(score) : 0}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {result.lighthouse.audits.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {result.lighthouse.audits.map((audit, i) => (
                      <span key={i} className="rounded border border-steel/30 bg-void/60 px-2 py-1 font-mono text-[10px] text-muted">
                        {audit}
                      </span>
                    ))}
                  </div>
                )}
              </AnimatedSection>
            )}

            {/* ── Crawl Summary ── */}
            <AnimatedSection className="mt-10 rounded-lg border border-steel/30 bg-depth p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Site Crawl</p>
                  <h2 className="mt-2 text-2xl font-semibold text-static">Pages scanned</h2>
                </div>
                <span className="rounded-md border border-steel/40 px-3 py-1 font-mono text-xs text-muted">
                  {result.crawlSummary.pagesScanned} page{result.crawlSummary.pagesScanned !== 1 ? 's' : ''} crawled
                </span>
              </div>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-steel/20 font-mono text-xs uppercase tracking-wider text-muted">
                      <th className="pb-2 pr-4">URL</th>
                      <th className="pb-2 pr-4">Status</th>
                      <th className="pb-2 pr-4">Response</th>
                      <th className="pb-2 pr-4">Title</th>
                      <th className="pb-2">H1/Links/Forms/Imgs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.crawlSummary.pages.map((page, i) => (
                      <tr key={i} className="border-b border-steel/10">
                        <td className="py-2 pr-4 font-mono text-xs text-signal max-w-[240px] truncate" title={page.url}>
                          {page.url.length > 50 ? page.url.slice(0, 47) + '...' : page.url}
                        </td>
                        <td className="py-2 pr-4">
                          <span className={`font-mono text-xs ${page.status >= 200 && page.status < 400 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {page.status || '—'}
                          </span>
                        </td>
                        <td className="py-2 pr-4 font-mono text-xs text-muted">{page.responseMs ? formatMs(page.responseMs) : '—'}</td>
                        <td className="py-2 pr-4 text-xs text-muted max-w-[200px] truncate" title={page.title || undefined}>
                          {page.title || '—'}
                        </td>
                        <td className="py-2 font-mono text-xs text-muted">
                          {page.h1Count}/{page.linkCount}/{page.formCount}/{page.imageCount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {result.crawlSummary.notes.length > 0 && (
                <div className="mt-4 space-y-1">
                  {result.crawlSummary.notes.map((note, i) => (
                    <p key={i} className="text-xs text-muted">{note}</p>
                  ))}
                </div>
              )}
            </AnimatedSection>

            {/* ── Reference Examples ── */}
            <AnimatedSection className="mt-10 rounded-lg border border-steel/30 bg-depth p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Proven Patterns</p>
                  <h2 className="mt-2 text-2xl font-semibold text-static">
                    What competitors who fixed this did
                  </h2>
                </div>
                <span className="rounded-md border border-steel/40 px-3 py-1 font-mono text-xs text-muted">
                  {result.referenceExamples.length} examples
                </span>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {result.referenceExamples.map((ex, i) => (
                  <div key={i} className="rounded-md border border-steel/25 bg-void/60 p-5">
                    <div className="flex items-center gap-2 text-signal">
                      <Zap className="h-4 w-4" />
                      <p className="font-semibold text-static">{ex.name}</p>
                    </div>
                    <p className="mt-2 text-sm text-muted">{ex.pattern}</p>
                    <div className="mt-3 flex items-start gap-2 rounded-md bg-emerald-500/5 border border-emerald-500/20 p-3">
                      <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      <p className="text-xs text-static">{ex.whyItWorks}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* ── Recommendations ── */}
            <AnimatedSection className="mt-10 rounded-lg border border-steel/30 bg-depth p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Recommended Actions</p>
                  <h2 className="mt-2 text-2xl font-semibold text-static">Prioritized fix plan</h2>
                </div>
              </div>
              <div className="mt-6 grid gap-4">
                {result.recommendations.map((rec) => (
                  <div key={rec.id} className="flex flex-wrap items-start gap-4 rounded-md border border-steel/25 bg-void/60 p-5 sm:flex-nowrap">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-signal/10 font-mono text-sm text-signal">
                      {rec.id}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-static">{rec.title}</h3>
                        <span className={`rounded border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${priorityBadge[rec.priority]}`}>
                          {rec.priority}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-muted">{rec.description}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-mono text-sm font-semibold text-signal">{rec.pricing}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* ── Implementation Estimate + Proposal CTA ── */}
            <AnimatedSection className="mt-10 rounded-lg border border-steel/30 bg-depth p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                    Implementation Estimate
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-static">
                    What it would take to fix this site
                  </h2>
                </div>
                <span className="rounded-md border border-steel/40 px-3 py-1 font-mono text-xs text-muted">
                  Based on live audit
                </span>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-md border border-steel/25 bg-void/60 p-4">
                  <div className="flex items-center gap-2 text-signal">
                    <Gauge className="h-5 w-5" />
                    <p className="font-mono text-xs uppercase tracking-[0.16em]">Estimated Range</p>
                  </div>
                  <p className="mt-2 text-lg font-semibold text-static">
                    {result.implementationEstimate.range}
                  </p>
                </div>
                <div className="rounded-md border border-steel/25 bg-void/60 p-4">
                  <div className="flex items-center gap-2 text-signal">
                    <AlertTriangle className="h-5 w-5" />
                    <p className="font-mono text-xs uppercase tracking-[0.16em]">Issues Detected</p>
                  </div>
                  <p className="mt-2 text-lg font-semibold text-static">
                    {result.issues.length}
                  </p>
                </div>
                <div className="rounded-md border border-steel/25 bg-void/60 p-4">
                  <div className="flex items-center gap-2 text-signal">
                    <Clock className="h-5 w-5" />
                    <p className="font-mono text-xs uppercase tracking-[0.16em]">Response Time</p>
                  </div>
                  <p className="mt-2 text-lg font-semibold text-static">
                    {formatMs(result.responseMs)}
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm text-muted">{result.implementationEstimate.basis}</p>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-md border border-signal/20 bg-signal/5 p-5">
                <div>
                  <p className="font-medium text-static">Ready for a full proposal?</p>
                  <p className="mt-1 text-sm text-muted">
                    We&rsquo;ll walk through every finding, prioritize by impact, and deliver a phased
                    implementation plan tailored to your stack and timeline.
                  </p>
                </div>
                <Button href="/try" size="lg">
                  Get the Full Proposal
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </AnimatedSection>

            {/* ── Disclaimer ── */}
            {result.disclaimer && (
              <div className="mt-10 border-t border-steel/20 pt-6 text-center">
                <div className="flex items-start gap-2 mx-auto max-w-2xl rounded-md border border-steel/30 bg-depth/50 p-4 text-left">
                  <Shield className="mt-0.5 h-4 w-4 shrink-0 text-steel" />
                  <p className="text-xs text-muted">{result.disclaimer}</p>
                </div>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  )
}
