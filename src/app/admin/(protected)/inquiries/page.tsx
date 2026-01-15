'use client';

import { useState, useEffect } from 'react';
import styles from './Inquiries.module.css';
import { FaEnvelope, FaEnvelopeOpen, FaPhone, FaUser, FaCalendarAlt, FaTrash } from 'react-icons/fa';

export default function InquiriesPage() {
    const [inquiries, setInquiries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            const response = await fetch('/api/inquiries');
            const data = await response.json();
            if (data.success) {
                setInquiries(data.inquiries.reverse()); // Show newest first
            } else {
                setError('Failed to fetch inquiries');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('An error occurred while fetching inquiries');
        } finally {
            setLoading(false);
        }
    };

    const toggleRead = async (id: string, currentRead: boolean) => {
        try {
            const response = await fetch(`/api/inquiries/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ read: !currentRead }),
            });
            if (response.ok) {
                setInquiries(inquiries.map(inq => inq.id === id ? { ...inq, read: !currentRead } : inq));
            }
        } catch (err) {
            console.error('Error updating inquiry:', err);
        }
    };

    const deleteInquiry = async (id: string) => {
        if (!confirm('Are you sure you want to delete this inquiry?')) return;

        try {
            const response = await fetch(`/api/inquiries/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setInquiries(inquiries.filter(inq => inq.id !== id));
            }
        } catch (err) {
            console.error('Error deleting inquiry:', err);
        }
    };

    if (loading) return <div className={styles.container}><p>Loading inquiries...</p></div>;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Customer Inquiries</h1>
                <p>Manage messages from your website visitors</p>
            </header>

            {error && <div className={styles.error}>{error}</div>}

            {inquiries.length === 0 ? (
                <div className={styles.noData}>
                    <FaEnvelope size={48} />
                    <p>No inquiries found.</p>
                </div>
            ) : (
                <div className={styles.inquiryList}>
                    {inquiries.map((inq) => (
                        <div key={inq.id} className={`${styles.inquiryCard} ${inq.read ? styles.read : styles.unread}`}>
                            <div className={styles.cardHeader}>
                                <div className={styles.userInfo}>
                                    <span className={styles.name}><FaUser /> {inq.name}</span>
                                    <span className={styles.phone}><FaPhone /> {inq.phone}</span>
                                    <span className={styles.date}><FaCalendarAlt /> {inq.date}</span>
                                </div>
                                <div className={styles.actions}>
                                    <button
                                        onClick={() => toggleRead(inq.id, inq.read)}
                                        title={inq.read ? 'Mark as Unread' : 'Mark as Read'}
                                        className={styles.actionBtn}
                                    >
                                        {inq.read ? <FaEnvelopeOpen /> : <FaEnvelope />}
                                    </button>
                                    <button
                                        onClick={() => deleteInquiry(inq.id)}
                                        title="Delete Inquiry"
                                        className={`${styles.actionBtn} ${styles.deleteBtn}`}
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                            <div className={styles.message}>
                                <p>{inq.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
