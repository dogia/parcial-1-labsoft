import { RolUsuario } from '../../entity/usuario.entity';

export class CrearUsuarioDto {
  correo: string;
  nombre: string;
  password: string;
  rol: RolUsuario;
}
