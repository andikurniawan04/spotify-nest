import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class followingArtistDto {
  @IsNotEmpty()
  @IsArray()
  artistId: string[];
}

export class likeSongDto {
  @IsNotEmpty()
  @IsArray()
  songId: string[];
}

export class saveEpisodeDto {
  @IsNotEmpty()
  @IsArray()
  episodeId: string[];
}
