import { ApiProperty } from '@nestjs/swagger/';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { DTO } from '../../shared/model/dto.model';
import { HeroClass, Hero } from '../hero.entity';

export class CreateHeroDTO implements Readonly<DTO<CreateHeroDTO>> {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  badge: string;

  @ApiProperty({ required: true, enum: HeroClass })
  @IsEnum(HeroClass)
  @IsNotEmpty()
  heroClass: HeroClass;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  lat: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  lng: string;

  static async toHero({
    name,
    badge,
    heroClass,
    lat,
    lng,
  }: CreateHeroDTO): Promise<Hero> {
    const hero = new Hero();

    hero.name = name;
    hero.badge = badge;
    hero.heroClass = heroClass;
    hero.lat = lat;
    hero.lng = lng;

    return hero;
  }
}
