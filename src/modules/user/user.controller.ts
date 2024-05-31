import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { followingArtistDto, likeSongDto, saveEpisodeDto } from './user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/core/decorators/GetUser.decorator';
import { User } from './user.entity';

@Controller('me')
@UseGuards(AuthGuard())
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Get('following/artist')
  async listFollowArtist(@GetUser() user: User) {
    const data = await this.userService.listFollowArtist(user);

    return {
      status: true,
      total: data.length,
      data,
    };
  }

  @Get('following/artist/contains')
  async checkFollowingArtist(
    @GetUser() user: User,
    @Body() followingArtistDto: followingArtistDto,
  ) {
    const data = await this.userService.checkFollowingArtist(
      user,
      followingArtistDto,
    );

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

  @Get('like/song')
  @HttpCode(200)
  async listLikedSong(@GetUser() user: User) {
    const data = await this.userService.listLikedSong(user);

    return {
      status: true,
      data,
    };
  }

  @Post('like/song')
  @HttpCode(200)
  async addLikedSong(@GetUser() user: User, @Body() likeSongDto: likeSongDto) {
    const data = await this.userService.addLikedSong(user, likeSongDto);

    return {
      status: true,
      message: data,
    };
  }

  @Delete('like/song')
  async removeLikedSong(
    @GetUser() user: User,
    @Body() likeSongDto: likeSongDto,
  ) {
    const data = await this.userService.removeLikedSong(user, likeSongDto);

    return {
      status: true,
      message: data,
    };
  }

  @Get('saved/episode')
  @HttpCode(200)
  async listSavedSong(@GetUser() user: User) {
    const data = await this.userService.listSavedEpisode(user);

    return {
      status: true,
      data,
    };
  }

  @Post('saved/episode')
  @HttpCode(200)
  async saveEpisode(
    @GetUser() user: User,
    @Body() saveEpisodeDto: saveEpisodeDto,
  ) {
    const data = await this.userService.saveEpisode(user, saveEpisodeDto);

    return {
      status: true,
      message: data,
    };
  }

  @Delete('saved/episode')
  async removeSavedEpisode(
    @GetUser() user: User,
    @Body() saveEpisodeDto: saveEpisodeDto,
  ) {
    const data = await this.userService.removeSavedEpisode(
      user,
      saveEpisodeDto,
    );

    return {
      status: true,
      message: data,
    };
  }
}
