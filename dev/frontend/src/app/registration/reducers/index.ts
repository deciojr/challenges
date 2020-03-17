import { Action, createReducer, MetaReducer, on } from '@ngrx/store';

import { RegistrationApiActions, RegistrationPageActions } from '@registration/actions';

import { User } from '@shared/models/user.model';

export const registrationFeatureKey = 'registration';

export interface State {
  newUser: User;
  error: boolean;
  message: string;
}

export const initialState: State = {
  newUser: null,
  error: null,
  message: null,
};

const registrationReducer = createReducer(
  initialState,
  on(RegistrationPageActions.register, (state, action) => ({
    ...state,
    newUser: action.newUser,
  })),
  on(RegistrationApiActions.registerUserSuccess, (state, action) => ({
    ...state,
    message: action.message,
    error: false,
  })),
  on(RegistrationApiActions.registerUserFailure, (state, action) => ({
    ...state,
    error: true,
    message: action.message,
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return registrationReducer(state, action);
}
