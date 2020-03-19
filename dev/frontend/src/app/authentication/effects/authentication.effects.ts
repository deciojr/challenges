import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap, take, tap } from 'rxjs/operators';

import { AuthenticationGuardActions, LoginActions, LoginApiActions } from '@authentication/actions';
import { AuthenticationService } from '@authentication/services/authentication.service';
import { HttpStatusCode } from '@shared/constants/http-status-codes.constant';

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
    () =>
      this.actions$.pipe(
        ofType(LoginApiActions.loginSuccess),
        tap(action => this.authenticationService.saveAccessToken(action.accessToken)),
        tap(() => this.router.navigate(['/dashboard/heroes'])),
        take(1),
      ),
    { dispatch: false },
  );

  redirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthenticationGuardActions.redirect),
        tap(() => {
          console.log('asdasdsadadsadsa');
          this.authenticationService.removeAccessToken();
          return this.router.navigate(['/login']);
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {}
}
