'use client';

import Image from 'next/image';
import { useState } from 'react';
import { setStartupTorty } from '@/slices/tortySlice';
import { setStartupKorzhi } from '@/slices/korzhiSlice';
import { useDispatch } from 'react-redux';
import styles from './ItemCardAdmin.module.css';
import ActionButton from './ActionButton';
import Link from 'next/link';

export default function ItemCardAdmin({ item, itemsList, itemType }) {
  const imgSrc = item.images.length
    ? process.env.NEXT_PUBLIC_IMAGES_URL + item.images.split(',')[0]
    : '/placeholder.png';
  const tags = item.tags?.map((t) => t.tag.name).join(', ');

  const dispatch = useDispatch();

  const [hover, setHover] = useState(false);

  let url;
  if (itemType === 'torty') {
    url = 'admin';
  }
  if (itemType === 'korzhi') {
    url = 'admin/korzhi';
  }

  async function deleteItem() {
    if (confirm('Справді видалити?')) {
      const resultPromise = await fetch(`/api/${itemType}/${item.id}`, {
        method: 'DELETE',
      });
      const result = await resultPromise.json();
      const updatedItemsList = itemsList.filter((it) => {
        return it.id !== item.id;
      });
      if (itemType === 'torty') {
        dispatch(setStartupTorty(updatedItemsList));
      }
      if (itemType === 'korzhi') {
        dispatch(setStartupKorzhi(updatedItemsList));
      }
    }
  }

  const mouseEnterHandler = (e) => {
    setHover(true);
  };

  const mouseLeaveHandler = (e) => {
    setHover(false);
  };

  return (
    <div
      className={styles.cardMain}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      {hover ? (
        <ActionButton deleteItem={deleteItem} itemId={item.id} url={`/${url}/${item.id}`} />
      ) : null}
      <Link href={`/${url}/${item.id}`}>
        <Image src={imgSrc} width={160} height={100} alt="item" />
      </Link>
      <div>{item.name}</div>
      <div>{item.description}</div>
      {tags && ['torty'].includes(itemType) ? <div>{tags}</div> : null}
    </div>
  );
}
