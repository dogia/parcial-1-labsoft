import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { RolUsuario } from '../../entity/usuario.entity';

export class CrearUsuarioDto {
  @IsEmail({}, { message: 'El correo debe tener un formato valido' })
  correo: string;

  @IsString()
  @MinLength(2)
  nombre: string;

  @IsString()
  @MinLength(6, { message: 'La contrasena debe tener al menos 6 caracteres' })
  password: string;

  @IsEnum(RolUsuario, { message: 'El rol debe ser ADMIN o EMPLEADO' })
  rol: RolUsuario;
}
