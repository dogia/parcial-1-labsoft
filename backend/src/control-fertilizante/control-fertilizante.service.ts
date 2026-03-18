import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ControlFertilizante } from '../entity/control-fertilizante.entity';

@Injectable()
export class ControlFertilizanteService {
  constructor(
    @InjectRepository(ControlFertilizante)
    private readonly controlFertilizanteRepository: Repository<ControlFertilizante>,
  ) {}

  findAll(): Promise<ControlFertilizante[]> {
    return this.controlFertilizanteRepository.find();
  }

  async findOneByProducto(productoId: number): Promise<ControlFertilizante> {
    const control = await this.controlFertilizanteRepository.findOneBy({ id: productoId });
    if (!control) {
      throw new NotFoundException(`Control fertilizante para producto ${productoId} no encontrado`);
    }
    return control;
  }

  create(productoId: number, data: Partial<ControlFertilizante>): Promise<ControlFertilizante> {
    const control = this.controlFertilizanteRepository.create({
      ...data,
      id: productoId,
    });
    return this.controlFertilizanteRepository.save(control);
  }

  async update(productoId: number, data: Partial<ControlFertilizante>): Promise<ControlFertilizante> {
    await this.findOneByProducto(productoId);
    await this.controlFertilizanteRepository.update(productoId, data);
    return this.findOneByProducto(productoId);
  }

  async remove(productoId: number): Promise<void> {
    await this.findOneByProducto(productoId);
    await this.controlFertilizanteRepository.delete(productoId);
  }
}
