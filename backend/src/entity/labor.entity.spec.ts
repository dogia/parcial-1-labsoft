import { Labor } from './labor.entity';
import { Vivero } from './vivero.entity';
import { ProductoControl } from './producto-control.entity';

describe('Labor Entity', () => {
  let labor: Labor;

  beforeEach(() => {
    labor = new Labor();
  });

  it('debe crear una instancia de Labor', () => {
    expect(labor).toBeDefined();
    expect(labor).toBeInstanceOf(Labor);
  });

  it('debe asignar todas las propiedades correctamente', () => {
    const fecha = new Date('2026-03-17');
    labor.id = 1;
    labor.fecha = fecha;
    labor.descripcion = 'Fumigación general';
    labor.vivero_id = 'VIV-001';
    labor.producto_id = 10;

    expect(labor.id).toBe(1);
    expect(labor.fecha).toEqual(fecha);
    expect(labor.descripcion).toBe('Fumigación general');
    expect(labor.vivero_id).toBe('VIV-001');
    expect(labor.producto_id).toBe(10);
  });

  it('debe asignar las relaciones con Vivero y ProductoControl', () => {
    const vivero = new Vivero();
    vivero.codigo = 'VIV-001';

    const producto = new ProductoControl();
    producto.id = 10;
    producto.nombre = 'Insecticida X';

    labor.vivero = vivero;
    labor.producto = producto;

    expect(labor.vivero).toBeInstanceOf(Vivero);
    expect(labor.vivero.codigo).toBe('VIV-001');
    expect(labor.producto).toBeInstanceOf(ProductoControl);
    expect(labor.producto.nombre).toBe('Insecticida X');
  });
});
