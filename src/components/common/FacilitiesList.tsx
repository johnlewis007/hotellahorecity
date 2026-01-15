import { FaWifi, FaBroom, FaParking, FaConciergeBell, FaShieldAlt, FaUtensils } from 'react-icons/fa';
import styles from './FacilitiesList.module.css';

const FACILITIES = [
    { icon: FaWifi, name: 'Free Wi-Fi', desc: 'High-speed internet throughout the hotel.' },
    { icon: FaUtensils, name: 'Room Service', desc: '24/7 room service available.' },
    { icon: FaBroom, name: 'Clean Rooms', desc: 'Daily housekeeping and sanitization.' },
    { icon: FaParking, name: 'Parking', desc: 'Secure parking for guests.' },
    { icon: FaConciergeBell, name: '24/7 Front Desk', desc: 'Always available to assist you.' },
    { icon: FaShieldAlt, name: 'Security', desc: '24/7 security surveillance.' },
];

export default function FacilitiesList() {
    return (
        <div className={styles.grid}>
            {FACILITIES.map((item, index) => (
                <div key={index} className={styles.item}>
                    <div className={styles.iconWrapper}>
                        <item.icon />
                    </div>
                    <div>
                        <h4>{item.name}</h4>
                        <p>{item.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
