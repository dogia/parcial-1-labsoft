import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Productor } from '../../core/models/productor.model';

@Injectable({ providedIn: 'root' })
export class ProductorService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiBaseUrl}/productores`;

  findAll(): Observable<Productor[]> {
    return this.http.get<Productor[]>(this.base);
  }

  findOne(documento: string): Observable<Productor> {
    return this.http.get<Productor>(`${this.base}/${documento}`);
  }

  create(data: Productor): Observable<Productor> {
    return this.http.post<Productor>(this.base, data);
  }

  update(documento: string, data: Partial<Productor>): Observable<Productor> {
    return this.http.put<Productor>(`${this.base}/${documento}`, data);
  }

  remove(documento: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${documento}`);
  }
}
