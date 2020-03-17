import { ApiProperty } from '@nestjs/swagger/';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { DTO } from '../../shared/model/dto.model';
import { HeroClass, Hero } from '../hero.entity';

export class UpdateHeroDTO implements Readonly<DTO<UpdateHeroDTO>> {
  @ApiProperty()
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  badge: string;

  @ApiProperty({ type: 'enum', enum: HeroClass })
  @IsString()
  @IsNotEmpty()
  heroClass: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lat: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lng: string;
}
