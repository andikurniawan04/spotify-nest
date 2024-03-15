import { BaseEntityUuid } from 'src/base/Entity.Base';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Album } from '../album/album.entity';
import { Song } from '../song/song.entity';

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

  @ManyToMany(() => Song, (song) => song.artists)
  @JoinTable()
  songs: Song[];
}
