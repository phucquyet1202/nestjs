import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    compression({
      level: 6, // Mức độ nén, từ 0 đến 9 (0 là không nén, 9 là nén tối đa)
      threshold: 1024, // Chỉ nén những phản hồi có kích thước lớn hơn 1KB
      filter: (req, res) => {
        return req.headers['x-no-compression']
          ? false
          : compression.filter(req, res);
      },
    }),
  ),
    app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8080);
}
bootstrap();
