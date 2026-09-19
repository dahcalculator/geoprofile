import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path.startsWith('/covert-audit')) {
    const authCookie = request.cookies.get('covert_session_auth')?.value;
    const authQuery = request.nextUrl.searchParams.get('key');

    // Authorize either via verified session cookie or URL trigger key
    const isAuthorized = authCookie === 'agogo' || authQuery === 'agogo';

    if (!isAuthorized) {
      const redirectUrl = new URL('/', request.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/covert-audit/:path*'],
};