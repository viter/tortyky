'use client';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import styles from './forms.module.css';
import FilePicker from '../FilePicker';
import getResizedImages from '@/utils/resizeImage';
import {
  addTort,
  setStartupTorty,
  setClearImagesFlagTrue,
  updateImagesList,
  setShowFormFlagFalse,
} from '@/slices/tortySlice';
import { addKorzh, setStartupKorzhi } from '@/slices/korzhiSlice';
import { useEffect, useState } from 'react';

async function getTags() {
  const result = await fetch('/api/tags');
  const tags = await result.json();
  return tags.result;
}

export default function ItemForm({ item, updateItem, itemType }) {
  const dispatch = useDispatch();
  const currentTags = useSelector((state) => state.tags.tags);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (['torty'].includes(itemType)) {
      getTags().then((tags) => {
        setTags(tags);
      });
    }
  }, []);

  const tagIdsList = item?.tags?.map((tag) => tag.tag.id.toString());

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: item?.name ? item.name : '',
      description: item?.description ? item.description : '',
      tag: tagIdsList,
    },
  });

  const onSubmit = async ({ name, description, tag, photo }) => {
    let method = 'POST';
    let url = `/api/${itemType}`;

    if (item?.id) {
      method = 'PUT';
      url = `/api/${itemType}/${item.id}`;
    }
    const formData = new FormData();

    formData.append(itemType, JSON.stringify({ name, description, tag }));

    const resizedImageFiles = await getResizedImages(photo);

    for (let i = 0; i < resizedImageFiles.length; i++) {
      formData.append('files', resizedImageFiles.item(i));
    }

    const result = await fetch(url, {
      method,
      body: formData,
    });

    if (!item?.id) {
      if (itemType === 'torty') {
        dispatch(addTort(await result.json()));
      }
      if (itemType === 'korzhi') {
        dispatch(addKorzh(await result.json()));
      }
    }

    //if it is an edit mode and new images were added then update images list
    if (item?.id) {
      const res = await result.json();
      if (itemType === 'torty') {
        updateItem(res.updatedTort);
        dispatch(setStartupTorty(res.torty));
        if (resizedImageFiles.length > 0) {
          dispatch(updateImagesList(res.updatedTort.images.split(',')));
        }
      }
      if (itemType === 'korzhi') {
        updateItem(res.updatedKorzh);
        dispatch(setStartupKorzhi(res.korzhi));
        if (resizedImageFiles.length > 0) {
          dispatch(updateImagesList(res.updatedKorzh.images.split(',')));
        }
      }
      dispatch(setShowFormFlagFalse());
    }

    reset();
    dispatch(setClearImagesFlagTrue());
  };

  function handleCancelClick() {
    dispatch(setShowFormFlagFalse());
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.mainSection}>
        <div className={styles.section1}>
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
            rows={5}
          />

          {tags.length && ['torty'].includes(itemType)
            ? tags.map((tag) => {
                return (
                  <label key={tag.id} className={styles.checkboxContainer}>
                    {tag.name}
                    <input type="checkbox" {...register('tag')} value={tag.id} />
                    <span className={styles.checkmark}></span>
                  </label>
                );
              })
            : null}
        </div>
        <div className={styles.section2}>
          <FilePicker
            nameAttribute="photo"
            allowedFileTypes="image/jpeg, image/png, image/jpg"
            isMultiple={true}
            {...register('photo')}
          />
        </div>
      </div>
      <button type="submit" className={styles.submitButton}>
        {item?.name ? 'Змінити' : 'Додати'}
      </button>
      {item?.name ? (
        <button type="button" className={styles.cancelButton} onClick={handleCancelClick}>
          Скасувати
        </button>
      ) : null}
    </form>
  );
}
