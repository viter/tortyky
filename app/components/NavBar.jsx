'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import styles from './NavBar.module.css';

export default function NavBar() {
  const pathname = usePathname();

  const tortyClass =
    !pathname.includes('korzhi') &&
    !pathname.includes('kremy') &&
    !pathname.includes('napovnennya') &&
    !pathname.includes('tags')
      ? styles.activeLink
      : styles.navLink;

  const korzhiClass = pathname.includes('korzhi') ? styles.activeLink : styles.navLink;
  const kremyClass = pathname.includes('kremy') ? styles.activeLink : styles.navLink;
  const napovnennyaClass = pathname.includes('napovnennya') ? styles.activeLink : styles.navLink;
  const tagsClass = pathname.includes('tags') ? styles.activeLink : styles.navLink;

  return (
    <div className={styles.sectionsBar}>
      <div className={styles.sections}>
        <Link href="/admin" className={tortyClass}>
          Торти
        </Link>
        <Link href="/admin/korzhi" className={korzhiClass}>
          Коржі
        </Link>
        <Link href="/admin/kremy" className={kremyClass}>
          Креми
        </Link>
        <Link href="/admin/napovnennya" className={napovnennyaClass}>
          Наповнення
        </Link>
        <Link href="/admin/tags" className={tagsClass}>
          Теги
        </Link>
      </div>
      <div className={styles.sections}>
        <div className={styles.logoutdiv} onClick={() => signOut()}>
          <span className={styles.logoutLink}>Вийти</span>
        </div>
      </div>
    </div>
  );
}
