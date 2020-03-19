import { createAction, props } from '@ngrx/store';

import { actionNameCreator } from '@shared/util/action-name.creator.util';

export const loginActionsPrefix = actionNameCreator('[Login/API]');

export const loginSuccessActionName = loginActionsPrefix('Login Success');
export const loginFailureActionName = loginActionsPrefix('Login Failure');

export const loginSuccess = createAction(loginSuccessActionName, props<{ accessToken: string }>());
export const loginFailure = createAction(loginFailureActionName, props<{ message: string }>());
