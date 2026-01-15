'use client';

import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import styles from './Reviews.module.css';

interface Review {
    id: string | number;
    name: string;
    rating: number;
    text: string;
    date: string;
}

export default function Reviews() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        rating: 5,
        text: ''
    });

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const res = await fetch('/api/reviews');
            const data = await res.json();
            if (data.success) {
                setReviews(data.reviews);
            }
        } catch (err) {
            console.error('Error fetching reviews:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success) {
                setFormData({ name: '', rating: 5, text: '' });
                fetchReviews();
                alert('Thank you for your review!');
            }
        } catch (err) {
            console.error('Error submitting review:', err);
            alert('Failed to submit review. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className={styles.section}>
            <div className="container">
                <div className="section-title">
                    <h2>Guest Reviews</h2>
                    <p>What our guests say about their stay at Hotel Lahore City.</p>
                </div>

                <div className={styles.grid}>
                    {loading ? (
                        <p>Loading reviews...</p>
                    ) : (
                        reviews.map((review) => (
                            <div key={review.id} className={styles.card}>
                                <div className={styles.header}>
                                    <div className={styles.avatar}>{review.name.charAt(0)}</div>
                                    <div>
                                        <h4>{review.name}</h4>
                                        <div className={styles.stars}>
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar key={i} color={i < review.rating ? '#FFD700' : '#E0E0E0'} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className={styles.text}>"{review.text}"</p>
                                <span className={styles.date}>{review.date}</span>
                            </div>
                        ))
                    )}
                </div>

                <div className={styles.formSection}>
                    <h3>Write a Review</h3>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label>Your Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                placeholder="Enter your name"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Rating</label>
                            <div className={styles.starSelector}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <FaStar
                                        key={star}
                                        className={styles.starIcon}
                                        color={star <= formData.rating ? '#FFD700' : '#E0E0E0'}
                                        onClick={() => setFormData({ ...formData, rating: star })}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Your Review</label>
                            <textarea
                                value={formData.text}
                                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                                required
                                placeholder="Share your experience..."
                                rows={4}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={submitting}>
                            {submitting ? 'Submitting...' : 'Submit Review'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
