import { BaseEntityUuid } from 'src/base/Entity.Base';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Song } from '../song/song.entity';
import { User } from '../user/user.entity';

@Entity('playlists')
export class Playlist extends BaseEntityUuid {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  usersId: string;

  @Column()
  category_id: string;

  @ManyToMany(() => Song, (song) => song.playlists)
  @JoinTable()
  songs: Song[];

  @ManyToOne(() => User, (user) => user.playlists)
  users: User;
}
