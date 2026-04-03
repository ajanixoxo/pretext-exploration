import { AccessToken } from 'livekit-server-sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const room = req.nextUrl.searchParams.get('room');
  const identity = req.nextUrl.searchParams.get('identity');

  if (!room || !identity) {
    return NextResponse.json(
      { error: 'Missing room or identity query parameter' },
      { status: 400 }
    );
  }

  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const wsUrl = process.env.LIVEKIT_URL;

  // Mock implementation for development without credentials
  if (!apiKey || !apiSecret || !wsUrl) {
    console.warn('LIVEKIT_API_KEY, LIVEKIT_API_SECRET, or LIVEKIT_URL is not set. Using mock token.');
    return NextResponse.json({ 
      token: 'mock_token_' + identity,
      url: 'ws://localhost:1234',
      isMock: true
    });
  }

  try {
    const at = new AccessToken(apiKey, apiSecret, {
      identity,
    });
    at.addGrant({ roomJoin: true, room });

    return NextResponse.json({ 
      token: await at.toJwt(),
      url: wsUrl
    });
  } catch (error) {
    console.error('Error generating LiveKit token:', error);
    return NextResponse.json(
      { error: 'Failed to generate token' },
      { status: 500 }
    );
  }
}
