import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroFormComponent } from '@dashboard/heroes/components';
import { NewHeroPageComponent } from '@dashboard/heroes/containers';
import { SharedModule } from '@shared/shared.module';

import { HeroesRoutingModule } from './heroes-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { HeroesEffects } from './effects/heroes.effects';
import { StoreModule } from '@ngrx/store';
import * as fromHeroes from './reducers';

@NgModule({
  declarations: [NewHeroPageComponent, HeroFormComponent, HeroFormComponent],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    SharedModule,
    EffectsModule.forFeature([HeroesEffects]),
    StoreModule.forFeature(fromHeroes.heroesFeatureKey, fromHeroes.reducer),
  ],
})
export class HeroesModule {}
