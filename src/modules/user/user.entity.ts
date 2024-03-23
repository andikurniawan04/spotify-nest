import { BaseEntityUuid } from 'src/base/Entity.Base';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Playlist } from '../playlist/playlist.entity';

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
}
