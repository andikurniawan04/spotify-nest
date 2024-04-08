import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from 'src/modules/album/album.entity';
import { Artist } from 'src/modules/artist/artist.entity';
import { Episode } from 'src/modules/episode/episode.entity';
import { Playlist } from 'src/modules/playlist/playlist.entity';
import { Podcast } from 'src/modules/podcast/podcast.entity';
import { Song } from 'src/modules/song/song.entity';
import { User } from 'src/modules/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [User, Artist, Album, Song, Playlist, Episode, Podcast],
        synchronize: false, //should be false at production!
      }),
    }),
  ],
})
export class DatabaseConfig {}
