import { NextRequest, NextResponse } from 'next/server';
import { getDb, saveDb } from '@/services/db';
import fs from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'gallery');

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export async function GET() {
    try {
        const db = await getDb();
        return NextResponse.json({ success: true, gallery: db.gallery || [] });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const files = formData.getAll('images') as File[];

        if (!files || files.length === 0) {
            return NextResponse.json({ success: false, message: 'No images provided' }, { status: 400 });
        }

        const db = await getDb();
        if (!db.gallery) db.gallery = [];

        const newPaths: string[] = [];

        for (const file of files) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
            const filePath = path.join(UPLOAD_DIR, fileName);
            const relativePath = `/uploads/gallery/${fileName}`;

            await fs.promises.writeFile(filePath, buffer);
            newPaths.push(relativePath);
        }

        db.gallery.push(...newPaths);
        await saveDb(db);

        return NextResponse.json({ success: true, images: newPaths });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ success: false, message: 'Upload failed' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { imagePath } = await req.json();
        const db = await getDb();

        const index = db.gallery.indexOf(imagePath);
        if (index === -1) {
            return NextResponse.json({ success: false, message: 'Image not found in database' }, { status: 404 });
        }

        // Remove from database
        db.gallery.splice(index, 1);
        await saveDb(db);

        // Try to delete the file from filesystem
        try {
            const fullPath = path.join(process.cwd(), 'public', imagePath);
            if (fs.existsSync(fullPath)) {
                await fs.promises.unlink(fullPath);
            }
        } catch (err) {
            console.error('File delete error:', err);
            // We still return success since it's removed from DB
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Delete failed' }, { status: 500 });
    }
}
