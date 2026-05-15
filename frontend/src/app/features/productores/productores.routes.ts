import { Routes } from '@angular/router';
import { adminGuard } from '../../core/auth/auth.guard';

export const PRODUCTORES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./productores-list/productores-list').then((m) => m.ProductoresList),
  },
  {
    path: 'nuevo',
    canActivate: [adminGuard],
    loadComponent: () => import('./productor-form/productor-form').then((m) => m.ProductorForm),
  },
  {
    path: ':documento/editar',
    canActivate: [adminGuard],
    loadComponent: () => import('./productor-form/productor-form').then((m) => m.ProductorForm),
  },
  {
    path: ':documento/fincas',
    loadChildren: () => import('../fincas/fincas.routes').then((m) => m.FINCAS_ROUTES),
  },
];
