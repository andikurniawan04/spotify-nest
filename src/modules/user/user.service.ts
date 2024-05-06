import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { User } from './user.entity';
import { Artist } from '../artist/artist.entity';
import { followingArtistDto, likeSongDto, saveEpisodeDto } from './user.dto';
import { Song } from '../song/song.entity';
import { Episode } from '../episode/episode.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
    @InjectRepository(Episode)
    private episodeRepository: Repository<Episode>,
  ) {}

  async listFollowArtist(user: User) {
    const followArtist = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['artists'],
    });

    const artistId = [];
    followArtist.artists.map((item) => {
      artistId.push(item.id);
    });

    const artist = await this.artistRepository.find({
      where: { id: In(artistId) },
      select: ['id', 'name', 'images'],
    });

    return artist;
  }

  async checkFollowingArtist(
    user: User,
    followingArtistDto: followingArtistDto,
  ) {
    const { artistId } = followingArtistDto;

    const artist = await this.artistRepository.find({
      where: {
        id: In(artistId),
      },
    });
    if (artist.length != artistId.length) {
      throw new NotFoundException({ message: 'Artist Not Found' });
    }

    const followArtist = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['artists'],
    });

    const result = [];

    followArtist.artists.map((item) => {
      if (artistId.includes(item.id)) {
        result.push(true);
      } else {
        result.push(false);
      }
    });

    return result;
  }

  async followArtist(user: User, followingArtistDto: followingArtistDto) {
    const { artistId } = followingArtistDto;
    const artist = await this.artistRepository.find({
      where: { id: In(artistId) },
    });

    if (!artist) {
      throw new NotFoundException({ message: 'Artist Not Found' });
    }

    const followArtist = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['artists'],
    });

    artist.map((item) => {
      followArtist.artists.push(item);
    });

    await this.userRepository.save(followArtist);

    return 'Follow the artist was succesfully';
  }

  async unfollowArtist(user: User, followingArtistDto: followingArtistDto) {
    const { artistId } = followingArtistDto;
    const artist = await this.artistRepository.find({
      where: { id: In(artistId) },
    });

    if (artist.length !== artistId.length) {
      throw new NotFoundException({ message: 'Artist Not Found' });
    }

    const unfollowArtist = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['artists'],
    });

    unfollowArtist.artists = unfollowArtist.artists.filter(
      (item) => !artistId.includes(item.id),
    );

    await this.userRepository.save(unfollowArtist);

    return 'Unfollow the artist was succesfully';
  }

  async listLikedSong(user: User) {
    const likedSong = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['songs'],
    });

    const songId = [];
    likedSong.songs.map((item) => {
      songId.push(item.id);
    });

    const song = await this.songRepository.find({
      where: { id: In(songId) },
      select: ['id', 'title'],
    });

    return song;
  }

  async addLikedSong(user: User, likeSongDto: likeSongDto) {
    const { songId } = likeSongDto;
    const song = await this.songRepository.find({
      where: { id: In(songId) },
    });

    if (!song) {
      throw new NotFoundException({ message: 'Song Not Found' });
    }

    const likeSong = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['songs'],
    });

    song.map((item) => {
      likeSong.songs.push(item);
    });

    await this.userRepository.save(likeSong);

    return 'Like song was succesfully';
  }

  async removeLikedSong(user: User, likeSongDto: likeSongDto) {
    const { songId } = likeSongDto;
    const song = await this.songRepository.find({
      where: { id: In(songId) },
    });

    if (!song) {
      throw new NotFoundException({ message: 'Song Not Found' });
    }

    const likeSong = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['songs'],
    });

    likeSong.songs = likeSong.songs.filter((item) => !songId.includes(item.id));

    await this.userRepository.save(likeSong);

    return 'Remove like song was succesfully';
  }

  async listSavedEpisode(user: User) {
    const savedEpisode = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['episodes'],
    });

    const episodeId = [];
    savedEpisode.episodes.map((item) => {
      episodeId.push(item.id);
    });

    const episode = await this.episodeRepository.find({
      where: { id: In(episodeId) },
      select: ['id', 'name'],
    });

    return episode;
  }

  async saveEpisode(user: User, saveEpisodeDto: saveEpisodeDto) {
    const { episodeId } = saveEpisodeDto;
    const episode = await this.episodeRepository.find({
      where: { id: In(episodeId) },
    });

    if (!episode) {
      throw new NotFoundException({ message: 'Episode Not Found' });
    }

    const saveEpisode = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['episodes'],
    });

    episode.map((item) => {
      saveEpisode.episodes.push(item);
    });

    await this.userRepository.save(saveEpisode);

    return 'Save episode was succesfully';
  }

  async removeSavedEpisode(user: User, saveEpisodeDto: saveEpisodeDto) {
    const { episodeId } = saveEpisodeDto;
    const episode = await this.episodeRepository.find({
      where: { id: In(episodeId) },
    });

    if (!episode) {
      throw new NotFoundException({ message: 'Episode Not Found' });
    }

    const saveEpisode = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['episodes'],
    });

    saveEpisode.episodes = saveEpisode.episodes.filter(
      (item) => !episodeId.includes(item.id),
    );

    await this.userRepository.save(saveEpisode);

    return 'Remove episode song was succesfully';
  }
}
