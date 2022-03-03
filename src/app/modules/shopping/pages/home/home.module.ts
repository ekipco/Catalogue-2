import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SliderModule } from '@modules/shopping/components';
import { CategoryService } from '@modules/shopping/services';
import { ReactiveComponentModule } from '@ngrx/component';
import { StoreModule } from '@ngrx/store';
import { HomeComponent } from './home.component';
import * as fromReducer from './store/reducer';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SliderModule,
    RouterModule,
    ReactiveComponentModule,
    StoreModule.forFeature(fromReducer.featureKey, fromReducer.reducer)
  ],
  exports: [HomeComponent],
  providers: [
    CategoryService
  ]
})
export class HomeModule { }