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
    path: 'past-products',
    loadComponent: () => import('./pages/past-products-page/past-products-page').then((m) => m.PastProductsPage),
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
