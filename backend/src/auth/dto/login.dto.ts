import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'El correo debe tener un formato valido' })
  correo: string;

  @IsString()
  @MinLength(3, { message: 'La contrasena debe tener al menos 3 caracteres' })
  password: string;
}
