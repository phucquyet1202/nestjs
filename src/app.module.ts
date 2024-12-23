import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { MongooseDatabaseModule } from './common/connectDatabase/mongoose.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { CloudinaryModule } from './common/cloundinary/cloundinary.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduleModules } from './cron/ScheduleModule.module';
import { AppController } from './app.controller';
dotenv.config();
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseDatabaseModule,
    ConfigModule,
    UserModule,
    ProductModule,
    CloudinaryModule,
    ScheduleModules,
  ],
  controllers: [AppController],
})
export class AppModule {}
