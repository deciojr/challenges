import { HttpStatus, Injectable } from '@nestjs/common';

import { Hero } from './hero.entity';
import { HeroRepository } from './hero.repository';

@Injectable()
export class HeroService {
  constructor(private readonly heroRepository: HeroRepository) {}

  async save(hero: Hero): Promise<HttpStatus> {
    try {
      const isBadgeRegistered = (await this.countByBadge(hero.badge)) > 0;
      if (isBadgeRegistered) {
        return HttpStatus.CONFLICT;
      }
      await this.heroRepository.save(hero);
      return HttpStatus.CREATED;
    } catch (e) {
      return HttpStatus.BAD_REQUEST;
    }
  }

  private async countByBadge(badge: string) {
    return await this.heroRepository.count({
      badge,
    });
  }
}
