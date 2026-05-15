import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ProductoControlService } from '../producto-control.service';
import { ProductoControl } from '../../../core/models/producto-control.model';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-productos-control-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, DecimalPipe],
  template: `
    <section class="max-w-6xl mx-auto bg-white rounded-lg shadow p-6">
      <header class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-xl font-semibold text-emerald-800">Productos de control</h2>
          <p class="text-sm text-slate-500">
            Plagas, hongos y fertilizantes registrados en el sistema.
          </p>
        </div>
        @if (auth.esAdmin()) {
          <a
            routerLink="/productos-control/nuevo"
            class="bg-emerald-700 hover:bg-emerald-800 text-white text-sm px-4 py-2 rounded transition"
            >Nuevo producto</a
          >
        }
      </header>

      @if (cargando()) {
        <p class="text-slate-500 text-sm">Cargando...</p>
      } @else if (error()) {
        <p class="text-red-600 text-sm">{{ error() }}</p>
      } @else if (productos().length === 0) {
        <p class="text-slate-500 text-sm">No hay productos registrados todavia.</p>
      } @else {
        <table class="w-full text-left text-sm">
          <thead class="bg-slate-100 text-slate-600 uppercase text-xs">
            <tr>
              <th class="px-3 py-2">ICA</th>
              <th class="px-3 py-2">Nombre</th>
              <th class="px-3 py-2">Tipo</th>
              <th class="px-3 py-2">Frecuencia (dias)</th>
              <th class="px-3 py-2">Valor</th>
              <th class="px-3 py-2">Detalle</th>
              <th class="px-3 py-2 w-1 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            @for (producto of productos(); track producto.id) {
              <tr class="border-b border-slate-100 hover:bg-slate-50">
                <td class="px-3 py-2 font-mono">{{ producto.registro_ica }}</td>
                <td class="px-3 py-2">{{ producto.nombre }}</td>
                <td class="px-3 py-2">
                  <span class="text-xs uppercase bg-slate-200 px-2 py-0.5 rounded">
                    {{ producto.tipo }}
                  </span>
                </td>
                <td class="px-3 py-2">{{ producto.frecuencia_aplicacion }}</td>
                <td class="px-3 py-2">{{ producto.valor | number }}</td>
                <td class="px-3 py-2 text-xs text-slate-600">{{ detalle(producto) }}</td>
                <td class="px-3 py-2 whitespace-nowrap text-right">
                  @if (auth.esAdmin()) {
                    <a
                      [routerLink]="['/productos-control', producto.id, 'editar']"
                      class="text-amber-700 hover:underline mr-3"
                      >Editar</a
                    >
                    <button
                      type="button"
                      (click)="eliminar(producto)"
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
export class ProductosControlList {
  private readonly service = inject(ProductoControlService);
  protected readonly auth = inject(AuthService);

  protected readonly productos = signal<ProductoControl[]>([]);
  protected readonly cargando = signal(true);
  protected readonly error = signal<string | null>(null);

  constructor() {
    this.recargar();
  }

  protected detalle(producto: ProductoControl): string {
    if (producto.controlPlaga) {
      return `Carencia: ${producto.controlPlaga.periodo_carencia} dias`;
    }
    if (producto.controlHongo) {
      return `${producto.controlHongo.nombre_hongo} (carencia ${producto.controlHongo.periodo_carencia} dias)`;
    }
    if (producto.controlFertilizante) {
      return `Ultima aplicacion: ${producto.controlFertilizante.fecha_ultima_aplicacion}`;
    }
    return '(sin detalle)';
  }

  protected async eliminar(producto: ProductoControl): Promise<void> {
    const ok = window.confirm(`Eliminar el producto ${producto.nombre}?`);
    if (!ok) return;
    try {
      await firstValueFrom(this.service.remove(producto.id));
      await this.recargar();
    } catch {
      this.error.set('No se pudo eliminar el producto');
    }
  }

  private async recargar(): Promise<void> {
    this.cargando.set(true);
    this.error.set(null);
    try {
      const datos = await firstValueFrom(this.service.findAll());
      this.productos.set(datos);
    } catch {
      this.error.set('No se pudieron cargar los productos');
    } finally {
      this.cargando.set(false);
    }
  }
}
