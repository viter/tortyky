import styles from './tags/tags.module.css';
import TortyForm from '@/app/components/forms/TortyForm';
import { db } from '@/utils/db.server';

export default async function Tegy() {
  const tags = await db.tags.findMany();

  return (
    <>
      <div className={styles.header}>
        <h1>Торти</h1>
      </div>
      <div className={styles.main}>
        <div className={styles.formDiv}>
          <TortyForm tags={tags} />
        </div>
      </div>
    </>
  );
}
