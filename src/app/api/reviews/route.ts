import { getDb, saveDb } from '@/services/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        const db = await getDb();
        return NextResponse.json({ success: true, reviews: db.reviews });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return NextResponse.json(
            { success: false, message: 'Server error' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const { name, rating, text } = await req.json();

        if (!name || !rating || !text) {
            return NextResponse.json(
                { success: false, message: 'Missing required fields' },
                { status: 400 }
            );
        }

        const db = await getDb();

        const newReview = {
            id: String(Date.now()),
            name,
            rating: Number(rating),
            text,
            date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        };

        db.reviews.unshift(newReview); // Add to the beginning of the list
        await saveDb(db);

        return NextResponse.json(
            { success: true, message: 'Review added successfully', review: newReview },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error adding review:', error);
        return NextResponse.json(
            { success: false, message: 'Server error' },
            { status: 500 }
        );
    }
}
