import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ControlFertilizanteService } from './control-fertilizante.service';
import { ControlFertilizante } from '../entity/control-fertilizante.entity';

@Controller('productos-control/:productoId/control-fertilizante')
export class ControlFertilizanteController {
  constructor(private readonly controlFertilizanteService: ControlFertilizanteService) {}

  @Get()
  findOne(@Param('productoId', ParseIntPipe) productoId: number): Promise<ControlFertilizante> {
    return this.controlFertilizanteService.findOneByProducto(productoId);
  }

  @Post()
  create(@Param('productoId', ParseIntPipe) productoId: number, @Body() data: Partial<ControlFertilizante>): Promise<ControlFertilizante> {
    return this.controlFertilizanteService.create(productoId, data);
  }

  @Put()
  update(@Param('productoId', ParseIntPipe) productoId: number, @Body() data: Partial<ControlFertilizante>): Promise<ControlFertilizante> {
    return this.controlFertilizanteService.update(productoId, data);
  }

  @Delete()
  remove(@Param('productoId', ParseIntPipe) productoId: number): Promise<void> {
    return this.controlFertilizanteService.remove(productoId);
  }
}
