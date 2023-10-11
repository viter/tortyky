import styles from '../admin.module.css';
import { db } from '@/utils/db.server';
import ImageListAdmin from '@/app/components/ImageListAdmin';
import TortContentAdmin from '@/app/components/TortContentAdmin';

//export const revalidate = 0;
//export const dynamic = 'force-dynamic';

export default async function Tort({ params }) {
  const tort = await db.torty.findFirst({
    where: {
      id: parseInt(params.id),
    },
    include: {
      tags: {
        select: {
          tag: true,
        },
      },
    },
  });

  const tags = await db.tags.findMany();

  const images = tort.images.length ? tort.images.split(',') : [];

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.pageHeader}>{tort.name}</h1>
      </div>

      <div className={styles.tortyMain}>
        <div className={styles.formDiv}>
          <TortContentAdmin initialTagsList={tags} tort={tort} />
        </div>
        <div className={styles.imagesDiv}>
          <ImageListAdmin images={images} tortId={tort.id} />
        </div>
      </div>
    </>
  );
}
