import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { FincaService } from './finca.service';
import { Finca } from '../entity/finca.entity';

@Controller('productores/:documento/fincas')
export class FincaController {
  constructor(private readonly fincaService: FincaService) {}

  @Get()
  findAll(@Param('documento') documento: string): Promise<Finca[]> {
    return this.fincaService.findAllByProductor(documento);
  }

  @Get(':numeroCatastro')
  findOne(@Param('numeroCatastro') numeroCatastro: string): Promise<Finca> {
    return this.fincaService.findOne(numeroCatastro);
  }

  @Post()
  create(@Param('documento') documento: string, @Body() data: Partial<Finca>): Promise<Finca> {
    return this.fincaService.create(documento, data);
  }

  @Put(':numeroCatastro')
  update(@Param('numeroCatastro') numeroCatastro: string, @Body() data: Partial<Finca>): Promise<Finca> {
    return this.fincaService.update(numeroCatastro, data);
  }

  @Delete(':numeroCatastro')
  remove(@Param('numeroCatastro') numeroCatastro: string): Promise<void> {
    return this.fincaService.remove(numeroCatastro);
  }
}
