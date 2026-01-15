import Sidebar from '@/components/admin/Sidebar';
import styles from './AdminLayout.module.css';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.layout}>
            <Sidebar />
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
}
