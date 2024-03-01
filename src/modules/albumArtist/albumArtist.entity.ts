import { BaseEntityUuid } from 'src/base/Entity.Base';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Album } from '../album/album.entity';
import { Artist } from '../artist/artist.entity';

@Entity('album_artists')
export class AlbumArtist extends BaseEntityUuid {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  album_id: string;

  @Column()
  artist_id: string;

  @ManyToOne(() => Album, (album) => album)
  @JoinColumn({
    name: 'album_id',
    referencedColumnName: 'id',
  })
  album?: Album;

  @ManyToOne(() => Artist, (artist) => artist)
  @JoinColumn({
    name: 'artist_id',
    referencedColumnName: 'id',
  })
  artist?: Artist;
}
