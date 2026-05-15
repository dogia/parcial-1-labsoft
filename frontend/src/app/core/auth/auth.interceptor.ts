import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('/auth/login')) {
    return next(req);
  }

  const token = inject(AuthService).obtenerToken();
  if (!token) {
    return next(req);
  }

  const conToken = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });
  return next(conToken);
};
