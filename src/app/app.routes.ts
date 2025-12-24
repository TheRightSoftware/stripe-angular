import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent)
  },
  {
    path: 'success',
    loadComponent: () => import('./pages/success/success.component').then(m => m.SuccessComponent)
  },
  {
    path: 'cancel',
    loadComponent: () => import('./pages/cancel/cancel.component').then(m => m.CancelComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

