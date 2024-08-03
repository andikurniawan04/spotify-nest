import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Episode } from './episode.entity';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class EpisodeService {
  constructor(
    @InjectRepository(Episode)
    private episodeRepository: Repository<Episode>,
  ) { }

  // async episode(idEpisode: string) {
  //   const episode = await this.episodeRepository.findOne({
  //     where: { id: idEpisode },
  //     relations: ['podcasts.users'],
  //   });

  //   if (!episode) {
  //     throw new NotFoundException({ message: 'Data Not Found' });
  //   }

  //   const {
  //     id,
  //     name,
  //     description,
  //     image,
  //     release_date,
  //     duration_ms,
  //     file,
  //     podcasts,
  //   } = episode;

  //   return {
  //     id,
  //     name,
  //     description,
  //     image,
  //     release_date,
  //     duration_ms,
  //     file,
  //     publisher: podcasts.users.name,
  //   };
  // }

  async episode(idEpisode: string, user: User) {
    return user;
  }
}
