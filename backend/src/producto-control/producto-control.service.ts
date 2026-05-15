import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductoControl } from '../entity/producto-control.entity';

const RELACIONES = ['controlPlaga', 'controlHongo', 'controlFertilizante'];

@Injectable()
export class ProductoControlService {
  constructor(
    @InjectRepository(ProductoControl)
    private readonly productoControlRepository: Repository<ProductoControl>,
  ) {}

  findAll(): Promise<ProductoControl[]> {
    return this.productoControlRepository.find({
      relations: RELACIONES,
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<ProductoControl> {
    const producto = await this.productoControlRepository.findOne({
      where: { id },
      relations: RELACIONES,
    });
    if (!producto) {
      throw new NotFoundException(`Producto de control con id ${id} no encontrado`);
    }
    return producto;
  }

  create(data: Partial<ProductoControl>): Promise<ProductoControl> {
    const producto = this.productoControlRepository.create(data);
    return this.productoControlRepository.save(producto);
  }

  async update(id: number, data: Partial<ProductoControl>): Promise<ProductoControl> {
    await this.findOne(id);
    await this.productoControlRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.productoControlRepository.delete(id);
  }
}
