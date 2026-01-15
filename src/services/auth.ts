import { serialize, parse } from 'cookie';
import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'admin_session';
const MAX_AGE = 60 * 60 * 24; // 1 day

export async function login(password: string) {
    const adminPass = process.env.ADMIN_PASSWORD || 'admin123';
    if (password === adminPass) {
        const cookie = serialize(COOKIE_NAME, 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: MAX_AGE,
            path: '/',
        });
        return cookie;
    }
    return null;
}

export async function logout() {
    const cookie = serialize(COOKIE_NAME, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: -1,
        path: '/',
    });
    return cookie;
}

export function isAuthenticated(req: NextRequest) {
    const cookieHeader = req.headers.get('cookie');
    const cookies = parse(cookieHeader || '');
    return cookies[COOKIE_NAME] === 'true';
}
