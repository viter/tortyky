'use client';

import { useSearchParams } from 'next/navigation';
import styles from './error.module.css';

export default function Error() {
  const searchParams = useSearchParams();
  let errorMessage = '';
  if (searchParams.get('error')) {
    errorMessage = 'Вам відмовлено у доступі!';
  }

  return (
    <div className={styles.container}>
      <div className={styles.errorDiv}>{errorMessage}</div>
    </div>
  );
}
