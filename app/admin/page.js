import styles from './admin.module.css';
import { db } from '@/utils/db.server';
import ItemForm from '@/app/components/forms/ItemForm';
import ItemsListAdmin from '@/app/components/ItemsListAdmin';

export const revalidate = 0;

export default async function Torty() {
  const torty = await db.torty.findMany({
    include: {
      tags: {
        select: {
          tag: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.pageHeader}>Торти</h1>
      </div>

      <div className={styles.tortyMain}>
        <div className={styles.formDiv}>
          <ItemForm itemType="torty" />
        </div>
        <div className={styles.tortyDiv}>
          <ItemsListAdmin startupItems={torty} itemType="torty" />
        </div>
      </div>
    </>
  );
}
