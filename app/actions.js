'use server';

const fs = require('fs');
import { db } from '@/utils/db.server';

export async function removeImage(image, tortId) {
  try {
    const tort = await db.torty.findUnique({
      where: {
        id: tortId,
      },
    });

    const result = await db.torty.update({
      where: { id: tort.id },
      data: {
        images: tort.images
          .split(',')
          .filter((im) => im !== image)
          .join(','),
      },
    });

    const torty = await db.torty.findMany({
      include: {
        tags: {
          select: {
            tag: true,
          },
        },
      },
    });
    const uploadDir = process.env.UPLOAD_DIR;
    fs.unlinkSync(`${uploadDir}/${image}`);
    return torty;
  } catch (err) {
    console.log(err);
  }
}
