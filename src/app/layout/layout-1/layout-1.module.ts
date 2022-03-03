import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveComponentModule } from '@ngrx/component';
import { heartFill } from 'ngx-bootstrap-icons';
import { ContentModule } from '../components/content/content.module';
import { FooterModule } from '../components/footer/footer.module';
import { NavbarModule } from '../components/navbar/navbar.module';
import { Layout1Component } from './layout-1.component';

const icons = {
  heartFill,
};
@NgModule({
  declarations: [Layout1Component],
  imports: [
    ReactiveComponentModule,
    CommonModule,
    RouterModule,
    ContentModule,
    NavbarModule,
    FooterModule

  ],
  exports: [Layout1Component],

})
export class Layout1Module { } 