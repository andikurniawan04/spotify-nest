import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}

  async album(idAlbum: string) {
    const album = await this.albumRepository.findOne({
      where: { id: idAlbum },
      relations: ['artists'],
    });

    if (!album) {
      throw new NotFoundException({ message: 'Data Not Found' });
    }

    const { id, title, year, thumbnail, artists } = album;

    const selectArtist = artists.map((item) => ({
      id: item.id,
      name: item.name,
      images: item.images,
    }));

    return { id, title, year, thumbnail, artists: selectArtist };
  }
}
