import TagsList from '@/app/components/TagsList';
import styles from './tags.module.css';
import TagsForm from '@/app/components/forms/TagsForm';
import { db } from '@/utils/db.server';

export const revalidate = 1;

export default async function Tegy() {
  const tags = await db.tags.findMany();

  return (
    <>
      <div className={styles.header}>
        <h1>Теги</h1>
      </div>
      <div className={styles.main}>
        <div className={styles.formDiv}>
          <TagsForm />
        </div>
        <div className={styles.tagsDiv}>
          <TagsList startupTags={tags} />
        </div>
      </div>
    </>
  );
}
