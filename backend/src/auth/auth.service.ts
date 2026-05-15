import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuarioService } from '../usuario/usuario.service';
import { RolUsuario } from '../entity/usuario.entity';
import { LoginDto } from './dto/login.dto';

export interface JwtPayload {
  sub: string;
  correo: string;
  rol: RolUsuario;
}

export interface LoginResponse {
  access_token: string;
  rol: RolUsuario;
  correo: string;
  nombre: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<LoginResponse> {
    const usuario = await this.usuarioService.findByCorreo(dto.correo);

    if (!usuario || !usuario.activo) {
      throw new UnauthorizedException('Credenciales invalidas');
    }

    const passwordCoincide = await bcrypt.compare(dto.password, usuario.passwordHash);
    if (!passwordCoincide) {
      throw new UnauthorizedException('Credenciales invalidas');
    }

    const payload: JwtPayload = {
      sub: usuario.id,
      correo: usuario.correo,
      rol: usuario.rol,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      rol: usuario.rol,
      correo: usuario.correo,
      nombre: usuario.nombre,
    };
  }
}
