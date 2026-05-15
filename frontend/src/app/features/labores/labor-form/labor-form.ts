import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { LaborService } from '../labor.service';
import { ProductoControlService } from '../../productos-control/producto-control.service';
import { Labor } from '../../../core/models/labor.model';
import { ProductoControl } from '../../../core/models/producto-control.model';

@Component({
  selector: 'app-labor-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  template: `
    <section class="max-w-xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold text-emerald-800 mb-4">
        {{ id() ? 'Editar labor' : 'Nueva labor' }}
      </h2>

      <form [formGroup]="form" (ngSubmit)="guardar()" class="space-y-4">
        <label class="block">
          <span class="block text-sm font-medium text-slate-700 mb-1">Fecha</span>
          <input
            type="date"
            formControlName="fecha"
            class="w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </label>

        <label class="block">
          <span class="block text-sm font-medium text-slate-700 mb-1">Descripcion</span>
          <textarea
            formControlName="descripcion"
            rows="3"
            class="w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          ></textarea>
        </label>

        <label class="block">
          <span class="block text-sm font-medium text-slate-700 mb-1">Producto de control</span>
          <select
            formControlName="producto_id"
            class="w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option [ngValue]="null">Seleccione un producto...</option>
            @for (producto of productos(); track producto.id) {
              <option [ngValue]="producto.id">
                {{ producto.nombre }} ({{ producto.tipo }})
              </option>
            }
          </select>
        </label>

        @if (error()) {
          <p class="text-sm text-red-600">{{ error() }}</p>
        }

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
export class LaborForm {
  readonly codigo = input.required<string>();
  readonly id = input<string | undefined>();

  private readonly fb = inject(FormBuilder);
  private readonly laborService = inject(LaborService);
  private readonly productoService = inject(ProductoControlService);
  private readonly router = inject(Router);

  protected readonly productos = signal<ProductoControl[]>([]);
  protected readonly guardando = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    fecha: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    producto_id: this.fb.control<number | null>(null, [Validators.required]),
  });

  constructor() {
    queueMicrotask(() => this.inicializar());
  }

  private async inicializar(): Promise<void> {
    try {
      const productos = await firstValueFrom(this.productoService.findAll());
      this.productos.set(productos);
    } catch {
      this.error.set('No se pudo cargar la lista de productos de control');
    }

    const idActual = this.id();
    if (!idActual) return;
    try {
      const labor = await firstValueFrom(
        this.laborService.findOne(this.codigo(), Number(idActual)),
      );
      this.form.patchValue({
        fecha: labor.fecha?.slice(0, 10),
        descripcion: labor.descripcion,
        producto_id: labor.producto_id,
      });
    } catch {
      this.error.set('No se encontro la labor');
    }
  }

  protected async guardar(): Promise<void> {
    if (this.form.invalid) return;
    this.guardando.set(true);
    this.error.set(null);
    try {
      const valores = this.form.getRawValue() as Partial<Labor>;
      if (this.id()) {
        await firstValueFrom(
          this.laborService.update(this.codigo(), Number(this.id()), valores),
        );
      } else {
        await firstValueFrom(this.laborService.create(this.codigo(), valores));
      }
      await this.volver();
    } catch {
      this.error.set('No se pudo guardar la labor');
    } finally {
      this.guardando.set(false);
    }
  }

  protected async cancelar(): Promise<void> {
    await this.volver();
  }

  private volver(): Promise<boolean> {
    return this.router.navigate(['/viveros', this.codigo(), 'labores']);
  }
}
