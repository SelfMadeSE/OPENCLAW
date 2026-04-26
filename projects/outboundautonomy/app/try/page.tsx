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
    title: 'Homepage CTA is too generic',
    impact: 'Estimated 18-24% conversion loss on first touch.',
    detail:
      'Acme SaaS Co. uses “Learn More” above the fold. Buyers arriving from outbound campaigns do not see a clear next step tied to a measurable outcome.',
    fix: 'Replace with a single high-clarity CTA: “Get Your 14-Day Pipeline Gap Report”. Add one-line promise directly under CTA.',
  },
  {
    title: 'Page speed is suppressing paid traffic ROI',
    impact: 'Mobile LCP at 4.1s, increasing bounce and CPC waste.',
    detail:
      'Hero media and third-party scripts load before the primary value message. This delays initial render and weakens ad and outbound campaign performance.',
    fix: 'Compress hero assets, defer non-critical scripts, and remove one redundant analytics tag. Target sub-2.5s LCP.',
  },
  {
    title: 'No trust proof near conversion points',
    impact: 'High-intent visitors are dropping without social confidence.',
    detail:
      'Case stats and client logos appear below the fold. Prospects do not see clear proof during decision moments on contact and pricing pathways.',
    fix: 'Inject two proof blocks near CTA modules: quantified case metric and “used by” logo strip.',
  },
  {
    title: 'Lead capture path misses qualification data',
    impact: 'Sales follow-up slows down by 1-2 days on average.',
    detail:
      'Current form asks for email only, forcing manual qualification later. This delays SDR prioritization and reduces close velocity.',
    fix: 'Capture role, monthly traffic, and current funnel stage in progressive fields after first submit.',
  },
]

export default function TryPreviewPage() {
  const [email, setEmail] = useState('')
  const [company] = useState('Acme SaaS Co.')
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
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-10">
        <div className="mb-8 rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Diagnostic Preview</p>
          <h1 className="mt-2 text-3xl font-semibold md:text-4xl">{company} Website Growth Snapshot</h1>
          <p className="mt-3 max-w-3xl text-slate-300">
            This is a sample of the Outbound Autonomy audit flow. Scroll the findings below. At the midpoint, unlock
            the full growth blueprint to view implementation priorities and strategy CTA.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-200">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-1">
              <Clock3 className="h-4 w-4 text-cyan-300" />
              ~{completionEstimate}s read
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-1">
              <BarChart3 className="h-4 w-4 text-cyan-300" />
              4 high-impact findings
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.25fr,0.75fr]">
          <div className="max-h-[72vh] space-y-4 overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            {findings.map((finding, index) => {
              const isGatedSection = index >= 2 && !unlocked

              return (
                <article
                  key={finding.title}
                  className={`rounded-xl border p-5 transition ${
                    isGatedSection ? 'border-slate-700/60 bg-slate-900/50 blur-[1px]' : 'border-slate-700 bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-lg font-semibold">{finding.title}</h2>
                    <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-2 py-1 text-xs text-amber-300">
                      Finding {index + 1}
                    </span>
                  </div>
                  <p className="mt-3 flex items-center gap-2 text-sm text-rose-300">
                    <AlertCircle className="h-4 w-4" />
                    {finding.impact}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{finding.detail}</p>
                  <p className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-200">
                    <span className="font-semibold">Recommended Fix:</span> {finding.fix}
                  </p>
                </article>
              )
            })}
          </div>

          <aside className="space-y-4">
            {!unlocked ? (
              <div className="rounded-2xl border border-cyan-500/30 bg-slate-900 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">50% checkpoint</p>
                <h3 className="mt-2 text-2xl font-semibold">Unlock Full Growth Blueprint →</h3>
                <p className="mt-2 text-sm text-slate-300">
                  Enter your email to reveal the complete report view with prioritized implementation roadmap.
                </p>

                <form className="mt-4 space-y-3" onSubmit={onUnlock}>
                  <label className="block text-sm text-slate-200">
                    Work email
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="name@company.com"
                      className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none ring-cyan-300 transition focus:ring"
                    />
                  </label>
                  {error ? <p className="text-sm text-rose-300">{error}</p> : null}
                  <button
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? 'Unlocking...' : 'Unlock Full Growth Blueprint'}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </div>
            ) : (
              <div className="rounded-2xl border border-emerald-500/30 bg-slate-900 p-5">
                <p className="inline-flex items-center gap-2 text-sm text-emerald-300">
                  <CheckCircle2 className="h-4 w-4" /> Blueprint unlocked
                </p>
                <h3 className="mt-2 text-2xl font-semibold">Sample Full Report</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-200">
                  <li className="rounded-lg border border-slate-700 bg-slate-950 p-3">
                    <span className="font-semibold text-cyan-300">Week 1:</span> Ship CTA + trust block update
                  </li>
                  <li className="rounded-lg border border-slate-700 bg-slate-950 p-3">
                    <span className="font-semibold text-cyan-300">Week 2:</span> Speed optimization sprint
                  </li>
                  <li className="rounded-lg border border-slate-700 bg-slate-950 p-3">
                    <span className="font-semibold text-cyan-300">Week 3:</span> Form qualification automation
                  </li>
                </ul>

                <Link
                  href="/contact"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
                >
                  Book Strategy Call
                  <Zap className="h-4 w-4" />
                </Link>
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  )
}
