'use client';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addTag, setStartupTags, resetValuesToUpdate } from '@/slices/tagsSlice';
import { useEffect } from 'react';

import styles from './forms.module.css';

export default function TagsForm() {
  const valuesToUpdate = useSelector((state) => state.tags.valuesToUpdate);
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    clearErrors,
    setValue,
  } = useForm();

  useEffect(() => {
    if (valuesToUpdate?.name) {
      if (errors.name) {
        clearErrors('name');
      }
      setValue('name', valuesToUpdate.name);
    }
  }, [valuesToUpdate]);

  const onSubmit = async (data) => {
    if (valuesToUpdate?.name) {
      const result = await fetch('/api/tags', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: valuesToUpdate.id, name: data.name }),
      });
      dispatch(setStartupTags(await result.json()));
    } else {
      const result = await fetch('/api/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: data.name }),
      });
      dispatch(addTag(await result.json()));
    }

    reset();
  };

  const handleCancel = () => {
    dispatch(resetValuesToUpdate());
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputDiv}>
        <input
          {...register('name', { required: true })}
          placeholder={errors.name ? "Це обов'язкове поле" : "ім'я тега"}
          className={errors.name ? styles.textInputError : styles.textInput}
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        {valuesToUpdate?.name ? 'Змінити' : 'Додати'}
      </button>
      <button type="button" className={styles.cancelButton} onClick={handleCancel}>
        Скасувати
      </button>
    </form>
  );
}
