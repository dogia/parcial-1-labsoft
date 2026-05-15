import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./features/home/home').then((m) => m.Home),
      },
      {
        path: 'productores',
        loadChildren: () =>
          import('./features/productores/productores.routes').then((m) => m.PRODUCTORES_ROUTES),
      },
      {
        path: 'viveros/:codigo/labores',
        loadChildren: () =>
          import('./features/labores/labores.routes').then((m) => m.LABORES_ROUTES),
      },
      {
        path: 'productos-control',
        loadChildren: () =>
          import('./features/productos-control/productos-control.routes').then(
            (m) => m.PRODUCTOS_CONTROL_ROUTES,
          ),
      },
      {
        path: 'reportes',
        loadChildren: () =>
          import('./features/reportes/reportes.routes').then((m) => m.REPORTES_ROUTES),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
