import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ControlHongoService } from './control-hongo.service';
import { ControlHongo } from '../entity/control-hongo.entity';

@Controller('productos-control/:productoId/control-hongo')
export class ControlHongoController {
  constructor(private readonly controlHongoService: ControlHongoService) {}

  @Get()
  findOne(@Param('productoId', ParseIntPipe) productoId: number): Promise<ControlHongo> {
    return this.controlHongoService.findOneByProducto(productoId);
  }

  @Post()
  create(@Param('productoId', ParseIntPipe) productoId: number, @Body() data: Partial<ControlHongo>): Promise<ControlHongo> {
    return this.controlHongoService.create(productoId, data);
  }

  @Put()
  update(@Param('productoId', ParseIntPipe) productoId: number, @Body() data: Partial<ControlHongo>): Promise<ControlHongo> {
    return this.controlHongoService.update(productoId, data);
  }

  @Delete()
  remove(@Param('productoId', ParseIntPipe) productoId: number): Promise<void> {
    return this.controlHongoService.remove(productoId);
  }
}
