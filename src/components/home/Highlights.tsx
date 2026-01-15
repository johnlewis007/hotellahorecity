import { FaWifi, FaTag, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import styles from './Highlights.module.css';

const highlights = [
    { icon: FaWifi, title: 'Free Wi-Fi', desc: 'High-speed internet access' },
    { icon: FaTag, title: 'Affordable Pricing', desc: 'Best rates in the city area' },
    { icon: FaMapMarkerAlt, title: 'Central Location', desc: 'Near Lakshmi Chowk' },
    { icon: FaClock, title: '24/7 Reception', desc: 'Always here to serve you' },
];

export default function Highlights() {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.grid}>
                    {highlights.map((item, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.iconWrapper}>
                                <item.icon className={styles.icon} />
                            </div>
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
