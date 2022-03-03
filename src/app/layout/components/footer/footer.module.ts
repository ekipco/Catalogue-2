import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { facebook, instagram, NgxBootstrapIconsModule, twitter } from 'ngx-bootstrap-icons';
import { FooterComponent } from './footer.component';

const icons = {
  facebook,
  instagram,
  twitter
};

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    NgxBootstrapIconsModule.pick(icons, {
      width: '1.2em',
      height: '1.2em',
    })
  ],
  exports: [FooterComponent],
})
export class FooterModule { }