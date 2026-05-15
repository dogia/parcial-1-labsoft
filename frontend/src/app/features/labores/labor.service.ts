import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Labor } from '../../core/models/labor.model';

@Injectable({ providedIn: 'root' })
export class LaborService {
  private readonly http = inject(HttpClient);

  private base(viveroCodigo: string): string {
    return `${environment.apiBaseUrl}/viveros/${viveroCodigo}/labores`;
  }

  findAllByVivero(viveroCodigo: string): Observable<Labor[]> {
    return this.http.get<Labor[]>(this.base(viveroCodigo));
  }

  findOne(viveroCodigo: string, id: number): Observable<Labor> {
    return this.http.get<Labor>(`${this.base(viveroCodigo)}/${id}`);
  }

  create(viveroCodigo: string, data: Partial<Labor>): Observable<Labor> {
    return this.http.post<Labor>(this.base(viveroCodigo), data);
  }

  update(viveroCodigo: string, id: number, data: Partial<Labor>): Observable<Labor> {
    return this.http.put<Labor>(`${this.base(viveroCodigo)}/${id}`, data);
  }

  remove(viveroCodigo: string, id: number): Observable<void> {
    return this.http.delete<void>(`${this.base(viveroCodigo)}/${id}`);
  }
}
