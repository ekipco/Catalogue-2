import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '@environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveComponentModule } from '@ngrx/component';
import { EffectsModule } from '@ngrx/effects';
import { NavigationActionTiming, RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout';
import * as fromStore from './store';
import * as fromRouterReducer from './store/reducers/router.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveComponentModule,
    StoreModule.forRoot(fromStore.appReducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: false,
        strictActionSerializability: false,
      },
      initialState: fromStore.appInitialState
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({ navigationActionTiming: NavigationActionTiming.PostActivation }),
    !environment.production ?
      StoreDevtoolsModule.instrument({
        name: 'EKIPCO',
        maxAge: 25,
        logOnly: false,
        autoPause: true
      }) :
      [],
    NgbModule,
    LayoutModule.forRoot(),
  ],
  providers: [
    {
      provide: RouterStateSerializer,
      useClass: fromRouterReducer.RavenRouterStateSerializer
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
