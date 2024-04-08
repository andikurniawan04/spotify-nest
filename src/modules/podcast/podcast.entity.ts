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
import { User } from '../user/user.entity';
import { Episode } from '../episode/episode.entity';

@Entity('podcasts')
export class Podcast extends BaseEntityUuid {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  category_id: string;

  @Column()
  usersId: string;

  @ManyToOne(() => User, (user) => user.playlists)
  users: User;

  @OneToMany(() => Episode, (episode) => episode.podcasts)
  episodes: Episode;
}
