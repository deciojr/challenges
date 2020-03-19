import { createAction, props } from '@ngrx/store';
import { actionNameCreator } from '@shared/util/action-name.creator.util';

export const authenticationGuardActionsPrefix = actionNameCreator('[Authentication Guard]');

export const redirectActionName = authenticationGuardActionsPrefix('Redirect');
export const redirect = createAction(redirectActionName);
