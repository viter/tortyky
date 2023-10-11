'use client';
import ImageCardAdmin from '@/app/components/ImageCardAdmin';
import { removeImage } from '../actions';
import { useEffect, useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateImagesList, setStartupTorty } from '@/slices/tortySlice';

export default function ImageListAdmin({ images, tortId }) {
  let [isPending, startTransition] = useTransition();

  const dispatch = useDispatch();

  const imagesList = useSelector((state) => state.torty.imagesList);

  useEffect(() => {
    dispatch(updateImagesList(images));
  }, []);

  const handleImageRemove = (e) =>
    startTransition(async () => {
      const imageName = e.target.dataset.imagename;

      const torty = await removeImage(imageName, tortId);
      dispatch(updateImagesList(imagesList.filter((image) => image !== imageName)));
      dispatch(setStartupTorty(torty));
    });

  return imagesList.length
    ? imagesList.map((image) => (
        <ImageCardAdmin
          key={image}
          imageName={image}
          src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${image}`}
          dim={{ width: 300, height: 200 }}
          handleImageRemove={handleImageRemove}
        />
      ))
    : null;
}
