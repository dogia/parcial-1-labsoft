import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { LaborService } from '../labor.service';
import { Labor } from '../../../core/models/labor.model';
import { ProductoControl } from '../../../core/models/producto-control.model';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-labores-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, DatePipe],
  template: `
    <section class="max-w-6xl mx-auto bg-white rounded-lg shadow p-6">
      <header class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-xl font-semibold text-emerald-800">
            Labores del vivero {{ codigo() }}
          </h2>
          <p class="text-sm text-slate-500">
            Historial de labores con su producto de control aplicado.
          </p>
        </div>
        <div class="flex gap-2">
          <a
            [routerLink]="['/reportes', 'labores', codigo()]"
            class="border border-emerald-700 text-emerald-700 text-sm px-3 py-2 rounded hover:bg-emerald-50"
            >Reporte</a
          >
          @if (auth.esAdmin()) {
            <a
              [routerLink]="['/viveros', codigo(), 'labores', 'nueva']"
              class="bg-emerald-700 hover:bg-emerald-800 text-white text-sm px-4 py-2 rounded transition"
              >Nueva labor</a
            >
          }
        </div>
      </header>

      @if (cargando()) {
        <p class="text-slate-500 text-sm">Cargando...</p>
      } @else if (error()) {
        <p class="text-red-600 text-sm">{{ error() }}</p>
      } @else if (labores().length === 0) {
        <p class="text-slate-500 text-sm">Aun no se han registrado labores en este vivero.</p>
      } @else {
        <table class="w-full text-left text-sm">
          <thead class="bg-slate-100 text-slate-600 uppercase text-xs">
            <tr>
              <th class="px-3 py-2">Fecha</th>
              <th class="px-3 py-2">Descripcion</th>
              <th class="px-3 py-2">Producto</th>
              <th class="px-3 py-2">Detalle</th>
              <th class="px-3 py-2 w-1 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            @for (labor of labores(); track labor.id) {
              <tr class="border-b border-slate-100 hover:bg-slate-50 align-top">
                <td class="px-3 py-2 whitespace-nowrap">{{ labor.fecha | date: 'yyyy-MM-dd' }}</td>
                <td class="px-3 py-2">{{ labor.descripcion }}</td>
                <td class="px-3 py-2">
                  @if (labor.producto) {
                    <div class="font-medium">{{ labor.producto.nombre }}</div>
                    <div class="text-xs text-slate-500 uppercase">{{ labor.producto.tipo }}</div>
                  } @else {
                    <span class="text-slate-400 text-xs">(sin producto)</span>
                  }
                </td>
                <td class="px-3 py-2 text-xs text-slate-600">
                  {{ resumenSubTipo(labor.producto) }}
                </td>
                <td class="px-3 py-2 whitespace-nowrap text-right">
                  @if (auth.esAdmin()) {
                    <a
                      [routerLink]="['/viveros', codigo(), 'labores', labor.id, 'editar']"
                      class="text-amber-700 hover:underline mr-3"
                      >Editar</a
                    >
                    <button
                      type="button"
                      (click)="eliminar(labor)"
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
export class LaboresList {
  readonly codigo = input.required<string>();

  private readonly service = inject(LaborService);
  protected readonly auth = inject(AuthService);

  protected readonly labores = signal<Labor[]>([]);
  protected readonly cargando = signal(true);
  protected readonly error = signal<string | null>(null);

  constructor() {
    queueMicrotask(() => this.recargar());
  }

  protected resumenSubTipo(producto?: ProductoControl): string {
    if (!producto) return '';
    if (producto.controlPlaga) {
      return `Carencia: ${producto.controlPlaga.periodo_carencia} dias`;
    }
    if (producto.controlHongo) {
      return `Hongo: ${producto.controlHongo.nombre_hongo} (carencia ${producto.controlHongo.periodo_carencia} dias)`;
    }
    if (producto.controlFertilizante) {
      return `Ultima aplicacion: ${producto.controlFertilizante.fecha_ultima_aplicacion}`;
    }
    return '';
  }

  protected async eliminar(labor: Labor): Promise<void> {
    const ok = window.confirm(`Eliminar la labor del ${labor.fecha}?`);
    if (!ok) return;
    try {
      await firstValueFrom(this.service.remove(this.codigo(), labor.id));
      await this.recargar();
    } catch {
      this.error.set('No se pudo eliminar la labor');
    }
  }

  private async recargar(): Promise<void> {
    this.cargando.set(true);
    this.error.set(null);
    try {
      const datos = await firstValueFrom(this.service.findAllByVivero(this.codigo()));
      this.labores.set(datos);
    } catch {
      this.error.set('No se pudieron cargar las labores');
    } finally {
      this.cargando.set(false);
    }
  }
}
