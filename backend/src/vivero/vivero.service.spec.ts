import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { ViveroService } from './vivero.service';
import { Vivero } from '../entity/vivero.entity';

function crearVivero(over: Partial<Vivero> = {}): Vivero {
  return {
    codigo: 'VIV-001',
    nombre: 'Eden',
    departamento: 'Risaralda',
    municipio: 'Pereira',
    tipo_cultivo: 'Café',
    finca_id: 'CAT-001',
    finca: null as unknown as Vivero['finca'],
    labores: [],
    ...over,
  } as Vivero;
}

describe('ViveroService', () => {
  let service: ViveroService;
  let repo: jest.Mocked<Repository<Vivero>>;

  beforeEach(async () => {
    const repoMock: Partial<jest.Mocked<Repository<Vivero>>> = {
      findBy: jest.fn(),
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      createQueryBuilder: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [ViveroService, { provide: getRepositoryToken(Vivero), useValue: repoMock }],
    }).compile();

    service = moduleRef.get(ViveroService);
    repo = moduleRef.get(getRepositoryToken(Vivero));
  });

  it('findAllByFinca filtra por finca_id', async () => {
    const viveros = [crearVivero()];
    repo.findBy.mockResolvedValue(viveros);

    await service.findAllByFinca('CAT-001');

    expect(repo.findBy).toHaveBeenCalledWith({ finca_id: 'CAT-001' });
  });

  it('findAllByProductor construye el join via QueryBuilder', async () => {
    const viveros = [crearVivero()];
    const qb: Partial<jest.Mocked<SelectQueryBuilder<Vivero>>> = {
      innerJoin: jest.fn().mockReturnThis() as never,
      where: jest.fn().mockReturnThis() as never,
      orderBy: jest.fn().mockReturnThis() as never,
      getMany: jest.fn().mockResolvedValue(viveros) as never,
    };
    repo.createQueryBuilder.mockReturnValue(qb as SelectQueryBuilder<Vivero>);

    const resultado = await service.findAllByProductor('1088123456');

    expect(repo.createQueryBuilder).toHaveBeenCalledWith('vivero');
    expect(qb.innerJoin).toHaveBeenCalledWith('vivero.finca', 'finca');
    expect(qb.where).toHaveBeenCalledWith('finca.productor_id = :documento', {
      documento: '1088123456',
    });
    expect(qb.orderBy).toHaveBeenCalledWith('vivero.codigo', 'ASC');
    expect(resultado).toBe(viveros);
  });

  it('findOne lanza 404 cuando no existe', async () => {
    repo.findOneBy.mockResolvedValue(null);
    await expect(service.findOne('VIV-XXX')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('create asocia finca_id automaticamente', async () => {
    const datos = { codigo: 'VIV-002', nombre: 'A', departamento: 'B', municipio: 'C', tipo_cultivo: 'D' };
    const creado = crearVivero(datos);
    repo.create.mockReturnValue(creado);
    repo.save.mockResolvedValue(creado);

    await service.create('CAT-001', datos);

    expect(repo.create).toHaveBeenCalledWith({ ...datos, finca_id: 'CAT-001' });
  });

  it('update y remove fallan si el vivero no existe', async () => {
    repo.findOneBy.mockResolvedValue(null);

    await expect(service.update('VIV-XXX', {})).rejects.toBeInstanceOf(NotFoundException);
    await expect(service.remove('VIV-XXX')).rejects.toBeInstanceOf(NotFoundException);
  });
});
