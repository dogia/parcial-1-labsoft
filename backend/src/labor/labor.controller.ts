import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { LaborService } from './labor.service';
import { Labor } from '../entity/labor.entity';

@Controller('viveros/:codigo/labores')
export class LaborController {
  constructor(private readonly laborService: LaborService) {}

  @Get()
  findAll(@Param('codigo') codigo: string): Promise<Labor[]> {
    return this.laborService.findAllByVivero(codigo);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Labor> {
    return this.laborService.findOne(id);
  }

  @Post()
  create(@Param('codigo') codigo: string, @Body() data: Partial<Labor>): Promise<Labor> {
    return this.laborService.create(codigo, data);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: Partial<Labor>): Promise<Labor> {
    return this.laborService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.laborService.remove(id);
  }
}
