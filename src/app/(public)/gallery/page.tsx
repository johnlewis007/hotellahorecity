import { getDb } from '@/services/db';
import styles from './page.module.css';

export const metadata = {
    title: 'Gallery | Hotel Lahore City',
    description: 'View photos of our rooms, lobby, and exterior.',
};

export default async function GalleryPage() {
    const db = await getDb();
    const images = db.gallery || [];

    return (
        <main>
            <section className={styles.pageHeader}>
                <div className="container">
                    <h1>Photo Gallery</h1>
                    <p>Take a tour of Hotel Lahore City</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {images.length === 0 ? (
                        <p className={styles.empty}>Gallery is being updated. Please check back later.</p>
                    ) : (
                        <div className={styles.grid}>
                            {images.map((src, index) => (
                                <div key={index} className={styles.item}>
                                    <img src={src} alt="Hotel Lahore City Gallery" className={styles.image} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
