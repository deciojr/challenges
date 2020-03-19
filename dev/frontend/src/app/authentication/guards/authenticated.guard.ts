import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { AuthenticationGuardActions } from '@authentication/actions';
import { AuthenticationService } from '@authentication/services/authentication.service';
import * as fromAuthentication from '@authentication/reducers';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private store: Store<fromAuthentication.State>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authenticated = !!this.authenticationService.getAccessToken();

    if (!authenticated) {
      this.store.dispatch(AuthenticationGuardActions.redirect());
    }

    return authenticated;
  }
}
