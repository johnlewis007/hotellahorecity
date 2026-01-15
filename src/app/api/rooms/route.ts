import { getDb, saveDb } from '@/services/db';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
    try {
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
        const imagePaths: string[] = [];
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'rooms');

        // Ensure directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        for (const file of files) {
            if (file && file.size > 0) {
                const buffer = Buffer.from(await file.arrayBuffer());
                const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
                const filePath = path.join(uploadDir, filename);

                await fs.promises.writeFile(filePath, buffer);
                imagePaths.push(`/uploads/rooms/${filename}`);
            }
        }

        // Get current database
        const db = await getDb();

        // Create new room
        const newRoom = {
            id: String(Date.now()),
            title,
            price: Number(price),
            description,
            capacity: Number(capacity),
            amenities: amenities ? amenities.split(',').map((a: string) => a.trim()) : [],
            images: imagePaths,
            isFeatured: false,
        };

        // Add to database
        db.rooms.push(newRoom);

        // Save database
        await saveDb(db);

        return NextResponse.json(
            { success: true, message: 'Room added successfully', room: newRoom },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error adding room:', error);
        return NextResponse.json(
            { success: false, message: 'Server error' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const db = await getDb();
        return NextResponse.json({ success: true, rooms: db.rooms });
    } catch (error) {
        console.error('Error fetching rooms:', error);
        return NextResponse.json(
            { success: false, message: 'Server error' },
            { status: 500 }
        );
    }
}
