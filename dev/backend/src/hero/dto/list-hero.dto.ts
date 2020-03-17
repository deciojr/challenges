import { ApiProperty } from '@nestjs/swagger/';
import { IsNotEmpty, IsString } from 'class-validator';

import { DTO } from '../../shared/model/dto.model';
import { HeroClass } from '../hero.entity';

export class ListHeroDTO implements Readonly<DTO<ListHeroDTO>> {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  badge: string;

  @ApiProperty({ type: 'enum', enum: HeroClass })
  heroClass: HeroClass;

  @ApiProperty({ type: 'string' })
  lat: string;

  @ApiProperty()
  lng: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
