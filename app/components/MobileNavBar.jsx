'use client';

import Link from 'next/link';
import styles from '../admin/admin.module.css';

export default function MobileNavBar({ toggleMobileNavBar }) {
  return (
    <div className={styles.mobileNavBar} onClick={() => toggleMobileNavBar(false)}>
      <div className={styles.mobileNavBarMain}>
        <div className={styles.sections}>
          <Link href="/admin">Торти</Link>
          <Link href="/admin/korzhi">Коржі</Link>
          <Link href="/admin/kremy">Креми</Link>
          <Link href="/admin/napovnennya">Наповнення</Link>
          <Link href="/admin/tags">Теги</Link>
        </div>
        <div className={styles.sections}>
          <div className={styles.logoutdiv} onClick={() => signOut()}>
            <span className={styles.logoutLink}>Вийти</span>
          </div>
        </div>
      </div>
    </div>
  );
}
