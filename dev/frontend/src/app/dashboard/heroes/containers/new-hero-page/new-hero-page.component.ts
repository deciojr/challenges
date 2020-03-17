import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EntityCollectionService, EntityServices } from '@ngrx/data';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { HeroesApiActions } from '@dashboard/heroes/actions';
import { HeroesSelectors } from '@dashboard/heroes/selectors';
import { Hero } from '@shared/models/hero.model';
import { entityNames } from '@app/entity-metadata';

import * as fromHeroes from '@dashboard/heroes/reducers';

@Component({
  selector: 'app-new-hero-page',
  templateUrl: './new-hero-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewHeroPageComponent {
  heroService: EntityCollectionService<Hero>;

  pending$: Observable<boolean>;
  error$: Observable<boolean>;
  message$: Observable<string>;

  constructor(private entityService: EntityServices, private store: Store<fromHeroes.State>) {
    this.heroService = this.entityService.getEntityCollectionService(entityNames.hero);

    this.pending$ = this.heroService.loading$;
    this.error$ = this.store.select(HeroesSelectors.selectHeroesError);
    this.message$ = this.store.select(HeroesSelectors.selectHeroesMessage);
  }

  saveHero({ hero }: { hero: Hero }) {
    this.heroService.add(hero);
    this.store.dispatch(HeroesApiActions.resetToInitialState());
  }
}
