import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ReportesService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiBaseUrl}/reportes`;

  descargarLaboresPdf(codigoVivero: string): Promise<void> {
    return this.descargar(`${this.base}/viveros/${codigoVivero}/labores/pdf`, `labores-${codigoVivero}.pdf`);
  }

  descargarLaboresExcel(codigoVivero: string): Promise<void> {
    return this.descargar(
      `${this.base}/viveros/${codigoVivero}/labores/excel`,
      `labores-${codigoVivero}.xlsx`,
    );
  }

  descargarViverosPdf(documentoProductor: string): Promise<void> {
    return this.descargar(
      `${this.base}/productores/${documentoProductor}/viveros/pdf`,
      `viveros-productor-${documentoProductor}.pdf`,
    );
  }

  descargarViverosExcel(documentoProductor: string): Promise<void> {
    return this.descargar(
      `${this.base}/productores/${documentoProductor}/viveros/excel`,
      `viveros-productor-${documentoProductor}.xlsx`,
    );
  }

  private async descargar(url: string, nombreSugerido: string): Promise<void> {
    const respuesta = await firstValueFrom(
      this.http.get(url, { observe: 'response', responseType: 'blob' }),
    );
    const blob = respuesta.body;
    if (!blob) {
      throw new Error('Respuesta sin contenido');
    }
    const nombre = this.extraerNombre(respuesta) ?? nombreSugerido;
    this.disparar(blob, nombre);
  }

  private extraerNombre(respuesta: HttpResponse<Blob>): string | null {
    const disposition = respuesta.headers.get('Content-Disposition');
    if (!disposition) return null;
    const match = /filename="?([^";]+)"?/i.exec(disposition);
    return match?.[1] ?? null;
  }

  private disparar(blob: Blob, nombre: string): void {
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = nombre;
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
    URL.revokeObjectURL(url);
  }
}
