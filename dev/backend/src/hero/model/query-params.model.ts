import { HeroClass } from '../hero.entity';

export class QueryParams {
  name?: string;
  badge?: string;
  class?: HeroClass;
  page?: number;
  total?: number;
  itemsPerPage?: number;
}
