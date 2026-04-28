import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { simulateAudit, type AuditResult } from '@/lib/demo/audit-flow'

const urlSchema = z.object({
  url: z.string().url({ message: 'Enter a valid URL including https://' }),
})

const auditResults = new Map<string, AuditResult>()

export async function GET() {
  return NextResponse.json({
    mode: 'sandbox',
    externalServices: false,
    recentResults: Array.from(auditResults.values()).slice(-5).reverse(),
  })
}

export async function POST(request: NextRequest) {
  const parsed = urlSchema.safeParse(await request.json())

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'Invalid URL',
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    )
  }

  const result = simulateAudit(parsed.data.url)
  auditResults.set(result.id, result)

  return NextResponse.json({
    mode: 'sandbox',
    externalServices: false,
    result,
  })
}
