import { DangerLevel } from '@shared/models/danger-level';

export interface IncomingThreat {
  location: {
    lat: number;
    lng: number;
  };
  dangerLevel: DangerLevel;
  monsterName: string;
}
