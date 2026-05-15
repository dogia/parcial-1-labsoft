import { Routes } from '@angular/router';
import { adminGuard } from '../../core/auth/auth.guard';

export const PRODUCTOS_CONTROL_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./productos-control-list/productos-control-list').then((m) => m.ProductosControlList),
  },
  {
    path: 'nuevo',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./producto-control-form/producto-control-form').then((m) => m.ProductoControlForm),
  },
  {
    path: ':id/editar',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./producto-control-form/producto-control-form').then((m) => m.ProductoControlForm),
  },
];
