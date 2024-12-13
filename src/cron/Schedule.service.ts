import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ScheduleService {
  constructor(private readonly userService: UserService) {}

  // @Cron(CronExpression.EVERY_5_SECONDS) // Chạy mỗi phút
  handleCron() {
    console.log('Running the task to create a new user every minute.');
    // Tạo user mới
    this.userService.signUp({
      username: `user-${Date.now()}`,
      password: '12456467643',
      email: `user-${Date.now()}@example.com`,
      role: 'user',
    });
  }
}
