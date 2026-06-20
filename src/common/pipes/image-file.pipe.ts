import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ImageFilePipe implements PipeTransform<Express.Multer.File> {
  private readonly maxSize = 1024 * 1024; // 1 MB

  transform(file: Express.Multer.File): Express.Multer.File {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }

    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('Only image files are allowed');
    }

    if (file.size > this.maxSize) {
      throw new BadRequestException('Image size must be less than 1 MB');
    }

    return file;
  }
}
