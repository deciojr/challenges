import { createAction, props } from '@ngrx/store';
import { actionNameCreator } from '@shared/util/action-name.creator.util';

export const loginActionsPrefix = actionNameCreator('[Login Page]');

export const loginActionName = loginActionsPrefix('Login');
export const login = createAction(loginActionName, props<{ authentication: string }>());

export const resetActionName = loginActionsPrefix('Reset to initial state');
export const resetToInitialState = createAction(resetActionName);
