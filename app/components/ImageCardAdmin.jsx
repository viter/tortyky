'use client';
import Image from 'next/image';
import { useState } from 'react';
import localFont from 'next/font/local';
import styles from './ImageCardAdmin.module.css';

const ManjariFont = localFont({
  src: '../fonts/Manjari-Bold.ttf',
  display: 'swap',
});

export default function ImageCardAdmin({ imageName, src, dim, handleImageRemove }) {
  const [hover, setHover] = useState(false);

  const mouseEnterHandler = (e) => {
    setHover(true);
  };

  const mouseLeaveHandler = (e) => {
    setHover(false);
  };

  return (
    <div className={styles.thumbnailDiv}>
      {hover ? (
        <span
          className={`${styles.removeButton} ${ManjariFont.className}`}
          data-imagename={imageName}
          onClick={handleImageRemove}
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
        >
          x
        </span>
      ) : null}
      <Image
        src={src}
        width={dim.width}
        height={dim.height}
        alt="tortyk"
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
      />
    </div>
  );
}
