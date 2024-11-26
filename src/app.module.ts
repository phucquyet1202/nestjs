import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { MongooseDatabaseModule } from './common/connectDatabase/mongoose.module';
dotenv.config();
@Module({
  imports: [MongooseDatabaseModule, UserModule],
})
export class AppModule {}
