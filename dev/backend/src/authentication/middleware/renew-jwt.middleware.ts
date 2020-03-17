import { HttpStatus, Injectable, Logger, NestMiddleware } from '@nestjs/common';

import { Request, Response } from 'express';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class RenewJwtMiddleware implements NestMiddleware {
  constructor(private authenticationService: AuthenticationService) {}

  async use(req: Request, res: Response, next: () => void) {
    const header = req.header(process.env.JWT_HEADER_NAME);

    const [, jwt] = header.split(`${process.env.JWT_HEADER_PREFIX} `);

    const user = await this.authenticationService.verifyAccessToken(jwt);

    const accessToken = this.authenticationService.getAccessToken(user);

    res.setHeader(
      process.env.JWT_HEADER_NAME,
      `${process.env.JWT_HEADER_PREFIX} ${accessToken}`,
    );

    if (!!!user) {
      res.send({ id: HttpStatus.UNAUTHORIZED });
    }

    next();
  }
}
