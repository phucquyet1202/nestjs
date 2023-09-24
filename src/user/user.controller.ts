/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { Request } from 'express';
import { AuthGuard } from '../core/guard/index';
import { LoggingInterceptor } from '../core/interceptor/index';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  @UseGuards(new AuthGuard())
  @UseInterceptors(new LoggingInterceptor())
  async getUsers(): Promise<UserDto[]> {
    const users = this.userService.getUsers();
    if (users.length > 0) {
      return Promise.resolve(users);
    }
    throw new NotFoundException('Khong ton tai nguoi dung');
  }
  @Post()
  register(@Body() user: UserDto) {
    // console.log(user);
    const newUser = this.userService.register(user);
    return newUser;
  }
}
