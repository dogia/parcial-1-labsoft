import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ControlPlagaService } from './control-plaga.service';
import { ControlPlaga } from '../entity/control-plaga.entity';

describe('ControlPlagaService', () => {
  let service: ControlPlagaService;
  let repo: jest.Mocked<Repository<ControlPlaga>>;

  beforeEach(async () => {
    const repoMock: Partial<jest.Mocked<Repository<ControlPlaga>>> = {
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        ControlPlagaService,
        { provide: getRepositoryToken(ControlPlaga), useValue: repoMock },
      ],
    }).compile();

    service = moduleRef.get(ControlPlagaService);
    repo = moduleRef.get(getRepositoryToken(ControlPlaga));
  });

  it('findOneByProducto lanza 404 cuando no existe', async () => {
    repo.findOneBy.mockResolvedValue(null);
    await expect(service.findOneByProducto(99)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('create reusa el productoId como id primario', async () => {
    const entidad = { id: 1, periodo_carencia: 7 } as ControlPlaga;
    repo.create.mockReturnValue(entidad);
    repo.save.mockResolvedValue(entidad);

    await service.create(1, { periodo_carencia: 7 });

    expect(repo.create).toHaveBeenCalledWith({ periodo_carencia: 7, id: 1 });
  });

  it('update valida existencia previa', async () => {
    repo.findOneBy.mockResolvedValue(null);
    await expect(service.update(1, { periodo_carencia: 10 })).rejects.toBeInstanceOf(NotFoundException);
    expect(repo.update).not.toHaveBeenCalled();
  });
});
