import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { storeLead } from '@/lib/lead-storage'
import { contactFormSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = contactFormSchema.parse(body)
    
    const storedLead = await storeLead(validatedData, {
      userAgent: request.headers.get('user-agent'),
      referer: request.headers.get('referer'),
      ip: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip'),
    })
    
    // Return success response
    return NextResponse.json(
      { 
        message: 'Lead created successfully',
        leadId: storedLead.id,
        destination: storedLead.destination,
        durable: storedLead.durable,
      },
      { status: 200 }
    )
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Return validation errors
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: error.issues 
        },
        { status: 400 }
      )
    }
    
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
