import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../entity/usuario.entity';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';

export type UsuarioSinPassword = Omit<Usuario, 'passwordHash'>;

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<UsuarioSinPassword[]> {
    const usuarios = await this.usuarioRepository.find();
    return usuarios.map((usuario) => this.omitirPasswordHash(usuario));
  }

  async findOne(id: string): Promise<UsuarioSinPassword> {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return this.omitirPasswordHash(usuario);
  }

  findByCorreo(correo: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOneBy({ correo });
  }

  async create(dto: CrearUsuarioDto): Promise<UsuarioSinPassword> {
    const existente = await this.usuarioRepository.findOneBy({ correo: dto.correo });
    if (existente) {
      throw new ConflictException(`Ya existe un usuario con el correo ${dto.correo}`);
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const usuario = this.usuarioRepository.create({
      correo: dto.correo,
      nombre: dto.nombre,
      rol: dto.rol,
      passwordHash,
    });
    const guardado = await this.usuarioRepository.save(usuario);
    return this.omitirPasswordHash(guardado);
  }

  async update(id: string, dto: ActualizarUsuarioDto): Promise<UsuarioSinPassword> {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    const cambios: Partial<Usuario> = {};
    if (dto.correo !== undefined) cambios.correo = dto.correo;
    if (dto.nombre !== undefined) cambios.nombre = dto.nombre;
    if (dto.rol !== undefined) cambios.rol = dto.rol;
    if (dto.activo !== undefined) cambios.activo = dto.activo;
    if (dto.password !== undefined) {
      cambios.passwordHash = await bcrypt.hash(dto.password, 10);
    }

    await this.usuarioRepository.update(id, cambios);
    const actualizado = await this.usuarioRepository.findOneBy({ id });
    return this.omitirPasswordHash(actualizado as Usuario);
  }

  async remove(id: string): Promise<void> {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    await this.usuarioRepository.delete(id);
  }

  private omitirPasswordHash(usuario: Usuario): UsuarioSinPassword {
    const { passwordHash: _passwordHash, ...resto } = usuario;
    return resto;
  }
}
