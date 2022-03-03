import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SliderService } from '@modules/shopping/services';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveComponentModule } from '@ngrx/component';
import { StoreModule } from '@ngrx/store';
import { SliderComponent } from './slider.component';
import * as fromReducer from './store/reducer';

@NgModule({
  declarations: [SliderComponent],
  imports: [
    CommonModule,
    NgbCarouselModule,
    RouterModule,
    ReactiveComponentModule,
    StoreModule.forFeature(fromReducer.featureKey, fromReducer.reducer)
  ],
  exports: [SliderComponent],
  providers: [SliderService],
})
export class SliderModule { }