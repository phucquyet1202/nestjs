import { Module } from '@nestjs/common';
import { ScheduleService } from './Schedule.service';
import { UserService } from 'src/user/user.service';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from 'src/user/user.module';
import { User, UserSchema } from 'src/common/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CloudinaryService } from 'src/common/cloundinary/cloudinary.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ScheduleModule.forRoot(),
    UserModule,
    JwtModule,
  ],
  controllers: [],
  providers: [ScheduleService, UserService, JwtService],
})
export class ScheduleModules {}
