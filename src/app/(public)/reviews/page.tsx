import { getDb } from '@/services/db';
import { FaStar } from 'react-icons/fa';
import styles from './page.module.css';

export const metadata = {
    title: 'Guest Reviews | Hotel Lahore City',
    description: 'See what our guests have to say about their stay.',
};

export default async function ReviewsPage() {
    const db = await getDb();
    const { reviews } = db;

    return (
        <main>
            <section className={styles.pageHeader}>
                <div className="container">
                    <h1>Guest Reviews</h1>
                    <p>Rated 3.9/5 on Google</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className={styles.grid}>
                        {reviews.map((review) => (
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
                                <p className={styles.text}>{review.text}</p>
                                <div className={styles.footer}>
                                    <span className={styles.date}>{review.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
