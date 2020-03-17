import { Injectable } from '@angular/core';
import { HeroesApiActions } from '@dashboard/heroes/actions';
import { EntityAction, EntityOp, ofEntityOp } from '@ngrx/data';
import { Actions, createEffect } from '@ngrx/effects';
import { Hero } from '@shared/models/hero.model';
import { HttpStatusCode } from '@shared/util/http-status-codes';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class HeroesEffects {
  heroesSaveHeroResponse$ = createEffect(() =>
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

  constructor(private actions$: Actions) {}
}
