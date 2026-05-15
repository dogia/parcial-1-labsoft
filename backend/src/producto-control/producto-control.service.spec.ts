import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductoControlService } from './producto-control.service';
import { ProductoControl } from '../entity/producto-control.entity';

function crearProducto(over: Partial<ProductoControl> = {}): ProductoControl {
  return {
    id: 1,
    registro_ica: 'ICA-001',
    nombre: 'Fungex',
    frecuencia_aplicacion: 15,
    valor: 25000,
    tipo: 'HONGO',
    labores: [],
    controlPlaga: null as unknown as ProductoControl['controlPlaga'],
    controlHongo: null as unknown as ProductoControl['controlHongo'],
    controlFertilizante: null as unknown as ProductoControl['controlFertilizante'],
    ...over,
  } as ProductoControl;
}

describe('ProductoControlService', () => {
  let service: ProductoControlService;
  let repo: jest.Mocked<Repository<ProductoControl>>;

  beforeEach(async () => {
    const repoMock: Partial<jest.Mocked<Repository<ProductoControl>>> = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        ProductoControlService,
        { provide: getRepositoryToken(ProductoControl), useValue: repoMock },
      ],
    }).compile();

    service = moduleRef.get(ProductoControlService);
    repo = moduleRef.get(getRepositoryToken(ProductoControl));
  });

  it('findAll carga las relaciones de sub-tipo', async () => {
    const productos = [crearProducto()];
    repo.find.mockResolvedValue(productos);

    const resultado = await service.findAll();

    expect(repo.find).toHaveBeenCalledWith({
      relations: ['controlPlaga', 'controlHongo', 'controlFertilizante'],
      order: { id: 'ASC' },
    });
    expect(resultado).toBe(productos);
  });

  it('findOne lanza 404 si no existe', async () => {
    repo.findOne.mockResolvedValue(null);
    await expect(service.findOne(99)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('findOne devuelve el producto cuando existe', async () => {
    const producto = crearProducto();
    repo.findOne.mockResolvedValue(producto);

    const resultado = await service.findOne(1);

    expect(repo.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
      relations: ['controlPlaga', 'controlHongo', 'controlFertilizante'],
    });
    expect(resultado).toBe(producto);
  });

  it('create delega en repo.create y save', async () => {
    const datos = { nombre: 'Nuevo', registro_ica: 'X' };
    const creado = crearProducto(datos);
    repo.create.mockReturnValue(creado);
    repo.save.mockResolvedValue(creado);

    await service.create(datos);

    expect(repo.create).toHaveBeenCalledWith(datos);
    expect(repo.save).toHaveBeenCalledWith(creado);
  });
});
