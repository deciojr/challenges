import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { base64ToString } from '../shared/util/base64.util';
import { User } from '../user/user.entity';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  getEmailAndPasswordFromAuthentication(authentication: string): Partial<User> {
    const emailAndPassword = base64ToString(authentication);

    const [email, password] = emailAndPassword.split(':');

    return {
      email,
      password,
    };
  }

  async login(authentication: string) {
    const { email, password } = this.getEmailAndPasswordFromAuthentication(
      authentication,
    );

    const user: User = await this.userService.findByEmail(email);

    if (!!!user) {
      return { statusCode: HttpStatus.UNAUTHORIZED };
    }

    const passwordMatches: boolean = await user.comparePasswords(
      password,
      user.password,
    );

    if (!passwordMatches) {
      return { statusCode: HttpStatus.UNAUTHORIZED };
    }

    const payload = { sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
