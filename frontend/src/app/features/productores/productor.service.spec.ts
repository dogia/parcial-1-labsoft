import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { ProductorService } from './productor.service';
import { environment } from '../../../environments/environment';

describe('ProductorService', () => {
  let service: ProductorService;
  let http: HttpTestingController;
  const base = `${environment.apiBaseUrl}/productores`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ProductorService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('findAll hace GET al endpoint base', async () => {
    const promesa = firstValueFrom(service.findAll());
    const req = http.expectOne(base);
    expect(req.request.method).toBe('GET');
    req.flush([]);
    await expect(promesa).resolves.toEqual([]);
  });

  it('create envia el payload por POST', () => {
    service
      .create({ documento: '1', nombre: 'A', apellido: 'B', telefono: '3', correo: 'a@b.co' })
      .subscribe();
    const req = http.expectOne(base);
    expect(req.request.method).toBe('POST');
    expect(req.request.body.documento).toBe('1');
    req.flush({});
  });

  it('update y remove componen la ruta con :documento', () => {
    service.update('xyz', { nombre: 'Z' }).subscribe();
    const reqUpdate = http.expectOne(`${base}/xyz`);
    expect(reqUpdate.request.method).toBe('PUT');
    reqUpdate.flush({});

    service.remove('xyz').subscribe();
    const reqDelete = http.expectOne(`${base}/xyz`);
    expect(reqDelete.request.method).toBe('DELETE');
    reqDelete.flush(null);
  });
});
