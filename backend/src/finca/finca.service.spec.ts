import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FincaService } from './finca.service';
import { Finca } from '../entity/finca.entity';

function crearFinca(over: Partial<Finca> = {}): Finca {
  return {
    numero_catastro: 'CAT-001',
    municipio: 'Armenia',
    productor_id: '1088123456',
    productor: null as unknown as Finca['productor'],
    viveros: [],
    ...over,
  } as Finca;
}

describe('FincaService', () => {
  let service: FincaService;
  let repo: jest.Mocked<Repository<Finca>>;

  beforeEach(async () => {
    const repoMock: Partial<jest.Mocked<Repository<Finca>>> = {
      find: jest.fn(),
      findBy: jest.fn(),
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [FincaService, { provide: getRepositoryToken(Finca), useValue: repoMock }],
    }).compile();

    service = moduleRef.get(FincaService);
    repo = moduleRef.get(getRepositoryToken(Finca));
  });

  it('findAllByProductor filtra por productor_id', async () => {
    const fincas = [crearFinca()];
    repo.findBy.mockResolvedValue(fincas);

    const resultado = await service.findAllByProductor('1088123456');

    expect(repo.findBy).toHaveBeenCalledWith({ productor_id: '1088123456' });
    expect(resultado).toBe(fincas);
  });

  it('findOne devuelve la finca o lanza 404', async () => {
    const finca = crearFinca();
    repo.findOneBy.mockResolvedValueOnce(finca).mockResolvedValueOnce(null);

    await expect(service.findOne('CAT-001')).resolves.toBe(finca);
    await expect(service.findOne('NO-EXISTE')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('create asigna el productor_id automaticamente', async () => {
    const datos = { numero_catastro: 'CAT-002', municipio: 'Pereira' };
    const creada = crearFinca({ ...datos });
    repo.create.mockReturnValue(creada);
    repo.save.mockResolvedValue(creada);

    await service.create('1088123456', datos);

    expect(repo.create).toHaveBeenCalledWith({ ...datos, productor_id: '1088123456' });
    expect(repo.save).toHaveBeenCalledWith(creada);
  });

  it('update valida existencia y actualiza', async () => {
    const original = crearFinca();
    const actualizada = crearFinca({ municipio: 'Cali' });
    repo.findOneBy.mockResolvedValueOnce(original).mockResolvedValueOnce(actualizada);

    const resultado = await service.update('CAT-001', { municipio: 'Cali' });

    expect(repo.update).toHaveBeenCalledWith('CAT-001', { municipio: 'Cali' });
    expect(resultado).toBe(actualizada);
  });

  it('remove falla cuando no existe', async () => {
    repo.findOneBy.mockResolvedValue(null);

    await expect(service.remove('NO-EXISTE')).rejects.toBeInstanceOf(NotFoundException);
    expect(repo.delete).not.toHaveBeenCalled();
  });
});
