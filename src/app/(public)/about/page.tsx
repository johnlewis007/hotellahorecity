import FacilitiesList from '@/components/common/FacilitiesList';
import styles from './page.module.css';

export const metadata = {
    title: 'About Us | Hotel Lahore City',
    description: 'Learn more about Hotel Lahore City, our mission, and facilities.',
};

export default function AboutPage() {
    return (
        <main>
            {/* Page Header */}
            <section className={styles.pageHeader}>
                <div className="container">
                    <h1>About Us</h1>
                    <p>Comfortable Stay in the Heart of Lahore</p>
                </div>
            </section>

            {/* Overview Section */}
            <section className="section">
                <div className="container">
                    <div className={styles.contentGrid}>
                        <div className={styles.textColumn}>
                            <h2 className={styles.subtitle}>Welcome to Hotel Lahore City</h2>
                            <p>
                                Located in the vibrant center of Lahore at Lakshmi Chowk, Abbott Road, near Montgomery Park,
                                Hotel Lahore City offers a perfect blend of comfort and affordability.
                            </p>
                            <p>
                                Our mission is to provide a home away from home for travelers, families, and business professionals.
                                With modern facilities, clean rooms, and a dedicated staff available 24/7, we ensure a hassle-free
                                and pleasant stay for all our guests.
                            </p>

                            <div className={styles.infoBox}>
                                <div className={styles.infoItem}>
                                    <strong>Check-in:</strong> 12:00 PM
                                </div>
                                <div className={styles.infoItem}>
                                    <strong>Check-out:</strong> 12:00 PM
                                </div>
                            </div>
                        </div>
                        <div className={styles.imageColumn}>
                            <div className={styles.placeholderImage}>
                                About Hotel Image
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Facilities Section */}
            <section className={`section ${styles.bgGray}`}>
                <div className="container">
                    <div className="section-title">
                        <h2>Our Facilities</h2>
                        <p>We provide top-notch amenities to make your stay comfortable.</p>
                    </div>
                    <FacilitiesList />
                </div>
            </section>
        </main>
    );
}
