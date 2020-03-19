import { DangerLevel } from '@shared/models/danger-level';

export interface Threat {
  id?: string;
  lat: number;
  lng: number;
  dangerLevel: DangerLevel;
  monsterName: string;
  heroName?: string;
  heroId?: string;
}
