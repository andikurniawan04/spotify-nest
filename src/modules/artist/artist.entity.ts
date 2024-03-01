import { BaseEntityUuid } from 'src/base/Entity.Base';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Album } from '../album/album.entity';
import { AlbumArtist } from '../albumArtist/albumArtist.entity';

@Entity('artists')
export class Artist extends BaseEntityUuid {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  images: string;

  @OneToMany(() => AlbumArtist, (albumArtist) => albumArtist.artist)
  albumArtist?: AlbumArtist[];
}
