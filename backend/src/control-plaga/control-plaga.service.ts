import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ControlPlaga } from '../entity/control-plaga.entity';

@Injectable()
export class ControlPlagaService {
  constructor(
    @InjectRepository(ControlPlaga)
    private readonly controlPlagaRepository: Repository<ControlPlaga>,
  ) {}

  findAll(): Promise<ControlPlaga[]> {
    return this.controlPlagaRepository.find();
  }

  async findOneByProducto(productoId: number): Promise<ControlPlaga> {
    const control = await this.controlPlagaRepository.findOneBy({ id: productoId });
    if (!control) {
      throw new NotFoundException(`Control plaga para producto ${productoId} no encontrado`);
    }
    return control;
  }

  create(productoId: number, data: Partial<ControlPlaga>): Promise<ControlPlaga> {
    const control = this.controlPlagaRepository.create({
      ...data,
      id: productoId,
    });
    return this.controlPlagaRepository.save(control);
  }

  async update(productoId: number, data: Partial<ControlPlaga>): Promise<ControlPlaga> {
    await this.findOneByProducto(productoId);
    await this.controlPlagaRepository.update(productoId, data);
    return this.findOneByProducto(productoId);
  }

  async remove(productoId: number): Promise<void> {
    await this.findOneByProducto(productoId);
    await this.controlPlagaRepository.delete(productoId);
  }
}
