import styles from '../../admin.module.css';
import { db } from '@/utils/db.server';
import ImageListAdmin from '@/app/components/ImageListAdmin';
import ItemContentAdmin from '@/app/components/ItemContentAdmin';

export default async function Korzh({ params }) {
  const korzh = await db.korzhi.findFirst({
    where: {
      id: parseInt(params.id),
    },
  });

  const images = korzh.images.length ? korzh.images.split(',') : [];

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.pageHeader}>{korzh.name}</h1>
      </div>

      <div className={styles.tortyMain}>
        <div className={styles.formDiv}>
          <ItemContentAdmin itemType="korzhi" item={korzh} />
        </div>
        <div className={styles.imagesDiv}>
          <ImageListAdmin images={images} korzhId={korzh.id} />
        </div>
      </div>
    </>
  );
}
