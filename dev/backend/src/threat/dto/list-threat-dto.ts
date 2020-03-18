import { ApiProperty } from '@nestjs/swagger/';

import { DTO } from '../../shared/model/dto.model';
import { DangerLevel } from '../threat.entity';

export class ListThreatDTO implements Readonly<DTO<ListThreatDTO>> {
  @ApiProperty()
  monsterName: string;

  @ApiProperty({ enum: DangerLevel })
  dangerLevel: DangerLevel;

  @ApiProperty()
  heroName: string;

  @ApiProperty()
  heroId: string;

  @ApiProperty()
  lat: number;

  @ApiProperty()
  lng: number;
}
