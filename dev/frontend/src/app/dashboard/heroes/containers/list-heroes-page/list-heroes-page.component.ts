import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { HeroesApiActions } from '@dashboard/heroes/actions';

import { EntityCollectionService, EntityServices, QueryParams } from '@ngrx/data';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { HeroesSelectors } from '@dashboard/heroes/selectors';
import { entityNames } from '@app/entity-metadata';
import { Hero } from '@shared/models/hero.model';

import * as fromHeroes from '@dashboard/heroes/reducers';

@Component({
  selector: 'app-list-heroes-page',
  templateUrl: './list-heroes-page.component.html',
  styleUrls: ['./list-heroes-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListHeroesPageComponent implements OnInit {
  heroService: EntityCollectionService<Hero>;

  heroes$: Observable<Hero[]>;
  pending$: Observable<boolean>;
  error$: Observable<boolean>;
  message$: Observable<string>;

  constructor(private entityService: EntityServices, private router: Router, private store: Store<fromHeroes.State>) {
    this.heroService = this.entityService.getEntityCollectionService(entityNames.hero);

    this.heroes$ = this.heroService.entities$;
    this.pending$ = this.heroService.loading$;
    this.error$ = this.store.select(HeroesSelectors.selectHeroesError);
    this.message$ = this.store.select(HeroesSelectors.selectHeroesMessage);
  }

  getHeroes({ query }: { query: Partial<Hero> }) {
    this.heroService.getWithQuery(query as QueryParams);
  }

  update({ hero }: { hero: Hero }) {
    this.router.navigate(['/heroes/update', hero.id], {});
  }

  delete({ hero }: { hero: Hero }) {
    const shouldDelete = window.confirm(`Are you sure you want to delete the hero ${hero.name} ? `);

    if (!shouldDelete) {
      return;
    }

    this.heroService.delete(hero);
  }

  ngOnInit(): void {
    this.heroService.load();
    this.store.dispatch(HeroesApiActions.resetToInitialState());
  }
}
