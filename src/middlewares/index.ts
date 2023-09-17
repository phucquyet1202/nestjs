import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Middleware là một phần của quy trình xử lý HTTP request trong NestJS.
    // Nó cho phép bạn xử lý request trước khi nó đến tới route handler hoặc controller.

    // Ở đây, chúng ta đang sử dụng một Middleware tên là "LoggerMiddleware".
    // Middleware này sẽ log ra màn hình console một thông báo "Request..."
    // mỗi khi có một HTTP request đến.

    console.log('Request...'); // In ra thông báo "Request..." vào console.

    // Tiếp theo, chúng ta gọi hàm `next()` để báo cho NestJS rằng Middleware đã hoàn thành công việc của nó
    // và yêu cầu chuyển tiếp xử lý đến route handler hoặc controller tiếp theo trong chuỗi Middleware nếu có.
    // Nếu không có `next()`, request sẽ bị treo và không tiếp tục được xử lý.

    next();
  }
}
