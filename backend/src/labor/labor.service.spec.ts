import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LaborService } from './labor.service';
import { Labor } from '../entity/labor.entity';

function crearLabor(over: Partial<Labor> = {}): Labor {
  return {
    id: 1,
    fecha: new Date('2026-01-15'),
    descripcion: 'Aplicacion de fungicida',
    vivero_id: 'VIV-001',
    producto_id: 1,
    vivero: null as unknown as Labor['vivero'],
    producto: null as unknown as Labor['producto'],
    ...over,
  } as Labor;
}

describe('LaborService', () => {
  let service: LaborService;
  let repo: jest.Mocked<Repository<Labor>>;

  beforeEach(async () => {
    const repoMock: Partial<jest.Mocked<Repository<Labor>>> = {
      find: jest.fn(),
      findOne: jest.fn(),
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [LaborService, { provide: getRepositoryToken(Labor), useValue: repoMock }],
    }).compile();

    service = moduleRef.get(LaborService);
    repo = moduleRef.get(getRepositoryToken(Labor));
  });

  it('findAllByVivero carga las relaciones esperadas', async () => {
    const labores = [crearLabor()];
    repo.find.mockResolvedValue(labores);

    const resultado = await service.findAllByVivero('VIV-001');

    expect(repo.find).toHaveBeenCalledWith({
      where: { vivero_id: 'VIV-001' },
      relations: [
        'producto',
        'producto.controlPlaga',
        'producto.controlHongo',
        'producto.controlFertilizante',
      ],
      order: { fecha: 'DESC' },
    });
    expect(resultado).toBe(labores);
  });

  it('findOne carga relaciones y lanza 404 si no existe', async () => {
    const labor = crearLabor();
    repo.findOne.mockResolvedValueOnce(labor).mockResolvedValueOnce(null);

    await expect(service.findOne(1)).resolves.toBe(labor);
    await expect(service.findOne(999)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('create asocia el vivero recibido', async () => {
    const datos = { fecha: new Date(), descripcion: 'x', producto_id: 1 } as Partial<Labor>;
    const creada = crearLabor(datos);
    repo.create.mockReturnValue(creada);
    repo.save.mockResolvedValue(creada);

    await service.create('VIV-001', datos);

    expect(repo.create).toHaveBeenCalledWith({ ...datos, vivero_id: 'VIV-001' });
  });

  it('update y remove fallan si la labor no existe', async () => {
    repo.findOne.mockResolvedValue(null);

    await expect(service.update(1, {})).rejects.toBeInstanceOf(NotFoundException);
    await expect(service.remove(1)).rejects.toBeInstanceOf(NotFoundException);
  });
});
