import { Controller, Get, Param } from '@nestjs/common';
import { SongService } from './song.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Song')
@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}
  @Get(':id')
  async artist(@Param('id') id: string) {
    const data = await this.songService.song(id);

    return {
      status: true,
      data,
    };
  }
}
