import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Vivero } from '../../core/models/vivero.model';

@Injectable({ providedIn: 'root' })
export class ViveroService {
  private readonly http = inject(HttpClient);

  private baseByFinca(numeroCatastro: string): string {
    return `${environment.apiBaseUrl}/fincas/${numeroCatastro}/viveros`;
  }

  findAllByFinca(numeroCatastro: string): Observable<Vivero[]> {
    return this.http.get<Vivero[]>(this.baseByFinca(numeroCatastro));
  }

  findAllByProductor(documento: string): Observable<Vivero[]> {
    return this.http.get<Vivero[]>(
      `${environment.apiBaseUrl}/productores/${documento}/viveros`,
    );
  }

  findOne(numeroCatastro: string, codigo: string): Observable<Vivero> {
    return this.http.get<Vivero>(`${this.baseByFinca(numeroCatastro)}/${codigo}`);
  }

  create(numeroCatastro: string, data: Partial<Vivero>): Observable<Vivero> {
    return this.http.post<Vivero>(this.baseByFinca(numeroCatastro), data);
  }

  update(numeroCatastro: string, codigo: string, data: Partial<Vivero>): Observable<Vivero> {
    return this.http.put<Vivero>(`${this.baseByFinca(numeroCatastro)}/${codigo}`, data);
  }

  remove(numeroCatastro: string, codigo: string): Observable<void> {
    return this.http.delete<void>(`${this.baseByFinca(numeroCatastro)}/${codigo}`);
  }
}
