import { getDb } from '@/services/db';
import styles from './Dashboard.module.css';
import { FaBed, FaUser, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';

export default async function Dashboard() {
    const db = await getDb();
    const { rooms, reviews, inquiries } = db;

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1>Dashboard</h1>
                <p>Welcome back, Admin</p>
            </header>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.iconWrapper} style={{ backgroundColor: '#e3f2fd', color: '#1976d2' }}>
                        <FaBed />
                    </div>
                    <div>
                        <h3>Total Rooms</h3>
                        <p className={styles.statValue}>{rooms.length}</p>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.iconWrapper} style={{ backgroundColor: '#e8f5e9', color: '#388e3c' }}>
                        <FaUser />
                    </div>
                    <div>
                        <h3>Total Reviews</h3>
                        <p className={styles.statValue}>{reviews.length}</p>
                    </div>
                </div>

                <Link href="/admin/inquiries" className={styles.statCard} style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
                    <div className={styles.iconWrapper} style={{ backgroundColor: '#fff3e0', color: '#f57c00' }}>
                        <FaEnvelope />
                    </div>
                    <div>
                        <h3>New Inquiries</h3>
                        <p className={styles.statValue}>{inquiries?.filter(i => !i.read).length || 0}</p>
                    </div>
                </Link>
            </div>

            {/* Recent Activities or Quick Actions could go here */}
        </div>
    );
}
