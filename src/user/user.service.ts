import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserRole } from './dto/user.dto'; // Đảm bảo import UserRole từ DTO

@Injectable()
export class UserService {
  public users: any[] = [];

  register(user: UserDto) {
    user.role = UserRole.USER; // Đặt giá trị mặc định cho role
    this.users.push(user);
    return user;
  }
  getUsers() {
    return this.users;
  }
}
