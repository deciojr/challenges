import { Injectable } from '@angular/core';
import { entityNames } from '@app/entity-metadata';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { User } from '@shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService extends EntityCollectionServiceBase<User> {
  constructor(elementsFactory: EntityCollectionServiceElementsFactory) {
    super(entityNames.user, elementsFactory);
  }
}
