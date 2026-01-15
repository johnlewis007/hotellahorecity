'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';
import { FaTrash, FaUpload, FaSpinner } from 'react-icons/fa';

export default function GalleryAdminPage() {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await fetch('/api/gallery');
            const data = await response.json();
            if (data.success) {
                setImages(data.gallery);
            }
        } catch (error) {
            console.error('Error fetching gallery:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        const formData = new FormData();
        Array.from(files).forEach(file => {
            formData.append('images', file);
        });

        try {
            const response = await fetch('/api/gallery', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (data.success) {
                setImages([...images, ...data.images]);
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Failed to upload image');
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleDelete = async (imagePath: string) => {
        if (!confirm('Are you sure you want to delete this image?')) return;

        try {
            const response = await fetch('/api/gallery', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imagePath }),
            });
            if (response.ok) {
                setImages(images.filter(img => img !== imagePath));
            }
        } catch (error) {
            console.error('Delete failed:', error);
            alert('Failed to delete image');
        }
    };

    if (loading) return <div className={styles.container}><p>Loading gallery...</p></div>;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Gallery Management</h1>
                <div className={styles.actions}>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        accept="image/*"
                        multiple
                    />
                    <button
                        className="btn btn-primary"
                        onClick={handleUploadClick}
                        disabled={uploading}
                    >
                        {uploading ? <FaSpinner className="spin" /> : <FaUpload />}
                        <span style={{ marginLeft: '8px' }}>
                            {uploading ? 'Uploading...' : 'Upload New Image'}
                        </span>
                    </button>
                </div>
            </header>

            <div className={styles.grid}>
                {images.length === 0 ? (
                    <p className={styles.empty}>No images in gallery yet.</p>
                ) : (
                    images.map((src, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <img src={src} alt={`Gallery ${index}`} className={styles.image} />
                            </div>
                            <button
                                className={styles.deleteBtn}
                                onClick={() => handleDelete(src)}
                                title="Delete Image"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

