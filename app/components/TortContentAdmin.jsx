'use client';

import TortSummaryAdmin from './TortSummaryAdmin';
import TortyForm from './forms/TortyForm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setShowFormFlagFalse, setShowFormFlagTrue } from '@/slices/tortySlice';
import { useSearchParams } from 'next/navigation';

export default function TortContentAdmin({ initialTagsList, tort }) {
  const showForm = useSelector((state) => state.torty.showForm);
  const [currentTort, setCurrentTort] = useState(tort);
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

  function updateTort(tort) {
    setCurrentTort(tort);
  }

  return (
    <>
      {showForm ? (
        <TortyForm tort={currentTort} updateTort={updateTort} />
      ) : (
        <TortSummaryAdmin tort={currentTort} />
      )}
    </>
  );
}
