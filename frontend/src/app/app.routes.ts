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
    path: 'create-product',
    loadComponent: () => import('./pages/create-product-page/create-product-page').then((m) => m.CreateProductPage),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
