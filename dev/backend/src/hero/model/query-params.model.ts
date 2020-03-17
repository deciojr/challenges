import { HeroClass } from '../hero.entity';

export class QueryParams {
  name?: string;
  badge?: string;
  heroClass?: HeroClass;
  page?: number;
  total?: number;
  itemsPerPage?: number;
}
