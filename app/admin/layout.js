import NavBar from '../components/NavBar';
import Link from 'next/link';
import styles from './admin.module.css';

export default function AdminLayout({ children }) {
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link href={'/admin'} className={styles.mainLink}>
            Адміністрування
          </Link>
        </div>
        <NavBar />
      </nav>

      <div className={styles.main}>{children}</div>
    </>
  );
}
