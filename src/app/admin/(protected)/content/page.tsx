import styles from './page.module.css';

export default function ContentAdminPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Content Management</h1>
            </header>
            <div className={styles.card}>
                <p>Edit Hotel Description, Location, and Facilities here.</p>
                {/* Placeholder for content forms */}
                <div style={{ padding: '50px', textAlign: 'center', backgroundColor: '#eee', borderRadius: '8px' }}>
                    Content Editor Placeholder
                </div>
            </div>
        </div>
    );
}
