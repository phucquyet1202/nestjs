/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getUsers() {
    const users = this.userService.getUsers();
    return users;
  }
  @Post()
  register(@Body() user: UserDto) {
    // console.log(user);
    const newUser = this.userService.register(user);
    return newUser;
  }
}
