import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromAuthentication from '../reducers';

export const selectAuthenticationState = createFeatureSelector<fromAuthentication.State>(
  fromAuthentication.authenticationFeatureKey,
);

export const selectPending = createSelector(selectAuthenticationState, state => state.pending);

export const selectError = createSelector(selectAuthenticationState, state => state.error);
