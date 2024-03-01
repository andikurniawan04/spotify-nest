import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from 'src/modules/album/album.entity';
import { AlbumArtist } from 'src/modules/albumArtist/albumArtist.entity';
import { Artist } from 'src/modules/artist/artist.entity';
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
        entities: [User, Artist, AlbumArtist, Album],
        synchronize: false, //should be false at production!
      }),
    }),
  ],
})
export class DatabaseConfig {}
