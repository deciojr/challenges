import { ApiProperty } from '@nestjs/swagger/';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { DTO } from '../../shared/model/dto.model';
import { HeroClass, Hero } from '../hero.entity';

export class DeleteHeroDTO implements Readonly<DTO<DeleteHeroDTO>> {
  @ApiProperty({ required: true })
  id: string;
}
