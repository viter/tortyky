'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import styles from './forms.module.css';

export default function TortyForm({ initialTagsList }) {
  const currentTags = useSelector((state) => state.tags.tags);
  const tags = currentTags.length ? currentTags : initialTagsList;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async ({ name, description, images, tag }) => {
    const result = await fetch('/api/torty', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, images, tag }),
    });
    //dispatch(addTag(await result.json()));

    //reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="назва"
        {...register('name', { required: true, maxLength: 255 })}
        className={styles.textInput}
      />
      <textarea
        placeholder="опис"
        {...register('description', { maxLength: 100 })}
        className={styles.textInput}
      />
      <input
        type="text"
        placeholder="зображення"
        {...register('images', { required: true })}
        className={styles.textInput}
      />
      {tags.length &&
        tags.map((tag) => {
          return (
            <label key={tag.id} className={styles.checkboxContainer}>
              {tag.name}
              <input type="checkbox" {...register('tag')} value={tag.id} />
              <span className={styles.checkmark}></span>
            </label>
          );
        })}

      <button type="submit" className={styles.submitButton}>
        Додати
      </button>
    </form>
  );
}
