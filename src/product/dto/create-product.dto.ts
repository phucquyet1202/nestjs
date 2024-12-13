import {
  IsArray,
  isArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  Min,
} from 'class-validator';
export class CreateProductDto {
  @IsNotEmpty({ message: 'Tên sản phẩm không được để trống' })
  name: string;

  @IsNotEmpty({ message: 'Ảnh sản phẩm không được để trống' })
  // @IsArray()
  images: [
    {
      uri: string;
      url: string;
    },
  ];

  @IsNotEmpty({ message: 'Giá sản phẩm không được để trống' })
  @IsNumber({}, { message: 'Giá sản phẩm phải là 1 số' })
  @Min(0, { message: 'Giá sản phẩm không được nhỏ hơn 0' })
  price: number;

  @IsNotEmpty({ message: 'Số lượng sản phẩm không được để trống' })
  @IsNumber({}, { message: 'Số lượng sản phẩm phải là 1 số' })
  @IsInt({ message: 'Số lượng phải là số nguyên' })
  @Min(0, { message: 'Số lượng không được nhỏ hơn 0' })
  quantity: number;

  @IsNotEmpty({ message: 'Mô tả sản phẩm không được để trống' })
  description: string;
}
