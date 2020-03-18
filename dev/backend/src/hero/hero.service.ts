import { HttpStatus, Injectable, Logger } from '@nestjs/common';

import { ListHeroDTO } from './dto/list-hero.dto';
import { Hero } from './hero.entity';
import { HeroRepository } from './hero.repository';
import { QueryParams } from './model/query-params.model';

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

  async update(hero: Hero): Promise<HttpStatus> {
    Logger.log(hero);
    try {
      await this.heroRepository.save({ ...hero });
      return HttpStatus.OK;
    } catch (e) {
      return HttpStatus.BAD_REQUEST;
    }
  }

  async delete(id): Promise<HttpStatus> {
    try {
      await this.heroRepository.delete({ id });
      return HttpStatus.OK;
    } catch (e) {
      return HttpStatus.BAD_REQUEST;
    }
  }

  private async countByBadge(badge: string) {
    return await this.heroRepository.count({
      badge,
    });
  }

  async list(query: QueryParams): Promise<ListHeroDTO[]> {
    const addLikeSuffix = (param: string) => `${param}%`;

    const addToQuery = (param: string) => !!param;

    const queryBuilder = this.heroRepository.createQueryBuilder('hero');

    queryBuilder.select();

    if (addToQuery(query.name)) {
      queryBuilder.orWhere('hero.name ilike :name', {
        name: addLikeSuffix(query.name),
      });
    }

    if (addToQuery(query.badge)) {
      queryBuilder.orWhere('hero.badge ilike :badge', {
        badge: addLikeSuffix(query.badge),
      });
    }

    if (addToQuery(query.heroClass)) {
      queryBuilder.orWhere(`hero.hero_class = :heroClass`, {
        heroClass: addLikeSuffix(query.heroClass),
      });
    }

    if (addToQuery(query.allocated)) {
      queryBuilder.orWhere(`hero.allocated = :allocated`, {
        allocated: query.allocated,
      });
    }

    queryBuilder.addOrderBy('hero_class', 'DESC');

    return (await queryBuilder.getMany()) as ListHeroDTO[];
  }

  async allocateHero(hero: Hero, allocated: boolean) {
    await this.save({
      ...hero,
      allocated,
    });
  }

  async randomHero(): Promise<Hero> {
    const numberOfHeroes = await this.heroRepository.count();
    const randomIntUpTo3 = () => Math.floor(Math.random() * Math.floor(3));
    const classes: HeroClass[] = [
      HeroClass.S,
      HeroClass.A,
      HeroClass.B,
      HeroClass.C,
    ];

    const randomHero = {
      name: `Random hero ${numberOfHeroes}`,
      badge: `Badge ${numberOfHeroes}`,
      heroClass: classes[randomIntUpTo3()],
      allocated: true,
      lng: -35.276692499999996,
      lat: -5.9259319999999995,
    };

    await this.save(randomHero);

    return randomHero;
  }
}
