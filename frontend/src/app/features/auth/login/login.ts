import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  template: `
    <div class="min-h-[70vh] flex items-center justify-center">
      <form
        [formGroup]="form"
        (ngSubmit)="enviar()"
        class="w-full max-w-sm bg-white rounded-lg shadow-md p-8 space-y-5"
      >
        <header>
          <h2 class="text-2xl font-semibold text-emerald-800">Iniciar sesion</h2>
          <p class="text-sm text-slate-500 mt-1">
            Ingrese su correo y contrasena para continuar.
          </p>
        </header>

        <label class="block">
          <span class="block text-sm font-medium text-slate-700 mb-1">Correo</span>
          <input
            type="email"
            formControlName="correo"
            autocomplete="email"
            class="w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </label>

        <label class="block">
          <span class="block text-sm font-medium text-slate-700 mb-1">Contrasena</span>
          <input
            type="password"
            formControlName="password"
            autocomplete="current-password"
            class="w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </label>

        @if (error()) {
          <p class="text-sm text-red-600">{{ error() }}</p>
        }

        <button
          type="submit"
          [disabled]="form.invalid || cargando()"
          class="w-full rounded bg-emerald-700 text-white py-2 font-medium hover:bg-emerald-800 disabled:bg-slate-400 disabled:cursor-not-allowed transition"
        >
          {{ cargando() ? 'Validando...' : 'Entrar' }}
        </button>
      </form>
    </div>
  `,
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly cargando = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  async enviar(): Promise<void> {
    if (this.form.invalid) return;
    this.cargando.set(true);
    this.error.set(null);
    try {
      const { correo, password } = this.form.getRawValue();
      await this.auth.login(correo, password);
      await this.router.navigateByUrl('/');
    } catch {
      this.error.set('Credenciales invalidas');
    } finally {
      this.cargando.set(false);
    }
  }
}
