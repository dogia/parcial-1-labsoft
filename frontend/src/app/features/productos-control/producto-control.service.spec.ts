import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductoControlService } from './producto-control.service';
import { environment } from '../../../environments/environment';

describe('ProductoControlService', () => {
  let service: ProductoControlService;
  let http: HttpTestingController;
  const base = `${environment.apiBaseUrl}/productos-control`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ProductoControlService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('findAll consulta el endpoint base', () => {
    service.findAll().subscribe();
    const req = http.expectOne(base);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('upsertControlPlaga arma la URL anidada', () => {
    service.upsertControlPlaga(3, { periodo_carencia: 7 }).subscribe();
    const req = http.expectOne(`${base}/3/control-plaga`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('updateControlHongo usa PUT al endpoint anidado', () => {
    service.updateControlHongo(4, { nombre_hongo: 'Roya' }).subscribe();
    const req = http.expectOne(`${base}/4/control-hongo`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body.nombre_hongo).toBe('Roya');
    req.flush({});
  });

  it('upsertControlFertilizante usa POST al endpoint anidado', () => {
    service
      .upsertControlFertilizante(5, { fecha_ultima_aplicacion: '2026-01-15' })
      .subscribe();
    const req = http.expectOne(`${base}/5/control-fertilizante`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});
