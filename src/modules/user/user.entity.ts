import { BaseEntityUuid } from 'src/base/Entity.Base';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Playlist } from '../playlist/playlist.entity';
import { Podcast } from '../podcast/podcast.entity';
import { Exclude } from 'class-transformer';
import { Artist } from '../artist/artist.entity';

@Entity('users')
export class User extends BaseEntityUuid {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Playlist, (playlist) => playlist.users)
  playlists: Playlist;

  @OneToMany(() => Podcast, (podcast) => podcast.users)
  podcasts: Podcast;

  @ManyToMany(() => Artist, (artist) => artist.users)
  @JoinTable()
  artists: Artist[];
}
