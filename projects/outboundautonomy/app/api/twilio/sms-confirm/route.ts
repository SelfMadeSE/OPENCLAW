import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    {
      error: 'This endpoint has been retired as part of the public non-telephony pivot.',
      telephonyEnabled: false,
    },
    { status: 410, headers: { 'Cache-Control': 'no-store' } }
  );
}
