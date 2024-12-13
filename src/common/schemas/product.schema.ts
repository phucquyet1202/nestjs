import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;
@Schema({ timestamps: true, versionKey: false })
export class Product {
  @Prop()
  name: string;
  @Prop()
  images: [
    {
      uri: string;
      url: string;
    },
  ];
  @Prop()
  price: number;
  @Prop()
  quantity: number;
  @Prop()
  description: string;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
