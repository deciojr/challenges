import { DangerLevel } from '../threat.entity';

export class QueryParams {
  monsterName?: string;
  heroName?: string;
  dangerLevel?: DangerLevel;
  page?: number;
  total?: number;
  itemsPerPage?: number;
}
