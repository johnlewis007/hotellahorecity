import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const isAdminPath = request.nextUrl.pathname.startsWith('/admin');
    const isLoginPath = request.nextUrl.pathname === '/admin/login';
    const hasSession = request.cookies.has('admin_session');

    // Protect Admin Routes
    if (isAdminPath && !isLoginPath) {
        if (!hasSession) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    // Redirect to dashboard if already logged in
    if (isLoginPath && hasSession) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
