import {
  Controller,
  Body,
  Delete,
  Ip,
  Post,
  Req,
  Res,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/user.dto';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    const accessToken = await this.authService.login(loginDto);

    return {
      status: true,
      'access-token': accessToken,
    };
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
