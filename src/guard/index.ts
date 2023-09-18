/**
 * Guard trong NestJS được sử dụng để kiểm tra và quyết định xem một request 
 * có được phép tiếp tục vào một route hoặc controller cụ thể hay không. 
 * Guard là một phần quan trọng của việc xác thực và phân quyền trong ứng dụng NestJS. 
 * Cụ thể, guard có các nhiệm vụ sau:

Xác thực (Authentication): Guard có thể được sử dụng để kiểm tra xem một request 
có chứa thông tin đăng nhập hợp lệ (ví dụ: token, cookie, hoặc session) hay không. 
Nếu request không được xác thực, guard có thể chuyển hướng hoặc từ chối request.

Phân quyền (Authorization): Guard có thể kiểm tra quyền truy cập của người dùng 
đối với một route cụ thể. Ví dụ, guard có thể kiểm tra xem người dùng có quyền 
truy cập vào một tài nguyên hay không (ví dụ: truy cập vào một endpoint chỉ dành 
  cho quản trị viên).

Kiểm tra dữ liệu đầu vào (Data Validation): Guard có thể kiểm tra và xác minh 
tính hợp lệ của dữ liệu đầu vào từ request trước khi nó được chuyển đến controller. 
Điều này giúp bảo vệ ứng dụng khỏi các tấn công như SQL injection 
hoặc dữ liệu đầu vào không hợp lệ.

Log và theo dõi (Logging and Monitoring): Guard có thể được sử dụng để ghi log 
và theo dõi các hoạt động của request, giúp theo dõi và phân tích ứng dụng.

Guard có thể được áp dụng cho toàn bộ controller hoặc chỉ một vài routes cụ thể, 
tùy thuộc vào yêu cầu của ứng dụng. Guard có thể trả về giá trị Boolean hoặc một 
promise hoặc một Observable để quyết định xem request có được phép tiếp tục hay không.
 */

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Lấy đối tượng request từ ExecutionContext
    const request = context.switchToHttp().getRequest();

    // Sử dụng hàm validateRequest và trả về kết quả xác thực.
    return this.validateRequest(request);
  }

  async validateRequest(req: any): Promise<boolean> {
    // In thông báo khi cần đăng nhập
    console.log('Bạn cần đăng nhập');

    // Triển khai logic xác thực của bạn tại đây.
    // Trả về true nếu xác thực thành công hoặc false nếu không.
    return true; // Đây là một ví dụ đơn giản, bạn cần thay thế nó bằng logic xác thực thực tế.
  }
}
