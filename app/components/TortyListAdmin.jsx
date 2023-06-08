'use client';

import { store } from '@/store';
import { setStartupTorty } from '@/slices/tortySlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import styles from './TortyListAdmin.module.css';
import TortCardAdmin from './TortCardAdmin';

export default function TortyListAdmin({ startupTorty }) {
  const torty = useSelector((state) => state.torty.torty);
  //const dispatch = useDispatch();

  useEffect(() => {
    if (!torty.length) {
      store.dispatch(setStartupTorty(startupTorty));
    }
  }, []);
  return (
    <>
      {torty.length
        ? torty.map((tort) => {
            return <TortCardAdmin key={tort.id} tort={tort} tortyList={torty} />;
          })
        : null}
    </>
  );
}
