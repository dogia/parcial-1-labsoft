import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ControlFertilizanteService } from './control-fertilizante.service';
import { ControlFertilizante } from '../entity/control-fertilizante.entity';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolUsuario } from '../entity/usuario.entity';

@Controller('productos-control/:productoId/control-fertilizante')
export class ControlFertilizanteController {
  constructor(private readonly controlFertilizanteService: ControlFertilizanteService) {}

  @Get()
  findOne(@Param('productoId', ParseIntPipe) productoId: number): Promise<ControlFertilizante> {
    return this.controlFertilizanteService.findOneByProducto(productoId);
  }

  @Post()
  @Roles(RolUsuario.ADMIN)
  create(
    @Param('productoId', ParseIntPipe) productoId: number,
    @Body() data: Partial<ControlFertilizante>,
  ): Promise<ControlFertilizante> {
    return this.controlFertilizanteService.create(productoId, data);
  }

  @Put()
  @Roles(RolUsuario.ADMIN)
  update(
    @Param('productoId', ParseIntPipe) productoId: number,
    @Body() data: Partial<ControlFertilizante>,
  ): Promise<ControlFertilizante> {
    return this.controlFertilizanteService.update(productoId, data);
  }

  @Delete()
  @Roles(RolUsuario.ADMIN)
  remove(@Param('productoId', ParseIntPipe) productoId: number): Promise<void> {
    return this.controlFertilizanteService.remove(productoId);
  }
}
