import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import saveFiles from '@/utils/fileSaver';
import { db } from '@/utils/db.server';
const fs = require('fs');

export async function POST(request) {
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
    const tort = JSON.parse(data.get('tort'));
    const tagsArray = tort.tag ? Array.isArray(tort.tag) ? tort.tag : new Array(tort.tag) : [];
    const create = tagsArray.map((tag) => ({
      tag: {
        connect: {
          id: parseInt(tag),
        },
      },
    }));
    try {
      const res = await db.torty.create({
        data: {
          name: tort.name,
          description: tort.description,
          images: result.fileNames.join(','),
          tags: {
            create,
          },
        },
        include: {
          tags: {
            select: {
              tag: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      return NextResponse.json(res);
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
