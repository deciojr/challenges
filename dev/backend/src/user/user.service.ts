import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository) readonly userRepository: UserRepository,
  ) {}

  async save(user: User): Promise<HttpStatus> {
    try {
      const isEmailRegistered = (await this.countByEmail(user.email)) > 0;
      if (isEmailRegistered) {
        return HttpStatus.CONFLICT;
      }
      await this.userRepository.save(user);
      return HttpStatus.CREATED;
    } catch (e) {
      return HttpStatus.BAD_REQUEST;
    }
  }

  async countByEmail(email: string): Promise<number> {
    return await this.userRepository.count({
      email,
    });
  }
}
