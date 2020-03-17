import { Injectable } from '@angular/core';

import { EntityAction, EntityCollectionService, EntityOp, EntityServices, ofEntityOp } from '@ngrx/data';
import { Actions, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { entityNames } from '@app/entity-metadata';
import { HttpStatusCode } from '@shared/util/http-status-codes';
import { Hero } from '@shared/models/hero.model';
import { HeroesApiActions } from '@dashboard/heroes/actions';

@Injectable()
export class HeroesEffects {
  heroService: EntityCollectionService<Hero>;

  saveHeroResponse$ = createEffect(() =>
    this.actions$.pipe(
      ofEntityOp<EntityAction<Hero>>(EntityOp.SAVE_ADD_ONE_SUCCESS),
      switchMap(action => {
        const messages = {
          [HttpStatusCode.CONFLICT]: `There's already a hero with this badge`,
          [HttpStatusCode.BAD_REQUEST]: 'Something went wrong when trying to register the hero, try again later',
          [HttpStatusCode.CREATED]: 'The hero was registered successfully',
        };

        const statusCode = action.payload.data.id;

        const statusCodeToAction = {
          [HttpStatusCode.CONFLICT]: HeroesApiActions.registerHeroFailure({
            message: messages[statusCode],
          }),
          [HttpStatusCode.BAD_REQUEST]: HeroesApiActions.registerHeroFailure({
            message: messages[statusCode],
          }),
          [HttpStatusCode.CREATED]: HeroesApiActions.registerHeroSuccess({
            message: messages[statusCode],
          }),
        };

        return of(statusCodeToAction[statusCode]);
      }),
    ),
  );

  deleteHeroResponse$ = createEffect(() =>
    this.actions$.pipe(
      ofEntityOp<EntityAction<Hero>>(EntityOp.SAVE_DELETE_ONE_SUCCESS),
      switchMap(action => {
        const messages = {
          [HttpStatusCode.OK]: 'Hero updated successfully',
          [HttpStatusCode.BAD_REQUEST]: 'Could not update the hero',
        };

        const statusCode = action.payload.data.id;

        const statusCodeToAction = {
          [HttpStatusCode.OK]: HeroesApiActions.updateHeroFailure({
            message: messages[statusCode],
          }),
          [HttpStatusCode.BAD_REQUEST]: HeroesApiActions.updateHeroFailure({
            message: messages[statusCode],
          }),
        };

        return of(statusCodeToAction[statusCode]);
      }),
    ),
  );

  constructor(private actions$: Actions, private entityService: EntityServices) {
    this.heroService = this.entityService.getEntityCollectionService(entityNames.hero);
  }
}
