import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ViveroService } from './vivero.service';
import { Vivero } from '../entity/vivero.entity';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolUsuario } from '../entity/usuario.entity';

@Controller('fincas/:numeroCatastro/viveros')
export class ViveroController {
  constructor(private readonly viveroService: ViveroService) {}

  @Get()
  findAll(@Param('numeroCatastro') numeroCatastro: string): Promise<Vivero[]> {
    return this.viveroService.findAllByFinca(numeroCatastro);
  }

  @Get(':codigo')
  findOne(@Param('codigo') codigo: string): Promise<Vivero> {
    return this.viveroService.findOne(codigo);
  }

  @Post()
  @Roles(RolUsuario.ADMIN)
  create(
    @Param('numeroCatastro') numeroCatastro: string,
    @Body() data: Partial<Vivero>,
  ): Promise<Vivero> {
    return this.viveroService.create(numeroCatastro, data);
  }

  @Put(':codigo')
  @Roles(RolUsuario.ADMIN)
  update(@Param('codigo') codigo: string, @Body() data: Partial<Vivero>): Promise<Vivero> {
    return this.viveroService.update(codigo, data);
  }

  @Delete(':codigo')
  @Roles(RolUsuario.ADMIN)
  remove(@Param('codigo') codigo: string): Promise<void> {
    return this.viveroService.remove(codigo);
  }
}
