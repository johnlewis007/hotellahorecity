import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <div className={styles.column}>
                    <h3>Hotel Lahore City</h3>
                    <p>Comfortable Stay in the Heart of Lahore. Affordable rooms with modern facilities.</p>
                </div>
                <div className={styles.column}>
                    <h3>Quick Links</h3>
                    <ul className={styles.links}>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/about">About Us</Link></li>
                        <li><Link href="/rooms">Our Rooms</Link></li>
                        <li><Link href="/gallery">Gallery</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>
                </div>
                <div className={styles.column}>
                    <h3>Contact Us</h3>
                    <p>Lakshmi Chowk, Abbott Road, Montgomery Park, Lahore</p>
                    <p><strong>Phone:</strong> 0300-5556271</p>
                    <p><strong>Email:</strong> info@hotellahorecity.com</p>
                </div>
            </div>
            <div className={styles.copyright}>
                <p>&copy; {new Date().getFullYear()} Hotel Lahore City. All Rights Reserved.</p>
            </div>
        </footer>
    );
}
