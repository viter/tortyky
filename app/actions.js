'use server';

const fs = require('fs');
import { db } from '@/utils/db.server';

export async function removeImage(image, tort) {
  try {
    const result = await db.torty.update({
      where: { id: tort.id },
      data: { images: tort.images.filter((im) => im !== image).join(',') },
    });
    const uploadDir = process.env.UPLOAD_DIR;
    fs.unlinkSync(`${uploadDir}/${image}`);
  } catch (err) {
    console.log(err);
  }
}
