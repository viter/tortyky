import { stat, mkdir, writeFile } from 'fs/promises';
import mime from 'mime';

/**
 * @param {(File|File[])} files
 * @param {string} uploadDir
 * @param {string[]} [types=['jpeg', 'png', 'jpg']]
 * @returns {Promise} {code: number, message: string, fileNames: string[]}
 */
export default async function fileUploader(files, uploadDir, types = ['jpeg', 'png', 'jpg']) {
  let filesToSave = [];

  if (Array.isArray(files)) {
    filesToSave = [...files];
  } else {
    filesToSave.push(files);
  }

  try {
    await stat(uploadDir);
  } catch (e) {
    if (e.code === 'ENOENT') {
      await mkdir(uploadDir, { recursive: true });
    } else {
      return { code: 20, message: 'Could not create directory.' };
    }
  }

  try {
    const fileNames = [];
    let failureCount = 0;
    for (const file of filesToSave) {
      if (types.includes(mime.getExtension(file.type))) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const filename = `${uniqueSuffix}.${mime.getExtension(file.type)}`;
        await writeFile(`${uploadDir}/${filename}`, buffer);
        fileNames.push(filename);
      } else {
        failureCount++;
      }
    }

    if (failureCount > 0 && failureCount === filesToSave.length) {
      return {
        code: 40,
        message: `Not supported file types. Only ${types} are allowed.`,
        fileNames: [],
      };
    }

    if (failureCount > 0 && failureCount < filesToSave.length) {
      return {
        code: 41,
        message: `Some files have not supported types. Only ${types} are allowed.`,
        fileNames: [],
      };
    }

    return { code: 10, message: 'ok', fileNames };
  } catch (e) {
    console.error('Error while trying to upload a file\n', e);
    return { code: 30, message: 'Could not save file.', fileNames: [] };
  }
}
