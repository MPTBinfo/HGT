import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/session';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const session = await verifySessionToken(request.cookies.get('hgt_session')?.value, process.env.HGT_SESSION_SECRET);
  if (!session) return NextResponse.redirect(new URL('/login', request.url));

  const requiredRole = pathname.startsWith('/admin')
    ? 'cms'
    : pathname.startsWith('/mptb-dashboard')
      ? 'mptb_nodal'
      : pathname.startsWith('/sports-dashboard')
        ? 'sports_nodal'
        : pathname.startsWith('/participant-dashboard')
          ? 'participant'
          : null;

  if (requiredRole && session.role !== requiredRole && session.role !== 'cms') {
    return NextResponse.redirect(new URL('/login?reason=role', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/mptb-dashboard/:path*', '/sports-dashboard/:path*', '/participant-dashboard/:path*'],
};
