import { NextRequest, NextResponse } from 'next/server';
import { getDb, saveDb } from '@/services/db';
import fs from 'fs';
import path from 'path';

export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const formData = await req.formData();

        const title = formData.get('title') as string;
        const price = formData.get('price') as string;
        const description = formData.get('description') as string;
        const capacity = formData.get('capacity') as string;
        const amenities = formData.get('amenities') as string;
        const files = formData.getAll('images') as File[];

        // Validate required fields
        if (!title || !price || !description) {
            return NextResponse.json(
                { success: false, message: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Handle image uploads
        const newImagePaths: string[] = [];
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'rooms');

        // Ensure directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        for (const file of files) {
            if (file && file.size > 0 && typeof file !== 'string') {
                const buffer = Buffer.from(await file.arrayBuffer());
                const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
                const filePath = path.join(uploadDir, filename);

                await fs.promises.writeFile(filePath, buffer);
                newImagePaths.push(`/uploads/rooms/${filename}`);
            }
        }

        // Get current database
        const db = await getDb();

        // Find the room to update
        const roomIndex = db.rooms.findIndex(r => r.id === id);

        if (roomIndex === -1) {
            return NextResponse.json(
                { success: false, message: 'Room not found' },
                { status: 404 }
            );
        }

        // Update the room
        db.rooms[roomIndex] = {
            ...db.rooms[roomIndex],
            title,
            price: Number(price),
            description,
            capacity: Number(capacity),
            amenities: amenities ? amenities.split(',').map((a: string) => a.trim()) : [],
            // If new images were uploaded, replace old ones (or we could merge)
            // For now, let's replace if new ones are provided
            images: newImagePaths.length > 0 ? newImagePaths : db.rooms[roomIndex].images,
        };

        // Save database
        await saveDb(db);

        return NextResponse.json(
            { success: true, message: 'Room updated successfully', room: db.rooms[roomIndex] },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating room:', error);
        return NextResponse.json(
            { success: false, message: 'Server error' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const db = await getDb();

        // Find and remove the room
        const roomIndex = db.rooms.findIndex(r => r.id === id);

        if (roomIndex === -1) {
            return NextResponse.json(
                { success: false, message: 'Room not found' },
                { status: 404 }
            );
        }

        db.rooms.splice(roomIndex, 1);
        await saveDb(db);

        return NextResponse.json(
            { success: true, message: 'Room deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting room:', error);
        return NextResponse.json(
            { success: false, message: 'Server error' },
            { status: 500 }
        );
    }
}
