import { getServerSession } from 'next-auth';
import styles from './admin.module.css';
import { authOptions } from '@/lib/auth';

export default async function Torty() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <h1 className={styles.header}>Торти</h1>
      <pre>{JSON.stringify(session)}</pre>
    </>
  );
}
