import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { DTO } from '../../shared/model/dto.model';

export class LoginDTO implements Readonly<DTO<LoginDTO>> {
  @ApiProperty({
    required: true,
    description:
      'Authentication header containing the user email and password using the format ```email:password``` encoded with base64',
  })
  @IsString()
  @IsNotEmpty()
  authentication: string;
}
