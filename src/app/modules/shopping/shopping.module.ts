import { NgModule } from '@angular/core';
import { HomeModule, ProductDetailsModule, ProductsListModule } from './pages';
import { UserFavoritesModule } from './pages/user-favorites';
import { ShoppingRoutingModule } from './shopping-router.module';


@NgModule({
  imports: [
    ShoppingRoutingModule,
    HomeModule,
    ProductsListModule,
    UserFavoritesModule,
    ProductDetailsModule
  ]
})
export class ShoppingModule { }