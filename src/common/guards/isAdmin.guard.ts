import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const token = request.cookies['token'];
    if (!token) throw new UnauthorizedException('Bạn chưa đăng nhập');
    try {
      const decode = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      if (decode.exp < Date.now() / 1000)
        throw new UnauthorizedException('Token đã hết hạn');
      const user = await this.userService.findOne(decode.sub);
      user.password = undefined;
      if (user.role !== 'admin') {
        throw new UnauthorizedException('Bạn không có quyền truy cập');
      }

      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;

      throw new ForbiddenException('Forbidden resource');
    }
  }
}
