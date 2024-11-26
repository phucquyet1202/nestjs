import { IsEmail, IsNotEmpty, minLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Username does not exist' })
  username: string;
  @IsNotEmpty({ message: 'Password does not exist' })
  password: string;
  @IsNotEmpty({ message: 'Email does not exist' })
  @IsEmail({ ignore_max_length: true })
  email: string;
  role: string;
}
