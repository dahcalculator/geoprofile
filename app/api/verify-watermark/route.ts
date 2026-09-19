import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { rawEnvelope } = await req.json();
    if (!rawEnvelope || typeof rawEnvelope !== 'string') {
      return NextResponse.json({ valid: false, error: 'Empty envelope' }, { status: 400 });
    }

    const hmacMarker = '::HMAC:';
    const idx = rawEnvelope.lastIndexOf(hmacMarker);
    if (idx === -1) {
      return NextResponse.json({ valid: false, error: 'Signature tag missing' }, { status: 400 });
    }

    const dataPayload = rawEnvelope.substring(0, idx);
    const providedHmac = rawEnvelope.substring(idx + hmacMarker.length);

    const secretKey = process.env.HMAC_SECRET;
    if (!secretKey) {
      return NextResponse.json({ valid: false, error: 'Server key unconfigured' }, { status: 500 });
    }

    const computedHmac = crypto
      .createHmac('sha256', secretKey)
      .update(dataPayload)
      .digest('hex');

    const isValid = crypto.timingSafeEqual(
      Buffer.from(computedHmac, 'hex'),
      Buffer.from(providedHmac, 'hex')
    );

    return NextResponse.json({
      valid: isValid,
      signer: isValid ? 'agogo' : null,
      payload: dataPayload,
      signature: providedHmac,
    });
  } catch {
    return NextResponse.json({ valid: false, error: 'Verification error' }, { status: 500 });
  }
}