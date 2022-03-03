import { Injectable } from '@angular/core';
import { NgrxBaseEffects } from '@infrastructure/ngrx';
import { CategoryService } from '@modules/shopping/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mapTo, of, switchMapTo, tap } from 'rxjs';
import * as actions from './actions';

@Injectable()
export class HomeEffects extends NgrxBaseEffects {

  constructor(
    private _actions$: Actions,
    private _categoryService: CategoryService
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
      mapTo(actions.getCategories())
    );
  });

  $getCategories = createEffect(() => {
    return this._actions$.pipe(
      ofType(actions.getCategories),
      switchMapTo(this._categoryService.getCategories()
        .pipe(
          map((response) => actions.getCategoriesSuccess({ response })),
          catchError(() => of(actions.getCategoriesFail()))
        )
      )
    );
  });

  $getCategoriesFail = createEffect(() => {
    return this._actions$.pipe(
      ofType(actions.getCategoriesFail),
      tap(() => alert('Kategoriler yüklenemedi!'))
    );
  }, { dispatch: false });

}