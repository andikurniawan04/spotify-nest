import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private playlistRepository: Repository<Playlist>,
  ) {}
  async playlist(idPlaylist: string) {
    const playlist = await this.playlistRepository.findOne({
      where: { id: idPlaylist },
      relations: ['songs', 'users'],
    });

    const { id, name, description, image, songs, users } = playlist;

    const selectSong = songs.map((item) => ({
      id: item.id,
      title: item.title,
      artist: item.artists,
    }));

    const selectUser = {
      id: users.id,
      name: users.name,
    };

    return {
      id,
      name,
      description,
      image,
      songs: selectSong,
      users: selectUser,
    };
  }
}
