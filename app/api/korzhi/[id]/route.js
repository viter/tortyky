import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/utils/db.server';
const fs = require('fs');
import saveFiles from '@/utils/fileSaver';

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  const roles = session?.user?.roles.split(',');
  if (!session || (session && !roles.includes('5'))) {
    return NextResponse.json('Заборонена дія!');
  }

  try {
    const result = await db.korzhi.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    if (result.images) {
      const images = result.images.split(',');
      if (images.length > 0) {
        const uploadDir = process.env.UPLOAD_DIR;
        images.forEach((image) => {
          fs.unlinkSync(`${uploadDir}/${image}`);
        });
      }
    }

    const korzhi = await db.korzhi.findMany({});

    return NextResponse.json(korzhi);
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

  const uploadDir = process.env.UPLOAD_DIR;

  const files = [];
  for (const file of data.entries()) {
    if (file[0] === 'files') {
      files.push(file[1]);
    }
  }

  const result = await saveFiles(files, uploadDir);
  if (files.length === 0 || (files.length > 0 && result.fileNames.length > 0)) {
    const korzh = JSON.parse(data.get('korzhi'));
    try {
      const currentImages = await db.korzhi.findFirst({
        where: {
          id: parseInt(params.id),
        },
        select: {
          images: true,
        },
      });

      let imagesToSave = currentImages.images;
      if (result.fileNames.length > 0) {
        if (imagesToSave.length > 0) {
          imagesToSave += ',' + result.fileNames.join(',');
        } else {
          imagesToSave = result.fileNames.join(',');
        }
      }

      const updatedKorzh = await db.korzhi.update({
        where: {
          id: parseInt(params.id),
        },
        data: {
          name: korzh.name,
          description: korzh.description,
          images: imagesToSave,
        },
      });

      const korzhi = await db.korzhi.findMany({});

      return NextResponse.json({ korzhi, updatedKorzh });
    } catch (err) {
      console.log(err);
      if (result.fileNames.length) {
        result.fileNames.forEach((fileName) => {
          fs.unlinkSync(`${uploadDir}/${fileName}`);
        });
      }
      return NextResponse.json('Не вдалося зберегти коржик');
    }
  } else {
    return NextResponse.json('Фотки не збереглися');
  }
}
