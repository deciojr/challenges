import { Controller, Get, Headers, HttpStatus, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Response } from 'express';

import { authenticationRoutes } from './authentication.routes';
import { AuthenticationService } from './authentication.service';
import { LoginDTO } from './dto/login.dto';

@Controller(authenticationRoutes.prefix)
@ApiTags(authenticationRoutes.swaggerTag)
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  authenticationHeader = 'authentication';

  @ApiOperation({
    description: 'Authenticate a user',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description:
      'Provided email not registered or user not registered altogether',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: `User authenticated successfuly`,
  })
  @Get(authenticationRoutes.paths.login as string)
  async login(
    @Headers(this.authenticationHeader) authenticationHeader: LoginDTO,
    @Res() response: Response,
  ) {
    const authentication = await this.authenticationService.login(
      authenticationHeader.authentication,
    );

    response.send(authentication);
  }
}
