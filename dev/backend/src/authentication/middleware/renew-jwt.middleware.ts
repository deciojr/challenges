import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Request, Response } from 'express';

@Injectable()
export class RenewJwtMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: Request, res: Response, next: () => void): any {
    const header = req.header(process.env.JWT_HEADER_NAME);

    const [, jwt] = header.split(`${process.env.JWT_HEADER_PREFIX} `);

    const user = this.jwtService.verify(jwt, {});

    if (!!!user) {
      res.send({ id: HttpStatus.UNAUTHORIZED });
    }

    next();
  }
}
