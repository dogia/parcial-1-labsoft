import { Usuario, RolUsuario } from './usuario.entity';

describe('Usuario Entity', () => {
  let usuario: Usuario;

  beforeEach(() => {
    usuario = new Usuario();
  });

  it('debe crear una instancia de Usuario', () => {
    expect(usuario).toBeDefined();
    expect(usuario).toBeInstanceOf(Usuario);
  });

  it('debe asignar todas las propiedades correctamente', () => {
    usuario.id = '550e8400-e29b-41d4-a716-446655440000';
    usuario.correo = 'admin@viveros.co';
    usuario.nombre = 'Administrador';
    usuario.passwordHash = '$2b$10$abcdefghijklmnopqrstuv';
    usuario.rol = RolUsuario.ADMIN;
    usuario.activo = true;

    expect(usuario.id).toBe('550e8400-e29b-41d4-a716-446655440000');
    expect(usuario.correo).toBe('admin@viveros.co');
    expect(usuario.nombre).toBe('Administrador');
    expect(usuario.passwordHash).toBe('$2b$10$abcdefghijklmnopqrstuv');
    expect(usuario.rol).toBe(RolUsuario.ADMIN);
    expect(usuario.activo).toBe(true);
  });

  it('debe permitir asignar cualquiera de los roles validos del enum', () => {
    usuario.rol = RolUsuario.ADMIN;
    expect(usuario.rol).toBe('ADMIN');

    usuario.rol = RolUsuario.EMPLEADO;
    expect(usuario.rol).toBe('EMPLEADO');
  });

  it('debe exponer ADMIN y EMPLEADO como unicos valores del enum RolUsuario', () => {
    const valores = Object.values(RolUsuario);
    expect(valores).toContain('ADMIN');
    expect(valores).toContain('EMPLEADO');
    expect(valores).toHaveLength(2);
  });
});
