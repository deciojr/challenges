import { createAction, props } from '@ngrx/store';

import { actionNameCreator } from '@shared/util/action-name.creator.util';

export const registerApiActionsPrefix = actionNameCreator('[Registration/API]');

export const registerUserSuccessActionName = registerApiActionsPrefix('Register User Success');

export const registerUserFailureActionName = registerApiActionsPrefix('Register User Failure');

export const registerUserSuccess = createAction(registerUserSuccessActionName, props<{ message: string }>());

export const registerUserFailure = createAction(registerUserFailureActionName, props<{ message: string }>());
