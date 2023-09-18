/**
 * Interceptor trong NestJS được sử dụng để can thiệp vào
 *  quá trình xử lý yêu cầu và phản hồi HTTP trước khi chúng 
 * đến tới các route handler (controller methods) và sau khi chúng 
 * đã ra khỏi các route handler. Interceptors cho phép bạn thực hiện các tác vụ như:

Xử lý dữ liệu đầu vào: Bạn có thể biến đổi hoặc kiểm tra dữ liệu đầu vào trước 
khi nó được truyền đến route handler. Ví dụ, bạn có thể kiểm tra và xác thực dữ liệu 
đầu vào, chuyển đổi nó thành một định dạng khác hoặc thậm chí thay thế nó bằng dữ liệu 
mặc định nếu nó thiếu.

Xử lý dữ liệu phản hồi: Interceptors cho phép bạn kiểm tra và biến đổi dữ liệu 
phản hồi trước khi nó được gửi đi cho client. Ví dụ, bạn có thể thêm các trường 
thông tin vào phản hồi, áp dụng kiểu định dạng phản hồi chuẩn, hoặc nén dữ liệu 
trước khi gửi đi.

Logging: Bạn có thể sử dụng Interceptors để ghi lại các yêu cầu và phản hồi, 
giúp bạn theo dõi hoạt động của ứng dụng và debug lỗi dễ dàng hơn.

Validation: Interceptors có thể thực hiện kiểm tra dữ liệu đầu vào và trả về lỗi 
nếu dữ liệu không hợp lệ, giúp bạn xác thực dữ liệu trước khi xử lý nó.

Caching: Bằng cách sử dụng Interceptors, bạn có thể thực hiện caching dữ liệu để 
tăng hiệu suất ứng dụng, tránh việc truy vấn lại dữ liệu khi có yêu cầu giống nhau.

Xử lý lỗi: Interceptors có thể thực hiện xử lý lỗi và trả về phản hồi lỗi tùy chỉnh nếu 
có lỗi xảy ra trong quá trình xử lý yêu cầu.

Interceptors là một công cụ mạnh mẽ trong NestJS giúp bạn tách biệt các tác vụ tiền 
xử lý và sau xử lý ra khỏi route handler chính, giúp mã của bạn trở nên dễ bảo trì và 
linh hoạt hơn.
 */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Ghi log trước khi request được xử lý
    console.log('Before...');

    // Lấy thời điểm bắt đầu xử lý request
    const now = Date.now();

    // Chuyển request đi tiếp và lắng nghe khi nó hoàn thành
    return next.handle().pipe(
      // Thực hiện hành động sau khi request đã xử lý
      tap(() => {
        // Tính thời gian xử lý bằng cách lấy thời điểm hiện tại trừ đi thời điểm bắt đầu
        console.log(`After... ${Date.now() - now}ms`);
      }),
    );
  }
}
