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
  UseGuards,
  Req,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { sendResponse } from 'src/common/sendRespone/sendRespone';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from 'src/common/guards/isAdmin.guard';
import { ImageBase64Interceptor } from 'src/common/interceptor/imageBase64';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/signup')
  @UseInterceptors(ImageBase64Interceptor)
  @HttpCode(201)
  async signup(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const data = await this.userService.signUp(createUserDto);
      data.password = undefined;
      data.role = undefined;
      return sendResponse(res, 201, 'Đăng ký thành công', data);
    } catch (error) {
      return sendResponse(res, 500, error.message);
    }
  }
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Res() res: Response) {
    const token = await this.userService.login(req.user);

    res.cookie('token', token.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    return sendResponse(res, 200, 'Đăng nhập thành công', token);
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
      return sendResponse(res, 500, error.message);
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
      return sendResponse(res, 500, error.message);
    }
  }
  @Get('search/:name')
  @HttpCode(200)
  async search(@Param('name') name: string, @Res() res: Response) {
    try {
      const data = await this.userService.search(name);
      return sendResponse(res, 200, 'Tìm kiếm người dùng thành công', data);
    } catch (error) {
      return sendResponse(res, 500, error.message);
    }
  }

  @Patch(':id')
  // @UseGuards(RolesGuard)
  @HttpCode(201)
  async update(
    @Param('id') id: any,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    try {
      const data = await this.userService.update(id, updateUserDto);
      return sendResponse(res, 201, 'Cập nhật người dùng thành công', data);
    } catch (error) {
      return sendResponse(res, 500, error.message);
    }
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
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
      return sendResponse(res, 500, error.message);
    }
  }
}
