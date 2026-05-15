import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ViveroService } from '../vivero.service';
import { Vivero } from '../../../core/models/vivero.model';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-viveros-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <section class="max-w-6xl mx-auto bg-white rounded-lg shadow p-6">
      <header class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-xl font-semibold text-emerald-800">
            Viveros de la finca {{ numeroCatastro() }}
          </h2>
          <p class="text-sm text-slate-500">
            <a
              [routerLink]="['/productores', documento(), 'fincas']"
              class="text-emerald-700 hover:underline"
              >Volver a fincas</a
            >
          </p>
        </div>
        @if (auth.esAdmin()) {
          <a
            [routerLink]="[
              '/productores',
              documento(),
              'fincas',
              numeroCatastro(),
              'viveros',
              'nuevo',
            ]"
            class="bg-emerald-700 hover:bg-emerald-800 text-white text-sm px-4 py-2 rounded transition"
            >Nuevo vivero</a
          >
        }
      </header>

      @if (cargando()) {
        <p class="text-slate-500 text-sm">Cargando...</p>
      } @else if (error()) {
        <p class="text-red-600 text-sm">{{ error() }}</p>
      } @else if (viveros().length === 0) {
        <p class="text-slate-500 text-sm">Esta finca no tiene viveros registrados.</p>
      } @else {
        <table class="w-full text-left text-sm">
          <thead class="bg-slate-100 text-slate-600 uppercase text-xs">
            <tr>
              <th class="px-3 py-2">Codigo</th>
              <th class="px-3 py-2">Nombre</th>
              <th class="px-3 py-2">Departamento</th>
              <th class="px-3 py-2">Municipio</th>
              <th class="px-3 py-2">Cultivo</th>
              <th class="px-3 py-2 w-1 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            @for (vivero of viveros(); track vivero.codigo) {
              <tr class="border-b border-slate-100 hover:bg-slate-50">
                <td class="px-3 py-2 font-mono">{{ vivero.codigo }}</td>
                <td class="px-3 py-2">{{ vivero.nombre }}</td>
                <td class="px-3 py-2">{{ vivero.departamento }}</td>
                <td class="px-3 py-2">{{ vivero.municipio }}</td>
                <td class="px-3 py-2">{{ vivero.tipo_cultivo }}</td>
                <td class="px-3 py-2 whitespace-nowrap text-right">
                  <a
                    [routerLink]="['/viveros', vivero.codigo, 'labores']"
                    class="text-emerald-700 hover:underline mr-3"
                    >Labores</a
                  >
                  @if (auth.esAdmin()) {
                    <a
                      [routerLink]="[
                        '/productores',
                        documento(),
                        'fincas',
                        numeroCatastro(),
                        'viveros',
                        vivero.codigo,
                        'editar',
                      ]"
                      class="text-amber-700 hover:underline mr-3"
                      >Editar</a
                    >
                    <button
                      type="button"
                      (click)="eliminar(vivero)"
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
export class ViverosList {
  readonly documento = input.required<string>();
  readonly numeroCatastro = input.required<string>();

  private readonly service = inject(ViveroService);
  protected readonly auth = inject(AuthService);

  protected readonly viveros = signal<Vivero[]>([]);
  protected readonly cargando = signal(true);
  protected readonly error = signal<string | null>(null);

  constructor() {
    queueMicrotask(() => this.recargar());
  }

  protected async eliminar(vivero: Vivero): Promise<void> {
    const ok = window.confirm(`Eliminar el vivero ${vivero.codigo} - ${vivero.nombre}?`);
    if (!ok) return;
    try {
      await firstValueFrom(this.service.remove(this.numeroCatastro(), vivero.codigo));
      await this.recargar();
    } catch {
      this.error.set('No se pudo eliminar el vivero');
    }
  }

  private async recargar(): Promise<void> {
    this.cargando.set(true);
    this.error.set(null);
    try {
      const datos = await firstValueFrom(this.service.findAllByFinca(this.numeroCatastro()));
      this.viveros.set(datos);
    } catch {
      this.error.set('No se pudieron cargar los viveros');
    } finally {
      this.cargando.set(false);
    }
  }
}
