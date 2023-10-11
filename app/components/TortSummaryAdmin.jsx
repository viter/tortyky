'use client';

import { useDispatch } from 'react-redux';
import { setShowFormFlagTrue, setStartupTorty } from '@/slices/tortySlice';
import { useRouter } from 'next/navigation';
import styles from './TortSummaryAdmin.module.css';

export default function TortSummaryAdmin({ tort }) {
  const dispatch = useDispatch();
  const router = useRouter();

  let tags = 'теги відсутні';

  if (tort.tags?.length > 0) {
    tags = tort.tags.map((tag) => tag.tag.name).join(', ');
  }

  function handleEditClick() {
    dispatch(setShowFormFlagTrue());
  }

  async function handleDeleteClick(e) {
    if (confirm('Справді видалити?')) {
      const resultPromise = await fetch(`/api/torty/${tort.id}`, {
        method: 'DELETE',
      });
      const updatedTortyList = await resultPromise.json();

      dispatch(setStartupTorty(updatedTortyList));
      router.push('/admin');
    }
  }

  return (
    <>
      <p>
        <span className={styles.property}>Ім&apos;я:</span> {tort.name}
      </p>
      <p>
        <span className={styles.property}>Опис:</span> {tort.description}
      </p>
      <p>
        <span className={styles.property}>Теги:</span> {tags}
      </p>
      <p>
        <button className={styles.editButton} onClick={handleEditClick}>
          Редагувати
        </button>
        <button className={styles.deleteButton} onClick={handleDeleteClick}>
          Видалити
        </button>
      </p>
    </>
  );
}
