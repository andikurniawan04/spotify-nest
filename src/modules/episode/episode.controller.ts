import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { GetUser } from 'src/core/decorators/GetUser.decorator';
import { User } from '../user/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Episode')
@Controller('episode')
@UseGuards(AuthGuard())
export class EpisodeController {
  constructor(private readonly episdoeService: EpisodeService) { }
  @Get(':id')
  async episode(@Param('id') id: string, @GetUser() user: User) {
    const data = await this.episdoeService.episode(id, user);

    return data;
  }
}
