import { NextRequest, NextResponse } from 'next/server';
import { getDb, saveDb } from '@/services/db';

export async function PATCH(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const { read } = await req.json();
        const db = await getDb();

        const index = db.inquiries.findIndex(inq => inq.id === id);
        if (index === -1) {
            return NextResponse.json({ success: false, message: 'Inquiry not found' }, { status: 404 });
        }

        db.inquiries[index].read = read;
        await saveDb(db);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const db = await getDb();

        const index = db.inquiries.findIndex(inq => inq.id === id);
        if (index === -1) {
            return NextResponse.json({ success: false, message: 'Inquiry not found' }, { status: 404 });
        }

        db.inquiries.splice(index, 1);
        await saveDb(db);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
