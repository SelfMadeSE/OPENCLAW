import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { DemoLeadResult, qualifyDemoLead, sandboxLeads } from '@/lib/demo/hero-flow'

const demoLeadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  website: z.string().min(3),
  monthlyLeads: z.string().min(1),
  budget: z.string().min(1),
  timeline: z.string().min(1),
  automationGoal: z.string().min(12),
})

const demoResults = new Map<string, DemoLeadResult>()

export async function GET() {
  return NextResponse.json({
    mode: 'sandbox',
    externalServices: false,
    sampleLeads: sandboxLeads,
    recentResults: Array.from(demoResults.values()).slice(-5).reverse(),
  })
}

export async function POST(request: NextRequest) {
  const parsed = demoLeadSchema.safeParse(await request.json())

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'Invalid demo lead',
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    )
  }

  const result = qualifyDemoLead(parsed.data)
  demoResults.set(result.id, result)

  return NextResponse.json({
    mode: 'sandbox',
    externalServices: false,
    result,
  })
}
