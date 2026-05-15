import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ControlFertilizanteService } from './control-fertilizante.service';
import { ControlFertilizante } from '../entity/control-fertilizante.entity';

describe('ControlFertilizanteService', () => {
  let service: ControlFertilizanteService;
  let repo: jest.Mocked<Repository<ControlFertilizante>>;

  beforeEach(async () => {
    const repoMock: Partial<jest.Mocked<Repository<ControlFertilizante>>> = {
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        ControlFertilizanteService,
        { provide: getRepositoryToken(ControlFertilizante), useValue: repoMock },
      ],
    }).compile();

    service = moduleRef.get(ControlFertilizanteService);
    repo = moduleRef.get(getRepositoryToken(ControlFertilizante));
  });

  it('create comparte id con el producto padre', async () => {
    const fecha = '2026-01-15';
    const entidad = { id: 3, fecha_ultima_aplicacion: fecha } as unknown as ControlFertilizante;
    repo.create.mockReturnValue(entidad);
    repo.save.mockResolvedValue(entidad);

    await service.create(3, { fecha_ultima_aplicacion: fecha as unknown as Date });

    expect(repo.create).toHaveBeenCalledWith({
      fecha_ultima_aplicacion: fecha,
      id: 3,
    });
  });

  it('findOneByProducto retorna 404 cuando no hay registro', async () => {
    repo.findOneBy.mockResolvedValue(null);
    await expect(service.findOneByProducto(7)).rejects.toBeInstanceOf(NotFoundException);
  });
});
