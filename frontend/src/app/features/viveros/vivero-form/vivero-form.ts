import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ViveroService } from '../vivero.service';
import { Vivero } from '../../../core/models/vivero.model';

@Component({
  selector: 'app-vivero-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  template: `
    <section class="max-w-xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold text-emerald-800 mb-4">
        {{ codigo() ? 'Editar vivero' : 'Nuevo vivero' }}
      </h2>

      <form [formGroup]="form" (ngSubmit)="guardar()" class="space-y-4">
        <label class="block">
          <span class="block text-sm font-medium text-slate-700 mb-1">Codigo</span>
          <input
            type="text"
            formControlName="codigo"
            class="w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-100"
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

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label class="block">
            <span class="block text-sm font-medium text-slate-700 mb-1">Departamento</span>
            <input
              type="text"
              formControlName="departamento"
              class="w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </label>
          <label class="block">
            <span class="block text-sm font-medium text-slate-700 mb-1">Municipio</span>
            <input
              type="text"
              formControlName="municipio"
              class="w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </label>
        </div>

        <label class="block">
          <span class="block text-sm font-medium text-slate-700 mb-1">Tipo de cultivo</span>
          <input
            type="text"
            formControlName="tipo_cultivo"
            class="w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
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
export class ViveroForm {
  readonly documento = input.required<string>();
  readonly numeroCatastro = input.required<string>();
  readonly codigo = input<string | undefined>();

  private readonly fb = inject(FormBuilder);
  private readonly service = inject(ViveroService);
  private readonly router = inject(Router);

  protected readonly guardando = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    codigo: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    departamento: ['', [Validators.required]],
    municipio: ['', [Validators.required]],
    tipo_cultivo: ['', [Validators.required]],
  });

  constructor() {
    queueMicrotask(() => this.cargar());
  }

  private async cargar(): Promise<void> {
    const cod = this.codigo();
    if (!cod) return;
    try {
      const vivero = await firstValueFrom(this.service.findOne(this.numeroCatastro(), cod));
      this.form.patchValue(vivero);
      this.form.controls.codigo.disable();
    } catch {
      this.error.set('No se encontro el vivero');
    }
  }

  protected async guardar(): Promise<void> {
    if (this.form.invalid) return;
    this.guardando.set(true);
    this.error.set(null);
    try {
      const valores = this.form.getRawValue() as Partial<Vivero>;
      if (this.codigo()) {
        await firstValueFrom(this.service.update(this.numeroCatastro(), this.codigo()!, valores));
      } else {
        await firstValueFrom(this.service.create(this.numeroCatastro(), valores));
      }
      await this.volver();
    } catch {
      this.error.set('No se pudo guardar el vivero');
    } finally {
      this.guardando.set(false);
    }
  }

  protected async cancelar(): Promise<void> {
    await this.volver();
  }

  private volver(): Promise<boolean> {
    return this.router.navigate([
      '/productores',
      this.documento(),
      'fincas',
      this.numeroCatastro(),
      'viveros',
    ]);
  }
}
