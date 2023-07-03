'use client';

import { setStartupTorty } from '@/slices/tortySlice';
import { useDispatch, useSelector } from 'react-redux';
import TortCardAdmin from './TortCardAdmin';
import { useEffect } from 'react';

export default function TortyListAdmin({ startupTorty }) {
  const torty = useSelector((state) => state.torty.torty);
  const dispatch = useDispatch();

  useEffect(() => {
    if (torty.length > 0) {
      dispatch(setStartupTorty(torty));
    } else {
      dispatch(setStartupTorty(startupTorty));
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
