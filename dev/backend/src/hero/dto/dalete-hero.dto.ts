import { ApiProperty } from '@nestjs/swagger/';

import { DTO } from '../../shared/model/dto.model';
import { Hero } from '../hero.entity';

export class DeleteHeroDTO implements Readonly<DTO<DeleteHeroDTO>> {
  @ApiProperty({ required: true })
  id: string;

  static toHero({ id }) {
    const hero = new Hero();

    hero.id = id;

    return hero;
  }
}
