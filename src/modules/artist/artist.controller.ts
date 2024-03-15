import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('artist')
@UseGuards(AuthGuard())
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}
  @Get(':id')
  async artist(@Param('id') id: string) {
    const data = await this.artistService.artist(id);

    return {
      status: true,
      data,
    };
  }
}
