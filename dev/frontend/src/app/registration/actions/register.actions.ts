import { createAction, props } from '@ngrx/store';

import { User } from '@shared/models/user.model';
import { actionNameCreator } from '@shared/util/action-name.creator.util';

export const registerActionsPrefix = actionNameCreator('[Register Page]');

export const registerActionName = registerActionsPrefix('Register a user');

export const register = createAction(registerActionName, props<{ newUser: User }>());
