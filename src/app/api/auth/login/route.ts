import { login } from '@/services/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password } = body;

        // Simple check (email intentionally ignored for single admin demo)
        if (email === 'admin@hotel.com' && password === 'admin123') {
            const cookie = await login(password);
            if (cookie) {
                return new NextResponse(JSON.stringify({ success: true }), {
                    status: 200,
                    headers: { 'Set-Cookie': cookie },
                });
            }
        }

        return new NextResponse(JSON.stringify({ success: false, message: 'Invalid credentials' }), {
            status: 401,
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ success: false, message: 'Server error' }), {
            status: 500,
        });
    }
}
