import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ReportesService } from './reportes.service';
import { environment } from '../../../environments/environment';

describe('ReportesService', () => {
  let service: ReportesService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ReportesService);
    http = TestBed.inject(HttpTestingController);
    // Reemplazamos la creacion de URL y los anchors temporales para no
    // ensuciar el DOM durante las pruebas.
    URL.createObjectURL = (() => 'blob:test') as typeof URL.createObjectURL;
    URL.revokeObjectURL = (() => undefined) as typeof URL.revokeObjectURL;
  });

  afterEach(() => http.verify());

  it('descargarLaboresPdf invoca al endpoint correspondiente', async () => {
    const promesa = service.descargarLaboresPdf('VIV-001');
    const req = http.expectOne(
      `${environment.apiBaseUrl}/reportes/viveros/VIV-001/labores/pdf`,
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toBe('blob');
    req.flush(new Blob(['contenido']), {
      headers: { 'Content-Disposition': 'attachment; filename="labores-VIV-001.pdf"' },
    });
    await expect(promesa).resolves.toBeUndefined();
  });

  it('descargarViverosExcel arma la URL del productor', async () => {
    const promesa = service.descargarViverosExcel('1088000001');
    const req = http.expectOne(
      `${environment.apiBaseUrl}/reportes/productores/1088000001/viveros/excel`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(new Blob(['xlsx']));
    await expect(promesa).resolves.toBeUndefined();
  });
});
