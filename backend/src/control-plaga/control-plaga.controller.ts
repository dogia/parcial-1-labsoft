import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ControlPlagaService } from './control-plaga.service';
import { ControlPlaga } from '../entity/control-plaga.entity';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolUsuario } from '../entity/usuario.entity';

@Controller('productos-control/:productoId/control-plaga')
export class ControlPlagaController {
  constructor(private readonly controlPlagaService: ControlPlagaService) {}

  @Get()
  findOne(@Param('productoId', ParseIntPipe) productoId: number): Promise<ControlPlaga> {
    return this.controlPlagaService.findOneByProducto(productoId);
  }

  @Post()
  @Roles(RolUsuario.ADMIN)
  create(
    @Param('productoId', ParseIntPipe) productoId: number,
    @Body() data: Partial<ControlPlaga>,
  ): Promise<ControlPlaga> {
    return this.controlPlagaService.create(productoId, data);
  }

  @Put()
  @Roles(RolUsuario.ADMIN)
  update(
    @Param('productoId', ParseIntPipe) productoId: number,
    @Body() data: Partial<ControlPlaga>,
  ): Promise<ControlPlaga> {
    return this.controlPlagaService.update(productoId, data);
  }

  @Delete()
  @Roles(RolUsuario.ADMIN)
  remove(@Param('productoId', ParseIntPipe) productoId: number): Promise<void> {
    return this.controlPlagaService.remove(productoId);
  }
}
