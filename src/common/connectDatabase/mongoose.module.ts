import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Để đọc cấu hình từ environment variables

@Module({
  imports: [
    ConfigModule, // Đảm bảo bạn đã cài đặt và cấu hình ConfigModule nếu dùng .env
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Kết nối với module Config nếu dùng .env
      inject: [ConfigService], // Inject ConfigService để lấy thông tin kết nối từ .env
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'), // Đọc URI từ .env
      }),
    }),
  ],
})
export class MongooseDatabaseModule {}
