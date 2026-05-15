import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { LaborService } from './labor.service';
import { environment } from '../../../environments/environment';

describe('LaborService', () => {
  let service: LaborService;
  let http: HttpTestingController;
  const vivero = 'VIV-001';
  const base = `${environment.apiBaseUrl}/viveros/${vivero}/labores`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(LaborService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('findAllByVivero compone la URL anidada', () => {
    service.findAllByVivero(vivero).subscribe();
    const req = http.expectOne(base);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('create envia la labor por POST', () => {
    service
      .create(vivero, { fecha: '2026-01-15', descripcion: 'Aplicacion', producto_id: 1 })
      .subscribe();
    const req = http.expectOne(base);
    expect(req.request.method).toBe('POST');
    expect(req.request.body.descripcion).toBe('Aplicacion');
    req.flush({});
  });

  it('remove arma la URL con :id', () => {
    service.remove(vivero, 7).subscribe();
    const req = http.expectOne(`${base}/7`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
