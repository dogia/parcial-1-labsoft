import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ProductoresList } from './productores-list';
import { environment } from '../../../../environments/environment';

describe('ProductoresList', () => {
  let http: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    });
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
    localStorage.clear();
  });

  it('renderiza la fila de cada productor recibido del backend', async () => {
    const fixture = TestBed.createComponent(ProductoresList);
    fixture.detectChanges();

    const req = http.expectOne(`${environment.apiBaseUrl}/productores`);
    expect(req.request.method).toBe('GET');
    req.flush([
      {
        documento: '1088000001',
        nombre: 'Carlos',
        apellido: 'Lopez',
        telefono: '3001234567',
        correo: 'carlos@viveros.co',
      },
    ]);
    await fixture.whenStable();
    fixture.detectChanges();

    const filas = (fixture.nativeElement as HTMLElement).querySelectorAll('tbody tr');
    expect(filas.length).toBe(1);
    expect(filas[0].textContent).toContain('Carlos');
    expect(filas[0].textContent).toContain('Lopez');
  });

  it('muestra mensaje de error cuando la peticion falla', async () => {
    const fixture = TestBed.createComponent(ProductoresList);
    fixture.detectChanges();

    const req = http.expectOne(`${environment.apiBaseUrl}/productores`);
    req.flush('boom', { status: 500, statusText: 'Server Error' });
    await fixture.whenStable();
    fixture.detectChanges();

    const texto = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(texto).toContain('No se pudieron cargar los productores');
  });
});
