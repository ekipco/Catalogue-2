import { Injectable } from '@angular/core';
import { routerSelectors } from '@ekipco/store';
import { NgrxBaseEffects } from '@infrastructure/ngrx';
import { CategoryService, FavoritesService } from '@modules/shopping/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { catchError, filter, from, map, mapTo, mergeMap, of, reduce, switchMap, switchMapTo, take, tap } from 'rxjs';
import * as actions from './actions';
import { productListSelectors } from './index';

@Injectable()
export class ProductListEffects extends NgrxBaseEffects {

  constructor(
    private _store$: Store,
    private _actions$: Actions,
    private _categoryService: CategoryService,
    private _favoritesService: FavoritesService
  ) {
    super(_actions$, actions.destroy)
  }

  // renavigated fix
  $navigated = createEffect(() => {
    return this._actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      switchMapTo(this._store$.select(productListSelectors.initialized).pipe(take(1))),
      tap(console.log),
      filter((initialized) => initialized),
      mapTo(actions.initialize())
    );
  });

  /* 
       Tüm kategorilere ait ürünleri veren bir endpoint yok.
       Bu nedenle eğer ürünler sayfasına direkt giderse tüm kategorileri isteyip tek tek kategorilere ait ürünleri istedim.
  */

  $initialize = createEffect(() => {
    return this._actions$.pipe(
      ofType(actions.initialize),
      switchMapTo(this._store$.select(routerSelectors.selectData).pipe(take(1))),
      switchMap((data: any) => {
        if (Boolean(data.navigatedCategory))
          return of(data.navigatedCategory)
        return this._store$.select(routerSelectors.selectParams).pipe(
          switchMap(({ id }) => Boolean(id) ? this._categoryService.getCategory(id) : of(null))
        )
      }),
      switchMap((navigatedCategory) => {
        if (Boolean(navigatedCategory)) return of([navigatedCategory]);
        return this._categoryService.getCategories()
      }),
      switchMap((categories) => from(categories).pipe(
        reduce((prev, curr) => ({ ...prev, [curr.id]: curr }), {}),
        map((categories) => actions.initialized({ categories }))
      )),
    );
  });

  $initialized = createEffect(() => {
    return this._actions$.pipe(
      ofType(actions.initialized),
      switchMapTo(this._store$.select(productListSelectors.categories)
        .pipe(
          take(1),
          switchMap((categories) => from(Object.values(categories))
            .pipe(
              mergeMap((category) => this._categoryService.getCategoryProducts(category.id).pipe(map((products) => ({ [category.id]: products })))),
              reduce((prev, curr) => ({ ...prev, ...curr }), {})
            )
          ),
          map((products) => actions.setProducts({ products }))
        )
      ),
    );
  });

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