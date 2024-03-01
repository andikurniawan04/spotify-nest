import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { UserService } from './modules/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './config/DatabaseConfig';
import { ConfigModule } from '@nestjs/config';
import { ResponseJson } from './helpers/ResponseJson';
import { ArtistModule } from './modules/artist/artist.module';
import { AlbumController } from './modules/album/album.controller';
import { AlbumModule } from './modules/album/album.module';

@Module({
  imports: [ConfigModule.forRoot({}), DatabaseConfig, AuthModule, UserModule, ArtistModule, AlbumModule],
  controllers: [AppController, AlbumController],
  providers: [AppService, ResponseJson],
})
export class AppModule {}
