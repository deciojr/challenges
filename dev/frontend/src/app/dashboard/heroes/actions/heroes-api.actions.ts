import { createAction, props } from '@ngrx/store';

import { actionNameCreator } from '@shared/util/action-name.creator.util';

export const heroesApiActionsPrefix = actionNameCreator('[Heroes/API]');

export const resetStateActionName = heroesApiActionsPrefix('Reset to initial state');

export const resetToInitialState = createAction(resetStateActionName);

/**
 * Register
 */
export const registerHeroSuccessActionName = heroesApiActionsPrefix('Register Hero Success');
export const registerHeroFailureActionName = heroesApiActionsPrefix('Register Hero Failure');

export const registerHeroSuccess = createAction(registerHeroSuccessActionName, props<{ message: string }>());

export const registerHeroFailure = createAction(registerHeroFailureActionName, props<{ message: string }>());

/**
 * Update
 */

export const updateHeroSuccessActionName = heroesApiActionsPrefix('Update Hero Success');
export const updateHeroFailureActionName = heroesApiActionsPrefix('Update Hero Failure');

export const updateHeroSuccess = createAction(updateHeroSuccessActionName, props<{ message: string }>());

export const updateHeroFailure = createAction(updateHeroFailureActionName, props<{ message: string }>());

/**
 * Delete
 */
export const deleteHeroSuccessActionName = heroesApiActionsPrefix('Delete Hero Success');
export const deleteHeroFailureActionName = heroesApiActionsPrefix('Delete Hero Failure');

export const deleteHeroSuccess = createAction(deleteHeroSuccessActionName, props<{ message: string }>());

export const deleteHeroFailure = createAction(deleteHeroFailureActionName, props<{ message: string }>());
