import { Routes } from '@angular/router';
import { adminGuard } from '../../core/auth/auth.guard';

export const LABORES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./labores-list/labores-list').then((m) => m.LaboresList),
  },
  {
    path: 'nueva',
    canActivate: [adminGuard],
    loadComponent: () => import('./labor-form/labor-form').then((m) => m.LaborForm),
  },
  {
    path: ':id/editar',
    canActivate: [adminGuard],
    loadComponent: () => import('./labor-form/labor-form').then((m) => m.LaborForm),
  },
];
