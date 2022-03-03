import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductItem } from '@modules/shopping/models';
import { CategoryService, FavoritesService } from '@modules/shopping/services';
import { Actions, EffectSources } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { productListSelectors } from './store';
import * as actions from './store/actions';
import { ProductListEffects } from './store/effects';
@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy {

  loading$: Observable<boolean>;
  products$: Observable<Record<number, ProductItem[]>>;

  constructor(
    private _store$: Store,
    private _actions$: Actions,
    private _effects$: EffectSources,
    private _categoryService: CategoryService,
    private _favoritesService: FavoritesService
  ) { }

  ngOnInit(): void {
    this._effects$.addEffects(new ProductListEffects(this._store$, this._actions$, this._categoryService, this._favoritesService));
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
    this.loading$ = this._store$.select(productListSelectors.loading);
    this.products$ = this._store$.select(productListSelectors.products);
  }
}
