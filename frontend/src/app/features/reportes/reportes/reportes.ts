import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ReportesService } from '../reportes.service';
import { ProductorService } from '../../productores/productor.service';
import { ViveroService } from '../../viveros/vivero.service';
import { Productor } from '../../../core/models/productor.model';
import { Vivero } from '../../../core/models/vivero.model';

@Component({
  selector: 'app-reportes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  template: `
    <div class="max-w-5xl mx-auto space-y-6">
      <header class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold text-emerald-800">Reportes</h2>
        <p class="text-sm text-slate-500 mt-1">
          Descargue los reportes exigidos por el enunciado en formato PDF o Excel.
        </p>
      </header>

      @if (error()) {
        <p class="bg-red-50 border border-red-200 text-red-700 text-sm rounded p-3">
          {{ error() }}
        </p>
      }

      <section class="bg-white rounded-lg shadow p-6 space-y-4">
        <header>
          <h3 class="font-semibold text-emerald-800">Labores ejecutadas en un vivero</h3>
          <p class="text-sm text-slate-500">
            Consulta a) del enunciado. Incluye el detalle del producto de control aplicado.
          </p>
        </header>

        <div class="grid sm:grid-cols-[1fr_auto_auto] gap-3 items-end">
          <label class="block">
            <span class="block text-sm font-medium text-slate-700 mb-1">Vivero</span>
            <select
              [ngModel]="codigoVivero()"
              (ngModelChange)="codigoVivero.set($event)"
              class="w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option [ngValue]="''">Seleccione un vivero...</option>
              @for (vivero of viveros(); track vivero.codigo) {
                <option [ngValue]="vivero.codigo">
                  {{ vivero.codigo }} - {{ vivero.nombre }} ({{ vivero.municipio }})
                </option>
              }
            </select>
          </label>
          <button
            type="button"
            [disabled]="!codigoVivero() || descargando()"
            (click)="descargarLaboresPdf()"
            class="bg-emerald-700 text-white px-4 py-2 rounded hover:bg-emerald-800 disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            Descargar PDF
          </button>
          <button
            type="button"
            [disabled]="!codigoVivero() || descargando()"
            (click)="descargarLaboresExcel()"
            class="bg-emerald-700 text-white px-4 py-2 rounded hover:bg-emerald-800 disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            Descargar Excel
          </button>
        </div>
      </section>

      <section class="bg-white rounded-lg shadow p-6 space-y-4">
        <header>
          <h3 class="font-semibold text-emerald-800">Viveros de un productor</h3>
          <p class="text-sm text-slate-500">
            Consulta b) del enunciado. Lista todos los viveros del productor sin importar la finca.
          </p>
        </header>

        <div class="grid sm:grid-cols-[1fr_auto_auto] gap-3 items-end">
          <label class="block">
            <span class="block text-sm font-medium text-slate-700 mb-1">Productor</span>
            <select
              [ngModel]="documentoProductor()"
              (ngModelChange)="documentoProductor.set($event)"
              class="w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option [ngValue]="''">Seleccione un productor...</option>
              @for (productor of productores(); track productor.documento) {
                <option [ngValue]="productor.documento">
                  {{ productor.nombre }} {{ productor.apellido }} ({{ productor.documento }})
                </option>
              }
            </select>
          </label>
          <button
            type="button"
            [disabled]="!documentoProductor() || descargando()"
            (click)="descargarViverosPdf()"
            class="bg-emerald-700 text-white px-4 py-2 rounded hover:bg-emerald-800 disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            Descargar PDF
          </button>
          <button
            type="button"
            [disabled]="!documentoProductor() || descargando()"
            (click)="descargarViverosExcel()"
            class="bg-emerald-700 text-white px-4 py-2 rounded hover:bg-emerald-800 disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            Descargar Excel
          </button>
        </div>
      </section>
    </div>
  `,
})
export class Reportes {
  private readonly reportesService = inject(ReportesService);
  private readonly productorService = inject(ProductorService);
  private readonly viveroService = inject(ViveroService);

  protected readonly productores = signal<Productor[]>([]);
  protected readonly viveros = signal<Vivero[]>([]);
  protected readonly codigoVivero = signal('');
  protected readonly documentoProductor = signal('');
  protected readonly descargando = signal(false);
  protected readonly error = signal<string | null>(null);

  constructor() {
    this.cargarCatalogos();
  }

  private async cargarCatalogos(): Promise<void> {
    try {
      const productores = await firstValueFrom(this.productorService.findAll());
      this.productores.set(productores);
      const listas = await Promise.all(
        productores.map((productor) =>
          firstValueFrom(this.viveroService.findAllByProductor(productor.documento)),
        ),
      );
      this.viveros.set(listas.flat());
    } catch {
      this.error.set('No se pudieron cargar los catalogos de productores y viveros');
    }
  }

  protected async descargarLaboresPdf(): Promise<void> {
    await this.ejecutarDescarga(() =>
      this.reportesService.descargarLaboresPdf(this.codigoVivero()),
    );
  }

  protected async descargarLaboresExcel(): Promise<void> {
    await this.ejecutarDescarga(() =>
      this.reportesService.descargarLaboresExcel(this.codigoVivero()),
    );
  }

  protected async descargarViverosPdf(): Promise<void> {
    await this.ejecutarDescarga(() =>
      this.reportesService.descargarViverosPdf(this.documentoProductor()),
    );
  }

  protected async descargarViverosExcel(): Promise<void> {
    await this.ejecutarDescarga(() =>
      this.reportesService.descargarViverosExcel(this.documentoProductor()),
    );
  }

  private async ejecutarDescarga(accion: () => Promise<void>): Promise<void> {
    this.descargando.set(true);
    this.error.set(null);
    try {
      await accion();
    } catch {
      this.error.set('No se pudo generar el archivo. Intentelo de nuevo.');
    } finally {
      this.descargando.set(false);
    }
  }
}
