'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaHome, FaBed, FaImages, FaInfoCircle, FaCog, FaSignOutAlt, FaEnvelope, FaStar } from 'react-icons/fa';
import styles from './Sidebar.module.css';

const MENU_ITEMS = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: FaHome },
    { name: 'Inquiries', path: '/admin/inquiries', icon: FaEnvelope },
    { name: 'Rooms', path: '/admin/rooms', icon: FaBed },
    { name: 'Reviews', path: '/admin/reviews', icon: FaStar },
    { name: 'Gallery', path: '/admin/gallery', icon: FaImages },
    { name: 'Content', path: '/admin/content', icon: FaInfoCircle },
    { name: 'Settings', path: '/admin/settings', icon: FaCog },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/admin/login');
        router.refresh();
    };

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <h2>Admin Panel</h2>
            </div>
            <nav className={styles.nav}>
                <ul>
                    {MENU_ITEMS.map((item) => (
                        <li key={item.path}>
                            <Link
                                href={item.path}
                                className={`${styles.link} ${pathname === item.path ? styles.active : ''}`}
                            >
                                <item.icon className={styles.icon} />
                                <span>{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className={styles.footer}>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                    <FaSignOutAlt className={styles.icon} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}
