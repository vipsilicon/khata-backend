import { NestInterceptor, Type } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

export function ImageFileInterceptor(
  fieldName: string,
  maxFileSize = 1024 * 1024, // 1 MB
): Type<NestInterceptor> {
  return FileInterceptor(fieldName, {
    storage: memoryStorage(),

    limits: {
      fileSize: maxFileSize,
    },

    fileFilter: (req, file, callback): void => {
      const isImage = file.mimetype.startsWith('image/');

      if (!isImage) {
        callback(new Error('Only image files are allowed'), false);
        return;
      }

      callback(null, true);
    },
  });
}
