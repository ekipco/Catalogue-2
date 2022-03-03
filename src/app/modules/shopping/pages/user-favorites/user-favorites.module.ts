import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductCardModule } from '@modules/shopping/components';
import { ReactiveComponentModule } from '@ngrx/component';
import { StoreModule } from '@ngrx/store';
import * as fromReducer from './store/reducer';
import { UserFavoritesComponent } from './user-favorites.component';

@NgModule({
  declarations: [UserFavoritesComponent],
  imports: [
    CommonModule,
    ReactiveComponentModule,
    ProductCardModule,
    StoreModule.forFeature(fromReducer.featureKey, fromReducer.reducer)
  ],
  exports: [UserFavoritesComponent],
})
export class UserFavoritesModule { }