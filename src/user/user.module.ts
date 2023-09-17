import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { LoggerMiddleware } from '../middlewares'; // Import LoggerMiddleware

@Module({
  imports: [],
  controllers: [UserController], // Chúng ta đang sử dụng UserController để xử lý các request.
  providers: [UserService],
})
export class UserModule implements NestModule {
  // Module `UserModule` implements `NestModule` để có thể sử dụng Middleware

  configure(consumer: MiddlewareConsumer) {
    // Hàm `configure` này cho phép chúng ta định cấu hình việc sử dụng Middleware cho module này.

    consumer.apply(LoggerMiddleware).forRoutes('user');
    // Ở đây, chúng ta đang áp dụng Middleware là `LoggerMiddleware` cho route 'user'.
    // Điều này có nghĩa rằng mỗi khi có một HTTP request đến route 'user',
    // Middleware này sẽ được chạy trước khi request đến tới UserController để xử lý.
    // `forRoutes` được sử dụng để chỉ định route mà Middleware sẽ áp dụng.

    // MiddlewareConsumer có thể được sử dụng để áp dụng Middleware cho một hoặc nhiều route khác nhau,
    // cho nhiều module khác nhau, tùy theo nhu cầu của ứng dụng.
  }
}
