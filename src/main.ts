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
      level: 8,
      threshold: 1000,
      filter: (req, res) => {
        return req.headers['x-no-compression']
          ? false
          : compression.filter(req, res);
      },
    }),
  ),
    app.use(cookieParser());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
}
bootstrap();
