import { ApiProperty } from '@nestjs/swagger/';
import { IsNotEmpty, IsString } from 'class-validator';

import { DTO } from '../../shared/model/dto.model';
import { Hero, HeroClass } from '../hero.entity';

export class UpdateHeroDTO implements Readonly<DTO<UpdateHeroDTO>> {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  badge: string;

  @ApiProperty({ type: 'enum', enum: HeroClass })
  heroClass: string;

  @ApiProperty()
  lat: number;

  @ApiProperty()
  lng: number;

  @ApiProperty()
  allocated: boolean;

  static toHero({
    id,
    name,
    badge,
    heroClass,
    lat,
    lng,
    allocated,
  }: UpdateHeroDTO) {
    const hero = new Hero();

    hero.id = id;
    hero.name = name;
    hero.badge = badge;
    hero.heroClass = heroClass;
    hero.lat = lat;
    hero.lng = lng;
    hero.allocated = allocated;

    return hero;
  }
}
