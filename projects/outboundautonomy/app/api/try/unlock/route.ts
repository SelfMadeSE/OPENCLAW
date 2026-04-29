import { NextResponse } from 'next/server'
import { z } from 'zod'
import { storeLead } from '@/lib/lead-storage'

const unlockSchema = z.object({
  email: z.string().email(),
  company: z.string().min(1),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = unlockSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 })
    }

    const { email, company } = parsed.data

    const result = await storeLead(
      {
        name: company || 'Preview unlock lead',
        email,
        company: company || '',
        service_interest: 'other',
        message: `Preview report unlock from /try page for ${company}.`,
      },
      {}
    )

    return NextResponse.json({
      success: true,
      id: result.id,
      destination: result.destination,
    })
  } catch (error) {
    console.error('try/unlock error:', error)
    return NextResponse.json(
      { error: 'Unable to save unlock request right now.' },
      { status: 500 }
    )
  }
}
