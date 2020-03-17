import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { entityNames } from '@app/entity-metadata';
import { HeroesApiActions } from '@dashboard/heroes/actions';

import * as fromHeroes from '@dashboard/heroes/reducers';
import { HeroesSelectors } from '@dashboard/heroes/selectors';
import { EntityCollectionService, EntityServices } from '@ngrx/data';
import { Store } from '@ngrx/store';
import { Hero } from '@shared/models/hero.model';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-update-hero-page',
  templateUrl: './update-hero-page.component.html',
  styleUrls: ['./update-hero-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateHeroPageComponent implements OnInit {
  heroService: EntityCollectionService<Hero>;

  pending$: Observable<boolean>;
  error$: Observable<boolean>;
  message$: Observable<string>;
  hero$: Observable<Hero>;

  constructor(
    private entityService: EntityServices,
    private store: Store<fromHeroes.State>,
    private route: ActivatedRoute,
  ) {
    this.heroService = this.entityService.getEntityCollectionService(entityNames.hero);

    this.pending$ = this.heroService.loading$;
    this.error$ = this.store.select(HeroesSelectors.selectHeroesError);
    this.message$ = this.store.select(HeroesSelectors.selectHeroesMessage);
    this.hero$ = this.heroService.entities$.pipe(map(heroes => heroes[0]));

    this.loadHeroFromRouteParam();
  }

  loadHeroFromRouteParam() {
    this.route.params.pipe(take(1)).subscribe(params => {
      this.heroService.getWithQuery({ id: params.id });
    });
  }

  saveHero({ hero }: { hero: Hero }) {
    this.heroService.update(hero);
    this.store.dispatch(HeroesApiActions.resetToInitialState());
  }

  ngOnInit() {
    this.store.dispatch(HeroesApiActions.resetToInitialState());
  }
}
