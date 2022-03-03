import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductsService } from '@modules/shopping/services';
import { ReactiveComponentModule } from '@ngrx/component';
import { StoreModule } from '@ngrx/store';
import { heart, heartFill, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { ProductDetailsComponent } from './product-details.component';
import * as fromReducer from './store/reducer';

const icons = {
  heartFill,
  heart
};

@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [
    CommonModule,
    NgxBootstrapIconsModule.pick(icons, {
      width: '1.5em',
      height: '1.5em',
    }),
    StoreModule.forFeature(fromReducer.featureKey, fromReducer.reducer),
    ReactiveComponentModule
  ],
  exports: [ProductDetailsComponent],
  providers: [ProductsService],
})
export class ProductDetailsModule { }