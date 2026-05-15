import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ProductoControlService } from '../producto-control.service';
import {
  ProductoControl,
  TipoProductoControl,
} from '../../../core/models/producto-control.model';

@Component({
  selector: 'app-producto-control-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, DecimalPipe],
  template: `
    <section class="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold text-emerald-800 mb-4">
        {{ id() ? 'Editar producto de control' : 'Nuevo producto de control' }}
      </h2>

      <form [formGroup]="form" (ngSubmit)="guardar()" class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label class="block">
            <span class="block text-sm font-medium text-slate-700 mb-1">Registro ICA</span>
            <input
              type="text"
              formControlName="registro_ica"
              class="w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </label>
          <label class="block">
            <span class="block text-sm font-medium text-slate-700 mb-1">Nombre</span>
            <input
              type="text"
              formControlName="nombre"
              class="w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </label>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <label class="block">
            <span class="block text-sm font-medium text-slate-700 mb-1">Tipo</span>
            <select
              formControlName="tipo"
              class="w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="PLAGA">PLAGA</option>
              <option value="HONGO">HONGO</option>
              <option value="FERTILIZANTE">FERTILIZANTE</option>
            </select>
          </label>
          <label class="block">
            <span class="block text-sm font-medium text-slate-700 mb-1">Frecuencia (dias)</span>
            <input
              type="number"
              min="1"
              formControlName="frecuencia_aplicacion"
              class="w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </label>
          <label class="block">
            <span class="block text-sm font-medium text-slate-700 mb-1">Valor</span>
            <input
              type="number"
              min="0"
              formControlName="valor"
              class="w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </label>
        </div>

        <fieldset class="border border-slate-200 rounded p-4 space-y-3">
          <legend class="px-2 text-sm text-slate-600">Detalle especifico</legend>

          @if (tipoSeleccionado() === 'PLAGA' || tipoSeleccionado() === 'HONGO') {
            <label class="block">
              <span class="block text-sm font-medium text-slate-700 mb-1">
                Periodo de carencia (dias)
              </span>
              <input
                type="number"
                min="0"
                formControlName="periodo_carencia"
                class="w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </label>
          }

          @if (tipoSeleccionado() === 'HONGO') {
            <label class="block">
              <span class="block text-sm font-medium text-slate-700 mb-1">Nombre del hongo</span>
              <input
                type="text"
                formControlName="nombre_hongo"
                class="w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </label>
          }

          @if (tipoSeleccionado() === 'FERTILIZANTE') {
            <label class="block">
              <span class="block text-sm font-medium text-slate-700 mb-1">
                Fecha de la ultima aplicacion
              </span>
              <input
                type="date"
                formControlName="fecha_ultima_aplicacion"
                class="w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </label>
          }
        </fieldset>

        @if (error()) {
          <p class="text-sm text-red-600">{{ error() }}</p>
        }

        <p class="text-xs text-slate-500">
          Valor actual: {{ form.controls.valor.value | number }}
        </p>

        <div class="flex justify-end gap-3 pt-2">
          <button
            type="button"
            (click)="cancelar()"
            class="border border-slate-300 text-slate-700 px-4 py-2 rounded hover:bg-slate-100"
          >
            Cancelar
          </button>
          <button
            type="submit"
            [disabled]="form.invalid || guardando()"
            class="bg-emerald-700 text-white px-4 py-2 rounded hover:bg-emerald-800 disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            {{ guardando() ? 'Guardando...' : 'Guardar' }}
          </button>
        </div>
      </form>
    </section>
  `,
})
export class ProductoControlForm {
  readonly id = input<string | undefined>();

  private readonly fb = inject(FormBuilder);
  private readonly service = inject(ProductoControlService);
  private readonly router = inject(Router);

  protected readonly tipoSeleccionado = signal<TipoProductoControl>('PLAGA');
  protected readonly guardando = signal(false);
  protected readonly error = signal<string | null>(null);
  private readonly subTipoExistente = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    registro_ica: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    tipo: this.fb.control<TipoProductoControl>('PLAGA', { validators: [Validators.required] }),
    frecuencia_aplicacion: this.fb.control<number>(15, [Validators.required, Validators.min(1)]),
    valor: this.fb.control<number>(0, [Validators.required, Validators.min(0)]),
    periodo_carencia: this.fb.control<number | null>(null),
    nombre_hongo: this.fb.control<string | null>(null),
    fecha_ultima_aplicacion: this.fb.control<string | null>(null),
  });

  constructor() {
    this.form.controls.tipo.valueChanges.subscribe((tipo) => {
      this.tipoSeleccionado.set(tipo as TipoProductoControl);
    });
    queueMicrotask(() => this.cargar());
  }

  private async cargar(): Promise<void> {
    const idActual = this.id();
    if (!idActual) return;
    try {
      const producto = await firstValueFrom(this.service.findOne(Number(idActual)));
      this.form.patchValue({
        registro_ica: producto.registro_ica,
        nombre: producto.nombre,
        tipo: producto.tipo,
        frecuencia_aplicacion: producto.frecuencia_aplicacion,
        valor: producto.valor,
        periodo_carencia:
          producto.controlPlaga?.periodo_carencia ?? producto.controlHongo?.periodo_carencia ?? null,
        nombre_hongo: producto.controlHongo?.nombre_hongo ?? null,
        fecha_ultima_aplicacion: producto.controlFertilizante?.fecha_ultima_aplicacion ?? null,
      });
      this.tipoSeleccionado.set(producto.tipo);
      this.subTipoExistente.set(
        !!(producto.controlPlaga || producto.controlHongo || producto.controlFertilizante),
      );
    } catch {
      this.error.set('No se encontro el producto');
    }
  }

  protected async guardar(): Promise<void> {
    if (this.form.invalid) return;
    this.guardando.set(true);
    this.error.set(null);
    try {
      const valores = this.form.getRawValue();
      const datosBase: Partial<ProductoControl> = {
        registro_ica: valores.registro_ica,
        nombre: valores.nombre,
        tipo: valores.tipo as TipoProductoControl,
        frecuencia_aplicacion: Number(valores.frecuencia_aplicacion ?? 0),
        valor: Number(valores.valor ?? 0),
      };

      let productoId: number;
      if (this.id()) {
        productoId = Number(this.id());
        await firstValueFrom(this.service.update(productoId, datosBase));
      } else {
        const creado = await firstValueFrom(this.service.create(datosBase));
        productoId = creado.id;
      }

      await this.guardarSubTipo(productoId, valores);
      await this.router.navigateByUrl('/productos-control');
    } catch {
      this.error.set('No se pudo guardar el producto');
    } finally {
      this.guardando.set(false);
    }
  }

  private async guardarSubTipo(
    productoId: number,
    valores: ReturnType<typeof this.form.getRawValue>,
  ): Promise<void> {
    const accion = this.subTipoExistente() ? 'update' : 'create';

    if (valores.tipo === 'PLAGA') {
      const payload = { periodo_carencia: Number(valores.periodo_carencia ?? 0) };
      await firstValueFrom(
        accion === 'update'
          ? this.service.updateControlPlaga(productoId, payload)
          : this.service.upsertControlPlaga(productoId, payload),
      );
    } else if (valores.tipo === 'HONGO') {
      const payload = {
        periodo_carencia: Number(valores.periodo_carencia ?? 0),
        nombre_hongo: valores.nombre_hongo ?? '',
      };
      await firstValueFrom(
        accion === 'update'
          ? this.service.updateControlHongo(productoId, payload)
          : this.service.upsertControlHongo(productoId, payload),
      );
    } else if (valores.tipo === 'FERTILIZANTE') {
      const payload = {
        fecha_ultima_aplicacion: valores.fecha_ultima_aplicacion ?? '',
      };
      await firstValueFrom(
        accion === 'update'
          ? this.service.updateControlFertilizante(productoId, payload)
          : this.service.upsertControlFertilizante(productoId, payload),
      );
    }
  }

  protected async cancelar(): Promise<void> {
    await this.router.navigateByUrl('/productos-control');
  }
}
