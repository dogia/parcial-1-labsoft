import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ProductorService } from '../productor.service';
import { Productor } from '../../../core/models/productor.model';

@Component({
  selector: 'app-productor-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  template: `
    <section class="max-w-xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold text-emerald-800 mb-4">
        {{ documento() ? 'Editar productor' : 'Nuevo productor' }}
      </h2>

      <form [formGroup]="form" (ngSubmit)="guardar()" class="space-y-4">
        <label class="block">
          <span class="block text-sm font-medium text-slate-700 mb-1">Documento</span>
          <input
            type="text"
            formControlName="documento"
            class="w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-100"
          />
        </label>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label class="block">
            <span class="block text-sm font-medium text-slate-700 mb-1">Nombre</span>
            <input
              type="text"
              formControlName="nombre"
              class="w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </label>
          <label class="block">
            <span class="block text-sm font-medium text-slate-700 mb-1">Apellido</span>
            <input
              type="text"
              formControlName="apellido"
              class="w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </label>
        </div>

        <label class="block">
          <span class="block text-sm font-medium text-slate-700 mb-1">Correo</span>
          <input
            type="email"
            formControlName="correo"
            class="w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </label>

        <label class="block">
          <span class="block text-sm font-medium text-slate-700 mb-1">Telefono</span>
          <input
            type="text"
            formControlName="telefono"
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
export class ProductorForm {
  readonly documento = input<string | undefined>();

  private readonly fb = inject(FormBuilder);
  private readonly service = inject(ProductorService);
  private readonly router = inject(Router);

  protected readonly guardando = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    documento: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required]],
  });

  constructor() {
    queueMicrotask(() => this.cargar());
  }

  private async cargar(): Promise<void> {
    const doc = this.documento();
    if (!doc) return;
    try {
      const productor = await firstValueFrom(this.service.findOne(doc));
      this.form.patchValue(productor);
      this.form.controls.documento.disable();
    } catch {
      this.error.set('No se encontro el productor');
    }
  }

  protected async guardar(): Promise<void> {
    if (this.form.invalid) return;
    this.guardando.set(true);
    this.error.set(null);
    try {
      const valores = this.form.getRawValue() as Productor;
      if (this.documento()) {
        await firstValueFrom(this.service.update(this.documento()!, valores));
      } else {
        await firstValueFrom(this.service.create(valores));
      }
      await this.router.navigateByUrl('/productores');
    } catch {
      this.error.set('No se pudo guardar el productor');
    } finally {
      this.guardando.set(false);
    }
  }

  protected async cancelar(): Promise<void> {
    await this.router.navigateByUrl('/productores');
  }
}
