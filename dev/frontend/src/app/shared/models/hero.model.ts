import { HeroClass } from '@shared/models/hero-class.model';

export interface Hero {
  id?: string;
  name: string;
  badge: string;
  heroClass: HeroClass;
  allocated: boolean;
  lat: string;
  lng: string;
  createdAt?: Date;
  updatedAt?: Date;
}
