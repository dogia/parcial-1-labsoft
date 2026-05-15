import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { FincaService } from './finca.service';
import { environment } from '../../../environments/environment';

describe('FincaService', () => {
  let service: FincaService;
  let http: HttpTestingController;
  const productor = '1088000001';
  const base = `${environment.apiBaseUrl}/productores/${productor}/fincas`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(FincaService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('findAllByProductor llama al endpoint anidado', async () => {
    const promesa = firstValueFrom(service.findAllByProductor(productor));
    const req = http.expectOne(base);
    expect(req.request.method).toBe('GET');
    req.flush([]);
    await expect(promesa).resolves.toEqual([]);
  });

  it('create persiste con POST al endpoint anidado', () => {
    service.create(productor, { numero_catastro: 'CAT-1', municipio: 'M' }).subscribe();
    const req = http.expectOne(base);
    expect(req.request.method).toBe('POST');
    expect(req.request.body.numero_catastro).toBe('CAT-1');
    req.flush({});
  });

  it('remove arma la URL con :numero_catastro', () => {
    service.remove(productor, 'CAT-99').subscribe();
    const req = http.expectOne(`${base}/CAT-99`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
