import { Injectable } from '@angular/core';
import { EntityAction, EntityOp, ofEntityOp } from '@ngrx/data';
import { Actions, createEffect } from '@ngrx/effects';
import { RegistrationApiActions } from '@registration/actions';
import { User } from '@shared/models/user.model';
import { HttpStatusCode } from '@shared/util/http-status-codes';
import { of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class RegistrationEffects {
  registrationSaveUserResponse$ = createEffect(() =>
    this.actions$.pipe(
      ofEntityOp<EntityAction<User>>(EntityOp.SAVE_ADD_ONE_SUCCESS),
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
