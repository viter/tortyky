'use client';

import TortSummaryAdmin from './TortSummaryAdmin';
import TortyForm from './forms/TortyForm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setShowFormFlagFalse } from '@/slices/tortySlice';

export default function TortContentAdmin({ initialTagsList, tort }) {
  const showForm = useSelector((state) => state.torty.showForm);
  const [currentTort, setCurrentTort] = useState(tort);

  const dispatch = useDispatch();

  useEffect(() => {
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
        <TortyForm initialTagsList={initialTagsList} tort={currentTort} updateTort={updateTort} />
      ) : (
        <TortSummaryAdmin tort={currentTort} />
      )}
    </>
  );
}
