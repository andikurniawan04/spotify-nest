import { BaseEntityUuid } from 'src/base/Entity.Base';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Artist } from '../artist/artist.entity';
import { Podcast } from '../podcast/podcast.entity';

@Entity('podcast_episodes')
export class Episode extends BaseEntityUuid {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  release_date: Date;

  @Column()
  duration_ms: number;

  @Column()
  file: string;

  @Column()
  podcastsId: string;

  @ManyToOne(() => Podcast, (podcast) => podcast.episodes)
  podcasts: Podcast;
}
