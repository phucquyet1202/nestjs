import { Module, INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

@Module({})
export class MySwaggerModule {
  static configure(app: INestApplication) {
    const options = new DocumentBuilder()
      .setTitle('API Documentation')
      .setDescription('API documentation for all routes')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);
  }
}
