export type DemoLeadInput = {
  name: string
  email: string
  company: string
  website: string
  monthlyLeads: string
  budget: string
  timeline: string
  automationGoal: string
}

export type DemoTraceStep = {
  label: string
  detail: string
  status: 'complete' | 'queued'
  source: 'mock' | 'real'
}

export type DemoLeadResult = {
  id: string
  score: number
  segment: 'Priority fit' | 'Nurture fit' | 'Needs discovery'
  route: string
  bookingHandoff: string
  followUpOutput: string
  trace: DemoTraceStep[]
  createdAt: string
}

const leadScores: Record<string, number> = {
  '0-25': 8,
  '26-100': 18,
  '101-250': 28,
  '250+': 34,
}

const budgetScores: Record<string, number> = {
  '<2500': 6,
  '2500-7500': 18,
  '7500-15000': 28,
  '15000+': 34,
}

const timelineScores: Record<string, number> = {
  'this-month': 24,
  '30-60': 18,
  'quarter': 12,
  'exploring': 6,
}

export const sandboxLeads: DemoLeadInput[] = [
  {
    name: 'Maya Chen',
    email: 'maya@summitclinic.example',
    company: 'Summit Aesthetics',
    website: 'https://summitclinic.example',
    monthlyLeads: '101-250',
    budget: '7500-15000',
    timeline: 'this-month',
    automationGoal: 'Launch a premium conversion site and automate consult intake, qualification, and booking handoff.',
  },
  {
    name: 'Jordan Ellis',
    email: 'jordan@northstarbuilds.example',
    company: 'Northstar Builds',
    website: 'https://northstarbuilds.example',
    monthlyLeads: '26-100',
    budget: '2500-7500',
    timeline: '30-60',
    automationGoal: 'Route quote requests by service area and send project-fit follow-up without adding phone staff.',
  },
]

export function qualifyDemoLead(input: DemoLeadInput): DemoLeadResult {
  const score =
    (leadScores[input.monthlyLeads] ?? 10) +
    (budgetScores[input.budget] ?? 8) +
    (timelineScores[input.timeline] ?? 8) +
    Math.min(input.automationGoal.trim().length / 12, 18)

  const roundedScore = Math.min(Math.round(score), 100)
  const segment =
    roundedScore >= 72 ? 'Priority fit' : roundedScore >= 48 ? 'Needs discovery' : 'Nurture fit'
  const route =
    segment === 'Priority fit'
      ? 'Route to founder-led strategy call'
      : segment === 'Needs discovery'
        ? 'Route to qualification review'
        : 'Route to async nurture sequence'
  const handoff =
    segment === 'Priority fit'
      ? 'Mock booking hold created: Strategy Call, tomorrow at 10:30 AM.'
      : segment === 'Needs discovery'
        ? 'Mock task created: Review lead context and send 2-question fit check.'
        : 'Mock follow-up queued: Premium website and automation overview.'

  const id = `oa-demo-${Date.now().toString(36)}`
  const createdAt = new Date().toISOString()

  return {
    id,
    score: roundedScore,
    segment,
    route,
    bookingHandoff: handoff,
    followUpOutput: buildFollowUp(input, segment),
    createdAt,
    trace: [
      {
        label: 'Website intake captured',
        detail: `${input.company} submitted the premium website and automation form.`,
        status: 'complete',
        source: 'real',
      },
      {
        label: 'Sandbox lead enrichment',
        detail: 'Mock profile data attached from in-memory demo data. No external lookup ran.',
        status: 'complete',
        source: 'mock',
      },
      {
        label: 'Qualification rule evaluated',
        detail: `Score ${roundedScore}/100 based on lead volume, budget, timeline, and stated automation goal.`,
        status: 'complete',
        source: 'real',
      },
      {
        label: 'Routing decision generated',
        detail: `${segment}: ${route}.`,
        status: 'complete',
        source: 'real',
      },
      {
        label: 'Handoff output prepared',
        detail: handoff,
        status: 'queued',
        source: 'mock',
      },
    ],
  }
}

function buildFollowUp(input: DemoLeadInput, segment: DemoLeadResult['segment']) {
  const opener =
    segment === 'Priority fit'
      ? 'You look ready for a focused build plan.'
      : segment === 'Needs discovery'
        ? 'A short fit check is the right next step.'
        : 'Here is a concise starting point while you compare options.'

  return `${opener} We would map ${input.company}'s website offer, intake questions, routing rules, and follow-up sequence before proposing a build.`
}
