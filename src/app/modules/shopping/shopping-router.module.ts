import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule, NavigationItem } from '@ekipco/layout';
import { HomeComponent, ProductDetailsComponent, ProductsListComponent, UserFavoritesComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: 'products', redirectTo: 'products/', pathMatch: 'full' },
  {
    path: 'products/:id',
    component: ProductsListComponent,
  },
  {
    path: 'product/:id',
    component: ProductDetailsComponent,
  },
  {
    path: 'favorites',
    component: UserFavoritesComponent,
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

const navs: NavigationItem[] = [
  { title: 'Anasayfa', path: 'home' },
  { title: 'Ürünler', path: 'products' },
  { title: 'Favoriler', path: 'favorites', icon: 'heart-fill' },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    LayoutModule.setNavigation('shopping-module', navs)
  ],
  exports: [RouterModule],
})
export class ShoppingRoutingModule {


}

