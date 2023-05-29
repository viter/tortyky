import dataURLtoBlob from './dataURLToBlob';

/**
 *
 * @param {FileList} images
 * @return {Promise} list of resized image files
 */
export default async function getResizedImages(imageFiles) {
  const resizedImages = await Promise.all(
    Array.from(imageFiles).map((imageFile) => resizeImage(imageFile)),
  );

  const dt = new DataTransfer();
  resizedImages.forEach((ri) => {
    dt.items.add(ri);
  });

  return dt.files;
}

function resizeImage(imageFile) {
  return new Promise((resolve) => {
    const fr = new FileReader();
    fr.onload = function () {
      const image = new Image();
      image.onload = function () {
        const options = {
          maxWidth: 1024,
          maxHeight: 768,
          contentType: imageFile.type,
          quality: 0.6,
        };

        const [newWidth, newHeight] = calculateSize(image, options);

        const canvas = document.createElement('canvas');
        canvas.width = newWidth;
        canvas.height = newHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, newWidth, newHeight);

        const resultUrl = canvas.toDataURL(options.contentType, options.quality);

        return resolve(
          new File([dataURLtoBlob(resultUrl)], imageFile.name, {
            type: imageFile.type,
            lastModified: new Date().getTime(),
          }),
        );
      };
      //when image src is set then image.onload gets fired
      image.src = this.result;
    };
    //when fr.readAsDataURL is called then fr.onload gets fired
    fr.readAsDataURL(imageFile);
  });
}

function calculateSize(img, options) {
  let w = img.width,
    h = img.height;
  if (w > h) {
    if (w > options.maxWidth) {
      h = Math.round((h * options.maxWidth) / w);
      w = options.maxWidth;
    }
  } else {
    if (h > options.maxHeight) {
      w = Math.round((w * options.maxHeight) / h);
      h = options.maxHeight;
    }
  }

  return [w, h];
}
