import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ControlPlagaService } from './control-plaga.service';
import { ControlPlaga } from '../entity/control-plaga.entity';

@Controller('productos-control/:productoId/control-plaga')
export class ControlPlagaController {
  constructor(private readonly controlPlagaService: ControlPlagaService) {}

  @Get()
  findOne(@Param('productoId', ParseIntPipe) productoId: number): Promise<ControlPlaga> {
    return this.controlPlagaService.findOneByProducto(productoId);
  }

  @Post()
  create(@Param('productoId', ParseIntPipe) productoId: number, @Body() data: Partial<ControlPlaga>): Promise<ControlPlaga> {
    return this.controlPlagaService.create(productoId, data);
  }

  @Put()
  update(@Param('productoId', ParseIntPipe) productoId: number, @Body() data: Partial<ControlPlaga>): Promise<ControlPlaga> {
    return this.controlPlagaService.update(productoId, data);
  }

  @Delete()
  remove(@Param('productoId', ParseIntPipe) productoId: number): Promise<void> {
    return this.controlPlagaService.remove(productoId);
  }
}
