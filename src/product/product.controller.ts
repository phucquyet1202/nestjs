import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UploadedFiles,
  UseGuards,
  Res,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'multer.config';
import { CloudinaryService } from 'src/common/cloundinary/cloudinary.service';
import {
  FormDataToJsonInterceptor,
  UploadImageInterceptor,
} from 'src/common/interceptor/convertData';
import { RolesGuard } from 'src/common/guards/isAdmin.guard';
import { sendResponse } from 'src/common/sendRespone/sendRespone';
import { Response } from 'express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  // @UseGuards(RolesGuard)
  @UseInterceptors(
    FilesInterceptor('images', 10, multerConfig),
    UploadImageInterceptor,
    FormDataToJsonInterceptor,
  )
  async create(
    @Body() createProductDto: CreateProductDto,
    @Res() res: Response,
  ) {
    try {
      const data = this.productService.create(createProductDto);
      return sendResponse(res, 201, 'Tạo sản phẩm thành công', data);
    } catch (error) {
      return sendResponse(res, 500, error.message);
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const data = await this.productService.findAll();
      return sendResponse(res, 200, 'Lấy danh sách sản phẩn thành công', data);
    } catch (error) {
      return sendResponse(res, 500, error.message);
    }
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @UseInterceptors(
    FilesInterceptor('newImages', 10, multerConfig),
    UploadImageInterceptor,
    FormDataToJsonInterceptor,
  )
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Res() res: Response,
  ) {
    try {
      const data = await this.productService.update(id, updateProductDto);
      return sendResponse(res, 200, 'Cập nhật sản phẩm thành công', data);
    } catch (error) {
      return sendResponse(res, 500, error.message);
    }
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.productService.remove(id);
      return sendResponse(res, 200, 'Xóa sản phẩm thành công', data);
    } catch (error) {
      return sendResponse(res, 500, error.message);
    }
  }
}
