import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { HeroFilterComponent, HeroFormComponent, HeroTableComponent } from '@dashboard/heroes/components';
import { ListHeroesPageComponent, NewHeroPageComponent } from '@dashboard/heroes/containers';
import { SharedModule } from '@shared/shared.module';
import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroesEffects } from './effects/heroes.effects';
import * as fromHeroes from './reducers';
import { UpdateHeroPageComponent } from './containers/update-hero-page/update-hero-page.component';

@NgModule({
  declarations: [
    NewHeroPageComponent,
    HeroFormComponent,
    HeroFormComponent,
    ListHeroesPageComponent,
    HeroFilterComponent,
    HeroTableComponent,
    UpdateHeroPageComponent,
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    SharedModule,
    EffectsModule.forFeature([HeroesEffects]),
    StoreModule.forFeature(fromHeroes.heroesFeatureKey, fromHeroes.reducer),
  ],
})
export class HeroesModule {}
