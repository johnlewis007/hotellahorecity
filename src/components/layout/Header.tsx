import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={`container ${styles.container}`}>
                <div className={styles.logo}>
                    <Link href="/">Hotel Lahore City</Link>
                </div>
                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/about">About</Link></li>
                        <li><Link href="/rooms">Rooms</Link></li>
                        <li><Link href="/gallery">Gallery</Link></li>
                        <li><Link href="/facilities">Facilities</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>
                </nav>
                <div className={styles.cta}>
                    <Link href="/contact" className="btn btn-primary">Book Now</Link>
                </div>
            </div>
        </header>
    );
}
