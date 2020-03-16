import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { EntityCollectionService, EntityServices } from '@ngrx/data';

import { entityNames } from '@app/entity-metadata';
import { Store } from '@ngrx/store';
import { RegistrationSelectors } from '@registration/selectors';
import { User } from '@shared/models/user.model';

import { Observable } from 'rxjs';

import * as fromRegistration from '@registration/reducers';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {
  pending$: Observable<boolean>;
  error$: Observable<boolean>;
  message$: Observable<string>;

  userService: EntityCollectionService<User>;

  constructor(private entityService: EntityServices, private store: Store<fromRegistration.State>) {
    this.userService = entityService.getEntityCollectionService(entityNames.user);

    this.error$ = this.store.select(RegistrationSelectors.selectRegistrationError);
    this.message$ = this.store.select(RegistrationSelectors.selectRegistrationMessage);

    this.pending$ = this.userService.loading$;
  }

  saveRegistration({ newUser }: { newUser: User }) {
    this.userService.add(newUser);
  }
}
