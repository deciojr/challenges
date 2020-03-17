import { createAction, props } from '@ngrx/store';

import { actionNameCreator } from '@shared/util/action-name-creator';

export const heroActionsPrefix = actionNameCreator('[New Hero Page]');

export const registerHeroSuccessActionName = heroActionsPrefix('Register Hero Success');
export const registerHeroFailureActionName = heroActionsPrefix('Register Hero Failure');

export const registerHeroSuccess = createAction(registerHeroSuccessActionName, props<{ message: string }>());

export const registerHeroFailure = createAction(registerHeroFailureActionName, props<{ message: string }>());
