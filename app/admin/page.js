import styles from './admin.module.css';
import TortyForm from '@/app/components/forms/TortyForm';
import { db } from '@/utils/db.server';
import TortyListAdmin from '../components/TortyListAdmin';

export const revalidate = 1;

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
  const tags = await db.tags.findMany();

  return (
    <>
      <div className={styles.header}>
        <h1>Торти</h1>
      </div>

      <div className={styles.tortyMain}>
        <div className={styles.formDiv}>
          <TortyForm initialTagsList={tags} />
        </div>
        <div className={styles.tortyDiv}>
          <TortyListAdmin startupTorty={torty} />
        </div>
      </div>
    </>
  );
}
