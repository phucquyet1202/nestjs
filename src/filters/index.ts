import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException) // Decorator @Catch để chỉ định loại ngoại lệ mà filter này sẽ xử lý, trong trường hợp này là HttpException.
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // Hàm `catch` là nơi chúng ta xử lý ngoại lệ và tạo lại phản hồi HTTP tùy chỉnh.

    const ctx = host.switchToHttp(); // Lấy context HTTP từ ArgumentsHost.
    const response = ctx.getResponse<Response>(); // Lấy đối tượng response để tạo phản hồi HTTP.
    const request = ctx.getRequest<Request>(); // Lấy đối tượng request để lấy thông tin về request gốc.
    const status = exception.getStatus(); // Lấy mã trạng thái HTTP từ ngoại lệ.
    const errorMessage = exception.message; // Lấy nội dung lỗi từ ngoại lệ.
    // Tạo phản hồi tùy chỉnh với thông tin về ngoại lệ.
    response.status(status).json({
      statusCode: status, // Mã trạng thái HTTP.
      message: errorMessage,
      timestamp: new Date().toISOString(), // Thời gian tạo phản hồi.
      path: request.url, // Đường dẫn request gốc.
    });
  }
}
