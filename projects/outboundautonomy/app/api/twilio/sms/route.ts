import { NextResponse } from 'next/server';

const DISABLED_TWIML = '<?xml version="1.0" encoding="UTF-8"?><Response></Response>';

export async function POST() {
  return new NextResponse(DISABLED_TWIML, {
    status: 410,
    headers: { 'Content-Type': 'text/xml', 'Cache-Control': 'no-store' },
  });
}
