import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // Sử dụng hàm validateRequest và trả về kết quả xác thực.
    return this.validateRequest(request);
  }

  async validateRequest(req: any): Promise<boolean> {
    console.log('Ban can dang nhap');
    // Triển khai logic xác thực của bạn tại đây.
    // Trả về true nếu xác thực thành công hoặc false nếu không.
    return true; // Đây là một ví dụ đơn giản, bạn cần thay thế nó bằng logic xác thực thực tế.
  }
}
