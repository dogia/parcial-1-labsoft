import { IsBoolean, IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { RolUsuario } from '../../entity/usuario.entity';

export class ActualizarUsuarioDto {
  @IsOptional()
  @IsEmail({}, { message: 'El correo debe tener un formato valido' })
  correo?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  nombre?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'La contrasena debe tener al menos 6 caracteres' })
  password?: string;

  @IsOptional()
  @IsEnum(RolUsuario, { message: 'El rol debe ser ADMIN o EMPLEADO' })
  rol?: RolUsuario;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
