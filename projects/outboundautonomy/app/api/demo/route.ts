import { NextRequest, NextResponse } from 'next/server';
import { demoSessionStore } from '@/lib/demo/session-store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.businessName || !body.phoneNumber) {
      return NextResponse.json({ error: 'businessName and phoneNumber are required' }, { status: 400 });
    }
    const session = demoSessionStore.createSession(body.businessName, body.phoneNumber);
    return NextResponse.json({
      sessionId: session.id,
      message: `Demo session created for ${body.businessName}.`
    });
  } catch (error) {
    console.error('Error creating demo session:', error);
    return NextResponse.json({ error: 'Failed to create demo session' }, { status: 500 });
  }
}
