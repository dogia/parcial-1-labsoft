import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ProductoControlService } from './producto-control.service';
import { ProductoControl } from '../entity/producto-control.entity';

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
  create(@Body() data: Partial<ProductoControl>): Promise<ProductoControl> {
    return this.productoControlService.create(data);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: Partial<ProductoControl>): Promise<ProductoControl> {
    return this.productoControlService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productoControlService.remove(id);
  }
}
