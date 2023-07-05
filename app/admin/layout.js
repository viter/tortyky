'use client';

import NavBar from '../components/NavBar';
import Hamburger from '../components/Hamburger';
import Link from 'next/link';
import styles from './admin.module.css';
import MobileNavBar from '../components/MobileNavBar';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useState } from 'react';

export default function AdminLayout({ children }) {
  const [parent, enableAnimations] = useAutoAnimate();
  const [mobileNavBarShown, setMobileNavBarShown] = useState(false);

  function toggleMobileNavBar() {
    setMobileNavBarShown(!mobileNavBarShown);
  }
  return (
    <div style={{ position: 'relative' }}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link href={'/admin'} className={styles.mainLink}>
            Адміністрування
          </Link>
        </div>
        <NavBar />
        <Hamburger toggleMobileNavBar={toggleMobileNavBar} />
      </nav>
      <div ref={parent}>{mobileNavBarShown ? <MobileNavBar /> : null}</div>
      <div className={styles.main}>{children}</div>
    </div>
  );
}
