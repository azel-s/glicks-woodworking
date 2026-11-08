import { Routes } from '@angular/router';
import { adminGuard } from './services/admin-guard';

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
    path: 'admin-login',
    loadComponent: () => import('./pages/admin-login-page/admin-login-page').then((m) => m.AdminLoginPage),
  },
  {
    path: 'admin-setup',
    loadComponent: () => import('./pages/admin-invite-page/admin-invite-page').then((m) => m.AdminInvitePage),
  },
  {
    path: 'create-product',
    canActivate: [adminGuard],
    loadComponent: () => import('./pages/create-product-page/create-product-page').then((m) => m.CreateProductPage),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
