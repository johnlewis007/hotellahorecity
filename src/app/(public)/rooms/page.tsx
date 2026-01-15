import Link from 'next/link';
import { getDb } from '@/services/db';
import styles from './page.module.css';

export const metadata = {
    title: 'Rooms & Pricing | Hotel Lahore City',
    description: 'Check out our affordable room rates and book your stay.',
};

// This is a Server Component
export default async function RoomsPage() {
    const db = await getDb();
    const { rooms } = db;

    return (
        <main>
            <section className={styles.pageHeader}>
                <div className="container">
                    <h1>Rooms & Pricing</h1>
                    <p>Choose the Best Room for Your Stay</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className={styles.grid}>
                        {rooms.map((room) => (
                            <div key={room.id} className={styles.card}>
                                <div className={styles.imageWrapper}>
                                    <img
                                        src={room.images && room.images.length > 0
                                            ? room.images[0]
                                            : 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80'
                                        }
                                        alt={room.title}
                                        className={styles.roomImage}
                                    />
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.header}>
                                        <h2>{room.title}</h2>
                                        <div className={styles.price}>
                                            PKR {room.price} <span>/ night</span>
                                        </div>
                                    </div>
                                    <p className={styles.description}>{room.description}</p>

                                    <div className={styles.amenities}>
                                        <h3>Room Amenities:</h3>
                                        <ul>
                                            {room.amenities.map((item, index) => (
                                                <li key={index}>• {item}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className={styles.actions}>
                                        <Link href="/contact" className="btn btn-primary">Book Now</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
