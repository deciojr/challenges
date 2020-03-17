import { EntityRepository, Repository } from 'typeorm';

import { Hero } from './hero.entity';

@EntityRepository(Hero)
export class HeroRepository extends Repository<Hero> {}
