'use client'

import { FormEvent, useMemo, useState } from 'react'
import { ArrowRight, CalendarClock, CheckCircle2, GitBranch, Loader2, MonitorCog } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { DemoLeadInput, DemoLeadResult, sandboxLeads } from '@/lib/demo/hero-flow'

const initialLead: DemoLeadInput = sandboxLeads[0]

const walkthrough = [
  {
    title: 'Show the premium website surface',
    detail: 'Start with the hero promise, conversion offer, and clear sandbox badge.',
  },
  {
    title: 'Submit the intake form',
    detail: 'Explain that the form is real UI, while the lead profile and downstream actions are mocked.',
  },
  {
    title: 'Narrate qualification',
    detail: 'Use the score, segment, and route to show how OA decides what should happen next.',
  },
  {
    title: 'Show the handoff',
    detail: 'Point to the booking hold or follow-up output as the operator-facing next action.',
  },
  {
    title: 'Open the backend trace',
    detail: 'Walk through each step and its real vs mocked label for truthful demo framing.',
  },
]

export default function HeroDemoPage() {
  const [lead, setLead] = useState<DemoLeadInput>(initialLead)
  const [result, setResult] = useState<DemoLeadResult | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [error, setError] = useState('')

  const resultTone = useMemo(() => {
    if (!result) return 'border-steel/30'
    if (result.segment === 'Priority fit') return 'border-signal/50'
    if (result.segment === 'Needs discovery') return 'border-warm/50'
    return 'border-steel/50'
  }, [result])

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')
    setError('')

    const response = await fetch('/api/demo/hero', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    })

    const payload = await response.json()
    if (!response.ok) {
      setStatus('error')
      setError(payload.error ?? 'Unable to run demo flow.')
      return
    }

    setResult(payload.result)
    setStatus('idle')
  }

  return (
    <div className="bg-void">
      <section className="relative overflow-hidden border-b border-steel/20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,229,255,0.12),transparent_42%)]" />
        <Container className="relative grid min-h-[calc(100vh-4rem)] items-center gap-10 py-16 lg:grid-cols-[1fr_440px]">
          <div>
            <Badge>Sandbox hero demo</Badge>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-static md:text-6xl">
              Premium website, intake, and automation handoff in one operator view.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted md:text-xl">
              A lean OA demo that shows the website experience, lead capture, qualification logic, and workflow trace without receptionist framing or telephony dependencies.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#demo-intake" size="lg">
                Run Sandbox Flow
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button href="#walkthrough" variant="secondary" size="lg">
                Narration Steps
              </Button>
            </div>
            <dl className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
              {[
                ['Real', 'Page UI + API call'],
                ['Mocked', 'Lead profile + handoff'],
                ['Blocked by', 'No external services'],
              ].map(([label, value]) => (
                <div key={label} className="border-l border-signal/40 pl-4">
                  <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{label}</dt>
                  <dd className="mt-1 text-sm text-static">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-lg border border-steel/30 bg-depth/70 p-5 shadow-card backdrop-blur">
            <div className="flex items-center justify-between border-b border-steel/30 pb-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">Operator Snapshot</p>
                <h2 className="mt-1 text-xl font-semibold text-static">Website automation system</h2>
              </div>
              <MonitorCog className="h-6 w-6 text-signal" />
            </div>
            <div className="mt-5 space-y-4">
              {['Landing page viewed', 'Lead intake submitted', 'Rules evaluated', 'Handoff prepared'].map((step, index) => (
                <div key={step} className="flex items-center gap-3 rounded-md border border-steel/25 bg-void/60 p-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-signal/10 font-mono text-xs text-signal">
                    {index + 1}
                  </span>
                  <span className="text-sm text-static">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-16">
        <div id="demo-intake" className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
          <form onSubmit={submitLead} className="rounded-lg border border-steel/30 bg-depth p-6">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Lead capture / intake</p>
                <h2 className="mt-2 text-2xl font-semibold text-static">Sandbox website inquiry</h2>
              </div>
              <span className="rounded-md border border-signal/30 px-3 py-1 font-mono text-xs text-signal">Real form</span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Name">
                <Input value={lead.name} onChange={(event) => setLead({ ...lead, name: event.target.value })} required />
              </Field>
              <Field label="Email">
                <Input type="email" value={lead.email} onChange={(event) => setLead({ ...lead, email: event.target.value })} required />
              </Field>
              <Field label="Company">
                <Input value={lead.company} onChange={(event) => setLead({ ...lead, company: event.target.value })} required />
              </Field>
              <Field label="Website">
                <Input value={lead.website} onChange={(event) => setLead({ ...lead, website: event.target.value })} required />
              </Field>
              <Field label="Monthly leads">
                <Select value={lead.monthlyLeads} onChange={(event) => setLead({ ...lead, monthlyLeads: event.target.value })}>
                  <option value="0-25">0-25</option>
                  <option value="26-100">26-100</option>
                  <option value="101-250">101-250</option>
                  <option value="250+">250+</option>
                </Select>
              </Field>
              <Field label="Build budget">
                <Select value={lead.budget} onChange={(event) => setLead({ ...lead, budget: event.target.value })}>
                  <option value="<2500">Under $2.5k</option>
                  <option value="2500-7500">$2.5k-$7.5k</option>
                  <option value="7500-15000">$7.5k-$15k</option>
                  <option value="15000+">$15k+</option>
                </Select>
              </Field>
              <Field label="Timeline">
                <Select value={lead.timeline} onChange={(event) => setLead({ ...lead, timeline: event.target.value })}>
                  <option value="this-month">This month</option>
                  <option value="30-60">30-60 days</option>
                  <option value="quarter">This quarter</option>
                  <option value="exploring">Exploring</option>
                </Select>
              </Field>
              <div className="md:col-span-2">
                <Field label="Automation goal">
                  <Textarea
                    rows={4}
                    value={lead.automationGoal}
                    onChange={(event) => setLead({ ...lead, automationGoal: event.target.value })}
                    required
                  />
                </Field>
              </div>
            </div>

            {error ? <p className="mt-4 text-sm text-red-400">{error}</p> : null}
            <Button className="mt-6" type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GitBranch className="mr-2 h-4 w-4" />}
              Run Qualification
            </Button>
          </form>

          <aside className={`rounded-lg border bg-depth p-6 ${resultTone}`}>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Qualification / routing logic</p>
            {result ? (
              <div className="mt-5">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted">Result</p>
                    <h2 className="mt-1 text-3xl font-semibold text-static">{result.segment}</h2>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-4xl text-signal">{result.score}</p>
                    <p className="text-xs text-muted">score / 100</p>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  <ResultBlock icon={<GitBranch className="h-5 w-5" />} label="Route" value={result.route} flag="Real rule" />
                  <ResultBlock icon={<CalendarClock className="h-5 w-5" />} label="Booking handoff or follow-up" value={result.bookingHandoff} flag="Mock output" />
                  <ResultBlock icon={<CheckCircle2 className="h-5 w-5" />} label="Follow-up copy" value={result.followUpOutput} flag="Mock copy" />
                </div>
              </div>
            ) : (
              <div className="mt-10 rounded-md border border-steel/30 bg-void/60 p-5 text-sm text-muted">
                Submit the intake form to generate a sandbox qualification result and handoff output.
              </div>
            )}
          </aside>
        </div>

        <section className="mt-6 rounded-lg border border-steel/30 bg-depth p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Operator-visible backend trace</p>
              <h2 className="mt-2 text-2xl font-semibold text-static">Workflow timeline</h2>
            </div>
            <span className="rounded-md border border-steel/40 px-3 py-1 font-mono text-xs text-muted">In-memory API data</span>
          </div>
          <div className="mt-6 grid gap-3">
            {(result?.trace ?? []).length ? (
              result?.trace.map((step) => (
                <div key={step.label} className="grid gap-3 rounded-md border border-steel/25 bg-void/60 p-4 md:grid-cols-[170px_minmax(0,1fr)_110px]">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-signal">{step.status}</span>
                  <div>
                    <h3 className="font-semibold text-static">{step.label}</h3>
                    <p className="mt-1 text-sm text-muted">{step.detail}</p>
                  </div>
                  <span className="self-start rounded-md border border-steel/40 px-2 py-1 text-center font-mono text-xs text-muted">
                    {step.source === 'real' ? 'Real' : 'Mocked'}
                  </span>
                </div>
              ))
            ) : (
              <p className="rounded-md border border-steel/25 bg-void/60 p-4 text-sm text-muted">
                The trace populates after the API processes a sandbox lead.
              </p>
            )}
          </div>
        </section>

        <section id="walkthrough" className="mt-6 rounded-lg border border-steel/30 bg-depth p-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Reusable walkthrough</p>
          <h2 className="mt-2 text-2xl font-semibold text-static">Marketing / Media narration path</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-5">
            {walkthrough.map((item, index) => (
              <div key={item.title} className="rounded-md border border-steel/25 bg-void/60 p-4">
                <span className="font-mono text-xs text-signal">Step {index + 1}</span>
                <h3 className="mt-3 font-semibold text-static">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm text-muted">
      <span>{label}</span>
      {children}
    </label>
  )
}

function ResultBlock({
  icon,
  label,
  value,
  flag,
}: {
  icon: React.ReactNode
  label: string
  value: string
  flag: string
}) {
  return (
    <div className="rounded-md border border-steel/25 bg-void/60 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-signal">
          {icon}
          <p className="font-mono text-xs uppercase tracking-[0.16em]">{label}</p>
        </div>
        <span className="rounded-md border border-steel/40 px-2 py-1 font-mono text-xs text-muted">{flag}</span>
      </div>
      <p className="mt-3 text-sm text-static">{value}</p>
    </div>
  )
}
