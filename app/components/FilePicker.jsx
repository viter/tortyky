import Image from 'next/image';
import { useState, forwardRef, useRef, useEffect } from 'react';
import styles from './FilePicker.module.css';
import localFont from 'next/font/local';
import { useDispatch, useSelector } from 'react-redux';
import { setClearImagesFlagFalse } from '@/slices/tortySlice';

const ManjariFont = localFont({
  src: '../fonts/Manjari-Bold.ttf',
  display: 'swap',
});

const FilePicker = forwardRef(({ nameAttribute, allowedFileTypes, isMultiple, ...rest }, ref) => {
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();

  const filesArray = useRef([]);

  const clearSelectedImages = useSelector((state) => {
    return state.torty.clearSelectedImages;
  });

  useEffect(() => {
    if (clearSelectedImages) {
      setImages([]);
      dispatch(setClearImagesFlagFalse());
    }
  }, [clearSelectedImages]);

  const selectFile = (e) => {
    const input = e.target;
    const files = input.files;

    for (let i = 0; i < files.length; i++) {
      let alreadyExists = false;
      for (let j = 0; j < filesArray.current.length; j++) {
        if (files[i].name === filesArray.current[j].name) {
          alreadyExists = true;
          break;
        }
      }
      if (!alreadyExists) {
        filesArray.current.push(files[i]);
      }
    }

    const dt = new DataTransfer();

    const imageArray = [];
    for (let i = 0; i < filesArray.current.length; i++) {
      dt.items.add(filesArray.current[i]);
      imageArray.push({
        name: filesArray.current[i].name,
        url: URL.createObjectURL(filesArray.current[i]),
      });
    }

    input.files = dt.files;
    setImages([...imageArray]);
  };

  const imageRemoveHandler = (e) => {
    const input = document.querySelector('input[type=file]');
    const updatedFilesArray = [];
    const imageArray = [];
    const dt = new DataTransfer();
    for (let i = 0; i < filesArray.current.length; i++) {
      if (filesArray.current[i].name !== e.target.dataset.imagename) {
        dt.items.add(filesArray.current[i]);
        updatedFilesArray.push(filesArray.current[i]);
        imageArray.push({
          name: filesArray.current[i].name,
          url: URL.createObjectURL(filesArray.current[i]),
        });
      }
    }

    filesArray.current = [...updatedFilesArray];
    input.files = dt.files;
    setImages([...imageArray]);
  };

  return (
    <div className={styles.filePickerSection}>
      <div className={styles.uploadButton}>
        <input
          id={nameAttribute}
          name={nameAttribute}
          type="file"
          accept="image/jpeg, image/png, image/jpg"
          {...rest}
          multiple={isMultiple}
          onChange={selectFile}
          ref={ref}
          className={styles.filePicker}
        />
      </div>
      <div>
        {images.length ? (
          <div className={styles.imageList}>
            {images.map((image) => (
              <ImageThumb
                key={image.name}
                imageName={image.name}
                src={image.url}
                imageRemoveHandler={imageRemoveHandler}
                dim={{ width: 200, height: 130 }}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
});

//==========================================================

function ImageThumb({ imageName, src, imageRemoveHandler, dim }) {
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
          onClick={imageRemoveHandler}
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

export default FilePicker;
