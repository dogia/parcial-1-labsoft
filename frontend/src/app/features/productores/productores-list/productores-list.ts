import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ProductorService } from '../productor.service';
import { Productor } from '../../../core/models/productor.model';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-productores-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <section class="max-w-5xl mx-auto bg-white rounded-lg shadow p-6">
      <header class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-xl font-semibold text-emerald-800">Productores</h2>
          <p class="text-sm text-slate-500">Listado completo de productores registrados.</p>
        </div>
        @if (auth.esAdmin()) {
          <a
            routerLink="/productores/nuevo"
            class="bg-emerald-700 hover:bg-emerald-800 text-white text-sm px-4 py-2 rounded transition"
            >Nuevo productor</a
          >
        }
      </header>

      @if (cargando()) {
        <p class="text-slate-500 text-sm">Cargando...</p>
      } @else if (error()) {
        <p class="text-red-600 text-sm">{{ error() }}</p>
      } @else if (productores().length === 0) {
        <p class="text-slate-500 text-sm">No hay productores registrados todavia.</p>
      } @else {
        <table class="w-full text-left text-sm">
          <thead class="bg-slate-100 text-slate-600 uppercase text-xs">
            <tr>
              <th class="px-3 py-2">Documento</th>
              <th class="px-3 py-2">Nombre</th>
              <th class="px-3 py-2">Apellido</th>
              <th class="px-3 py-2">Correo</th>
              <th class="px-3 py-2">Telefono</th>
              <th class="px-3 py-2 w-1 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            @for (productor of productores(); track productor.documento) {
              <tr class="border-b border-slate-100 hover:bg-slate-50">
                <td class="px-3 py-2 font-mono">{{ productor.documento }}</td>
                <td class="px-3 py-2">{{ productor.nombre }}</td>
                <td class="px-3 py-2">{{ productor.apellido }}</td>
                <td class="px-3 py-2">{{ productor.correo }}</td>
                <td class="px-3 py-2">{{ productor.telefono }}</td>
                <td class="px-3 py-2 whitespace-nowrap text-right">
                  <a
                    [routerLink]="['/productores', productor.documento, 'viveros']"
                    class="text-emerald-700 hover:underline mr-3"
                    >Viveros</a
                  >
                  @if (auth.esAdmin()) {
                    <a
                      [routerLink]="['/productores', productor.documento, 'editar']"
                      class="text-amber-700 hover:underline mr-3"
                      >Editar</a
                    >
                    <button
                      type="button"
                      (click)="eliminar(productor)"
                      class="text-red-700 hover:underline"
                    >
                      Eliminar
                    </button>
                  }
                </td>
              </tr>
            }
          </tbody>
        </table>
      }
    </section>
  `,
})
export class ProductoresList {
  private readonly productorService = inject(ProductorService);
  protected readonly auth = inject(AuthService);

  protected readonly productores = signal<Productor[]>([]);
  protected readonly cargando = signal(true);
  protected readonly error = signal<string | null>(null);

  constructor() {
    this.recargar();
  }

  protected async eliminar(productor: Productor): Promise<void> {
    const confirmar = window.confirm(
      `Eliminar al productor ${productor.nombre} ${productor.apellido}?`,
    );
    if (!confirmar) return;
    try {
      await firstValueFrom(this.productorService.remove(productor.documento));
      await this.recargar();
    } catch {
      this.error.set('No se pudo eliminar el productor');
    }
  }

  private async recargar(): Promise<void> {
    this.cargando.set(true);
    this.error.set(null);
    try {
      const datos = await firstValueFrom(this.productorService.findAll());
      this.productores.set(datos);
    } catch {
      this.error.set('No se pudieron cargar los productores');
    } finally {
      this.cargando.set(false);
    }
  }
}
