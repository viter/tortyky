'use client';

import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import styles from './forms.module.css';
import FilePicker from '../FilePicker';
import getResizedImages from '@/utils/resizeImage';

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

  const onSubmitImage = async ({ photo }) => {
    const formData = new FormData();

    const resizedImageFiles = await getResizedImages(photo);

    for (let i = 0; i < resizedImageFiles.length; i++) {
      formData.append('files', resizedImageFiles.item(i));
    }

    const result = await fetch('/api/galery', {
      method: 'POST',
      body: formData,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitImage)}>
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
    </form>
  );
}
