import { BaseEntityUuid } from 'src/base/Entity.Base';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AlbumArtist } from '../albumArtist/albumArtist.entity';

@Entity('artists')
export class Album extends BaseEntityUuid {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  year: number;

  @Column()
  thumbnail: string;

  @OneToMany(() => AlbumArtist, (albumArtist) => albumArtist.album)
  albumArtist?: AlbumArtist[];
}
