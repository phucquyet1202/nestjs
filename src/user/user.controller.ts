/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { sendResponse } from 'src/common/sendRespone/sendRespone';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const data = await this.userService.create(createUserDto);
      return sendResponse(res, 201, 'Thêm người dùng thành công', data);
    } catch (error) {
      return sendResponse(res, 500, 'Lỗi server');
    }
  }

  @Get()
  @HttpCode(200)
  async findAll(@Res() res: Response) {
    try {
      const data = await this.userService.findAll();
      return sendResponse(
        res,
        200,
        'Lấy danh sách người dùng thành công',
        data,
      );
    } catch (error) {
      return sendResponse(res, 500, 'Lỗi server ' + error.message);
    }
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.userService.findOne(id);
      return sendResponse(
        res,
        200,
        'Lấy danh sách người dùng thành công',
        data,
      );
    } catch (error) {
      return sendResponse(res, 500, 'Lỗi server ' + error.message);
    }
  }

  @Patch(':id')
  @HttpCode(201)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    try {
      const data = await this.userService.update(id, updateUserDto);
      return sendResponse(res, 201, 'Lấy người dùng thành công', data);
    } catch (error) {
      return sendResponse(res, 500, 'Lỗi server ' + error.message);
    }
  }

  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.userService.remove(id);
      return sendResponse(
        res,
        200,
        'Lấy danh sách người dùng thành công',
        data,
      );
    } catch (error) {
      return sendResponse(res, 500, 'Lỗi server ' + error.message);
    }
  }
}
