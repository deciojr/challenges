import { Injectable } from '@angular/core';

import { EntityOp, ofEntityOp, ofEntityType } from '@ngrx/data';
import { Actions, createEffect } from '@ngrx/effects';

import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { RegistrationApiActions } from '@registration/actions';
import { HttpStatusCode } from '@shared/constants/http-status-codes.constant';
import { entityNames } from '@app/entity-metadata';

@Injectable()
export class RegistrationEffects {
  registrationSaveUserResponse$ = createEffect(() =>
    this.actions$.pipe(
      ofEntityType(entityNames.user),
      ofEntityOp(EntityOp.SAVE_ADD_ONE_SUCCESS),
      switchMap(action => {
        const messages = {
          [HttpStatusCode.CONFLICT]: 'The email you informed is already registered',
          [HttpStatusCode.BAD_REQUEST]: 'Something went wrong when trying to save your account, try again later',
          [HttpStatusCode.CREATED]: 'Your account was created successfully',
        };

        const statusCode = action.payload.data.id;

        const statusCodeToAction = {
          [HttpStatusCode.CONFLICT]: RegistrationApiActions.registerUserFailure({
            message: messages[statusCode],
          }),
          [HttpStatusCode.BAD_REQUEST]: RegistrationApiActions.registerUserFailure({
            message: messages[statusCode],
          }),
          [HttpStatusCode.CREATED]: RegistrationApiActions.registerUserSuccess({
            message: messages[statusCode],
          }),
        };

        return of(statusCodeToAction[statusCode]);
      }),
    ),
  );

  constructor(private actions$: Actions) {}
}
