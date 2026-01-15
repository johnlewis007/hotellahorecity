import FacilitiesList from '@/components/common/FacilitiesList';
import styles from './page.module.css';

export const metadata = {
    title: 'Facilities | Hotel Lahore City',
    description: 'Explore the top-notch facilities at Hotel Lahore City.',
};

export default function FacilitiesPage() {
    return (
        <main>
            <section className={styles.pageHeader}>
                <div className="container">
                    <h1>Our Facilities</h1>
                    <p>We provide everything you need for a comfortable stay</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <FacilitiesList />
                </div>
            </section>
        </main>
    );
}
