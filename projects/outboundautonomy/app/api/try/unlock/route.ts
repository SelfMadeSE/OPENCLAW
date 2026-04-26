import { NextResponse } from 'next/server'
import { z } from 'zod'
import { insertIntoSupabase } from '@/lib/supabase'

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

    const result = await insertIntoSupabase('preview_unlocks', {
      email,
      company,
      source: 'try-preview',
      submitted_at: new Date().toISOString(),
    })

    if (!result.ok) {
      return NextResponse.json(
        {
          error: 'Unable to save unlock request right now.',
          details: result.error,
        },
        { status: result.status }
      )
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Unexpected server error.' }, { status: 500 })
  }
}
