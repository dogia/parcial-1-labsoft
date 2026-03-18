import { ControlHongo } from './control-hongo.entity';
import { ProductoControl } from './producto-control.entity';

describe('ControlHongo Entity', () => {
  let controlHongo: ControlHongo;

  beforeEach(() => {
    controlHongo = new ControlHongo();
  });

  it('debe crear una instancia de ControlHongo', () => {
    expect(controlHongo).toBeDefined();
    expect(controlHongo).toBeInstanceOf(ControlHongo);
  });

  it('debe asignar todas las propiedades correctamente', () => {
    controlHongo.id = 1;
    controlHongo.periodo_carencia = 14;
    controlHongo.nombre_hongo = 'Roya del café';

    expect(controlHongo.id).toBe(1);
    expect(controlHongo.periodo_carencia).toBe(14);
    expect(controlHongo.nombre_hongo).toBe('Roya del café');
  });

  it('debe asignar la relación con ProductoControl', () => {
    const producto = new ProductoControl();
    producto.id = 1;
    producto.nombre = 'Fungicida B';
    producto.tipo = 'hongo';

    controlHongo.productoControl = producto;

    expect(controlHongo.productoControl).toBeDefined();
    expect(controlHongo.productoControl).toBeInstanceOf(ProductoControl);
    expect(controlHongo.productoControl.tipo).toBe('hongo');
  });
});
