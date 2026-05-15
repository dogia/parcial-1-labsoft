import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductorService } from './productor.service';
import { Productor } from '../entity/productor.entity';

function crearProductor(over: Partial<Productor> = {}): Productor {
  return {
    documento: '1088123456',
    nombre: 'Carlos',
    apellido: 'Lopez',
    telefono: '3001234567',
    correo: 'carlos@viveros.co',
    fincas: [],
    ...over,
  } as Productor;
}

describe('ProductorService', () => {
  let service: ProductorService;
  let repo: jest.Mocked<Repository<Productor>>;

  beforeEach(async () => {
    const repoMock: Partial<jest.Mocked<Repository<Productor>>> = {
      find: jest.fn(),
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        ProductorService,
        { provide: getRepositoryToken(Productor), useValue: repoMock },
      ],
    }).compile();

    service = moduleRef.get(ProductorService);
    repo = moduleRef.get(getRepositoryToken(Productor));
  });

  it('findAll delega al repositorio', async () => {
    const productores = [crearProductor()];
    repo.find.mockResolvedValue(productores);

    const resultado = await service.findAll();

    expect(resultado).toBe(productores);
    expect(repo.find).toHaveBeenCalledTimes(1);
  });

  it('findOne devuelve el productor cuando existe', async () => {
    const productor = crearProductor();
    repo.findOneBy.mockResolvedValue(productor);

    const resultado = await service.findOne('1088123456');

    expect(resultado).toBe(productor);
    expect(repo.findOneBy).toHaveBeenCalledWith({ documento: '1088123456' });
  });

  it('findOne lanza NotFoundException cuando no existe', async () => {
    repo.findOneBy.mockResolvedValue(null);

    await expect(service.findOne('xxx')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('create instancia y guarda', async () => {
    const datos = { documento: '1', nombre: 'A', apellido: 'B', telefono: '0', correo: 'a@b.co' };
    const creado = crearProductor(datos);
    repo.create.mockReturnValue(creado);
    repo.save.mockResolvedValue(creado);

    const resultado = await service.create(datos);

    expect(repo.create).toHaveBeenCalledWith(datos);
    expect(repo.save).toHaveBeenCalledWith(creado);
    expect(resultado).toBe(creado);
  });

  it('update verifica existencia, actualiza y retorna el actualizado', async () => {
    const original = crearProductor();
    const actualizado = crearProductor({ nombre: 'Nuevo' });
    repo.findOneBy.mockResolvedValueOnce(original).mockResolvedValueOnce(actualizado);

    const resultado = await service.update('1088123456', { nombre: 'Nuevo' });

    expect(repo.update).toHaveBeenCalledWith('1088123456', { nombre: 'Nuevo' });
    expect(resultado).toBe(actualizado);
  });

  it('remove verifica existencia antes de borrar', async () => {
    repo.findOneBy.mockResolvedValue(crearProductor());

    await service.remove('1088123456');

    expect(repo.delete).toHaveBeenCalledWith('1088123456');
  });

  it('remove falla si el productor no existe', async () => {
    repo.findOneBy.mockResolvedValue(null);

    await expect(service.remove('xxx')).rejects.toBeInstanceOf(NotFoundException);
    expect(repo.delete).not.toHaveBeenCalled();
  });
});
