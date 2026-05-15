import { Test } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { UsuarioService } from '../usuario/usuario.service';
import { RolUsuario, Usuario } from '../entity/usuario.entity';

jest.mock('bcrypt');

function usuarioCompleto(over: Partial<Usuario> = {}): Usuario {
  return {
    id: 'uuid-1',
    correo: 'admin@viveros.co',
    nombre: 'Daniela',
    passwordHash: 'hash-correcto',
    rol: RolUsuario.ADMIN,
    activo: true,
    ...over,
  } as Usuario;
}

describe('AuthService', () => {
  let service: AuthService;
  let usuarioService: jest.Mocked<UsuarioService>;
  let jwtService: jest.Mocked<JwtService>;
  const bcryptMock = bcrypt as jest.Mocked<typeof bcrypt>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsuarioService,
          useValue: { findByCorreo: jest.fn() },
        },
        {
          provide: JwtService,
          useValue: { signAsync: jest.fn() },
        },
      ],
    }).compile();

    service = moduleRef.get(AuthService);
    usuarioService = moduleRef.get(UsuarioService);
    jwtService = moduleRef.get(JwtService);
    jest.clearAllMocks();
  });

  it('emite el JWT cuando las credenciales son correctas', async () => {
    usuarioService.findByCorreo.mockResolvedValue(usuarioCompleto());
    bcryptMock.compare.mockResolvedValue(true as never);
    jwtService.signAsync.mockResolvedValue('token-firmado');

    const respuesta = await service.login({
      correo: 'admin@viveros.co',
      password: 'Secreta1!',
    });

    expect(jwtService.signAsync).toHaveBeenCalledWith({
      sub: 'uuid-1',
      correo: 'admin@viveros.co',
      rol: RolUsuario.ADMIN,
    });
    expect(respuesta).toEqual({
      access_token: 'token-firmado',
      rol: RolUsuario.ADMIN,
      correo: 'admin@viveros.co',
      nombre: 'Daniela',
    });
  });

  it('rechaza con 401 si la contrasena no coincide', async () => {
    usuarioService.findByCorreo.mockResolvedValue(usuarioCompleto());
    bcryptMock.compare.mockResolvedValue(false as never);

    await expect(
      service.login({ correo: 'admin@viveros.co', password: 'incorrecta' }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
    expect(jwtService.signAsync).not.toHaveBeenCalled();
  });

  it('rechaza con 401 si el usuario no existe', async () => {
    usuarioService.findByCorreo.mockResolvedValue(null);

    await expect(
      service.login({ correo: 'fantasma@viveros.co', password: 'x' }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('rechaza con 401 si el usuario esta inactivo', async () => {
    usuarioService.findByCorreo.mockResolvedValue(usuarioCompleto({ activo: false }));
    bcryptMock.compare.mockResolvedValue(true as never);

    await expect(
      service.login({ correo: 'admin@viveros.co', password: 'Secreta1!' }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });
});
