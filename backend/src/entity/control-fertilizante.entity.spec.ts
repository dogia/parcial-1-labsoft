import { ControlFertilizante } from './control-fertilizante.entity';
import { ProductoControl } from './producto-control.entity';

describe('ControlFertilizante Entity', () => {
  let controlFertilizante: ControlFertilizante;

  beforeEach(() => {
    controlFertilizante = new ControlFertilizante();
  });

  it('debe crear una instancia de ControlFertilizante', () => {
    expect(controlFertilizante).toBeDefined();
    expect(controlFertilizante).toBeInstanceOf(ControlFertilizante);
  });

  it('debe asignar todas las propiedades correctamente', () => {
    const fecha = new Date('2026-01-15');
    controlFertilizante.id = 1;
    controlFertilizante.fecha_ultima_aplicacion = fecha;

    expect(controlFertilizante.id).toBe(1);
    expect(controlFertilizante.fecha_ultima_aplicacion).toEqual(fecha);
  });

  it('debe asignar la relación con ProductoControl', () => {
    const producto = new ProductoControl();
    producto.id = 1;
    producto.nombre = 'Fertilizante NPK';
    producto.tipo = 'fertilizante';

    controlFertilizante.productoControl = producto;

    expect(controlFertilizante.productoControl).toBeDefined();
    expect(controlFertilizante.productoControl).toBeInstanceOf(ProductoControl);
    expect(controlFertilizante.productoControl.nombre).toBe('Fertilizante NPK');
  });
});
