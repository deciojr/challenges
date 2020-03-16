import { LoginActions, LoginApiActions } from '@authentication/actions';
import { Action, createReducer, on } from '@ngrx/store';

export const authenticationFeatureKey = 'authentication';

export interface State {
  pending: boolean;
  error: string;
}

export const initialState: State = {
  pending: null,
  error: null,
};

export const authenticationReducer = createReducer(
  initialState,
  on(LoginActions.resetToInitialState, () => initialState),
  on(LoginActions.login, state => ({
    ...state,
    error: null,
    pending: true,
  })),
  on(LoginApiActions.loginSuccess, state => ({
    ...state,
    pending: false,
  })),
  on(LoginApiActions.loginFailure, (state, action) => ({
    pending: false,
    error: action.message,
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return authenticationReducer(state, action);
}
