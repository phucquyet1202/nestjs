/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/common/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  async signUp(createUserDto: CreateUserDto): Promise<UserDocument> {
    console.log(createUserDto);
    const user = await this.userModel.findOne({ email: createUserDto.email });
    if (user) {
      throw new InternalServerErrorException('Email already exists');
    }
    const hashedPass = await this.hassPass(createUserDto.password);
    const newUser = await this.userModel.create({
      ...createUserDto,
      password: hashedPass,
    });
    return newUser.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return await this.userModel.find();
  }

  async findOne(id: string): Promise<UserDocument> {
    return await this.userModel.findById(id).exec();
  }
  async findByEmail(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({ email }).exec();
  }
  async update(id: any, updateUserDto: UpdateUserDto): Promise<UserDocument> {
    const newUser = await this.userModel.findByIdAndUpdate(
      id,
      { ...updateUserDto },
      {
        new: true,
      },
    );
    return newUser;
  }

  async remove(id: string): Promise<UserDocument> {
    const oldUser = await this.userModel.findByIdAndDelete(id);
    return oldUser;
  }
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ email: username });
    // console.log(user);

    if (user) {
      const hashedPass = this.isValidPass(pass, user.password);
      if (hashedPass === true) {
        return user;
      }
    }
    return null;
  }
  async login(user: any) {
    const payload = { sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async hassPass(pass: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = bcrypt.hash(pass, salt);
    return hashedPass;
  }
  isValidPass(pass: string, hashedPass: string): boolean {
    return bcrypt.compareSync(pass, hashedPass);
  }

  async search(query: string): Promise<CreateUserDto[]> {
    const user = await this.userModel.find({
      username: { $regex: new RegExp(query, 'i') },
    });
    if (!user || user.length === 0) {
      throw new InternalServerErrorException('User not found');
    }
    return user;
  }
}
