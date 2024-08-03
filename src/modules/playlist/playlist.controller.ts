import { Controller, Get, Param } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Playlist')
@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Get(':id')
  async playlist(@Param('id') id: string) {
    const data = await this.playlistService.playlist(id);

    return {
      status: true,
      data,
    };
  }
}
