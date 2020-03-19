import { HeroClass } from '@shared/models/hero-class.model';
import { DangerLevel } from '@shared/models/danger-level';

const heroClasses = HeroClass;

const dangerLevels = DangerLevel;

export const heroClassesValues = Object.values(heroClasses);

export const dangerLevelsValues = Object.values(dangerLevels);
