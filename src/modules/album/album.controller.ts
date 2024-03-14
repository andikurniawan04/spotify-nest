import { Controller, Get, Param } from '@nestjs/common';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}
  @Get(':id')
  async album(@Param('id') id: string) {
    const data = await this.albumService.album(id);

    return {
      status: true,
      data: data,
    };
  }
}
