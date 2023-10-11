import styles from './admin.module.css';
import TortyForm from '@/app/components/forms/TortyForm';
import { db } from '@/utils/db.server';
import TortyListAdmin from '../components/TortyListAdmin';

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
          <TortyForm />
        </div>
        <div className={styles.tortyDiv}>
          <TortyListAdmin startupTorty={torty} />
        </div>
      </div>
    </>
  );
}
