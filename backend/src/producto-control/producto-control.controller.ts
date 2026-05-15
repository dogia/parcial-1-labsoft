import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ProductoControlService } from './producto-control.service';
import { ProductoControl } from '../entity/producto-control.entity';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolUsuario } from '../entity/usuario.entity';

@Controller('productos-control')
export class ProductoControlController {
  constructor(private readonly productoControlService: ProductoControlService) {}

  @Get()
  findAll(): Promise<ProductoControl[]> {
    return this.productoControlService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ProductoControl> {
    return this.productoControlService.findOne(id);
  }

  @Post()
  @Roles(RolUsuario.ADMIN)
  create(@Body() data: Partial<ProductoControl>): Promise<ProductoControl> {
    return this.productoControlService.create(data);
  }

  @Put(':id')
  @Roles(RolUsuario.ADMIN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<ProductoControl>,
  ): Promise<ProductoControl> {
    return this.productoControlService.update(id, data);
  }

  @Delete(':id')
  @Roles(RolUsuario.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productoControlService.remove(id);
  }
}
