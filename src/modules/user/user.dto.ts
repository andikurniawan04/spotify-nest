import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class followingArtistDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  artistId: string[];
}

export class likeSongDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  songId: string[];
}

export class saveEpisodeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  episodeId: string[];
}
