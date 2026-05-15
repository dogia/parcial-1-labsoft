import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface AccesoRapido {
  ruta: string;
  titulo: string;
  descripcion: string;
}

const ACCESOS: AccesoRapido[] = [
  {
    ruta: '/productores',
    titulo: 'Productores',
    descripcion: 'Gestione los productores y sus fincas, viveros y labores.',
  },
  {
    ruta: '/productos-control',
    titulo: 'Productos de control',
    descripcion: 'Catalogo de productos de plaga, hongo y fertilizante.',
  },
];

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <section class="max-w-4xl mx-auto space-y-6">
      <div class="bg-white rounded-lg shadow p-8">
        <h2 class="text-2xl font-semibold text-emerald-800 mb-2">Bienvenido</h2>
        <p class="text-slate-600 leading-relaxed">
          Plataforma de administracion de viveros, productores, fincas, labores y productos de
          control. Seleccione un modulo para comenzar.
        </p>
      </div>

      <div class="grid sm:grid-cols-2 gap-4">
        @for (acceso of accesos; track acceso.ruta) {
          <a
            [routerLink]="acceso.ruta"
            class="block bg-white rounded-lg shadow p-5 hover:shadow-md transition border border-transparent hover:border-emerald-200"
          >
            <h3 class="font-semibold text-emerald-800">{{ acceso.titulo }}</h3>
            <p class="text-sm text-slate-500 mt-1">{{ acceso.descripcion }}</p>
          </a>
        }
      </div>
    </section>
  `,
})
export class Home {
  protected readonly accesos = ACCESOS;
}
