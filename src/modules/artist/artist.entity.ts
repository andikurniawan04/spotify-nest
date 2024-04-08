import { BaseEntityUuid } from 'src/base/Entity.Base';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Album } from '../album/album.entity';
import { Song } from '../song/song.entity';
import { User } from '../user/user.entity';

@Entity('artists')
export class Artist extends BaseEntityUuid {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  images: string;

  @ManyToMany(() => Album, (album) => album.artists)
  @JoinTable()
  albums: Album[];

  @ManyToMany(() => User, (user) => user.artists)
  @JoinTable()
  users: User[];

  @ManyToMany(() => Song, (song) => song.artists)
  @JoinTable()
  songs: Song[];
}
