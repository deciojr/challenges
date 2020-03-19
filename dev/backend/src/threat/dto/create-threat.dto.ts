import { ApiProperty } from '@nestjs/swagger/';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { DTO } from '../../shared/model/dto.model';
import { DangerLevel, Threat } from '../threat.entity';

export class CreateThreatDTO implements Readonly<DTO<CreateThreatDTO>> {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  monsterName: string;

  @ApiProperty({ required: true, enum: DangerLevel })
  @IsEnum(DangerLevel)
  dangerLevel: DangerLevel;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  lat: number;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  lng: number;

  static async toThreat({
    monsterName,
    dangerLevel,
    lat,
    lng,
  }: CreateThreatDTO): Promise<Threat> {
    const threat = new Threat();

    threat.monsterName = monsterName;
    threat.dangerLevel = dangerLevel;
    threat.lat = lat;
    threat.lng = lng;

    return threat;
  }
}
