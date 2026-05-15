import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ControlHongoService } from './control-hongo.service';
import { ControlHongo } from '../entity/control-hongo.entity';

describe('ControlHongoService', () => {
  let service: ControlHongoService;
  let repo: jest.Mocked<Repository<ControlHongo>>;

  beforeEach(async () => {
    const repoMock: Partial<jest.Mocked<Repository<ControlHongo>>> = {
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        ControlHongoService,
        { provide: getRepositoryToken(ControlHongo), useValue: repoMock },
      ],
    }).compile();

    service = moduleRef.get(ControlHongoService);
    repo = moduleRef.get(getRepositoryToken(ControlHongo));
  });

  it('create persiste con id=productoId', async () => {
    const entidad = { id: 5, periodo_carencia: 7, nombre_hongo: 'Roya' } as ControlHongo;
    repo.create.mockReturnValue(entidad);
    repo.save.mockResolvedValue(entidad);

    await service.create(5, { periodo_carencia: 7, nombre_hongo: 'Roya' });

    expect(repo.create).toHaveBeenCalledWith({
      periodo_carencia: 7,
      nombre_hongo: 'Roya',
      id: 5,
    });
  });

  it('remove falla si no existe', async () => {
    repo.findOneBy.mockResolvedValue(null);
    await expect(service.remove(99)).rejects.toBeInstanceOf(NotFoundException);
  });
});
