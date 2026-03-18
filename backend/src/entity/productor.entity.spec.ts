import { Productor } from './productor.entity';

describe('Productor Entity', () => {
  let productor: Productor;

  beforeEach(() => {
    productor = new Productor();
  });

  it('debe crear una instancia de Productor', () => {
    expect(productor).toBeDefined();
    expect(productor).toBeInstanceOf(Productor);
  });

  it('debe asignar todas las propiedades correctamente', () => {
    productor.documento = '123456789';
    productor.nombre = 'Juan';
    productor.apellido = 'Pérez';
    productor.telefono = '3001234567';
    productor.correo = 'juan@correo.com';

    expect(productor.documento).toBe('123456789');
    expect(productor.nombre).toBe('Juan');
    expect(productor.apellido).toBe('Pérez');
    expect(productor.telefono).toBe('3001234567');
    expect(productor.correo).toBe('juan@correo.com');
  });

  it('debe inicializar la relación fincas como un arreglo', () => {
    productor.fincas = [];
    expect(productor.fincas).toEqual([]);
    expect(Array.isArray(productor.fincas)).toBe(true);
  });
});
