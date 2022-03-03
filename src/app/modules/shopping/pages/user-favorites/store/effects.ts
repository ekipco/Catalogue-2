import { Injectable } from '@angular/core';
import { NgrxBaseEffects } from '@infrastructure/ngrx';
import { FavoritesService } from '@modules/shopping/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mapTo, of, switchMap, switchMapTo, tap } from 'rxjs';
import * as actions from './actions';

@Injectable()
export class UserFavoritesEffects extends NgrxBaseEffects {

  constructor(
    private _actions$: Actions,
    private _favoritesService: FavoritesService
  ) {
    super(_actions$, actions.destroy)
  }

  $initialize = createEffect(() => {
    return this._actions$.pipe(
      ofType(actions.initialize),
      mapTo(actions.initialized())
    );
  });

  $initialized = createEffect(() => {
    return this._actions$.pipe(
      ofType(actions.initialized),
      mapTo(actions.getFavorites())
    );
  });

  $getFavorites = createEffect(() => {
    return this._actions$.pipe(
      ofType(actions.getFavorites),
      switchMapTo(this._favoritesService.getFavorites()
        .pipe(
          map((response) => actions.getFavoritesSuccess({ response })),
          catchError(() => of(actions.getFavoritesFail()))
        )
      )
    );
  });

  $getFavoritesFail = createEffect(() => {
    return this._actions$.pipe(
      ofType(actions.getFavoritesFail),
      tap(() => alert('Favori ürünler yüklenemedi!'))
    );
  }, { dispatch: false });

  $addToFavorites = createEffect(() => {
    return this._actions$.pipe(
      ofType(actions.addToFavorites),
      switchMap(({ product }) => this._favoritesService.addToFavorites(product.id)
        .pipe(
          mapTo(actions.addToFavoritesSuccess({ product })),
          catchError(() => of(actions.addToFavoritesFail()))
        )
      )
    );
  });

}