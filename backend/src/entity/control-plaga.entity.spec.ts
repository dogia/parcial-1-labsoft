import { ControlPlaga } from './control-plaga.entity';
import { ProductoControl } from './producto-control.entity';

describe('ControlPlaga Entity', () => {
  let controlPlaga: ControlPlaga;

  beforeEach(() => {
    controlPlaga = new ControlPlaga();
  });

  it('debe crear una instancia de ControlPlaga', () => {
    expect(controlPlaga).toBeDefined();
    expect(controlPlaga).toBeInstanceOf(ControlPlaga);
  });

  it('debe asignar todas las propiedades correctamente', () => {
    controlPlaga.id = 1;
    controlPlaga.periodo_carencia = 21;

    expect(controlPlaga.id).toBe(1);
    expect(controlPlaga.periodo_carencia).toBe(21);
  });

  it('debe asignar la relación con ProductoControl', () => {
    const producto = new ProductoControl();
    producto.id = 1;
    producto.nombre = 'Plaguicida A';
    producto.tipo = 'plaga';

    controlPlaga.productoControl = producto;

    expect(controlPlaga.productoControl).toBeDefined();
    expect(controlPlaga.productoControl).toBeInstanceOf(ProductoControl);
    expect(controlPlaga.productoControl.nombre).toBe('Plaguicida A');
  });
});
