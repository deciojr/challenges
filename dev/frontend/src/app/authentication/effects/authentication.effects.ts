import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap, take, tap } from 'rxjs/operators';

import { LoginActions, LoginApiActions } from '@authentication/actions';
import { AuthenticationService } from '@authentication/services/authentication.service';
import { HttpStatusCode } from '@shared/util/http-status-codes';

@Injectable()
export class AuthenticationEffects {
  authenticate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.login),
      switchMap(action =>
        this.authenticationService.authenticate(action.authentication).pipe(
          map(({ statusCode, accessToken }: { statusCode: number; accessToken: string }) => {
            if (statusCode === HttpStatusCode.UNAUTHORIZED) {
              return LoginApiActions.loginFailure({
                message: 'Credentials not authorized, please verify your email and password',
              });
            }
            return LoginApiActions.loginSuccess({ accessToken });
          }),
        ),
      ),
    ),
  );

  saveToken$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(LoginApiActions.loginSuccess),
        tap(action => this.authenticationService.saveAccessToken(action.accessToken)),
      );
    },
    { dispatch: false },
  );

  constructor(private actions$: Actions, private authenticationService: AuthenticationService) {}
}
