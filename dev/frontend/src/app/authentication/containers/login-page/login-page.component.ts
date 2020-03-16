import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { LoginActions } from '@authentication/actions';
import * as fromAuthentication from '@authentication/reducers';
import { LoginSelectors } from '@authentication/selectors';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {
  pending$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store: Store<fromAuthentication.State>) {
    this.pending$ = this.store.select(LoginSelectors.selectPending);
    this.error$ = this.store.select(LoginSelectors.selectError);
  }

  authenticate({ authentication }: { authentication: string }) {
    this.store.dispatch(LoginActions.login({ authentication }));
  }

  ngOnInit(): void {
    this.store.dispatch(LoginActions.resetToInitialState());
  }
}
