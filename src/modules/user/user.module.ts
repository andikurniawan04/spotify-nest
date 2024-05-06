import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Artist } from '../artist/artist.entity';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';
import { Song } from '../song/song.entity';
import { Episode } from '../episode/episode.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Artist, Song, Episode]),
    AuthModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
