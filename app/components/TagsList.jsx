'use client';

import { setStartupTags, changeValuesToUpdate, setIsReload } from '@/slices/tagsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import ErrorMessageDialog from './ErrorMessageDialog';
import styles from './TagsList.module.css';
import { store } from '@/store';

export default function TagsList({ startupTags }) {
  const tags = useSelector((state) => state.tags.tags);
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState(false);
  const [errorMessageText, setErrorMessageText] = useState('');

  useEffect(() => {
    if (tags.length > 0 || store.getState().tags.isReload) {
      dispatch(setStartupTags(tags));
      dispatch(setIsReload(false));
    } else {
      dispatch(setStartupTags(startupTags));
    }
    return () => {
      dispatch(setIsReload(true));
    };
  }, []);

  const updateTag = (e) => {
    const tag = JSON.parse(e.target.parentElement.dataset.tag);
    dispatch(changeValuesToUpdate(tag));
  };

  const handleDelete = async (e) => {
    const id = JSON.parse(e.target.closest('li').dataset.tag).id;
    const resultPromise = await fetch(`/api/tags/${id}`, {
      method: 'DELETE',
    });
    const result = await resultPromise.json();

    if (result.code && result.code === 'P2003') {
      setErrorMessageText(
        'Тег не може бути видаленим, бо він використовується в одному або більше тортів.',
      );
      setErrorMessage(true);
    } else {
      const updatedTagsList = tags.filter((tag) => tag.id !== id);
      dispatch(setStartupTags(updatedTagsList));
      setErrorMessage(false);
    }
  };

  const close = () => {
    setErrorMessage(false);
  };

  return (
    <>
      {errorMessage && <ErrorMessageDialog errorMessageText={errorMessageText} close={close} />}
      <ul className={styles.tagItem}>
        {tags.length ? (
          tags.map((tag) => {
            return (
              <li key={tag.id} className={styles.row} data-tag={JSON.stringify(tag)}>
                <span className={styles.item} onClick={updateTag}>
                  {tag.name}
                </span>
                <span onClick={handleDelete}>
                  <svg
                    className={styles.delete}
                    fill="#4b4343"
                    width="1.5rem"
                    height="1.5rem"
                    viewBox="0 0 28 28"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Видалити</title>
                    <path d="M11.188 4.781c6.188 0 11.219 5.031 11.219 11.219s-5.031 11.188-11.219 11.188-11.188-5-11.188-11.188 5-11.219 11.188-11.219zM11.25 17.625l3.563 3.594c0.438 0.438 1.156 0.438 1.594 0 0.406-0.406 0.406-1.125 0-1.563l-3.563-3.594 3.563-3.594c0.406-0.438 0.406-1.156 0-1.563-0.438-0.438-1.156-0.438-1.594 0l-3.563 3.594-3.563-3.594c-0.438-0.438-1.156-0.438-1.594 0-0.406 0.406-0.406 1.125 0 1.563l3.563 3.594-3.563 3.594c-0.406 0.438-0.406 1.156 0 1.563 0.438 0.438 1.156 0.438 1.594 0z"></path>
                  </svg>
                </span>
              </li>
            );
          })
        ) : (
          <li>...loading</li>
        )}
      </ul>
    </>
  );
}
