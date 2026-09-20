import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_COUNTRIES = ['NG', 'US', 'UK', 'GB', 'AU'] as const;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const requestedIp = searchParams.get('ip');

  // 1. Resolve real client IP behind reverse proxy (Vercel / Cloudflare)
  const forwardedFor = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  let targetIp = requestedIp || (forwardedFor ? forwardedFor.split(',')[0].trim() : realIp) || '102.89.23.11';

  // Handle localhost/private development loopback
  if (targetIp === '::1' || targetIp === '127.0.0.1' || targetIp.startsWith('192.168.')) {
    targetIp = '102.89.23.11'; // Default live test target (Abuja, NG)
  }

  try {
    const geoRes = await fetch(`https://ipapi.co/${targetIp}/json/`, {
      headers: { 'User-Agent': 'GeoPersona-Engine/2.0' },
      next: { revalidate: 3600 }, // Cache IP lookup for 1 hour
    });
    const data = await geoRes.json();

    let countryCode = (data.country_code || 'NG').toUpperCase();
    if (countryCode === 'GB') countryCode = 'UK';

    // Strict 4-Country Enforcement
    const isSupported = ['NG', 'US', 'UK', 'AU'].includes(countryCode);
    if (!isSupported) {
      return NextResponse.json({
        success: true,
        supported: false,
        ip: targetIp,
        message: `Country ${countryCode} is outside the 4-country scope. Defaulted to Nigeria.`,
        city: 'Abuja',
        country: 'Nigeria',
        countryCode: 'NG',
        isp: 'MTN Nigeria Communications',
        asn: 'AS29465',
      });
    }

    return NextResponse.json({
      success: true,
      supported: true,
      ip: targetIp,
      city: data.city || 'Abuja',
      country: data.country_name || 'Nigeria',
      countryCode,
      isp: data.org || 'MTN Nigeria',
      asn: data.asn || 'AS29465',
    });
  } catch {
    return NextResponse.json({
      success: true,
      supported: true,
      ip: targetIp,
      city: 'Abuja',
      country: 'Nigeria',
      countryCode: 'NG',
      isp: 'MTN Nigeria Communications',
      asn: 'AS29465',
    });
  }
}