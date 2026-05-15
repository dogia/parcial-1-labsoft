import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
      <h2 class="text-2xl font-semibold text-emerald-800 mb-4">Bienvenido</h2>
      <p class="text-slate-600 leading-relaxed">
        Esta es la plataforma de administracion de viveros, productores, fincas, labores y productos
        de control. Utilice el menu para navegar por los modulos del sistema.
      </p>
    </section>
  `,
})
export class Home {}
