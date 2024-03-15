import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('album')
@UseGuards(AuthGuard())
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
