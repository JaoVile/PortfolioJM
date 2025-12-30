import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    ip: '127.0.0.1', 
    city: 'Lajedo',
    region: 'PE',
    country: 'BR'
  });
}