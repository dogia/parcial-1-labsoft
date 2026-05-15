import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ControlHongoService } from './control-hongo.service';
import { ControlHongo } from '../entity/control-hongo.entity';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolUsuario } from '../entity/usuario.entity';

@Controller('productos-control/:productoId/control-hongo')
export class ControlHongoController {
  constructor(private readonly controlHongoService: ControlHongoService) {}

  @Get()
  findOne(@Param('productoId', ParseIntPipe) productoId: number): Promise<ControlHongo> {
    return this.controlHongoService.findOneByProducto(productoId);
  }

  @Post()
  @Roles(RolUsuario.ADMIN)
  create(
    @Param('productoId', ParseIntPipe) productoId: number,
    @Body() data: Partial<ControlHongo>,
  ): Promise<ControlHongo> {
    return this.controlHongoService.create(productoId, data);
  }

  @Put()
  @Roles(RolUsuario.ADMIN)
  update(
    @Param('productoId', ParseIntPipe) productoId: number,
    @Body() data: Partial<ControlHongo>,
  ): Promise<ControlHongo> {
    return this.controlHongoService.update(productoId, data);
  }

  @Delete()
  @Roles(RolUsuario.ADMIN)
  remove(@Param('productoId', ParseIntPipe) productoId: number): Promise<void> {
    return this.controlHongoService.remove(productoId);
  }
}
