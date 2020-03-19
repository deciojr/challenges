import { HeroesApiActions } from '@dashboard/heroes/actions';
import { Action, createReducer, on } from '@ngrx/store';

export const heroesFeatureKey = 'heroes';

export interface State {
  error: boolean;
  delete: boolean;
  message: string;
}

export const initialState: State = {
  error: null,
  message: null,
  delete: null,
};

const heroesReducer = createReducer(
  initialState,
  on(HeroesApiActions.resetToInitialState, () => initialState),
  on(
    HeroesApiActions.registerHeroSuccess,
    HeroesApiActions.updateHeroSuccess,
    HeroesApiActions.deleteHeroSuccess,
    (state, action) => ({
      ...state,
      message: action.message,
      error: false,
    }),
  ),
  on(
    HeroesApiActions.registerHeroFailure,
    HeroesApiActions.updateHeroFailure,
    HeroesApiActions.deleteHeroFailure,
    (state, action) => ({
      ...state,
      error: true,
      message: action.message,
    }),
  ),
);

export function reducer(state: State | undefined, action: Action) {
  return heroesReducer(state, action);
}
