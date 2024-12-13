import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { promises as fs } from 'fs';
import { ProductService } from 'src/product/product.service';
import { CloudinaryService } from '../cloundinary/cloudinary.service';

@Injectable()
export class FormDataToJsonInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    // console.log(request);
    if (request.body && typeof request.body === 'object') {
      for (const key in request.body) {
        if (typeof request.body[key] === 'string') {
          try {
            request.body[key] = JSON.parse(request.body[key]);
          } catch (e) {
            console.error(`Error parsing field ${key}: ${e.message}`);
          }
        }
      }
    }
    return next.handle().pipe(map((data) => data));
  }
}

@Injectable()
export class UploadImageInterceptor implements NestInterceptor {
  constructor(
    @Inject(CloudinaryService)
    private readonly cloudinaryService: CloudinaryService,
    private readonly productService: ProductService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const files = request.files as Express.Multer.File[];
    console.log(files);
    if (request.method === 'POST') {
      if (!files || files.length === 0) {
        throw new BadRequestException('Ảnh không được để trống');
      }

      const uploadPromises = await Promise.all(
        files.map((file) => this.cloudinaryService.uploadImage(file)),
      );
      request.body.images = uploadPromises.map((result) => ({
        url: result.secure_url,
        uri: result.public_id,
      }));
    } else if (request.method === 'PATCH') {
      const existingProduct = await this.productService.findOne(
        request.params.id,
      );

      if (!existingProduct) {
        throw new BadRequestException('Product not found');
      }

      const imagesToKeep = request.body.images ?? null;
      let newImages = [];

      if (files && files.length > 0) {
        const uploadPromises = await Promise.all(
          files.map((file) => this.cloudinaryService.uploadImage(file)),
        );
        newImages = uploadPromises.map((result) => ({
          url: result.secure_url,
          uri: result.public_id,
        }));
      }

      // Handling four cases
      if (newImages.length > 0 && imagesToKeep !== null) {
        // Case 1: Có cả imagesToKeep và newImages
        const imagesToDelete = existingProduct.images.filter(
          (img) => !imagesToKeep.includes(img.uri),
        );
        await Promise.all(
          imagesToDelete.map((img) =>
            this.cloudinaryService.deleteImage(img.uri),
          ),
        );

        request.body.images = [
          ...existingProduct.images.filter((img) =>
            imagesToKeep.includes(img.uri),
          ),
          ...newImages,
        ];
      } else if (imagesToKeep === null && newImages.length > 0) {
        // Case 2: Chỉ có newImages, không có imagesToKeep
        request.body.images = [...existingProduct.images, ...newImages];
      } else if (
        Array.isArray(imagesToKeep) &&
        imagesToKeep.length === 0 &&
        newImages.length > 0
      ) {
        console.log(3);
        // Case 3: `imagesToKeep` là một mảng rỗng và có newImages
        await Promise.all(
          existingProduct.images.map((img) =>
            this.cloudinaryService.deleteImage(img.uri),
          ),
        );
        request.body.images = newImages;
      } else {
        // Case 4: Không có cả hai hoặc req.body.images là null
        request.body.images = existingProduct.images;
      }
    }

    files.forEach(async (file) => {
      await deleteLocalFile(file.path);
    });

    return next.handle();
  }
}

async function deleteLocalFile(filePath: string): Promise<void> {
  try {
    await fs.unlink(filePath);
  } catch (error) {
    console.error(`Error deleting file: ${error.message}`);
  }
}
