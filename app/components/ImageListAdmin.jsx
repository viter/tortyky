'use client';
import ImageCardAdmin from '@/app/components/ImageCardAdmin';
import { removeImage } from '../actions';
import { useEffect, useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateImagesList } from '@/slices/tortySlice';

export default function ImageListAdmin({ images, tortData }) {
  let [isPending, startTransition] = useTransition();

  const dispatch = useDispatch();

  const imagesList = useSelector((state) => state.torty.imagesList);

  useEffect(() => {
    dispatch(updateImagesList(images));
  }, []);

  const handleImageRemove = (e) =>
    startTransition(async () => {
      const imageName = e.target.dataset.imagename;

      await removeImage(imageName, tortData);
      dispatch(updateImagesList(imagesList.filter((image) => image !== imageName)));
    });

  return imagesList.length
    ? imagesList.map((image) => (
        <ImageCardAdmin
          key={image}
          imageName={image}
          src={`http:/localhost/images/${image}`}
          dim={{ width: 300, height: 200 }}
          handleImageRemove={handleImageRemove}
        />
      ))
    : null;
}
