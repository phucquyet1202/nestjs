/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const newUser = await this.userModel.create(createUserDto);
    return newUser.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return await this.userModel.find();
  }

  async findOne(id: string): Promise<UserDocument> {
    return await this.userModel.findById(id).exec();
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    const newUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
    return newUser.save();
  }

  async remove(id: string): Promise<UserDocument> {
    const oldUser = await this.userModel.findByIdAndDelete(id);
    return oldUser;
  }
}
