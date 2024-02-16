import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(email: string, password: string) {
    // const user = await this.userService.findByEmail(email);
  }
}
