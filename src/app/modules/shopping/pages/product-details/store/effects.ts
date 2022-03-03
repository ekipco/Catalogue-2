import { Injectable } from '@angular/core';
import { routerSelectors } from '@ekipco/store';
import { NgrxBaseEffects } from '@infrastructure/ngrx';
import { FavoritesService, ProductsService } from '@modules/shopping/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mapTo, of, switchMap, switchMapTo, take, tap } from 'rxjs';
import * as actions from './actions';

@Injectable()
export class ProductDetailsEffects extends NgrxBaseEffects {

  constructor(
    private _store$: Store,
    private _actions$: Actions,
    private _productsService: ProductsService,
    private _favoritesService: FavoritesService,
  ) {
    super(_actions$, actions.destroy)
  }

  $initialize = createEffect(() => {
    return this._actions$.pipe(
      ofType(actions.initialize),
      switchMapTo(this._store$.select(routerSelectors.selectParams).pipe(take(1))),
      map((params) => actions.initialized({ productId: params['id'] }))
    );
  });

  $initialized = createEffect(() => {
    return this._actions$.pipe(
      ofType(actions.initialized),
      map(({ productId }) => actions.getProduct({ productId }))
    );
  });

  $getProduct = createEffect(() => {
    return this._actions$.pipe(
      ofType(actions.getProduct),
      switchMap(({ productId }) => this._productsService.getProduct(productId)
        .pipe(
          map((response) => actions.getProductSuccess({ response })),
          catchError(() => of(actions.getProductFail()))
        )
      )
    );
  });

  $getProductFail = createEffect(() => {
    return this._actions$.pipe(
      ofType(actions.getProductFail),
      tap(() => alert('Ürün yüklenemedi!'))
    );
  }, { dispatch: false });

  $addToFavorites = createEffect(() => {
    return this._actions$.pipe(
      ofType(actions.addToFavorites),
      switchMap(({ product }) => this._favoritesService.addToFavorites(product.id)
        .pipe(
          mapTo(actions.addToFavoritesSuccess()),
          catchError(() => of(actions.addToFavoritesFail()))
        )
      )
    );
  });

}