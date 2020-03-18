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

  @ApiProperty()
  lat: number;

  @ApiProperty()
  lng: number;

  @ApiProperty()
  allocated: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
