import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FincaService } from '../finca.service';
import { Finca } from '../../../core/models/finca.model';

@Component({
  selector: 'app-finca-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  template: `
    <section class="max-w-xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold text-emerald-800 mb-4">
        {{ numeroCatastro() ? 'Editar finca' : 'Nueva finca' }}
      </h2>

      <form [formGroup]="form" (ngSubmit)="guardar()" class="space-y-4">
        <label class="block">
          <span class="block text-sm font-medium text-slate-700 mb-1">Numero catastro</span>
          <input
            type="text"
            formControlName="numero_catastro"
            class="w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-100"
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
export class FincaForm {
  readonly documento = input.required<string>();
  readonly numeroCatastro = input<string | undefined>();

  private readonly fb = inject(FormBuilder);
  private readonly service = inject(FincaService);
  private readonly router = inject(Router);

  protected readonly guardando = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    numero_catastro: ['', [Validators.required]],
    municipio: ['', [Validators.required]],
  });

  constructor() {
    queueMicrotask(() => this.cargar());
  }

  private async cargar(): Promise<void> {
    const cat = this.numeroCatastro();
    if (!cat) return;
    try {
      const finca = await firstValueFrom(this.service.findOne(this.documento(), cat));
      this.form.patchValue(finca);
      this.form.controls.numero_catastro.disable();
    } catch {
      this.error.set('No se encontro la finca');
    }
  }

  protected async guardar(): Promise<void> {
    if (this.form.invalid) return;
    this.guardando.set(true);
    this.error.set(null);
    try {
      const valores = this.form.getRawValue() as Partial<Finca>;
      if (this.numeroCatastro()) {
        await firstValueFrom(this.service.update(this.documento(), this.numeroCatastro()!, valores));
      } else {
        await firstValueFrom(this.service.create(this.documento(), valores));
      }
      await this.router.navigate(['/productores', this.documento(), 'fincas']);
    } catch {
      this.error.set('No se pudo guardar la finca');
    } finally {
      this.guardando.set(false);
    }
  }

  protected async cancelar(): Promise<void> {
    await this.router.navigate(['/productores', this.documento(), 'fincas']);
  }
}
