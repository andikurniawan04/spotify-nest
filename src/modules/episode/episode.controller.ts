import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { GetUser } from 'src/core/decorators/GetUser.Decorator';
import { User } from '../user/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('episode')
@UseGuards(AuthGuard())
export class EpisodeController {
  constructor(private readonly episdoeService: EpisodeService) {}
  @Get(':id')
  async episode(@Param('id') id: string, @GetUser() user: User) {
    const data = await this.episdoeService.episode(id, user);

    return data;

    return {
      status: true,
      data: data,
    };
  }
}
