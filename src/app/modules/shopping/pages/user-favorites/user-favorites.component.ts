import { Component, OnInit } from '@angular/core';
import { ProductItem } from '@modules/shopping/models';
import { FavoritesService } from '@modules/shopping/services';
import { Actions, EffectSources } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { userFavoritesSelectors } from './store';
import * as actions from './store/actions';
import { UserFavoritesEffects } from './store/effects';
@Component({
  selector: 'user-favorites',
  templateUrl: './user-favorites.component.html',
  styleUrls: ['./user-favorites.component.scss']
})
export class UserFavoritesComponent implements OnInit {

  loading$: Observable<boolean>;
  favorites$: Observable<ProductItem[]>;

  constructor(
    private _store$: Store,
    private _actions$: Actions,
    private _effects$: EffectSources,
    private _favoritesService: FavoritesService
  ) { }

  ngOnInit(): void {
    this._effects$.addEffects(new UserFavoritesEffects(this._actions$, this._favoritesService));
    this._store$.dispatch(actions.initialize());
    this.initAsyncs();
  }

  ngOnDestroy(): void {
    this._store$.dispatch(actions.destroy());
  }

  setFavorite(product: ProductItem): void {
    this._store$.dispatch(actions.addToFavorites({ product }));
  }

  private initAsyncs(): void {
    this.loading$ = this._store$.select(userFavoritesSelectors.loading);
    this.favorites$ = this._store$.select(userFavoritesSelectors.favorites);
  }
}
