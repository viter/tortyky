import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/utils/db.server';
import { join } from 'path';
const fs = require('fs');
import saveFiles from '@/utils/fileSaver';

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  const roles = session?.user?.roles.split(',');
  if (!session || (session && !roles.includes('5'))) {
    return NextResponse.json('Заборонена дія!');
  }

  try {
    const result = await db.torty.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    if (result.images) {
      const images = result.images.split(',');
      if (images.length > 0) {
        const uploadDir = join(process.cwd(), 'public', 'images');
        images.forEach((image) => {
          fs.unlinkSync(`${uploadDir}/${image}`);
        });
      }
    }

    const torty = await db.torty.findMany({
      include: {
        tags: {
          select: {
            tag: true,
          },
        },
      },
    });

    return NextResponse.json(torty);
  } catch (err) {
    if (err.code === 'P2003') {
      return NextResponse.json(err);
    }
  }
}

export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  const roles = session?.user?.roles.split(',');
  if (!session || (session && !roles.includes('5'))) {
    return NextResponse.json('Заборонена дія!');
  }

  const data = await request.formData();

  const uploadDir = join(process.cwd(), 'public', 'images');

  const files = [];
  for (const file of data.entries()) {
    if (file[0] === 'files') {
      files.push(file[1]);
    }
  }

  const result = await saveFiles(files, uploadDir);
  if (files.length === 0 || (files.length > 0 && result.fileNames.length > 0)) {
    const tort = JSON.parse(data.get('tort'));
    const tagsArray = tort.tag ? tort.tag : [];
    const create = tagsArray.map((tag) => ({
      tag: {
        connect: {
          id: parseInt(tag),
        },
      },
    }));
    try {
      await db.TagsOnTorty.deleteMany({
        where: {
          tortId: parseInt(params.id),
        },
      });
      const currentImages = await db.torty.findFirst({
        where: {
          id: parseInt(params.id),
        },
        select: {
          images: true,
        },
      });

      let imagesToSave = currentImages.images;
      if (result.fileNames.length > 0) {
        imagesToSave += ',' + result.fileNames.join(',');
      }

      const updatedTort = await db.torty.update({
        where: {
          id: parseInt(params.id),
        },
        data: {
          name: tort.name,
          description: tort.description,
          images: imagesToSave,
          tags: {
            create,
          },
        },
        include: {
          tags: {
            select: {
              tag: true,
            },
          },
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

      return NextResponse.json({ torty, updatedTort });
    } catch (err) {
      console.log(err);
      if (result.fileNames.length) {
        result.fileNames.forEach((fileName) => {
          fs.unlinkSync(`${uploadDir}/${fileName}`);
        });
      }
      return NextResponse.json('Не вдалося зберегти тортик');
    }
  } else {
    return NextResponse.json('Фотки не збереглися');
  }
}
