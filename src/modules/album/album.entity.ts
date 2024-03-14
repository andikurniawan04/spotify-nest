import { BaseEntityUuid } from 'src/base/Entity.Base';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { AlbumArtist } from '../albumArtist/albumArtist.entity';
import { Artist } from '../artist/artist.entity';

@Entity('albums')
export class Album extends BaseEntityUuid {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  year: number;

  @Column()
  thumbnail: string;

  @ManyToMany(() => Artist, (artist) => artist.albums)
  @JoinTable()
  artists: Artist[];

  @OneToMany(() => AlbumArtist, (albumArtist) => albumArtist.album)
  albumArtist?: AlbumArtist[];
}
