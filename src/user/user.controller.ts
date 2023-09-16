/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  register(@Body() user: UserDto) {
    // console.log(user);
    const newUser = this.userService.register(user);
    return newUser;
  }
}
