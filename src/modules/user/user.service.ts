import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Artist } from '../artist/artist.entity';
import { followingArtistDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async listFollowArtist() {
    return 'andi';
  }

  async followArtist(user: User, followingArtistDto: followingArtistDto) {
    const { artistId } = followingArtistDto;
    const artist = await this.artistRepository.findOne({
      where: { id: artistId },
    });

    if (!artist) {
      throw new NotFoundException({ message: 'Artist Not Found' });
    }

    const followArtist = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['artists'],
    });

    let followingArtist = false;
    followArtist.artists.map((item) => {
      if (item.id === artistId) {
        followingArtist = true;
      }
    });

    if (followingArtist) {
      return 'User is aiready follow the artist';
    }

    followArtist.artists = [artist];
    await this.userRepository.save(followArtist);

    return 'Follow the artist was succesfully';
  }

  async unfollowArtist(user: User, followingArtistDto: followingArtistDto) {
    const { artistId } = followingArtistDto;
    const artist = await this.artistRepository.findOne({
      where: { id: artistId },
    });

    if (!artist) {
      throw new NotFoundException({ message: 'Artist Not Found' });
    }

    const unfollowArtist = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['artists'],
    });

    unfollowArtist.artists = [artist];

    unfollowArtist.artists = unfollowArtist.artists.filter(
      (item) => item.id !== artistId,
    );

    await this.userRepository.save(unfollowArtist);

    return 'Unfollow the artist was succesfully';
  }
}
