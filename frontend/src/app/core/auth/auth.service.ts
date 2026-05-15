import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

export type Rol = 'ADMIN' | 'EMPLEADO';

export interface SesionUsuario {
  token: string;
  correo: string;
  nombre: string;
  rol: Rol;
}

interface LoginRespuesta {
  access_token: string;
  rol: Rol;
  correo: string;
  nombre: string;
}

const STORAGE_KEY = 'viveros:auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly sesion = signal<SesionUsuario | null>(this.cargarSesion());

  readonly usuarioActual = computed(() => this.sesion());
  readonly estaAutenticado = computed(() => this.sesion() !== null);
  readonly esAdmin = computed(() => this.sesion()?.rol === 'ADMIN');

  async login(correo: string, password: string): Promise<void> {
    const respuesta = await firstValueFrom(
      this.http.post<LoginRespuesta>(`${environment.apiBaseUrl}/auth/login`, {
        correo,
        password,
      }),
    );

    const sesion: SesionUsuario = {
      token: respuesta.access_token,
      correo: respuesta.correo,
      nombre: respuesta.nombre,
      rol: respuesta.rol,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sesion));
    this.sesion.set(sesion);
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.sesion.set(null);
  }

  obtenerToken(): string | null {
    return this.sesion()?.token ?? null;
  }

  private cargarSesion(): SesionUsuario | null {
    if (typeof localStorage === 'undefined') return null;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as SesionUsuario;
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  }
}
