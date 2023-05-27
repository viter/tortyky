import { NextResponse } from 'next/server';
import { join } from 'path';
import saveFiles from '@/utils/fileSaver';

export async function POST(request) {
  const data = await request.formData();

  const uploadDir = join(process.cwd(), 'public', 'images');

  const files = [];
  for (const file of data.entries()) {
    files.push(file[1]);
  }

  const result = await saveFiles(files, uploadDir);

  console.log('********************');
  console.log(result);
  console.log('********************');

  /* try {
    await stat(uploadDir);
  } catch (e) {
    if (e.code === 'ENOENT') {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error('Error while trying to create directory when uploading a file\n', e);
      return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
    }
  }

  try {
    for (const file of data.entries()) {
      const buffer = Buffer.from(await file[1].arrayBuffer());
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `${uniqueSuffix}.${mime.getExtension(file[1].type)}`;
      await writeFile(`${uploadDir}/${filename}`, buffer);
    }

    //return NextResponse.json({ fileUrl: `${uploadDir}/${filename}` });
    return NextResponse.json({ result: 'ok' });
  } catch (e) {
    console.error('Error while trying to upload a file\n', e);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  } */
}
