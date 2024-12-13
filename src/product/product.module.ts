import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product, ProductSchema } from 'src/common/schemas/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryService } from 'src/common/cloundinary/cloudinary.service';
import { CloudinaryProvider } from 'src/common/cloundinary/cloudinary.provider';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { multerConfig } from 'multer.config';
import { MulterModule } from '@nestjs/platform-express';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { User, UserSchema } from 'src/common/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: User.name, schema: UserSchema },
    ]),
    MulterModule.register(multerConfig),
  ],
  controllers: [ProductController],
  providers: [ProductService, CloudinaryService, JwtService, UserService],
})
export class ProductModule {}
