import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createWaitlistEntry } from '@/lib/db'
import { waitlistSchema } from '@/lib/validations'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = waitlistSchema.parse(body)
    
    // Create the waitlist entry in the database
    const entryId = createWaitlistEntry(validatedData)
    
    if (entryId === null) {
      // Email already exists
      return NextResponse.json(
        { 
          error: 'Email already exists on waitlist' 
        },
        { status: 409 }
      )
    }
    
    if (!entryId) {
      return NextResponse.json(
        { error: 'Failed to create waitlist entry' },
        { status: 500 }
      )
    }
    
    // Return success response
    return NextResponse.json(
      { 
        message: 'Waitlist entry created successfully',
        entryId 
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
    
    console.error('Waitlist API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}