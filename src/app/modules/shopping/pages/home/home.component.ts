import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryItem } from '@modules/shopping/models';
import { CategoryService } from '@modules/shopping/services';
import { Actions, EffectSources } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { homeSelectors } from './store';
import * as actions from './store/actions';
import { HomeEffects } from './store/effects';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  loading$: Observable<boolean>;
  categories$: Observable<CategoryItem[]>;

  constructor(
    private _store$: Store,
    private _actions$: Actions,
    private _effects$: EffectSources,
    private _categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this._effects$.addEffects(new HomeEffects(this._actions$, this._categoryService));
    this._store$.dispatch(actions.initialize());
    this.initAsyncs();
  }

  ngOnDestroy(): void {
    this._store$.dispatch(actions.destroy());
  }

  private initAsyncs(): void {
    this.loading$ = this._store$.select(homeSelectors.loading);
    this.categories$ = this._store$.select(homeSelectors.categories);
  }

}
