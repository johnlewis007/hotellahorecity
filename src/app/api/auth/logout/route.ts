import { logout } from '@/services/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const cookie = await logout();
    return new NextResponse(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Set-Cookie': cookie },
    });
}
