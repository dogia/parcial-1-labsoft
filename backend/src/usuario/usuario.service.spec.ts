import { Test } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UsuarioService } from './usuario.service';
import { RolUsuario, Usuario } from '../entity/usuario.entity';

jest.mock('bcrypt');

function crearUsuario(over: Partial<Usuario> = {}): Usuario {
  return {
    id: 'uuid-1',
    correo: 'admin@viveros.co',
    nombre: 'Daniela',
    passwordHash: 'hash-original',
    rol: RolUsuario.ADMIN,
    activo: true,
    ...over,
  } as Usuario;
}

describe('UsuarioService', () => {
  let service: UsuarioService;
  let repo: jest.Mocked<Repository<Usuario>>;
  const bcryptMock = bcrypt as jest.Mocked<typeof bcrypt>;

  beforeEach(async () => {
    const repoMock: Partial<jest.Mocked<Repository<Usuario>>> = {
      find: jest.fn(),
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [UsuarioService, { provide: getRepositoryToken(Usuario), useValue: repoMock }],
    }).compile();

    service = moduleRef.get(UsuarioService);
    repo = moduleRef.get(getRepositoryToken(Usuario));
    jest.clearAllMocks();
  });

  it('findAll omite el password hash', async () => {
    repo.find.mockResolvedValue([crearUsuario()]);

    const resultado = await service.findAll();

    expect(resultado).toHaveLength(1);
    expect(resultado[0]).not.toHaveProperty('passwordHash');
    expect(resultado[0].correo).toBe('admin@viveros.co');
  });

  it('findByCorreo devuelve el usuario completo incluyendo hash', async () => {
    const usuario = crearUsuario();
    repo.findOneBy.mockResolvedValue(usuario);

    const resultado = await service.findByCorreo('admin@viveros.co');

    expect(resultado).toBe(usuario);
    expect(resultado?.passwordHash).toBe('hash-original');
  });

  it('create hashea la contrasena y rechaza correos duplicados', async () => {
    repo.findOneBy.mockResolvedValueOnce(null);
    bcryptMock.hash.mockResolvedValue('hash-nuevo' as never);
    const guardado = crearUsuario({ passwordHash: 'hash-nuevo' });
    repo.create.mockReturnValue(guardado);
    repo.save.mockResolvedValue(guardado);

    const resultado = await service.create({
      correo: 'admin@viveros.co',
      nombre: 'Daniela',
      password: 'Secreta1!',
      rol: RolUsuario.ADMIN,
    });

    expect(bcryptMock.hash).toHaveBeenCalledWith('Secreta1!', 10);
    expect(resultado).not.toHaveProperty('passwordHash');

    repo.findOneBy.mockResolvedValueOnce(crearUsuario());
    await expect(
      service.create({
        correo: 'admin@viveros.co',
        nombre: 'x',
        password: 'p',
        rol: RolUsuario.EMPLEADO,
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it('update vuelve a hashear si llega password nuevo', async () => {
    repo.findOneBy
      .mockResolvedValueOnce(crearUsuario())
      .mockResolvedValueOnce(crearUsuario({ passwordHash: 'hash-actualizado' }));
    bcryptMock.hash.mockResolvedValue('hash-actualizado' as never);

    await service.update('uuid-1', { password: 'NuevaPass!' });

    expect(bcryptMock.hash).toHaveBeenCalledWith('NuevaPass!', 10);
    expect(repo.update).toHaveBeenCalledWith(
      'uuid-1',
      expect.objectContaining({ passwordHash: 'hash-actualizado' }),
    );
  });

  it('remove falla cuando el usuario no existe', async () => {
    repo.findOneBy.mockResolvedValue(null);
    await expect(service.remove('xxx')).rejects.toBeInstanceOf(NotFoundException);
  });
});
