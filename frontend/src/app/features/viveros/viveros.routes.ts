import { Routes } from '@angular/router';
import { adminGuard } from '../../core/auth/auth.guard';

export const VIVEROS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./viveros-list/viveros-list').then((m) => m.ViverosList),
  },
  {
    path: 'nuevo',
    canActivate: [adminGuard],
    loadComponent: () => import('./vivero-form/vivero-form').then((m) => m.ViveroForm),
  },
  {
    path: ':codigo/editar',
    canActivate: [adminGuard],
    loadComponent: () => import('./vivero-form/vivero-form').then((m) => m.ViveroForm),
  },
];
