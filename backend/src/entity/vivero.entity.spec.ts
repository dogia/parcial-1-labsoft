import { Vivero } from './vivero.entity';
import { Finca } from './finca.entity';

describe('Vivero Entity', () => {
  let vivero: Vivero;

  beforeEach(() => {
    vivero = new Vivero();
  });

  it('debe crear una instancia de Vivero', () => {
    expect(vivero).toBeDefined();
    expect(vivero).toBeInstanceOf(Vivero);
  });

  it('debe asignar todas las propiedades correctamente', () => {
    vivero.codigo = 'VIV-001';
    vivero.tipo_cultivo = 'Café';
    vivero.finca_id = 'CAT-001';

    expect(vivero.codigo).toBe('VIV-001');
    expect(vivero.tipo_cultivo).toBe('Café');
    expect(vivero.finca_id).toBe('CAT-001');
  });

  it('debe asignar la relación con Finca', () => {
    const finca = new Finca();
    finca.numero_catastro = 'CAT-001';
    finca.municipio = 'Armenia';

    vivero.finca = finca;

    expect(vivero.finca).toBeDefined();
    expect(vivero.finca).toBeInstanceOf(Finca);
    expect(vivero.finca.numero_catastro).toBe('CAT-001');
  });
});
