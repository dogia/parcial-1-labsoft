import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
    localStorage.clear();
  });

  it('inicia sin sesion cuando localStorage esta vacio', () => {
    expect(service.estaAutenticado()).toBe(false);
    expect(service.usuarioActual()).toBeNull();
  });

  it('guarda token y datos del usuario al iniciar sesion', async () => {
    const promesa = service.login('admin@viveros.co', 'Admin123');
    const req = http.expectOne(`${environment.apiBaseUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush({
      access_token: 'jwt-de-prueba',
      rol: 'ADMIN',
      correo: 'admin@viveros.co',
      nombre: 'Daniela Admin',
    });
    await promesa;

    expect(service.estaAutenticado()).toBe(true);
    expect(service.esAdmin()).toBe(true);
    expect(service.usuarioActual()?.token).toBe('jwt-de-prueba');
    expect(localStorage.getItem('viveros:auth')).toContain('jwt-de-prueba');
  });

  it('limpia la sesion al cerrar', async () => {
    const promesa = service.login('emp@viveros.co', 'Emp123');
    http.expectOne(`${environment.apiBaseUrl}/auth/login`).flush({
      access_token: 'token-emp',
      rol: 'EMPLEADO',
      correo: 'emp@viveros.co',
      nombre: 'Empleado',
    });
    await promesa;
    expect(service.estaAutenticado()).toBe(true);

    service.logout();
    expect(service.estaAutenticado()).toBe(false);
    expect(localStorage.getItem('viveros:auth')).toBeNull();
  });
});
