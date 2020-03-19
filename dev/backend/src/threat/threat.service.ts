import { HttpStatus, Injectable } from '@nestjs/common';
import { ListHeroDTO } from '../hero/dto/list-hero.dto';

import { Hero } from '../hero/hero.entity';
import { HeroService } from '../hero/hero.service';
import { addLikeSuffix, addToQuery } from '../shared/util/query.util';
import { ListThreatDTO } from './dto/list-threat-dto';
import { QueryParams } from './model/query-params.model';
import { Threat } from './threat.entity';
import { ThreatRepository } from './threat.repository';

@Injectable()
export class ThreatService {
  constructor(
    private readonly threatRepository: ThreatRepository,
    private readonly heroService: HeroService,
  ) {}

  async list(query: QueryParams): Promise<ListThreatDTO[]> {
    const queryBuilder = this.threatRepository.createQueryBuilder('threat');

    if (addToQuery(query.monsterName)) {
      queryBuilder.orWhere('threat.monster_name ilike :monsterName', {
        monsterName: addLikeSuffix(query.monsterName),
      });
    }

    if (addToQuery(query.heroName)) {
      queryBuilder.orWhere('threat.hero_name ilike :heroName', {
        heroName: addLikeSuffix(query.heroName),
      });
    }

    if (addToQuery(query.dangerLevel)) {
      queryBuilder.orWhere(`hero.danger_level = :dangerLevel`, {
        dangerLevel: query.dangerLevel,
      });
    }

    return (await queryBuilder.getMany()) as ListThreatDTO[];
  }

  async save(threat: Threat) {
    await this.threatRepository.save(threat);
  }

  async process(threat: Threat) {
    const heroes: Hero[] = await this.heroService.list({
      allocated: false,
    });

    const closestHero = await this.findClosestHeroOrARandomOne(heroes, threat);

    await this.heroService.allocateHero(closestHero, true);

    await this.save({
      ...threat,
      heroId: closestHero.id,
      heroName: closestHero.name,
    });

    return HttpStatus.OK;
  }

  async findClosestHeroOrARandomOne(
    heroes: Hero[],
    threat: Threat,
  ): Promise<Hero> {
    if (heroes.length === 0) {
      return await this.heroService.randomHero();
    }

    return this.calculateClosestHeroToThreat(heroes, threat);
  }

  calculateDistanceFromHeroToThreat(hero: Hero, threat: Threat): number {
    /**
     * Formula taken from here (2nd answer by Salvador Dali) https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
     */
    const piDividedBy180 = Math.PI / 180;
    const earthRadius = 6371;
    const formula =
      0.5 -
      Math.cos((threat.lat - hero.lat) * piDividedBy180) / 2 +
      (Math.cos(hero.lat * piDividedBy180) *
        Math.cos(threat.lat * piDividedBy180) *
        (1 - Math.cos((threat.lng - hero.lng) * piDividedBy180))) /
        2;

    const distanceInKm = earthRadius * 2 * Math.asin(Math.sqrt(formula));

    return distanceInKm;
  }

  calculateClosestHeroToThreat(heroes: Hero[], threat: Threat): Hero {
    const compareHeroLocationToThreat = (hero1: Hero, hero2: Hero) =>
      this.calculateDistanceFromHeroToThreat(hero2, threat) >
      this.calculateDistanceFromHeroToThreat(hero1, threat)
        ? hero1
        : hero2;

    const closestHero = heroes.reduce(compareHeroLocationToThreat);

    return closestHero;
  }
}
