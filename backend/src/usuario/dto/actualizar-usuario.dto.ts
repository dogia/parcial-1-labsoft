import { RolUsuario } from '../../entity/usuario.entity';

export class ActualizarUsuarioDto {
  correo?: string;
  nombre?: string;
  password?: string;
  rol?: RolUsuario;
  activo?: boolean;
}
