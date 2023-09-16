import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  IsEnum,
} from 'class-validator';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export class UserDto {
  @IsString({ message: 'Tên người dùng phải là chuỗi' })
  @IsNotEmpty({ message: 'Tên người dùng không được để trống' })
  @IsDefined({ message: 'Tên người dùng là bắt buộc' })
  name: string;

  @IsString({ message: 'Email người dùng phải là chuỗi' })
  @IsEmail({}, { message: 'Email người dùng không đúng định dạng' })
  @IsNotEmpty({ message: 'Email người dùng người dùng không được để trống' })
  email: string;

  @IsString({ message: 'Mật khẩu người dùng phải là chuỗi' })
  @Length(4, 20, { message: 'Mật khẩu người dùng phải lớn hơn 3 ký tự' })
  @IsNotEmpty({ message: 'Mật khẩu người dùng không được để trống' })
  password: string;

  @IsEnum(UserRole, { message: 'Giá trị của role không hợp lệ' })
  role: UserRole = UserRole.USER;
}
