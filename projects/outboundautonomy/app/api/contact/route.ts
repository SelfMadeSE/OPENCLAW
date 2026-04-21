import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createLead } from '@/lib/db'
import { contactFormSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = contactFormSchema.parse(body)
    
    // Create the lead in the database
    const leadId = createLead(validatedData)
    
    if (!leadId) {
      return NextResponse.json(
        { error: 'Failed to create lead' },
        { status: 500 }
      )
    }
    
    // Return success response
    return NextResponse.json(
      { 
        message: 'Lead created successfully',
        leadId 
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