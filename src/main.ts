import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './core/filters';
import { MySwaggerModule } from './swagger/swagger.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Cấu hình CORS ở đây
  app.enableCors({
    origin: 'http://localhost:8080', // Thay đổi nguồn tùy theo ứng dụng của bạn
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Cho phép chia sẻ cookie giữa các tên miền
  });
  app.useGlobalPipes(new ValidationPipe());
  // Đăng ký filter cho toàn bộ ứng dụng
  app.useGlobalFilters(new HttpExceptionFilter());
  MySwaggerModule.configure(app);
  await app.listen(8080);
}
bootstrap();
