import { BaseEntityUuid } from 'src/base/Entity.Base';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Artist } from '../artist/artist.entity';
import { Playlist } from '../playlist/playlist.entity';

@Entity('songs')
export class Song extends BaseEntityUuid {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  duration: string;

  @Column()
  album_id: string;

  @ManyToMany(() => Artist, (artist) => artist.songs)
  @JoinTable()
  artists: Artist[];

  @ManyToMany(() => Playlist, (playlist) => playlist.songs)
  @JoinTable()
  playlists: Playlist[];
}
