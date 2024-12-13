import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from 'src/common/schemas/product.schema';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/common/cloundinary/cloudinary.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModule: Model<ProductDocument>,
    private readonly cloundinaryService: CloudinaryService,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const data = await this.productModule.create(createProductDto);
    return data;
  }

  async findAll() {
    const data = await this.productModule.find().exec();
    return data;
  }

  async findOne(id: string) {
    const data = await this.productModule.findById(id).exec();
    return data;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const data = await this.productModule.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true },
    );
    return data;
  }

  async remove(id: string) {
    const data = await this.productModule.findByIdAndDelete(id);
    data.images.forEach(
      async (image) => await this.cloundinaryService.deleteImage(image.uri),
    );
    return data;
  }
}
