import { Routes } from '@angular/router';
import { adminGuard } from '../../core/auth/auth.guard';

export const FINCAS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./fincas-list/fincas-list').then((m) => m.FincasList),
  },
  {
    path: 'nueva',
    canActivate: [adminGuard],
    loadComponent: () => import('./finca-form/finca-form').then((m) => m.FincaForm),
  },
  {
    path: ':numeroCatastro/editar',
    canActivate: [adminGuard],
    loadComponent: () => import('./finca-form/finca-form').then((m) => m.FincaForm),
  },
];
