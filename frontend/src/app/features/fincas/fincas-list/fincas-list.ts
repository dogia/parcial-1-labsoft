import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FincaService } from '../finca.service';
import { Finca } from '../../../core/models/finca.model';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-fincas-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <section class="max-w-5xl mx-auto bg-white rounded-lg shadow p-6">
      <header class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-xl font-semibold text-emerald-800">
            Fincas del productor {{ documento() }}
          </h2>
          <p class="text-sm text-slate-500">
            <a routerLink="/productores" class="text-emerald-700 hover:underline">
              Volver a productores
            </a>
          </p>
        </div>
        @if (auth.esAdmin()) {
          <a
            [routerLink]="['/productores', documento(), 'fincas', 'nueva']"
            class="bg-emerald-700 hover:bg-emerald-800 text-white text-sm px-4 py-2 rounded transition"
            >Nueva finca</a
          >
        }
      </header>

      @if (cargando()) {
        <p class="text-slate-500 text-sm">Cargando...</p>
      } @else if (error()) {
        <p class="text-red-600 text-sm">{{ error() }}</p>
      } @else if (fincas().length === 0) {
        <p class="text-slate-500 text-sm">Este productor no tiene fincas registradas.</p>
      } @else {
        <table class="w-full text-left text-sm">
          <thead class="bg-slate-100 text-slate-600 uppercase text-xs">
            <tr>
              <th class="px-3 py-2">Numero catastro</th>
              <th class="px-3 py-2">Municipio</th>
              <th class="px-3 py-2 w-1 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            @for (finca of fincas(); track finca.numero_catastro) {
              <tr class="border-b border-slate-100 hover:bg-slate-50">
                <td class="px-3 py-2 font-mono">{{ finca.numero_catastro }}</td>
                <td class="px-3 py-2">{{ finca.municipio }}</td>
                <td class="px-3 py-2 whitespace-nowrap text-right">
                  <a
                    [routerLink]="[
                      '/productores',
                      documento(),
                      'fincas',
                      finca.numero_catastro,
                      'viveros',
                    ]"
                    class="text-emerald-700 hover:underline mr-3"
                    >Viveros</a
                  >
                  @if (auth.esAdmin()) {
                    <a
                      [routerLink]="[
                        '/productores',
                        documento(),
                        'fincas',
                        finca.numero_catastro,
                        'editar',
                      ]"
                      class="text-amber-700 hover:underline mr-3"
                      >Editar</a
                    >
                    <button
                      type="button"
                      (click)="eliminar(finca)"
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
export class FincasList {
  readonly documento = input.required<string>();

  private readonly fincaService = inject(FincaService);
  protected readonly auth = inject(AuthService);

  protected readonly fincas = signal<Finca[]>([]);
  protected readonly cargando = signal(true);
  protected readonly error = signal<string | null>(null);

  constructor() {
    queueMicrotask(() => this.recargar());
  }

  protected async eliminar(finca: Finca): Promise<void> {
    const ok = window.confirm(`Eliminar la finca ${finca.numero_catastro}?`);
    if (!ok) return;
    try {
      await firstValueFrom(this.fincaService.remove(this.documento(), finca.numero_catastro));
      await this.recargar();
    } catch {
      this.error.set('No se pudo eliminar la finca');
    }
  }

  private async recargar(): Promise<void> {
    this.cargando.set(true);
    this.error.set(null);
    try {
      const datos = await firstValueFrom(this.fincaService.findAllByProductor(this.documento()));
      this.fincas.set(datos);
    } catch {
      this.error.set('No se pudieron cargar las fincas');
    } finally {
      this.cargando.set(false);
    }
  }
}
