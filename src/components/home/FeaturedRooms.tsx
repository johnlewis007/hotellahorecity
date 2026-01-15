import Link from 'next/link';
import { getDb } from '@/services/db';
import styles from './FeaturedRooms.module.css';

export default async function FeaturedRooms() {
    const db = await getDb();
    // Get first 2 rooms or featured rooms
    const rooms = db.rooms.filter(room => room.isFeatured).slice(0, 2);
    const displayRooms = rooms.length > 0 ? rooms : db.rooms.slice(0, 2);

    return (
        <section className={styles.section}>
            <div className="container">
                <div className="section-title">
                    <h2>Featured Rooms</h2>
                    <p>Choose the perfect room for your stay. Clean, comfortable, and affordable.</p>
                </div>

                <div className={styles.grid}>
                    {displayRooms.map((room) => (
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
                                <h3>{room.title}</h3>
                                <div className={styles.price}>PKR {room.price} <span>/ Night</span></div>
                                <ul className={styles.features}>
                                    {room.amenities.slice(0, 3).map((amenity, idx) => (
                                        <li key={idx}>• {amenity}</li>
                                    ))}
                                </ul>
                                <Link href="/rooms" className="btn btn-primary">Check Availability</Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.viewAll}>
                    <Link href="/rooms" className="btn btn-outline" style={{ borderColor: 'var(--secondary-color)', color: 'var(--secondary-color)' }}>View All Rooms</Link>
                </div>
            </div>
        </section>
    );
}
