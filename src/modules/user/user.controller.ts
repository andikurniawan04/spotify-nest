import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ArtistService } from '../artist/artist.service';
import { UserService } from './user.service';
import { followingArtistDto } from './user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/core/decorators/GetUser.Decorator';
import { User } from './user.entity';

@Controller('me')
@UseGuards(AuthGuard())
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('following/artist')
  async listFollowArtist() {
    const data = await this.userService.listFollowArtist();

    return data;
  }

  @Post('following/artist')
  @HttpCode(200)
  async followingArtist(
    @GetUser() user: User,
    @Body() followingArtistDto: followingArtistDto,
  ) {
    const data = await this.userService.followArtist(user, followingArtistDto);

    return {
      status: true,
      message: data,
    };
  }

  @Delete('following/artist')
  async unfollowArtist(
    @GetUser() user: User,
    @Body() followingArtistDto: followingArtistDto,
  ) {
    const data = await this.userService.unfollowArtist(
      user,
      followingArtistDto,
    );

    return {
      status: true,
      message: data,
    };
  }
}
