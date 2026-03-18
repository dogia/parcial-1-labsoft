import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ControlHongo } from '../entity/control-hongo.entity';

@Injectable()
export class ControlHongoService {
  constructor(
    @InjectRepository(ControlHongo)
    private readonly controlHongoRepository: Repository<ControlHongo>,
  ) {}

  findAll(): Promise<ControlHongo[]> {
    return this.controlHongoRepository.find();
  }

  async findOneByProducto(productoId: number): Promise<ControlHongo> {
    const control = await this.controlHongoRepository.findOneBy({ id: productoId });
    if (!control) {
      throw new NotFoundException(`Control hongo para producto ${productoId} no encontrado`);
    }
    return control;
  }

  create(productoId: number, data: Partial<ControlHongo>): Promise<ControlHongo> {
    const control = this.controlHongoRepository.create({
      ...data,
      id: productoId,
    });
    return this.controlHongoRepository.save(control);
  }

  async update(productoId: number, data: Partial<ControlHongo>): Promise<ControlHongo> {
    await this.findOneByProducto(productoId);
    await this.controlHongoRepository.update(productoId, data);
    return this.findOneByProducto(productoId);
  }

  async remove(productoId: number): Promise<void> {
    await this.findOneByProducto(productoId);
    await this.controlHongoRepository.delete(productoId);
  }
}
