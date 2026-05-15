import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ProductoControl,
  ControlPlaga,
  ControlHongo,
  ControlFertilizante,
} from '../../core/models/producto-control.model';

@Injectable({ providedIn: 'root' })
export class ProductoControlService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiBaseUrl}/productos-control`;

  findAll(): Observable<ProductoControl[]> {
    return this.http.get<ProductoControl[]>(this.base);
  }

  findOne(id: number): Observable<ProductoControl> {
    return this.http.get<ProductoControl>(`${this.base}/${id}`);
  }

  create(data: Partial<ProductoControl>): Observable<ProductoControl> {
    return this.http.post<ProductoControl>(this.base, data);
  }

  update(id: number, data: Partial<ProductoControl>): Observable<ProductoControl> {
    return this.http.put<ProductoControl>(`${this.base}/${id}`, data);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  upsertControlPlaga(productoId: number, data: Partial<ControlPlaga>): Observable<ControlPlaga> {
    return this.http.post<ControlPlaga>(`${this.base}/${productoId}/control-plaga`, data);
  }

  updateControlPlaga(productoId: number, data: Partial<ControlPlaga>): Observable<ControlPlaga> {
    return this.http.put<ControlPlaga>(`${this.base}/${productoId}/control-plaga`, data);
  }

  upsertControlHongo(productoId: number, data: Partial<ControlHongo>): Observable<ControlHongo> {
    return this.http.post<ControlHongo>(`${this.base}/${productoId}/control-hongo`, data);
  }

  updateControlHongo(productoId: number, data: Partial<ControlHongo>): Observable<ControlHongo> {
    return this.http.put<ControlHongo>(`${this.base}/${productoId}/control-hongo`, data);
  }

  upsertControlFertilizante(
    productoId: number,
    data: Partial<ControlFertilizante>,
  ): Observable<ControlFertilizante> {
    return this.http.post<ControlFertilizante>(
      `${this.base}/${productoId}/control-fertilizante`,
      data,
    );
  }

  updateControlFertilizante(
    productoId: number,
    data: Partial<ControlFertilizante>,
  ): Observable<ControlFertilizante> {
    return this.http.put<ControlFertilizante>(
      `${this.base}/${productoId}/control-fertilizante`,
      data,
    );
  }
}
