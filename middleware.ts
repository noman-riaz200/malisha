// ============================================================
// middleware.ts  (root level)
// ============================================================
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_STUDENT = /^\/dashboard/;
const PROTECTED_ADMIN   = /^\/admin/;
const AUTH_PAGES        = /^\/(login|register|forgot-password)/;

// Simple middleware without database dependencies
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Add pathname as a header for server components to access
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);
  
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/).*)',
  ],
};
