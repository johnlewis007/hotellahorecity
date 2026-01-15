import styles from './page.module.css';

export default function SettingsAdminPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Settings</h1>
            </header>
            <div className={styles.card}>
                <h2>Booking Links</h2>
                <form className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>Booking.com URL</label>
                        <input type="text" defaultValue="https://www.booking.com/..." />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Agoda URL</label>
                        <input type="text" defaultValue="https://www.agoda.com/..." />
                    </div>
                    <button type="button" className="btn btn-primary">Save Changes</button>
                </form>
            </div>
        </div>
    );
}
