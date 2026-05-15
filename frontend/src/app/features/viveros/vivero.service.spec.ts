import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { ViveroService } from './vivero.service';
import { environment } from '../../../environments/environment';

describe('ViveroService', () => {
  let service: ViveroService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ViveroService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('findAllByFinca llama al endpoint anidado por finca', async () => {
    const promesa = firstValueFrom(service.findAllByFinca('CAT-1'));
    const req = http.expectOne(`${environment.apiBaseUrl}/fincas/CAT-1/viveros`);
    expect(req.request.method).toBe('GET');
    req.flush([]);
    await expect(promesa).resolves.toEqual([]);
  });

  it('findAllByProductor llama al endpoint agregado por productor', async () => {
    const promesa = firstValueFrom(service.findAllByProductor('1088000001'));
    const req = http.expectOne(
      `${environment.apiBaseUrl}/productores/1088000001/viveros`,
    );
    expect(req.request.method).toBe('GET');
    req.flush([]);
    await expect(promesa).resolves.toEqual([]);
  });

  it('update arma la ruta con :numero_catastro y :codigo', () => {
    service.update('CAT-1', 'VIV-001', { nombre: 'Nuevo' }).subscribe();
    const req = http.expectOne(`${environment.apiBaseUrl}/fincas/CAT-1/viveros/VIV-001`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body.nombre).toBe('Nuevo');
    req.flush({});
  });
});
