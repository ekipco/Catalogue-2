import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductCardModule } from '@modules/shopping/components';
import { CategoryService, FavoritesService } from '@modules/shopping/services';
import { ReactiveComponentModule } from '@ngrx/component';
import { StoreModule } from '@ngrx/store';
import { MapToProductsArrayPipe } from './pipes';
import { GetCategoryPipe } from './pipes/get-category.pipe';
import { ProductsListComponent } from './products-list.component';
import * as fromReducer from './store/reducer';

@NgModule({
  declarations: [
    ProductsListComponent,
    MapToProductsArrayPipe,
    GetCategoryPipe
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromReducer.featureKey, fromReducer.reducer),
    ReactiveComponentModule,
    ProductCardModule,
  ],
  exports: [ProductsListComponent],
  providers: [
    CategoryService,
    FavoritesService
  ]
})
export class ProductsListModule { }