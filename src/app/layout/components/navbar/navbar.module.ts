import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveComponentModule } from '@ngrx/component';
import { heartFill, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { NavbarComponent } from './navbar.component';

const icons = {
  heartFill,
};
@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    NgbNavModule,
    RouterModule,
    ReactiveComponentModule,
    NgxBootstrapIconsModule.pick(icons, {
      width: '1.2em',
      height: '1.2em',
    })
  ],
  exports: [NavbarComponent],
})
export class NavbarModule { }