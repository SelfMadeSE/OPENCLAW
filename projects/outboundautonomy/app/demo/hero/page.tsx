'use client'

import { FormEvent, useState } from 'react'
import { AlertTriangle, ArrowRight, BarChart3, Code2, Gauge, Globe, Loader2, Paintbrush, Search, TrendingUp, Users, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Input } from '@/components/ui/Input'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import type { AuditResult } from '@/lib/demo/audit-flow'

const severityColors: Record<string, string> = {
  critical: 'border-red-500/40 bg-red-500/5',
  high: 'border-warm/40 bg-warm/5',
  medium: 'border-steel/40 bg-depth/70',
}

const severityDot: Record<string, string> = {
  critical: 'bg-red-500',
  high: 'bg-warm',
  medium: 'bg-steel',
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

    const response = await fetch('/api/demo/hero', {
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

    setResult(payload.result)
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

  const overall = result
    ? Math.round((result.scores.design + result.scores.conversion + result.scores.technical) / 3)
    : 0

  return (
    <div className="bg-void">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-steel/20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,229,255,0.12),transparent_42%)]" />
        <Container className="relative grid min-h-[calc(100vh-4rem)] items-center gap-10 py-16 lg:grid-cols-[1fr_420px]">
          <div>
            <div className="flex items-center gap-3">
              <Badge>
                <Search className="mr-1.5 h-3.5 w-3.5" />
                Website Audit Demo
              </Badge>
              <span className="rounded border border-signal/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-signal">
                Sandbox
              </span>
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-static md:text-6xl">
              Scan any website. See what&apos;s broken, what&apos;s missing, and what to fix.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted md:text-xl">
              A lean OA demo that shows the URL audit engine: score analysis, actionable findings,
              competitor benchmarks, and an implementation estimate&mdash;no forms, no routing, no handoff.
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
                ['Real', 'Page UI + URL analysis logic'],
                ['Mocked', 'Scores, findings, competitor data'],
                ['Blocked by', 'No live site crawler (simulated)'],
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
                { icon: <Users className="h-4 w-4" />, label: 'Competitor benchmark', desc: 'Industry comparison and proven improvement patterns' },
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
                Paste any website URL above and click &ldquo;Run Audit&rdquo;. The sandbox engine will
                generate a simulated audit with scores, findings, competitor data, and a proposal estimate.
              </p>
            </div>
          </AnimatedSection>
        ) : (
          <>
            {/* ── Score Cards ── */}
            <AnimatedSection className="grid gap-6 md:grid-cols-4">
              {/* Overall */}
              <div className="rounded-lg border border-steel/30 bg-depth p-6 text-center">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Overall</p>
                <p className={`mt-3 text-5xl font-bold ${scoreColor(overall)}`}>{overall}</p>
                <p className="mt-1 text-xs text-muted">/ 100</p>
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-steel/20">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${scoreBarColor(overall)}`}
                    style={{ width: `${overall}%` }}
                  />
                </div>
                <p className="mt-4 text-xs text-muted">
                  {overall >= 70
                    ? 'Solid baseline — targeted fixes will lift further'
                    : overall >= 45
                      ? 'Moderate issues — address critical items first'
                      : 'Significant overhaul recommended'}
                </p>
              </div>

              {([
                { key: 'design' as const, label: 'Design', icon: <Paintbrush className="h-5 w-5" /> },
                { key: 'conversion' as const, label: 'Conversion', icon: <TrendingUp className="h-5 w-5" /> },
                { key: 'technical' as const, label: 'Technical', icon: <Code2 className="h-5 w-5" /> },
              ]).map(({ key, label, icon }) => (
                <div key={key} className="rounded-lg border border-steel/30 bg-depth p-6">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{label}</p>
                    <span className="text-signal">{icon}</span>
                  </div>
                  <p className={`mt-3 text-5xl font-bold ${scoreColor(result.scores[key])}`}>
                    {result.scores[key]}
                  </p>
                  <p className="mt-1 text-xs text-muted">/ 100</p>
                  <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-steel/20">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${scoreBarColor(result.scores[key])}`}
                      style={{ width: `${result.scores[key]}%` }}
                    />
                  </div>
                  <p className="mt-4 text-xs text-muted">
                    {result.scores[key] >= 70
                      ? 'Well-optimized'
                      : result.scores[key] >= 45
                        ? 'Needs improvement'
                        : 'Critical attention required'}
                  </p>
                </div>
              ))}
            </AnimatedSection>

            {/* ── Findings ── */}
            <AnimatedSection className="mt-10">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                    Specific Findings
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-static">
                    What the audit surfaced
                  </h2>
                </div>
                <span className="rounded-md border border-signal/30 px-3 py-1 font-mono text-xs text-signal">
                  {result.findings.length} issues found
                </span>
              </div>
              <div className="mt-6 grid gap-3">
                {result.findings.map((finding, i) => (
                  <div
                    key={`${finding.title}-${i}`}
                    className={`rounded-md border p-4 ${severityColors[finding.severity]}`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${severityDot[finding.severity]}`}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-static">{finding.title}</h3>
                          <span className="rounded border border-steel/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                            {finding.severity}
                          </span>
                          <span className="rounded border border-steel/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                            {finding.category}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-muted">{finding.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* ── Competitor Angle ── */}
            <AnimatedSection className="mt-10 rounded-lg border border-steel/30 bg-depth p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                    Competitor Comparison
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-static">
                    What competitors who fixed this did
                  </h2>
                </div>
                <span className="rounded-md border border-steel/40 px-3 py-1 font-mono text-xs text-muted">
                  Industry: {result.competitorAngle.industry}
                </span>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto]">
                <div className="rounded-md border border-signal/20 bg-signal/5 p-5">
                  <div className="flex items-center gap-2 text-signal">
                    <Zap className="h-5 w-5" />
                    <p className="font-mono text-xs uppercase tracking-[0.16em]">Improvement</p>
                  </div>
                  <p className="mt-2 text-static">{result.competitorAngle.improvement}</p>
                </div>
                <div className="rounded-md border border-emerald-500/20 bg-emerald-500/5 p-5">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <TrendingUp className="h-5 w-5" />
                    <p className="font-mono text-xs uppercase tracking-[0.16em]">Result</p>
                  </div>
                  <p className="mt-2 text-static">{result.competitorAngle.result}</p>
                </div>
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
                  {result.implementation.effort === 'high'
                    ? 'Full overhaul'
                    : result.implementation.effort === 'medium'
                      ? 'Mid-scope'
                      : 'Tactical fixes'}
                </span>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-md border border-steel/25 bg-void/60 p-4">
                  <div className="flex items-center gap-2 text-signal">
                    <Gauge className="h-5 w-5" />
                    <p className="font-mono text-xs uppercase tracking-[0.16em]">Effort Level</p>
                  </div>
                  <p className="mt-2 text-lg font-semibold text-static capitalize">
                    {result.implementation.effort}
                  </p>
                </div>
                <div className="rounded-md border border-steel/25 bg-void/60 p-4">
                  <div className="flex items-center gap-2 text-signal">
                    <AlertTriangle className="h-5 w-5" />
                    <p className="font-mono text-xs uppercase tracking-[0.16em]">Timeline</p>
                  </div>
                  <p className="mt-2 text-lg font-semibold text-static">
                    {result.implementation.timeline}
                  </p>
                </div>
                <div className="rounded-md border border-steel/25 bg-void/60 p-4">
                  <div className="flex items-center gap-2 text-signal">
                    <BarChart3 className="h-5 w-5" />
                    <p className="font-mono text-xs uppercase tracking-[0.16em]">Estimated Range</p>
                  </div>
                  <p className="mt-2 text-lg font-semibold text-static">
                    {result.implementation.estimatedRange}
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm text-muted">{result.implementation.proposalSummary}</p>

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
          </>
        )}

        {/* ── Sandbox footer badge ── */}
        <div className="mt-16 border-t border-steel/20 pt-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/5 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-signal">
            <Zap className="h-3.5 w-3.5" />
            Sandbox Mode — All audit output is simulated
          </span>
        </div>
      </Container>
    </div>
  )
}
