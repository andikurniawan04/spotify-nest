import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
  ) {}

  async song(idSong: string) {
    const song = await this.songRepository.findOne({
      where: { id: idSong },
      relations: ['artists'],
    });

    if (!song) {
      throw new NotFoundException({ message: 'Data Not Found' });
    }

    const { id, title, duration, album_id, artists } = song;

    const selectArtist = artists.map((item) => ({
      id: item.id,
      name: item.name,
      images: item.images,
    }));

    return { id, title, duration, album_id, artists: selectArtist };
  }
}
