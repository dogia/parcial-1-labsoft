import { DataSource } from 'typeorm';
import { Productor } from './productor.entity';
import { Finca } from './finca.entity';
import { Vivero } from './vivero.entity';
import { Labor } from './labor.entity';
import { ProductoControl } from './producto-control.entity';
import { ControlPlaga } from './control-plaga.entity';
import { ControlHongo } from './control-hongo.entity';
import { ControlFertilizante } from './control-fertilizante.entity';

describe('Relaciones entre Entidades', () => {
  let dataSource: DataSource;

  beforeAll(async () => {
    dataSource = new DataSource({
      type: 'better-sqlite3',
      database: ':memory:',
      synchronize: true,
      entities: [
        Productor,
        Finca,
        Vivero,
        Labor,
        ProductoControl,
        ControlPlaga,
        ControlHongo,
        ControlFertilizante,
      ],
    });
    await dataSource.initialize();
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  describe('Productor -> Finca (OneToMany)', () => {
    it('debe existir la relación OneToMany de Productor a Finca', () => {
      const metadata = dataSource.getMetadata(Productor);
      const relation = metadata.relations.find((r) => r.propertyName === 'fincas');

      expect(relation).toBeDefined();
      expect(relation!.relationType).toBe('one-to-many');
      expect(relation!.inverseEntityMetadata.targetName).toBe('Finca');
    });

    it('debe existir la relación ManyToOne de Finca a Productor', () => {
      const metadata = dataSource.getMetadata(Finca);
      const relation = metadata.relations.find((r) => r.propertyName === 'productor');

      expect(relation).toBeDefined();
      expect(relation!.relationType).toBe('many-to-one');
      expect(relation!.inverseEntityMetadata.targetName).toBe('Productor');
    });

    it('la FK productor_id en Finca debe apuntar a documento en Productor', () => {
      const metadata = dataSource.getMetadata(Finca);
      const relation = metadata.relations.find((r) => r.propertyName === 'productor');
      const joinColumn = relation!.joinColumns[0];

      expect(joinColumn.databaseName).toBe('productor_id');
      expect(joinColumn.referencedColumn!.propertyName).toBe('documento');
    });
  });

  describe('Finca -> Vivero (OneToMany)', () => {
    it('debe existir la relación OneToMany de Finca a Vivero', () => {
      const metadata = dataSource.getMetadata(Finca);
      const relation = metadata.relations.find((r) => r.propertyName === 'viveros');

      expect(relation).toBeDefined();
      expect(relation!.relationType).toBe('one-to-many');
      expect(relation!.inverseEntityMetadata.targetName).toBe('Vivero');
    });

    it('debe existir la relación ManyToOne de Vivero a Finca', () => {
      const metadata = dataSource.getMetadata(Vivero);
      const relation = metadata.relations.find((r) => r.propertyName === 'finca');

      expect(relation).toBeDefined();
      expect(relation!.relationType).toBe('many-to-one');
      expect(relation!.inverseEntityMetadata.targetName).toBe('Finca');
    });

    it('la FK finca_id en Vivero debe apuntar a numero_catastro en Finca', () => {
      const metadata = dataSource.getMetadata(Vivero);
      const relation = metadata.relations.find((r) => r.propertyName === 'finca');
      const joinColumn = relation!.joinColumns[0];

      expect(joinColumn.databaseName).toBe('finca_id');
      expect(joinColumn.referencedColumn!.propertyName).toBe('numero_catastro');
    });
  });

  describe('Vivero -> Labor (OneToMany)', () => {
    it('debe existir la relación OneToMany de Vivero a Labor', () => {
      const metadata = dataSource.getMetadata(Vivero);
      const relation = metadata.relations.find((r) => r.propertyName === 'labores');

      expect(relation).toBeDefined();
      expect(relation!.relationType).toBe('one-to-many');
      expect(relation!.inverseEntityMetadata.targetName).toBe('Labor');
    });

    it('debe existir la relación ManyToOne de Labor a Vivero', () => {
      const metadata = dataSource.getMetadata(Labor);
      const relation = metadata.relations.find((r) => r.propertyName === 'vivero');

      expect(relation).toBeDefined();
      expect(relation!.relationType).toBe('many-to-one');
      expect(relation!.inverseEntityMetadata.targetName).toBe('Vivero');
    });

    it('la FK vivero_id en Labor debe apuntar a codigo en Vivero', () => {
      const metadata = dataSource.getMetadata(Labor);
      const relation = metadata.relations.find((r) => r.propertyName === 'vivero');
      const joinColumn = relation!.joinColumns[0];

      expect(joinColumn.databaseName).toBe('vivero_id');
      expect(joinColumn.referencedColumn!.propertyName).toBe('codigo');
    });
  });

  describe('ProductoControl -> Labor (OneToMany)', () => {
    it('debe existir la relación OneToMany de ProductoControl a Labor', () => {
      const metadata = dataSource.getMetadata(ProductoControl);
      const relation = metadata.relations.find((r) => r.propertyName === 'labores');

      expect(relation).toBeDefined();
      expect(relation!.relationType).toBe('one-to-many');
      expect(relation!.inverseEntityMetadata.targetName).toBe('Labor');
    });

    it('debe existir la relación ManyToOne de Labor a ProductoControl', () => {
      const metadata = dataSource.getMetadata(Labor);
      const relation = metadata.relations.find((r) => r.propertyName === 'producto');

      expect(relation).toBeDefined();
      expect(relation!.relationType).toBe('many-to-one');
      expect(relation!.inverseEntityMetadata.targetName).toBe('ProductoControl');
    });

    it('la FK producto_id en Labor debe apuntar a id en ProductoControl', () => {
      const metadata = dataSource.getMetadata(Labor);
      const relation = metadata.relations.find((r) => r.propertyName === 'producto');
      const joinColumn = relation!.joinColumns[0];

      expect(joinColumn.databaseName).toBe('producto_id');
      expect(joinColumn.referencedColumn!.propertyName).toBe('id');
    });
  });

  describe('ProductoControl -> ControlPlaga (OneToOne)', () => {
    it('debe existir la relación OneToOne de ProductoControl a ControlPlaga', () => {
      const metadata = dataSource.getMetadata(ProductoControl);
      const relation = metadata.relations.find((r) => r.propertyName === 'controlPlaga');

      expect(relation).toBeDefined();
      expect(relation!.relationType).toBe('one-to-one');
      expect(relation!.inverseEntityMetadata.targetName).toBe('ControlPlaga');
    });

    it('debe existir la relación OneToOne de ControlPlaga a ProductoControl', () => {
      const metadata = dataSource.getMetadata(ControlPlaga);
      const relation = metadata.relations.find((r) => r.propertyName === 'productoControl');

      expect(relation).toBeDefined();
      expect(relation!.relationType).toBe('one-to-one');
      expect(relation!.inverseEntityMetadata.targetName).toBe('ProductoControl');
    });

    it('la FK id en ControlPlaga debe apuntar a id en ProductoControl', () => {
      const metadata = dataSource.getMetadata(ControlPlaga);
      const relation = metadata.relations.find((r) => r.propertyName === 'productoControl');
      const joinColumn = relation!.joinColumns[0];

      expect(joinColumn.databaseName).toBe('id');
      expect(joinColumn.referencedColumn!.propertyName).toBe('id');
    });
  });

  describe('ProductoControl -> ControlHongo (OneToOne)', () => {
    it('debe existir la relación OneToOne de ProductoControl a ControlHongo', () => {
      const metadata = dataSource.getMetadata(ProductoControl);
      const relation = metadata.relations.find((r) => r.propertyName === 'controlHongo');

      expect(relation).toBeDefined();
      expect(relation!.relationType).toBe('one-to-one');
      expect(relation!.inverseEntityMetadata.targetName).toBe('ControlHongo');
    });

    it('debe existir la relación OneToOne de ControlHongo a ProductoControl', () => {
      const metadata = dataSource.getMetadata(ControlHongo);
      const relation = metadata.relations.find((r) => r.propertyName === 'productoControl');

      expect(relation).toBeDefined();
      expect(relation!.relationType).toBe('one-to-one');
      expect(relation!.inverseEntityMetadata.targetName).toBe('ProductoControl');
    });

    it('la FK id en ControlHongo debe apuntar a id en ProductoControl', () => {
      const metadata = dataSource.getMetadata(ControlHongo);
      const relation = metadata.relations.find((r) => r.propertyName === 'productoControl');
      const joinColumn = relation!.joinColumns[0];

      expect(joinColumn.databaseName).toBe('id');
      expect(joinColumn.referencedColumn!.propertyName).toBe('id');
    });
  });

  describe('ProductoControl -> ControlFertilizante (OneToOne)', () => {
    it('debe existir la relación OneToOne de ProductoControl a ControlFertilizante', () => {
      const metadata = dataSource.getMetadata(ProductoControl);
      const relation = metadata.relations.find((r) => r.propertyName === 'controlFertilizante');

      expect(relation).toBeDefined();
      expect(relation!.relationType).toBe('one-to-one');
      expect(relation!.inverseEntityMetadata.targetName).toBe('ControlFertilizante');
    });

    it('debe existir la relación OneToOne de ControlFertilizante a ProductoControl', () => {
      const metadata = dataSource.getMetadata(ControlFertilizante);
      const relation = metadata.relations.find((r) => r.propertyName === 'productoControl');

      expect(relation).toBeDefined();
      expect(relation!.relationType).toBe('one-to-one');
      expect(relation!.inverseEntityMetadata.targetName).toBe('ProductoControl');
    });

    it('la FK id en ControlFertilizante debe apuntar a id en ProductoControl', () => {
      const metadata = dataSource.getMetadata(ControlFertilizante);
      const relation = metadata.relations.find((r) => r.propertyName === 'productoControl');
      const joinColumn = relation!.joinColumns[0];

      expect(joinColumn.databaseName).toBe('id');
      expect(joinColumn.referencedColumn!.propertyName).toBe('id');
    });
  });
});
