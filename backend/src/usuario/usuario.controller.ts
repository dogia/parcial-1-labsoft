import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsuarioService, UsuarioSinPassword } from './usuario.service';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolUsuario } from '../entity/usuario.entity';

@Controller('usuarios')
@Roles(RolUsuario.ADMIN)
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  findAll(): Promise<UsuarioSinPassword[]> {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UsuarioSinPassword> {
    return this.usuarioService.findOne(id);
  }

  @Post()
  create(@Body() dto: CrearUsuarioDto): Promise<UsuarioSinPassword> {
    return this.usuarioService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: ActualizarUsuarioDto): Promise<UsuarioSinPassword> {
    return this.usuarioService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usuarioService.remove(id);
  }
}
