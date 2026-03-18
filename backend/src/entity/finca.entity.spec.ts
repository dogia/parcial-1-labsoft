import { Finca } from './finca.entity';
import { Productor } from './productor.entity';

describe('Finca Entity', () => {
  let finca: Finca;

  beforeEach(() => {
    finca = new Finca();
  });

  it('debe crear una instancia de Finca', () => {
    expect(finca).toBeDefined();
    expect(finca).toBeInstanceOf(Finca);
  });

  it('debe asignar todas las propiedades correctamente', () => {
    finca.numero_catastro = 'CAT-001';
    finca.municipio = 'Armenia';
    finca.productor_id = '123456789';

    expect(finca.numero_catastro).toBe('CAT-001');
    expect(finca.municipio).toBe('Armenia');
    expect(finca.productor_id).toBe('123456789');
  });

  it('debe asignar la relación con Productor', () => {
    const productor = new Productor();
    productor.documento = '123456789';
    productor.nombre = 'Juan';

    finca.productor = productor;

    expect(finca.productor).toBeDefined();
    expect(finca.productor).toBeInstanceOf(Productor);
    expect(finca.productor.documento).toBe('123456789');
  });
});
