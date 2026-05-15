import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Finca } from '../../core/models/finca.model';

@Injectable({ providedIn: 'root' })
export class FincaService {
  private readonly http = inject(HttpClient);

  private base(documento: string): string {
    return `${environment.apiBaseUrl}/productores/${documento}/fincas`;
  }

  findAllByProductor(documento: string): Observable<Finca[]> {
    return this.http.get<Finca[]>(this.base(documento));
  }

  findOne(documento: string, numeroCatastro: string): Observable<Finca> {
    return this.http.get<Finca>(`${this.base(documento)}/${numeroCatastro}`);
  }

  create(documento: string, data: Partial<Finca>): Observable<Finca> {
    return this.http.post<Finca>(this.base(documento), data);
  }

  update(documento: string, numeroCatastro: string, data: Partial<Finca>): Observable<Finca> {
    return this.http.put<Finca>(`${this.base(documento)}/${numeroCatastro}`, data);
  }

  remove(documento: string, numeroCatastro: string): Observable<void> {
    return this.http.delete<void>(`${this.base(documento)}/${numeroCatastro}`);
  }
}
