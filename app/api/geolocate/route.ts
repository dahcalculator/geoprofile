import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

interface GeoDataResponse {
  ip: string;
  city: string;
  country: string;
  countryCode: string;
  isp: string;
  asn: string;
}

// Fallback regional centroid if lookup fails or in local development loopback
const DEFAULT_GEO: GeoDataResponse = {
  ip: '102.89.23.11',
  city: 'Abuja',
  country: 'Nigeria',
  countryCode: 'NG',
  isp: 'MTN Nigeria Communications',
  asn: 'AS29465',
};

/**
 * Checks whether an IP belongs to private/loopback/bogon ranges
 */
function isPrivateIp(ip: string): boolean {
  if (!ip) return true;
  return (
    ip === '127.0.0.1' ||
    ip === '::1' ||
    ip.startsWith('192.168.') ||
    ip.startsWith('10.') ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(ip) ||
    ip.startsWith('fc00:') ||
    ip.startsWith('fe80:')
  );
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const targetIpParam = searchParams.get('ip');

    // 1. Determine target IP: Query Param > Cloudflare > X-Forwarded-For > Remote Socket
    let resolvedIp = targetIpParam;

    if (!resolvedIp) {
      const forwarded = req.headers.get('x-forwarded-for');
      const cfIp = req.headers.get('cf-connecting-ip');
      const realIp = req.headers.get('x-real-ip');

      if (cfIp) {
        resolvedIp = cfIp.trim();
      } else if (forwarded) {
        // x-forwarded-for can contain multiple comma-separated IPs; client is the first
        resolvedIp = forwarded.split(',')[0].trim();
      } else if (realIp) {
        resolvedIp = realIp.trim();
      }
    }

    // 2. If running locally or private IP detected, use a valid default public IP
    if (!resolvedIp || isPrivateIp(resolvedIp)) {
      resolvedIp = DEFAULT_GEO.ip;
    }

    // 3. Primary Upstream Query: ipapi.co
    try {
      const response = await fetch(`https://ipapi.co/${resolvedIp}/json/`, {
        headers: { 'User-Agent': 'GeoPersona-DemographicEngine/2.0' },
        next: { revalidate: 3600 }, // Cache resolution for 1 hour
      });

      if (response.ok) {
        const data = await response.json();
        if (!data.error) {
          const geoPayload: GeoDataResponse = {
            ip: data.ip || resolvedIp,
            city: data.city || 'Regional Center',
            country: data.country_name || 'Active Region',
            countryCode: data.country_code || 'US',
            isp: data.org || data.asn || 'National Access Provider',
            asn: data.asn || 'AS-UNKNOWN',
          };
          return NextResponse.json({ success: true, ...geoPayload });
        }
      }
    } catch {
      // Primary failed; proceed to fallback
    }

    // 4. Secondary Fallback Upstream Query: ip-api.com
    try {
      const fallbackRes = await fetch(
        `http://ip-api.com/json/${resolvedIp}?fields=status,message,country,countryCode,city,isp,as,query`,
        { next: { revalidate: 3600 } }
      );

      if (fallbackRes.ok) {
        const fbData = await fallbackRes.json();
        if (fbData.status === 'success') {
          const asnTag = fbData.as ? fbData.as.split(' ')[0] : 'AS-UNKNOWN';
          const geoPayload: GeoDataResponse = {
            ip: fbData.query || resolvedIp,
            city: fbData.city || 'Regional Center',
            country: fbData.country || 'Active Region',
            countryCode: fbData.countryCode || 'US',
            isp: fbData.isp || 'National Telecom',
            asn: asnTag,
          };
          return NextResponse.json({ success: true, ...geoPayload });
        }
      }
    } catch {
      // Secondary failed; fall through to default
    }

    // 5. Final Graceful Fallback
    return NextResponse.json({
      success: true,
      ...DEFAULT_GEO,
      ip: resolvedIp,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to resolve network telemetry', ...DEFAULT_GEO },
      { status: 500 }
    );
  }
}