import { HeroClass } from '@shared/models/hero-class.model';

export interface Hero {
  id?: string;
  name: string;
  badge: string;
  heroClass: HeroClass;
  lat: string;
  lng: string;
}
