'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { AlertCircle, ArrowRight, BarChart3, CheckCircle2, Clock3, Zap } from 'lucide-react'

type Finding = {
  title: string
  impact: string
  detail: string
  fix: string
}

const findings: Finding[] = [
  {
    title: 'No service CTA above the fold',
    impact: 'Visitors leave without calling or booking — estimated 25-35% lead loss.',
    detail:
      'Peak HVAC uses a rotating photo slider with no persistent "Get a Quote" or "Schedule Service" button visible before scrolling. Mobile visitors see photos, not actions.',
    fix: 'Replace the slider with a single strong headline, a phone number, and a persistent "Get a Free Estimate" button above the fold on every device.',
  },
  {
    title: 'Page speed is killing mobile leads',
    impact: 'Mobile LCP at 4.8s — most local service callers abandon after 3 seconds.',
    detail:
      'Unoptimized hero images and render-blocking third-party scripts load before the service promise. This is especially harmful for emergency-service searches where speed directly affects call volume.',
    fix: 'Compress hero images, defer non-critical scripts, and lazy-load below-fold content. Target sub-2.5s LCP for mobile service pages.',
  },
  {
    title: 'Trust proof is buried below the fold',
    impact: 'High-intent visitors leave before seeing reviews or credentials.',
    detail:
      'Reviews, license info, and guarantee language appear at the bottom of the page. Service buyers need proof immediately — ratings, years in business, insurance, and guarantees drive calls.',
    fix: 'Move review score, license badge, and a short guarantee line near the top CTA. Add a "serving [area] since [year]" trust line in the hero.',
  },
  {
    title: 'No service-area or emergency routing on the form',
    impact: 'After-hours leads go cold — staff sees them the next morning.',
    detail:
      'The contact form asks for name and message only with no service-type dropdown, urgency flag, or address field. Emergency calls (no heat, burst pipe) get the same treatment as general inquiries.',
    fix: 'Add service-type selection, urgency indicator, and ZIP/service-area check. Route emergency submissions to SMS alert and flag high-priority leads for immediate follow-up.',
  },
]

export default function TryPreviewPage() {
  const [email, setEmail] = useState('')
  const [company] = useState('Peak HVAC & Plumbing')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [unlocked, setUnlocked] = useState(false)

  const completionEstimate = useMemo(() => Math.round(findings.length * 11), [])

  async function onUnlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/try/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, company }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(payload?.error || 'Submission failed.')
      }

      setUnlocked(true)
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-10">
        <div className="mb-8 rounded-2xl border border-signal/20 bg-gradient-to-r from-signal/10 to-signal/5 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-signal">Website Audit Preview</p>
          <h1 className="mt-2 text-3xl font-semibold md:text-4xl text-static">{company} — Website Audit Preview</h1>
          <p className="mt-3 max-w-3xl text-muted">
            This is what an Outbound Autonomy audit looks like for a local service business. Scroll the findings below.
            At the midpoint, unlock the full implementation plan with pricing and a proposal path.
          </p>
          <p className="mt-4">
            <a
              href="/#audit"
              className="inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/10 px-4 py-2 text-sm font-semibold text-signal transition hover:bg-signal/20"
            >
              Run an audit on your own site →
            </a>
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm text-static">
            <span className="inline-flex items-center gap-2 rounded-full border border-steel px-3 py-1">
              <Clock3 className="h-4 w-4 text-signal" />
              ~{completionEstimate}s read
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-steel px-3 py-1">
              <BarChart3 className="h-4 w-4 text-signal" />
              4 conversion issues found
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.25fr,0.75fr]">
          <div className="max-h-[72vh] space-y-4 overflow-y-auto rounded-2xl border border-depth bg-depth/70 p-5">
            {findings.map((finding, index) => {
              const isGatedSection = index >= 2 && !unlocked

              return (
                <article
                  key={finding.title}
                  className={`rounded-xl border p-5 transition ${
                    isGatedSection ? 'border-steel/60 bg-depth/50 blur-[1px]' : 'border-steel bg-depth'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-lg font-semibold">{finding.title}</h2>
                    <span className="rounded-full border border-warm/40 bg-warm/10 px-2 py-1 text-xs text-warm">
                      Finding {index + 1}
                    </span>
                  </div>
                  <p className="mt-3 flex items-center gap-2 text-sm text-signal">
                    <AlertCircle className="h-4 w-4" />
                    {finding.impact}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted">{finding.detail}</p>
                  <p className="mt-4 rounded-lg border border-signal/30 bg-signal/10 p-3 text-sm text-signal">
                    <span className="font-semibold">Recommended Fix:</span> {finding.fix}
                  </p>
                </article>
              )
            })}
          </div>

          <aside className="space-y-4">
            {!unlocked ? (
              <div className="rounded-2xl border border-signal/30 bg-depth p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-signal">50% checkpoint</p>
                <h3 className="mt-2 text-2xl font-semibold">Unlock Full Audit + Implementation Plan →</h3>
                <p className="mt-2 text-sm text-muted">
                  Enter your email to reveal the full report with prioritized fixes, estimated pricing, and a proposal request path.
                </p>

                <form className="mt-4 space-y-3" onSubmit={onUnlock}>
                  <label className="block text-sm text-static">
                    Work email
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="name@company.com"
                      className="mt-1 w-full rounded-lg border border-steel bg-void px-3 py-2 text-sm text-static outline-none ring-signal transition focus:ring"
                    />
                  </label>
                  {error ? <p className="text-sm text-warm">{error}</p> : null}
                  <button
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-signal px-4 py-2 text-sm font-semibold text-void transition hover:bg-signal/80 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? 'Unlocking...' : 'Unlock Full Report'}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </div>
            ) : (
              <div className="rounded-2xl border border-signal/30 bg-depth p-5">
                <p className="inline-flex items-center gap-2 text-sm text-signal">
                  <CheckCircle2 className="h-4 w-4" /> Report unlocked
                </p>
                <h3 className="mt-2 text-2xl font-semibold">Your Implementation Plan</h3>
                <ul className="mt-3 space-y-2 text-sm text-static">
                  <li className="rounded-lg border border-steel bg-void p-3">
                    <span className="font-semibold text-signal">Week 1:</span> Hero redesign + CTA + trust proof
                  </li>
                  <li className="rounded-lg border border-steel bg-void p-3">
                    <span className="font-semibold text-signal">Week 2:</span> Speed optimization + mobile fixes
                  </li>
                  <li className="rounded-lg border border-steel bg-void p-3">
                    <span className="font-semibold text-signal">Week 3:</span> Lead form + emergency routing + CRM handoff
                  </li>
                </ul>

                <Link
                  href="/contact"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-signal px-4 py-2 text-sm font-semibold text-void transition hover:bg-signal/80"
                >
                  Request Proposal
                  <Zap className="h-4 w-4" />
                </Link>
              </div>
            )}
          </aside>
        </div>
      </section>
    </div>
  )
}
