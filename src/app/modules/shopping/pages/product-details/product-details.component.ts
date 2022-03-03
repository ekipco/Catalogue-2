import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductItem } from '@modules/shopping/models';
import { FavoritesService, ProductsService } from '@modules/shopping/services';
import { Actions, EffectSources } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { productDetailsSelectors } from './store';
import * as actions from './store/actions';
import { ProductDetailsEffects } from './store/effects';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  loading$: Observable<boolean>;
  product$: Observable<ProductItem>;

  constructor(
    private _store$: Store,
    private _actions$: Actions,
    private _effects$: EffectSources,
    private _productsService: ProductsService,
    private _favoritesService: FavoritesService
  ) { }

  ngOnInit(): void {
    this._effects$.addEffects(new ProductDetailsEffects(this._store$, this._actions$, this._productsService, this._favoritesService));
    this._store$.dispatch(actions.initialize());
    this.initAsyncs();
  }

  ngOnDestroy(): void {
    this._store$.dispatch(actions.destroy());
  }

  toggleFavorite(product: ProductItem): void {
    this._store$.dispatch(actions.addToFavorites({ product }))
  }

  private initAsyncs(): void {
    this.loading$ = this._store$.select(productDetailsSelectors.loading);
    this.product$ = this._store$.select(productDetailsSelectors.product);
  }


}
