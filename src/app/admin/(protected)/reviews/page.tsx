'use client';

import { useState, useEffect } from 'react';
import { FaTrash, FaStar } from 'react-icons/fa';
import styles from './page.module.css';

interface Review {
    id: string;
    name: string;
    rating: number;
    text: string;
    date: string;
}

export default function ReviewsAdminPage() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadReviews();
    }, []);

    const loadReviews = async () => {
        try {
            const response = await fetch('/api/reviews');
            const data = await response.json();
            if (data.success) {
                setReviews(data.reviews);
            }
        } catch (error) {
            console.error('Error loading reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete the review by "${name}"?`)) {
            return;
        }

        try {
            const response = await fetch(`/api/reviews/${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (data.success) {
                alert('✅ Review deleted successfully!');
                loadReviews();
            } else {
                alert(`❌ Failed to delete review: ${data.message}`);
            }
        } catch (error) {
            console.error('Error deleting review:', error);
            alert('❌ An error occurred while deleting the review.');
        }
    };

    if (loading) {
        return (
            <div className={styles.container}>
                <p>Loading reviews...</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Review Management</h1>
            </header>

            <div className={styles.tableCard}>
                {reviews.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>No reviews found.</p>
                    </div>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Reviewer</th>
                                <th>Rating</th>
                                <th>Review</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((review) => (
                                <tr key={review.id}>
                                    <td>
                                        <div className={styles.reviewer}>
                                            <div className={styles.avatar}>{review.name.charAt(0)}</div>
                                            <span>{review.name}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.stars}>
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar key={i} color={i < review.rating ? '#FFD700' : '#E0E0E0'} size={14} />
                                            ))}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.reviewText} title={review.text}>
                                            "{review.text}"
                                        </div>
                                    </td>
                                    <td>{review.date}</td>
                                    <td>
                                        <div className={styles.actions}>
                                            <button
                                                className={`${styles.actionBtn} ${styles.deleteBtn}`}
                                                onClick={() => handleDelete(review.id, review.name)}
                                                title="Delete Review"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
