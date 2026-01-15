'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styles from '../../add/page.module.css';

export default function EditRoomPage() {
    const router = useRouter();
    const params = useParams();
    const roomId = params.id as string;

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        capacity: '1',
        amenities: '',
    });
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingRoom, setLoadingRoom] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadRoom();
    }, [roomId]);

    const loadRoom = async () => {
        try {
            const response = await fetch('/api/rooms');
            const data = await response.json();

            if (data.success) {
                const room = data.rooms.find((r: any) => r.id === roomId);
                if (room) {
                    setFormData({
                        title: room.title,
                        price: String(room.price),
                        description: room.description,
                        capacity: String(room.capacity || 1),
                        amenities: room.amenities?.join(', ') || '',
                    });
                    // Set existing images as previews if any
                    if (room.images && room.images.length > 0) {
                        setPreviewUrls(room.images);
                    }
                } else {
                    setError('Room not found');
                }
            }
        } catch (err) {
            console.error('Error loading room:', err);
            setError('Failed to load room');
        } finally {
            setLoadingRoom(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('capacity', formData.capacity);
            formDataToSend.append('amenities', formData.amenities);

            selectedFiles.forEach((file) => {
                formDataToSend.append('images', file);
            });

            // Use PUT method to update the existing room
            const response = await fetch(`/api/rooms/${roomId}`, {
                method: 'PUT',
                body: formDataToSend,
            });

            const data = await response.json();

            if (response.ok) {
                alert(`✅ Room "${formData.title}" updated successfully!\n\nRedirecting to rooms list...`);
                router.push('/admin/rooms');
            } else {
                setError(data.message || 'Failed to update room');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setSelectedFiles(prev => [...prev, ...files]);

        const newPreviewUrls = files.map(file => URL.createObjectURL(file));
        setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    };

    const removeImage = (index: number) => {
        // Only allow removing newly selected files for now
        // This is a simplified version; in a real app you'd handle removing existing images too
        const fileIndex = index - (previewUrls.length - selectedFiles.length);
        if (fileIndex >= 0) {
            setSelectedFiles(prev => prev.filter((_, i) => i !== fileIndex));
        }

        setPreviewUrls(prev => {
            if (prev[index].startsWith('blob:')) {
                URL.revokeObjectURL(prev[index]);
            }
            return prev.filter((_, i) => i !== index);
        });
    };

    if (loadingRoom) {
        return (
            <div className={styles.container}>
                <p>Loading room...</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Edit Room</h1>
            </header>

            {error && (
                <div style={{
                    backgroundColor: '#ffebee',
                    color: '#c62828',
                    padding: '12px 20px',
                    borderRadius: '4px',
                    marginBottom: '20px',
                    border: '1px solid #ffcdd2'
                }}>
                    {error}
                </div>
            )}

            <div className={styles.card}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="title">Room Title *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g., Deluxe Double Room"
                            required
                        />
                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="price">Price per Night (PKR) *</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="e.g., 5000"
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="capacity">Capacity *</label>
                            <select
                                id="capacity"
                                name="capacity"
                                value={formData.capacity}
                                onChange={handleChange}
                                required
                            >
                                <option value="1">1 Person</option>
                                <option value="2">2 Persons</option>
                                <option value="3">3 Persons</option>
                                <option value="4">4 Persons</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="description">Description *</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Describe the room features..."
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="amenities">Amenities (comma-separated)</label>
                        <input
                            type="text"
                            id="amenities"
                            name="amenities"
                            value={formData.amenities}
                            onChange={handleChange}
                            placeholder="e.g., Free Wi-Fi, AC, TV, Breakfast"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Room Images</label>
                        <div className={styles.uploadArea}>
                            <input
                                type="file"
                                id="fileInput"
                                accept="image/*"
                                multiple
                                onChange={handleFileSelect}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="fileInput" className="btn btn-secondary" style={{ cursor: 'pointer', display: 'inline-block' }}>
                                Upload Images
                            </label>
                            <p style={{ marginTop: '10px', fontSize: '0.9rem', marginBottom: 0 }}>
                                {selectedFiles.length > 0
                                    ? `${selectedFiles.length} new image(s) selected`
                                    : 'Click to select additional images'}
                            </p>
                        </div>

                        {previewUrls.length > 0 && (
                            <div className={styles.previewGrid}>
                                {previewUrls.map((url, index) => (
                                    <div key={index} className={styles.previewItem}>
                                        <img src={url} alt={`Preview ${index + 1}`} />
                                        <button
                                            type="button"
                                            className={styles.removeBtn}
                                            onClick={() => removeImage(index)}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className={styles.actions}>
                        <button type="button" className="btn btn-secondary" onClick={() => router.push('/admin/rooms')} disabled={loading}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Updating Room...' : 'Update Room'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
