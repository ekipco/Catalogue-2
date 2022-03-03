import { Injectable } from '@angular/core';
import { NgrxBaseEffects } from '@infrastructure/ngrx';
import { SliderService } from '@modules/shopping/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mapTo, of, switchMapTo, tap } from 'rxjs';
import * as actions from './actions';

@Injectable()
export class SliderEffects extends NgrxBaseEffects {

  constructor(
    private _actions$: Actions,
    private _sliderService: SliderService
  ) {
    super(_actions$, actions.destroy);
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
      mapTo(actions.getImages())
    );
  });

  $getImages = createEffect(() => {
    return this._actions$.pipe(
      ofType(actions.getImages),
      switchMapTo(this._sliderService.getImages()
        .pipe(
          map((response) => actions.getImagesSuccess({ response })),
          catchError(() => of(actions.getImagesFail()))
        )
      )
    );
  });

  $getImagesFail = createEffect(() => {
    return this._actions$.pipe(
      ofType(actions.getImagesFail),
      tap(() => alert('Slider resimleri yüklenemedi!'))
    );
  }, { dispatch: false });

}