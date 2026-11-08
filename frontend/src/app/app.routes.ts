import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-page/home-page').then((m) => m.HomePage),
  },
  {
    path: 'product/:slug',
    loadComponent: () => import('./pages/product-page/product-page').then((m) => m.ProductPage),
  },
  {
    path: 'sold-products',
    loadComponent: () => import('./pages/sold-products-page/sold-products-page').then((m) => m.SoldProductsPage),
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart-page/cart-page').then((m) => m.CartPage),
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin-page/admin-page').then((m) => m.AdminPage),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
