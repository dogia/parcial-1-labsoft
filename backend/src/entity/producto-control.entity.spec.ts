import { ProductoControl } from './producto-control.entity';
import { ControlPlaga } from './control-plaga.entity';
import { ControlHongo } from './control-hongo.entity';

describe('ProductoControl Entity', () => {
  let producto: ProductoControl;

  beforeEach(() => {
    producto = new ProductoControl();
  });

  it('debe crear una instancia de ProductoControl', () => {
    expect(producto).toBeDefined();
    expect(producto).toBeInstanceOf(ProductoControl);
  });

  it('debe asignar todas las propiedades correctamente', () => {
    producto.id = 1;
    producto.registro_ica = 'ICA-12345';
    producto.nombre = 'Fungicida Z';
    producto.frecuencia_aplicacion = 15;
    producto.valor = 50000;
    producto.tipo = 'hongo';

    expect(producto.id).toBe(1);
    expect(producto.registro_ica).toBe('ICA-12345');
    expect(producto.nombre).toBe('Fungicida Z');
    expect(producto.frecuencia_aplicacion).toBe(15);
    expect(producto.valor).toBe(50000);
    expect(producto.tipo).toBe('hongo');
  });

  it('debe asignar las relaciones OneToOne con los controles', () => {
    const plaga = new ControlPlaga();
    plaga.id = 1;
    plaga.periodo_carencia = 30;

    const hongo = new ControlHongo();
    hongo.id = 2;
    hongo.nombre_hongo = 'Roya';

    producto.controlPlaga = plaga;
    producto.controlHongo = hongo;

    expect(producto.controlPlaga).toBeInstanceOf(ControlPlaga);
    expect(producto.controlPlaga.periodo_carencia).toBe(30);
    expect(producto.controlHongo).toBeInstanceOf(ControlHongo);
    expect(producto.controlHongo.nombre_hongo).toBe('Roya');
  });
});
