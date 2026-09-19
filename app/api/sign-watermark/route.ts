import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { payload } = await req.json();
    if (!payload || typeof payload !== 'string') {
      return NextResponse.json({ error: 'Valid payload string required' }, { status: 400 });
    }

    const secretKey = process.env.HMAC_SECRET;
    if (!secretKey) {
      return NextResponse.json({ error: 'Server key unconfigured' }, { status: 500 });
    }

    const signature = crypto
      .createHmac('sha256', secretKey)
      .update(payload)
      .digest('hex');

    return NextResponse.json({
      success: true,
      signature,
      signer: 'agogo',
    });
  } catch {
    return NextResponse.json({ error: 'Internal signing error' }, { status: 500 });
  }
}