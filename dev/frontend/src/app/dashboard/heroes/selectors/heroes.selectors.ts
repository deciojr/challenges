import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromHeroes from '../reducers';

import * as fromRoot from '@app/reducers';

export const selectHeroesState = createFeatureSelector<fromHeroes.State>(fromHeroes.heroesFeatureKey);

export const selectHeroesMessage = createSelector(selectHeroesState, state => state.message);

export const selectHeroesError = createSelector(selectHeroesState, state => state.error);
