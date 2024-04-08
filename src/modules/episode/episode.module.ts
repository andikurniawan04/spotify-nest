import { Module } from '@nestjs/common';
import { EpisodeController } from './episode.controller';
import { EpisodeService } from './episode.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Episode } from './episode.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Episode]), AuthModule],
  controllers: [EpisodeController],
  providers: [EpisodeService],
})
export class EpisodeModule {}
