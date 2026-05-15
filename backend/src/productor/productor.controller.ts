import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProductorService } from './productor.service';
import { ViveroService } from '../vivero/vivero.service';
import { Productor } from '../entity/productor.entity';
import { Vivero } from '../entity/vivero.entity';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolUsuario } from '../entity/usuario.entity';

@Controller('productores')
export class ProductorController {
  constructor(
    private readonly productorService: ProductorService,
    private readonly viveroService: ViveroService,
  ) {}

  @Get()
  findAll(): Promise<Productor[]> {
    return this.productorService.findAll();
  }

  @Get(':documento')
  findOne(@Param('documento') documento: string): Promise<Productor> {
    return this.productorService.findOne(documento);
  }

  @Get(':documento/viveros')
  async findViveros(@Param('documento') documento: string): Promise<Vivero[]> {
    await this.productorService.findOne(documento);
    return this.viveroService.findAllByProductor(documento);
  }

  @Post()
  @Roles(RolUsuario.ADMIN)
  create(@Body() data: Partial<Productor>): Promise<Productor> {
    return this.productorService.create(data);
  }

  @Put(':documento')
  @Roles(RolUsuario.ADMIN)
  update(
    @Param('documento') documento: string,
    @Body() data: Partial<Productor>,
  ): Promise<Productor> {
    return this.productorService.update(documento, data);
  }

  @Delete(':documento')
  @Roles(RolUsuario.ADMIN)
  remove(@Param('documento') documento: string): Promise<void> {
    return this.productorService.remove(documento);
  }
}
