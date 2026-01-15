'use client';

import styles from './page.module.css';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function RoomsAdminPage() {
    const router = useRouter();
    const [rooms, setRooms] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadRooms();
    }, []);

    const loadRooms = async () => {
        try {
            const response = await fetch('/api/rooms');
            const data = await response.json();
            if (data.success) {
                setRooms(data.rooms);
            }
        } catch (error) {
            console.error('Error loading rooms:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Are you sure you want to delete "${title}"?`)) {
            return;
        }

        try {
            const response = await fetch(`/api/rooms/${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (response.ok) {
                alert(`✅ Room "${title}" deleted successfully!`);
                loadRooms(); // Reload the list
            } else {
                alert(`❌ Failed to delete room: ${data.message}`);
            }
        } catch (error) {
            console.error('Error deleting room:', error);
            alert('❌ An error occurred while deleting the room.');
        }
    };

    if (loading) {
        return (
            <div className={styles.container}>
                <p>Loading rooms...</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Room Management</h1>
                <Link href="/admin/rooms/add" className="btn btn-primary">
                    <FaPlus style={{ marginRight: '8px' }} /> Add New Room
                </Link>
            </header>

            <div className={styles.tableCard}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Room Name</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map((room) => (
                            <tr key={room.id}>
                                <td>
                                    <div className={styles.imgPlaceholder}>Img</div>
                                </td>
                                <td>
                                    <div className={styles.roomName}>{room.title}</div>
                                    <div className={styles.roomDesc}>{room.description.substring(0, 50)}...</div>
                                </td>
                                <td>PKR {room.price}</td>
                                <td>
                                    <div className={styles.actions}>
                                        <Link href={`/admin/rooms/edit/${room.id}`} className={styles.actionBtn} title="Edit Room">
                                            <FaEdit />
                                        </Link>
                                        <button
                                            className={`${styles.actionBtn} ${styles.deleteBtn}`}
                                            onClick={() => handleDelete(room.id, room.title)}
                                            title="Delete Room"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
