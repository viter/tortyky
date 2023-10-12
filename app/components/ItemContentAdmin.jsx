'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setShowFormFlagFalse, setShowFormFlagTrue } from '@/slices/tortySlice';
import { useSearchParams } from 'next/navigation';
import ItemForm from './forms/ItemForm';
import ItemSummaryAdmin from './ItemSummaryAdmin';

export default function ItemContentAdmin({ itemType, item }) {
  const showForm = useSelector((state) => state.torty.showForm);
  const [currentItem, setCurrentItem] = useState(item);
  const searchParams = useSearchParams();
  const show = searchParams.get('show');

  const dispatch = useDispatch();

  useEffect(() => {
    if (show === 'form') {
      dispatch(setShowFormFlagTrue());
    }
    return () => {
      dispatch(setShowFormFlagFalse());
    };
  }, []);

  function updateItem(item) {
    setCurrentItem(item);
  }

  return (
    <>
      {showForm ? (
        <ItemForm item={currentItem} updateItem={updateItem} itemType={itemType} />
      ) : (
        <ItemSummaryAdmin item={currentItem} itemType={itemType} />
      )}
    </>
  );
}
