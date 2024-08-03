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
import {
  ApiBody,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    type: LoginDto,
  })
  @ApiNotFoundResponse({
    status: 404,
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'boolean',
          default: false,
        },
        message: {
          type: 'string',
          default: 'Username or password is wrong',
        },
      },
    },
  })
  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    const accessToken = await this.authService.login(loginDto);

    return {
      status: true,
      'access-token': accessToken,
    };
  }

  @ApiBody({ type: RegisterDto })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
