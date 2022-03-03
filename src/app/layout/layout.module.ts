import { Inject, InjectionToken, Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { IconName, IconNamesEnum } from 'ngx-bootstrap-icons';
import { Layout1Module } from './layout-1';

export interface NavigationItem {
  title: string,
  path: string,
  icon?: IconName | IconNamesEnum;
}

export const EKIPCO_NAV = new InjectionToken<Record<string, NavigationItem[]>>('ekipco_navigation');
const EKIPCO_NAV_INTERNAL = new InjectionToken<Record<string, NavigationItem[]>>('ekipco_navigation_internal');

@NgModule({
  exports: [Layout1Module],
  providers: [{
    provide: EKIPCO_NAV_INTERNAL,
    useValue: {}
  }]
})
export class LayoutModule {

  // provider factory'nin çalışması için burada birkez inject ediyoruz.
  constructor(@Inject(EKIPCO_NAV) instance: Record<string, NavigationItem[]>) { }

  static forRoot(): ModuleWithProviders<LayoutModule> {
    return {
      ngModule: LayoutModule,
      providers: [{
        provide: EKIPCO_NAV,
        useFactory: (injector: Injector) => {
          return injector.get(EKIPCO_NAV_INTERNAL);
        },
        deps: [Injector]
      }]
    }
  }

  static setNavigation(key: string, navigationItems: NavigationItem[]): ModuleWithProviders<LayoutModule> {
    return {
      ngModule: LayoutModule,
      providers: [{
        provide: EKIPCO_NAV,
        useFactory: (injector: Injector) => {
          const nav = injector.get(EKIPCO_NAV_INTERNAL);
          nav[key] = navigationItems;
          return nav;
        },
        deps: [Injector]
      }]
    };
  }

  static getCurrentNavigation(path: string): string {
    switch (path) {
      case 'shopping': return 'shopping-module';
    }
    return '';
  }
}
