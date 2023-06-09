'use client';

import Image from 'next/image';
import { useState } from 'react';
import { setStartupTorty } from '@/slices/tortySlice';
import { useDispatch } from 'react-redux';
import styles from './TortCardAdmin.module.css';
import ActionButton from './ActionButton';
import Link from 'next/link';

export default function TortCardAdmin({ tort, tortyList }) {
  const imgSrc = tort.images.length ? '/images/' + tort.images.split(',')[0] : '/placeholder.png';
  const tags = tort.tags.map((t) => t.tag.name).join(', ');

  const dispatch = useDispatch();

  const [hover, setHover] = useState(false);

  async function deleteTort(e) {
    if (confirm('Справді видалити?')) {
      const id = e.target.parentNode.dataset.tortid;
      const resultPromise = await fetch(`/api/torty/${id}`, {
        method: 'DELETE',
      });
      const result = await resultPromise.json();
      const updatedTortyList = tortyList.filter((tort) => {
        return tort.id !== parseInt(id);
      });
      dispatch(setStartupTorty(updatedTortyList));
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
      {hover ? <ActionButton deleteTort={deleteTort} tortId={tort.id} /> : null}
      <Link href={`/admin/${tort.id}`}>
        <Image src={imgSrc} width={160} height={100} alt="tortyk" />
      </Link>
      <div>{tort.name}</div>
      <div>{tort.description}</div>
      <div>{tags}</div>
    </div>
  );
}
