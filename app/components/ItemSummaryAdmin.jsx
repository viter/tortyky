'use client';

import { useDispatch } from 'react-redux';
import { setShowFormFlagTrue, setStartupTorty } from '@/slices/tortySlice';
import { setStartupKorzhi } from '@/slices/korzhiSlice';
import { useRouter } from 'next/navigation';
import styles from './ItemSummaryAdmin.module.css';

export default function ItemSummaryAdmin({ item, itemType }) {
  const dispatch = useDispatch();
  const router = useRouter();

  let tags = 'теги відсутні';

  if (item.tags?.length > 0) {
    tags = item.tags.map((tag) => tag.tag.name).join(', ');
  }

  function handleEditClick() {
    dispatch(setShowFormFlagTrue());
  }

  async function handleDeleteClick(e) {
    if (confirm('Справді видалити?')) {
      const resultPromise = await fetch(`/api/${itemType}/${item.id}`, {
        method: 'DELETE',
      });
      const updatedItemsList = await resultPromise.json();
      let redirectUrl = '/admin';
      if (itemType === 'torty') {
        dispatch(setStartupTorty(updatedItemsList));
      }
      if (itemType === 'korzhi') {
        dispatch(setStartupKorzhi(updatedItemsList));
        redirectUrl = '/admin/korzhi';
      }
      router.push(redirectUrl);
    }
  }

  return (
    <>
      <p>
        <span className={styles.property}>Ім&apos;я:</span> {item.name}
      </p>
      <p>
        <span className={styles.property}>Опис:</span> {item.description}
      </p>
      {tags && ['torty'].includes(itemType) ? (
        <p>
          <span className={styles.property}>Теги:</span> {tags}
        </p>
      ) : null}
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
