import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as sharp from 'sharp';

dotenv.config(); // Load biến môi trường từ .env

@Injectable()
export class ImageBase64Interceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const filePath = path.resolve(process.env.IMAGE_PATH); // Sử dụng biến môi trường

    try {
      // Kiểm tra xem file có tồn tại không
      await sharp(filePath).metadata(); // Nếu file không tồn tại, hàm này sẽ throw error
    } catch (err) {
      throw new Error(`File not found: ${filePath}`);
    }

    // Chuyển đổi file ảnh sang Base64
    const base64 = await sharp(filePath)
      .toBuffer()
      .then((data) => data.toString('base64'))
      .catch((err) => {
        throw new Error(`Error processing file: ${err.message}`);
      });

    // Thêm tiền tố data:image/png;base64, vào chuỗi Base64
    const base64ImageUrl = `data:image/jpg;base64,${base64}`;

    const request = context.switchToHttp().getRequest();
    request.body.avata = base64ImageUrl;

    return next.handle().pipe(
      map((data) => ({
        ...data,
        avata: request.body.avata,
      })),
    );
  }
}
