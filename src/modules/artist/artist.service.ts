import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async artist(id: string) {
    const artist = await this.artistRepository.findOne({
      where: { id },
      select: ['id', 'name'],
    });

    if (!artist) {
      throw new NotFoundException({ message: 'Data Not Found' });
    }

    const result = {
      status: true,
      data: artist,
    };

    return result;
  }
}
