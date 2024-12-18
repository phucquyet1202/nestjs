import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ required: true })
  username: string;
  @Prop({ required: true })
  avata: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true, default: 'user' })
  role: string;
}
export const UserSchema = SchemaFactory.createForClass(User);