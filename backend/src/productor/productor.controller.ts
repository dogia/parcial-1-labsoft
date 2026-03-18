import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProductorService } from './productor.service';
import { Productor } from '../entity/productor.entity';

@Controller('productores')
export class ProductorController {
  constructor(private readonly productorService: ProductorService) {}

  @Get()
  findAll(): Promise<Productor[]> {
    return this.productorService.findAll();
  }

  @Get(':documento')
  findOne(@Param('documento') documento: string): Promise<Productor> {
    return this.productorService.findOne(documento);
  }

  @Post()
  create(@Body() data: Partial<Productor>): Promise<Productor> {
    return this.productorService.create(data);
  }

  @Put(':documento')
  update(@Param('documento') documento: string, @Body() data: Partial<Productor>): Promise<Productor> {
    return this.productorService.update(documento, data);
  }

  @Delete(':documento')
  remove(@Param('documento') documento: string): Promise<void> {
    return this.productorService.remove(documento);
  }
}
