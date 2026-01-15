import { getDb, saveDb } from '@/services/db';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const db = await getDb();

        const reviewIndex = db.reviews.findIndex(r => r.id === id);

        if (reviewIndex === -1) {
            return NextResponse.json(
                { success: false, message: 'Review not found' },
                { status: 404 }
            );
        }

        db.reviews.splice(reviewIndex, 1);
        await saveDb(db);

        return NextResponse.json(
            { success: true, message: 'Review deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting review:', error);
        return NextResponse.json(
            { success: false, message: 'Server error' },
            { status: 500 }
        );
    }
}
