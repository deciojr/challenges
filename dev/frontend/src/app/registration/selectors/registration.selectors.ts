import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRegistration from '../reducers';

export const selectRegistrationState = createFeatureSelector<fromRegistration.State>(
  fromRegistration.registrationFeatureKey,
);

export const selectRegistrationMessage = createSelector(selectRegistrationState, state => state.message);

export const selectRegistrationError = createSelector(selectRegistrationState, state => state.error);
