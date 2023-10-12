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
    const korzh = JSON.parse(data.get('korzhi'));
    const tagsArray = korzh.tag
      ? Array.isArray(korzh.tag)
        ? korzh.tag
        : new Array(korzh.tag)
      : [];
    const create = tagsArray.map((tag) => ({
      tag: {
        connect: {
          id: parseInt(tag),
        },
      },
    }));
    try {
      const res = await db.korzhi.create({
        data: {
          name: korzh.name,
          description: korzh.description,
          images: result.fileNames.join(','),
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
      return NextResponse.json('Не вдалося зберегти корж');
    }
  } else {
    return NextResponse.json('Фотки не збереглися');
  }
}
