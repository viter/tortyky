'use client';

import { setStartupTorty } from '@/slices/tortySlice';
import { setStartupKorzhi } from '@/slices/korzhiSlice';
import { useDispatch, useSelector } from 'react-redux';
import ItemCardAdmin from './ItemCardAdmin';
import { useEffect } from 'react';

export default function ItemsListAdmin({ startupItems, itemType }) {
  const items = useSelector((state) => state[itemType][itemType]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (items.length > 0) {
      if (itemType === 'torty') {
        dispatch(setStartupTorty(items));
      }
      if (itemType === 'korzhi') {
        dispatch(setStartupKorzhi(items));
      }
    } else {
      if (itemType === 'torty') {
        dispatch(setStartupTorty(startupItems));
      }
      if (itemType === 'korzhi') {
        dispatch(setStartupKorzhi(startupItems));
      }
    }
  }, []);

  return (
    <>
      {items.length
        ? items.map((item) => {
            return (
              <ItemCardAdmin key={item.id} item={item} itemsList={items} itemType={itemType} />
            );
          })
        : null}
    </>
  );
}
