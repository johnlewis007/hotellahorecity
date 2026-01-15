import { getDb, saveDb } from '@/services/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, phone, message } = body;

        // Validate required fields
        if (!name || !phone || !message) {
            return NextResponse.json(
                { success: false, message: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Get current database
        const db = await getDb();

        // Create new inquiry
        const newInquiry = {
            id: String(Date.now()),
            name,
            phone,
            message,
            date: new Date().toISOString().split('T')[0],
            read: false
        };

        // Add to database
        if (!db.inquiries) {
            db.inquiries = [];
        }
        db.inquiries.push(newInquiry);

        // Save database
        await saveDb(db);

        return NextResponse.json(
            { success: true, message: 'Message sent successfully', inquiry: newInquiry },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error adding inquiry:', error);
        return NextResponse.json(
            { success: false, message: 'Server error' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const db = await getDb();
        return NextResponse.json({ success: true, inquiries: db.inquiries || [] });
    } catch (error) {
        console.error('Error fetching inquiries:', error);
        return NextResponse.json(
            { success: false, message: 'Server error' },
            { status: 500 }
        );
    }
}
