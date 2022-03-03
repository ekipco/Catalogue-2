import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { heart, heartFill, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { ProductCardComponent } from './product-card.component';
const icons = {
  heartFill,
  heart
};
@NgModule({
  declarations: [ProductCardComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgxBootstrapIconsModule.pick(icons, {
      width: '1.5em',
      height: '1.5em',
    })
  ],
  exports: [ProductCardComponent],
})
export class ProductCardModule { }