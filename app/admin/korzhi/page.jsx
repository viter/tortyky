import styles from '../admin.module.css';
import { db } from '@/utils/db.server';
import ItemForm from '@/app/components/forms/ItemForm';
import ItemsListAdmin from '@/app/components/ItemsListAdmin';

export const revalidate = 0;

export default async function Korzhi() {
  const korzhi = await db.korzhi.findMany({});

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.pageHeader}>Коржі</h1>
      </div>

      <div className={styles.tortyMain}>
        <div className={styles.formDiv}>
          <ItemForm itemType="korzhi" />
        </div>
        <div className={styles.tortyDiv}>
          <ItemsListAdmin startupItems={korzhi} itemType="korzhi" />
        </div>
      </div>
    </>
  );
}
